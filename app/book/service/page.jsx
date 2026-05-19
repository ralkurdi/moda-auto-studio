"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ey, SH, GBtn, Progress } from "../../_lib/design";
import { Screen } from "../../_components/screen-shell";
import { useBooking } from "../../_lib/booking-context";
import {
  VEHICLE_TIERS,
  SERVICE_CATALOG,
  BUNDLES,
  tierPrice,
} from "../../_lib/services-catalog";

const VehicleTierPicker = ({ tier, onChange }) => (
  <div>
    <Ey style={{ marginBottom: 10 }}>Vehicle size · for accurate pricing</Ey>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 8,
      }}
    >
      {Object.entries(VEHICLE_TIERS).map(([k, v]) => {
        const on = tier === k;
        return (
          <button
            key={k}
            onClick={() => onChange(k)}
            style={{
              padding: "12px 14px",
              textAlign: "left",
              color: "inherit",
              background: on ? "var(--ink-2)" : "transparent",
              border:
                "1px solid " + (on ? "var(--accent)" : "var(--line)"),
              borderRadius: 2,
              transition: "all .15s",
            }}
          >
            <div
              style={{
                fontFamily: "var(--serif)",
                fontSize: 14,
                color: on ? "var(--bone)" : "var(--bone-2)",
              }}
            >
              {v.label}
            </div>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 9,
                color: "var(--mute)",
                marginTop: 3,
                letterSpacing: ".06em",
              }}
            >
              {v.ex}
            </div>
          </button>
        );
      })}
    </div>
  </div>
);

const ServiceCard = ({ svc, tier, picked, onToggle, expanded, onExpand }) => {
  const on = picked.includes(svc.id);
  const [lo, hi] = tierPrice(svc, tier);
  return (
    <div
      style={{
        background: on ? "var(--ink-2)" : "transparent",
        border: "1px solid " + (on ? "var(--accent)" : "var(--line)"),
        marginBottom: 10,
        transition: "all .2s",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {on && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 3,
            height: "100%",
            background: "var(--accent)",
          }}
        />
      )}
      <button
        onClick={() => onToggle(svc.id)}
        style={{
          width: "100%",
          padding: "16px 18px",
          display: "grid",
          gridTemplateColumns: "22px 1fr auto",
          gap: 14,
          alignItems: "flex-start",
          textAlign: "left",
          color: "inherit",
          background: "transparent",
        }}
      >
        <span
          style={{
            width: 18,
            height: 18,
            border:
              "1px solid " + (on ? "var(--accent)" : "var(--mute)"),
            background: on ? "var(--accent)" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--ink)",
            fontSize: 11,
            marginTop: 3,
          }}
        >
          {on ? "✓" : ""}
        </span>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 3,
            }}
          >
            <Ey style={{ color: "var(--accent)" }}>{svc.category}</Ey>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 9,
                color: "var(--mute)",
                letterSpacing: ".1em",
              }}
            >
              · {svc.time}
            </span>
          </div>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: 19,
              lineHeight: 1.15,
              color: "var(--bone)",
            }}
          >
            {svc.title}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "var(--bone-2)",
              marginTop: 5,
              lineHeight: 1.45,
              fontStyle: "italic",
            }}
          >
            {svc.tagline}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          {lo === hi ? (
            <>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 9,
                  color: "var(--mute)",
                  letterSpacing: ".1em",
                  marginBottom: 2,
                }}
              >
                FLAT
              </div>
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 18,
                  color: "var(--bone)",
                  lineHeight: 1,
                }}
              >
                ${lo.toLocaleString()}
              </div>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 9.5,
                  color: "var(--mute)",
                  marginTop: 3,
                }}
              >
                + tax
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 9,
                  color: "var(--mute)",
                  letterSpacing: ".1em",
                  marginBottom: 2,
                }}
              >
                FROM
              </div>
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 18,
                  color: "var(--bone)",
                  lineHeight: 1,
                }}
              >
                ${lo.toLocaleString()}
              </div>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 9.5,
                  color: "var(--mute)",
                  marginTop: 3,
                }}
              >
                to ${hi.toLocaleString()}
              </div>
            </>
          )}
        </div>
      </button>
      <button
        onClick={() => onExpand(expanded === svc.id ? null : svc.id)}
        style={{
          width: "100%",
          padding: "10px 18px",
          borderTop: "1px solid var(--line)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "var(--mute)",
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: ".14em",
          textTransform: "uppercase",
        }}
      >
        <span>
          {expanded === svc.id ? "Hide details" : "Materials & warranty"}
        </span>
        <span
          style={{
            color: "var(--accent)",
            transition: "transform .2s",
            display: "inline-block",
            transform: expanded === svc.id ? "rotate(180deg)" : "none",
          }}
        >
          ▾
        </span>
      </button>
      {expanded === svc.id && (
        <div
          style={{
            padding: "14px 18px 18px",
            borderTop: "1px solid var(--line)",
            background: "rgba(0,0,0,0.25)",
            animation: "fadeUp .25s",
          }}
        >
          <Ey style={{ marginBottom: 6 }}>What&rsquo;s included</Ey>
          <div
            style={{
              fontSize: 12.5,
              color: "var(--bone-2)",
              lineHeight: 1.55,
              marginBottom: 14,
            }}
          >
            {svc.detail}
          </div>
          <Ey style={{ marginBottom: 6 }}>Materials</Ey>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginBottom: 14,
            }}
          >
            {svc.materials.map((m) => (
              <span
                key={m}
                style={{
                  padding: "4px 9px",
                  border: "1px solid var(--line)",
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  color: "var(--bone-2)",
                  letterSpacing: ".05em",
                }}
              >
                {m}
              </span>
            ))}
          </div>
          <Ey style={{ marginBottom: 6 }}>Warranty</Ey>
          <div style={{ fontSize: 12.5, color: "var(--bone-2)" }}>
            {svc.warranty}
          </div>
        </div>
      )}
    </div>
  );
};

const BundleCard = ({ bundle, tier, picked, onApply }) => {
  const services = bundle.services
    .map((id) => SERVICE_CATALOG.find((s) => s.id === id))
    .filter(Boolean);
  const sumLo = services.reduce((a, s) => a + tierPrice(s, tier)[0], 0);
  const savedLo = Math.round((sumLo * bundle.discount) / 50) * 50;
  const fullyPicked = bundle.services.every((id) => picked.includes(id));
  return (
    <div
      style={{
        background: fullyPicked
          ? "rgba(201,169,97,0.06)"
          : "var(--ink-2)",
        border:
          "1px solid " + (fullyPicked ? "var(--accent)" : "var(--line)"),
        padding: 18,
        marginBottom: 10,
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 10,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 6,
            }}
          >
            <span
              style={{
                padding: "3px 8px",
                background: "var(--accent)",
                color: "var(--ink)",
                fontFamily: "var(--mono)",
                fontSize: 9,
                letterSpacing: ".14em",
                textTransform: "uppercase",
              }}
            >
              {bundle.badge}
            </span>
            {fullyPicked && (
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 9,
                  color: "var(--accent)",
                  letterSpacing: ".14em",
                }}
              >
                ✓ APPLIED
              </span>
            )}
          </div>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: 20,
              color: "var(--bone)",
            }}
          >
            {bundle.name}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "var(--bone-2)",
              marginTop: 4,
              lineHeight: 1.4,
            }}
          >
            {bundle.desc}
          </div>
        </div>
        <div
          style={{ textAlign: "right", flexShrink: 0, marginLeft: 14 }}
        >
          <Ey style={{ color: "var(--accent)" }}>Save</Ey>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: 18,
              color: "var(--accent)",
              lineHeight: 1,
            }}
          >
            ${savedLo.toLocaleString()}+
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          marginBottom: 12,
        }}
      >
        {services.map((s) => (
          <span
            key={s.id}
            style={{
              padding: "3px 8px",
              border: "1px solid var(--line)",
              fontFamily: "var(--mono)",
              fontSize: 9.5,
              color: "var(--bone-2)",
              letterSpacing: ".06em",
            }}
          >
            {s.title.replace(/^[^·]*·\s*/, "")}
          </span>
        ))}
      </div>
      {!fullyPicked && (
        <button
          onClick={() => onApply(bundle.services)}
          style={{
            width: "100%",
            padding: "11px 14px",
            background: "transparent",
            border: "1px solid var(--accent)",
            color: "var(--accent)",
            fontFamily: "var(--mono)",
            fontSize: 10.5,
            letterSpacing: ".18em",
            textTransform: "uppercase",
          }}
        >
          Apply bundle →
        </button>
      )}
    </div>
  );
};

export default function BookServicePage() {
  const router = useRouter();
  const { booking, setBooking } = useBooking();
  const [tier, setTier] = useState(booking.tier || "sedan");
  const [picked, setPicked] = useState(booking.services || []);
  const [expanded, setExpanded] = useState(null);
  const [notes, setNotes] = useState(booking.notes || "");

  const toggle = (id) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const applyBundle = (ids) =>
    setPicked((p) => [...new Set([...p, ...ids])]);

  const pickedSvcs = SERVICE_CATALOG.filter((s) => picked.includes(s.id));
  const totalLo = pickedSvcs.reduce((a, s) => a + tierPrice(s, tier)[0], 0);
  const totalHi = pickedSvcs.reduce((a, s) => a + tierPrice(s, tier)[1], 0);

  const activeBundle = BUNDLES.find((b) =>
    b.services.every((id) => picked.includes(id))
  );
  const bundleDiscount = activeBundle
    ? Math.round(((totalLo + totalHi) / 2 * activeBundle.discount) / 50) * 50
    : 0;
  const comboDiscount =
    !activeBundle && picked.length >= 2
      ? Math.round(((totalLo + totalHi) / 2 * 0.1) / 50) * 50
      : 0;
  const totalDiscount = bundleDiscount + comboDiscount;
  const finalMid = Math.round((totalLo + totalHi) / 2 - totalDiscount);

  return (
    <Screen title="The Service" noTab>
      <Progress step={2} />
      <div className="container-narrow" style={{ paddingTop: 8 }}>
        <Ey>Step 02 of 04</Ey>
        <SH
          size="clamp(28px, 3.4vw, 40px)"
          style={{ marginTop: 6, marginBottom: 4 }}
        >
          Build your service.
        </SH>
        <div
          style={{
            fontSize: "clamp(12.5px, 1.05vw, 15px)",
            color: "var(--mute)",
            marginBottom: 20,
            lineHeight: 1.55,
          }}
        >
          Tell us your vehicle size for accurate pricing. Add services
          individually or apply a curated bundle.
        </div>
      </div>

      {/* Vehicle tier picker */}
      <div className="container-narrow" style={{ paddingBottom: 22 }}>
        <VehicleTierPicker tier={tier} onChange={setTier} />
      </div>

      {/* Bundles */}
      <div className="container-narrow" style={{ paddingBottom: 8 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 12,
          }}
        >
          <Ey style={{ color: "var(--accent)" }}>
            Curated bundles · save 12–18%
          </Ey>
          <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
        </div>
        {BUNDLES.map((b) => (
          <BundleCard
            key={b.id}
            bundle={b}
            tier={tier}
            picked={picked}
            onApply={applyBundle}
          />
        ))}
      </div>

      {/* À la carte */}
      <div
        className="container-narrow"
        style={{ paddingTop: 16, paddingBottom: 8 }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 12,
          }}
        >
          <Ey>Or build it à la carte</Ey>
          <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
        </div>
        {SERVICE_CATALOG.map((s) => (
          <ServiceCard
            key={s.id}
            svc={s}
            tier={tier}
            picked={picked}
            onToggle={toggle}
            expanded={expanded}
            onExpand={setExpanded}
          />
        ))}
      </div>

      {/* Notes */}
      <div
        className="container-narrow"
        style={{ paddingTop: 16, paddingBottom: 24 }}
      >
        <Ey style={{ marginBottom: 8 }}>Notes for the studio (optional)</Ey>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Color direction, inspiration photos, drop-off preferences, timing requests…"
          style={{
            width: "100%",
            padding: 14,
            background: "var(--ink-2)",
            border: "1px solid var(--line)",
            color: "var(--bone)",
            fontFamily: "var(--sans)",
            fontSize: 14,
            resize: "none",
            lineHeight: 1.5,
          }}
        />
      </div>

      {/* Sticky bottom estimate bar — full-width with content centered */}
      <div
        style={{
          borderTop: "1px solid var(--line)",
          background: "var(--ink-2)",
          position: "sticky",
          bottom: 0,
          zIndex: 5,
        }}
      >
       <div
         className="container-narrow"
         style={{ paddingTop: 18, paddingBottom: 18 }}
       >
        {picked.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: "var(--mute)",
                lineHeight: 1.4,
              }}
            >
              Select a service or bundle
              <br />
              to see your estimate.
            </div>
            <GBtn disabled>Continue →</GBtn>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 12,
              }}
            >
              <div>
                <Ey>
                  Estimate · {picked.length} service{picked.length > 1 ? "s" : ""}
                </Ey>
                <div
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: 24,
                    color: "var(--bone)",
                    marginTop: 2,
                  }}
                >
                  ${(totalLo - totalDiscount).toLocaleString()} – $
                  {(totalHi - totalDiscount).toLocaleString()}
                </div>
                {activeBundle && (
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--accent)",
                      fontFamily: "var(--mono)",
                      letterSpacing: ".1em",
                      marginTop: 4,
                    }}
                  >
                    {activeBundle.name.toUpperCase()} · −$
                    {bundleDiscount.toLocaleString()}
                  </div>
                )}
                {!activeBundle && comboDiscount > 0 && (
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--accent)",
                      fontFamily: "var(--mono)",
                      letterSpacing: ".1em",
                      marginTop: 4,
                    }}
                  >
                    COMBO RATE · −${comboDiscount.toLocaleString()}
                  </div>
                )}
              </div>
              <GBtn
                onClick={() => {
                  setBooking({
                    tier,
                    services: picked,
                    notes,
                    total: finalMid,
                  });
                  router.push("/book/date");
                }}
              >
                Continue →
              </GBtn>
            </div>
            <div
              style={{
                fontSize: 10.5,
                color: "var(--mute)",
                fontFamily: "var(--mono)",
                letterSpacing: ".1em",
                textAlign: "center",
                paddingTop: 8,
                borderTop: "1px solid var(--line)",
              }}
            >
              FINAL QUOTE LOCKED IN AT INTAKE · NO SURPRISES
            </div>
          </>
        )}
        </div>
      </div>
    </Screen>
  );
}
