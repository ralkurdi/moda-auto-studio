"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Ey, SH, GBtn, Progress } from "../../_lib/design";
import { Screen } from "../../_components/screen-shell";
import { useBooking } from "../../_lib/booking-context";

const SLOTS = [
  { t: "9:00 AM", kind: "Appointment" },
  { t: "11:00 AM", kind: "Appointment" },
  { t: "1:30 PM", kind: "Appointment" },
  { t: "4:00 PM", kind: "Consultation" },
];

const fmt = (d) =>
  d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

// Compute the 28-day rolling window starting today.
// Wrapped in useState/useEffect so server and client render the same initial
// HTML (empty grid) and then the client populates dates after mount —
// avoiding hydration mismatch on `new Date()`.
//
// SHELVED: Cal.com embed implementation lives at ./_archived/cal-embed.jsx.
// Blocked on Cal.com's "Redirect on Success" being Pro-only — without it
// the bookingSuccessful callback can't intercept the flow and route the
// user back to our /book/confirm. Re-enable by replacing the contents of
// this file with that one and bumping the Cal plan.
export default function BookDatePage() {
  const router = useRouter();
  const { booking, setBooking } = useBooking();
  const [date, setDate] = useState(booking.date || null);
  const [slot, setSlot] = useState(booking.slot || null);
  const [today, setToday] = useState(null);

  useEffect(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    setToday(t);
  }, []);

  const days = useMemo(() => {
    if (!today) return [];
    const arr = [];
    for (let i = 0; i < 28; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dow = d.getDay();
      const closed = dow === 0;
      arr.push({ d, closed });
    }
    return arr;
  }, [today]);

  const monthLabel = useMemo(() => {
    if (!days.length) return "";
    const first = days[0].d;
    const last = days[days.length - 1].d;
    const m0 = first.toLocaleDateString("en-US", { month: "long" });
    const mn = last.toLocaleDateString("en-US", { month: "long" });
    const yn = last.getFullYear();
    return m0 === mn ? `${m0} ${yn}` : `${m0} — ${mn} ${yn}`;
  }, [days]);

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
            {monthLabel || " "}
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
            const disabled = x.closed;
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
