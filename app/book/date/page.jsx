"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ey, SH, GBtn, Progress } from "../../_lib/design";
import { Screen } from "../../_components/screen-shell";
import { useBooking } from "../../_lib/booking-context";

const SLOTS = [
  { t: "9:00 AM", kind: "Intake" },
  { t: "11:00 AM", kind: "Intake" },
  { t: "1:30 PM", kind: "Consultation" },
  { t: "4:00 PM", kind: "Pickup slot" },
];

const fmt = (d) =>
  d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

export default function BookDatePage() {
  const router = useRouter();
  const { booking, setBooking } = useBooking();
  const [date, setDate] = useState(booking.date || null);
  const [slot, setSlot] = useState(booking.slot || null);

  const start = new Date("2026-04-27");
  const days = [];
  for (let i = 0; i < 28; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const dow = d.getDay();
    const closed = dow === 0;
    const busy = [2, 3, 4, 9, 10, 15, 16, 17].includes(i);
    days.push({ d, closed, busy });
  }

  return (
    <Screen title="Pick a Window" noTab>
      <Progress step={3} />
      <div className="container-narrow" style={{ paddingTop: 8 }}>
        <Ey>Step 03 of 04</Ey>
        <SH
          size="clamp(30px, 3.6vw, 44px)"
          style={{ marginTop: 6, marginBottom: 16 }}
        >
          Live bay availability.
        </SH>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <div style={{ fontFamily: "var(--serif)", fontSize: 22 }}>
            April — May 2026
          </div>
          <Ey>Bay 01 · Wrap</Ey>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7,1fr)",
            gap: 4,
          }}
        >
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                fontFamily: "var(--mono)",
                fontSize: 10,
                color: "var(--mute)",
                padding: "4px 0",
              }}
            >
              {d}
            </div>
          ))}
          <div />
          {days.map((x, i) => {
            const isPicked =
              date && x.d.toDateString() === date.toDateString();
            const disabled = x.closed || x.busy;
            return (
              <button
                key={i}
                onClick={() => !disabled && setDate(x.d)}
                style={{
                  aspectRatio: "1",
                  background: isPicked ? "var(--accent)" : "transparent",
                  border:
                    "1px solid " +
                    (isPicked ? "var(--accent)" : "var(--line)"),
                  color: isPicked
                    ? "var(--ink)"
                    : disabled
                    ? "var(--mute)"
                    : "var(--bone)",
                  fontFamily: "var(--serif)",
                  fontSize: 16,
                  opacity: disabled ? 0.45 : 1,
                  position: "relative",
                }}
              >
                {x.d.getDate()}
                {x.busy && !isPicked && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: 4,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 4,
                      height: 4,
                      borderRadius: 2,
                      background: "var(--accent-deep)",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            gap: 14,
            marginTop: 12,
            fontFamily: "var(--mono)",
            fontSize: 9.5,
            color: "var(--mute)",
            letterSpacing: ".12em",
            textTransform: "uppercase",
          }}
        >
          <span>
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                background: "var(--accent)",
                marginRight: 6,
              }}
            />
            Available
          </span>
          <span>
            <span
              style={{
                display: "inline-block",
                width: 4,
                height: 4,
                background: "var(--accent-deep)",
                marginRight: 6,
                borderRadius: 2,
              }}
            />
            Limited
          </span>
          <span>Sun closed</span>
        </div>
      </div>
      {date && (
        <div className="container-narrow" style={{ paddingTop: 20, paddingBottom: 20 }}>
          <Ey>Times · {fmt(date)}</Ey>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
              marginTop: 10,
            }}
          >
            {SLOTS.map((s) => (
              <button
                key={s.t}
                onClick={() => setSlot(s)}
                style={{
                  padding: 14,
                  textAlign: "left",
                  background:
                    slot && slot.t === s.t ? "var(--ink-2)" : "transparent",
                  border:
                    "1px solid " +
                    (slot && slot.t === s.t
                      ? "var(--accent)"
                      : "var(--line)"),
                  color: "inherit",
                }}
              >
                <div style={{ fontFamily: "var(--serif)", fontSize: 18 }}>
                  {s.t}
                </div>
                <Ey style={{ marginTop: 4 }}>{s.kind}</Ey>
              </button>
            ))}
          </div>
        </div>
      )}
      <div
        className="container-narrow"
        style={{
          paddingTop: "clamp(16px, 2vw, 24px)",
          paddingBottom: "clamp(22px, 3vw, 40px)",
        }}
      >
        <GBtn
          style={{ width: "100%" }}
          disabled={!(date && slot)}
          onClick={() => {
            setBooking({ date, slot });
            router.push("/book/confirm");
          }}
        >
          Continue →
        </GBtn>
      </div>
    </Screen>
  );
}
