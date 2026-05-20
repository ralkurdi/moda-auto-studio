"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cal, { getCalApi } from "@calcom/embed-react";
import { Ey, SH, Progress } from "../../_lib/design";
import { Screen } from "../../_components/screen-shell";
import { useBooking } from "../../_lib/booking-context";

const CAL_USERNAME = process.env.NEXT_PUBLIC_CAL_USERNAME || "modaautostudio";

const EVENT_TYPES = [
  {
    slug: "appointment",
    label: "Appointment",
    kind: "Appointment",
    desc: "Drop-off for installation work. 60-minute intake; the install spans days.",
  },
  {
    slug: "consultation",
    label: "Consultation",
    kind: "Consultation",
    desc: "Complimentary 45-minute walkthrough of paint condition, service options, and timing.",
  },
];

const fmtSlotTime = (iso) => {
  try {
    return new Date(iso).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/Los_Angeles",
    });
  } catch {
    return "";
  }
};

export default function BookDatePage() {
  const router = useRouter();
  const { setBooking } = useBooking();
  const [eventType, setEventType] = useState(null);
  const [embedReady, setEmbedReady] = useState(false);

  // Register the booking-success listener once on mount. The Cal.com SDK
  // fires bookingSuccessful when a slot is locked in on Cal's side; we
  // capture the date/slot/email and hand off to /book/confirm.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cal = await getCalApi();
      if (cancelled) return;
      // Theme inheritance from our dark UI.
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          dark: { "cal-brand": "#C9A961" },
        },
      });
      const handleBooking = (evt) => {
        // Log everything so we can inspect the actual schema in DevTools
        console.log("[cal] booking event:", evt);
        const data = evt?.detail?.data || evt?.data || {};
        const start =
          data.booking?.startTime ||
          data.startTime ||
          data.date ||
          data.fromTime ||
          null;
        const attendee =
          data.booking?.attendees?.[0] ||
          data.attendees?.[0] ||
          data.attendee ||
          {};
        const kind = eventType?.kind || "Appointment";

        if (!start) {
          console.error("[cal] booking event with no start time:", data);
          return;
        }

        setBooking({
          date: new Date(start),
          slot: { t: fmtSlotTime(start), kind },
          cal_booking_uid: data.booking?.uid || data.uid || null,
          ...(attendee?.email ? { email: attendee.email } : {}),
          ...(attendee?.name ? { client_name: attendee.name } : {}),
        });

        router.push("/book/confirm");
      };

      // Cal.com fires bookingSuccessful on legacy events and
      // bookingSuccessfulV2 on newer ones. Listen for both.
      cal("on", { action: "bookingSuccessful", callback: handleBooking });
      cal("on", { action: "bookingSuccessfulV2", callback: handleBooking });

      // Also log link readiness for debug
      cal("on", {
        action: "linkReady",
        callback: () => console.log("[cal] linkReady"),
      });
      cal("on", {
        action: "linkFailed",
        callback: (e) => console.error("[cal] linkFailed:", e?.detail),
      });
      setEmbedReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [eventType, router, setBooking]);

  return (
    <Screen title="Pick a Window" noTab>
      <Progress step={3} />

      <div className="container-narrow" style={{ paddingTop: 8 }}>
        <Ey>Step 03 of 04</Ey>
        <SH
          size="clamp(30px, 3.6vw, 44px)"
          style={{ marginTop: 6, marginBottom: 16 }}
        >
          {eventType ? eventType.label.toLowerCase() + " window." : "Pick a window."}
        </SH>

        {!eventType ? (
          <>
            <div
              style={{
                fontSize: "clamp(13px, 1.1vw, 15px)",
                color: "var(--bone-2)",
                marginBottom: "clamp(20px, 3vw, 36px)",
                lineHeight: 1.55,
                maxWidth: 560,
              }}
            >
              Choose what kind of visit. We'll show you live availability.
            </div>
            <div
              className="grid-2"
              style={{ marginBottom: "clamp(24px, 3vw, 40px)" }}
            >
              {EVENT_TYPES.map((t) => (
                <button
                  key={t.slug}
                  onClick={() => setEventType(t)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "clamp(20px, 2.5vw, 32px)",
                    background: "var(--ink-2)",
                    border: "1px solid var(--line)",
                    color: "inherit",
                    cursor: "pointer",
                    transition: "border-color .15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--line)";
                  }}
                >
                  <Ey style={{ color: "var(--accent)" }}>{t.label}</Ey>
                  <div
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: "clamp(18px, 1.8vw, 24px)",
                      marginTop: 8,
                      lineHeight: 1.2,
                    }}
                  >
                    {t.slug === "appointment"
                      ? "Drop the car off."
                      : "Walk through scope."}
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(12px, 1vw, 14px)",
                      color: "var(--mute)",
                      marginTop: 10,
                      lineHeight: 1.6,
                    }}
                  >
                    {t.desc}
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => setEventType(null)}
              style={{
                marginBottom: "clamp(16px, 2vw, 24px)",
                background: "transparent",
                color: "var(--mute)",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                cursor: "pointer",
                padding: 0,
              }}
            >
              ← Change visit type
            </button>

            <div
              style={{
                width: "100%",
                minHeight: 640,
                border: "1px solid var(--line)",
                background: "var(--ink-2)",
                overflow: "hidden",
              }}
            >
              {embedReady ? (
                <Cal
                  namespace="moda-booking"
                  calLink={`${CAL_USERNAME}/${eventType.slug}`}
                  style={{
                    width: "100%",
                    height: "640px",
                    overflow: "scroll",
                  }}
                  config={{
                    layout: "month_view",
                    theme: "dark",
                  }}
                />
              ) : (
                <div
                  style={{
                    padding: 32,
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "var(--mute)",
                    textAlign: "center",
                  }}
                >
                  Loading availability…
                </div>
              )}
            </div>

            <div
              style={{
                marginTop: "clamp(16px, 2vw, 24px)",
                padding: "14px 16px",
                background: "var(--ink-2)",
                border: "1px solid var(--line)",
                fontSize: "clamp(11px, 1vw, 13px)",
                color: "var(--bone-2)",
                lineHeight: 1.55,
              }}
            >
              Pick any open slot above. After you book, you'll be taken to
              confirm your phone number and any service notes before we lock
              the bay.
            </div>
          </>
        )}
      </div>

      <div
        className="container-narrow"
        style={{ paddingTop: "clamp(20px, 2vw, 32px)", paddingBottom: "clamp(22px, 3vw, 40px)" }}
      />
    </Screen>
  );
}
