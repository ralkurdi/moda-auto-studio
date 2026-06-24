"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ey, SH, GBtn, Crest, Ph } from "../_lib/design";
import { Screen } from "../_components/screen-shell";

const CERTS = [
  ["3M Authorized Installer", "PPF"],
  ["3M Ceramic IR Specialist", "Tint"],
  ["IDA Member", "Detailing"],
  ["3M 2080 Specialist", "Vinyl"],
];

const CONTACT = [
  ["Studio", "52 S Linden Ave #2, South SF 94080"],
  ["Hours", "Mon–Sat · 9–6 · by appointment"],
  ["Phone", "(415) 555-0192"],
  ["Email", "book@modaautostudio.com"],
  ["Instagram", "@modaautostudio"],
];

const SERVICE_INTEREST_OPTIONS = [
  "Vinyl wrap",
  "Paint Protection Film",
  "Window tinting",
  "Ceramic coating + paint correction",
  "Chrome delete",
  "Custom decals",
  "Fleet graphics",
  "Not sure / multiple",
];

const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=52+S+Linden+Ave+%232,+South+San+Francisco,+CA+94080&output=embed";

// Local form helpers — kept inline since /about is the only consumer.
function FormField({
  label,
  required,
  value,
  onChange,
  placeholder,
  type = "text",
  inputMode,
  fontFamily = "var(--serif)",
  autoComplete,
  invalid,
}) {
  return (
    <label style={{ display: "block" }}>
      <Ey style={{ marginBottom: 8 }}>
        {label}
        {required ? "" : ""}
      </Ey>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        style={{
          width: "100%",
          height: 48,
          padding: "0 14px",
          background: "var(--ink-2)",
          border: "1px solid " + (invalid ? "var(--accent-deep)" : "var(--line)"),
          color: "var(--bone)",
          fontFamily,
          fontSize: fontFamily === "var(--mono)" ? 14 : 16,
        }}
      />
    </label>
  );
}

function SelectField({ label, value, onChange, options, placeholder }) {
  return (
    <label style={{ display: "block" }}>
      <Ey style={{ marginBottom: 8 }}>{label}</Ey>
      <div style={{ position: "relative" }}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: "100%",
            height: 48,
            padding: "0 14px",
            background: "var(--ink-2)",
            border:
              "1px solid " + (value ? "var(--accent)" : "var(--line)"),
            color: value ? "var(--bone)" : "var(--mute)",
            fontFamily: "var(--serif)",
            fontSize: 16,
            appearance: "none",
          }}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span
          style={{
            position: "absolute",
            right: 14,
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--accent)",
            pointerEvents: "none",
          }}
        >
          ▾
        </span>
      </div>
    </label>
  );
}

export default function AboutPage() {
  const router = useRouter();

  // Contact form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);

  const phoneValid = phone.replace(/\D/g, "").length >= 10;
  const valid =
    name.trim().length >= 2 && phoneValid && message.trim().length >= 4;

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    if (!valid || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/consultations/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: name,
          client_phone: phone,
          client_email: email || null,
          vehicle: vehicle || null,
          service_interest: interest || null,
          notes: message,
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Couldn't send your message.");
      setSent(true);
    } catch (err) {
      setError(err.message || "Network error. Try again.");
      setLoading(false);
    }
  };

  return (
    <Screen title="The Studio">
      {/* Hero photo strip — full bleed on mobile, contained but tall on desktop */}
      <section style={{ position: "relative", flexShrink: 0 }}>
        <Ph
          h="clamp(260px, 45vh, 540px)"
          label="Studio · South San Francisco"
        />
        <div
          className="container"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            paddingBottom: 0,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              background: "var(--ink)",
              border: "1px solid var(--line)",
              padding: "clamp(10px, 1.2vw, 16px)",
              transform: "translateY(50%)",
              pointerEvents: "auto",
            }}
          >
            <Crest size={76} />
          </div>
        </div>
      </section>

      <section
        className="container-narrow"
        style={{
          paddingTop: "clamp(48px, 6vw, 96px)",
          paddingBottom: "clamp(36px, 5vw, 80px)",
        }}
      >
        <SH size="clamp(40px, 5vw, 64px)" style={{ marginTop: 8 }}>
          A garage, quieter.
        </SH>
        <div
          style={{
            fontSize: "clamp(14px, 1.2vw, 17px)",
            color: "var(--bone-2)",
            marginTop: 16,
            lineHeight: 1.6,
          }}
        >
          MODA is a two-person studio in South San Francisco. We built it
          because we were tired of rushed installs in dusty back lots — we
          wanted a climate-controlled space, the right tools, and enough time
          per car to finish edges the way our hands actually wanted to finish
          them.
        </div>
        <div
          style={{
            fontSize: "clamp(14px, 1.2vw, 17px)",
            color: "var(--bone-2)",
            marginTop: 14,
            lineHeight: 1.6,
          }}
        >
          One car in, one car out. Appointments only. Coffee always.
        </div>
        <div
          className="grid-4"
          style={{ marginTop: "clamp(28px, 4vw, 56px)" }}
        >
          {CERTS.map(([cert, cat]) => (
            <div
              key={cert}
              style={{
                border: "1px solid var(--line)",
                padding: "clamp(14px, 1.6vw, 22px)",
                background: "var(--ink-2)",
              }}
            >
              <Ey style={{ color: "var(--accent)" }}>{cat}</Ey>
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(16px, 1.4vw, 19px)",
                  marginTop: 6,
                }}
              >
                {cert}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "clamp(28px, 4vw, 56px)" }}>
          <Ey>Contact</Ey>
          {CONTACT.map(([k, v], i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "100px 1fr",
                padding: "clamp(12px, 1.4vw, 18px) 0",
                borderBottom: "1px solid var(--line)",
                gap: 16,
              }}
            >
              <Ey>{k}</Ey>
              <div style={{ fontSize: "clamp(14px, 1.15vw, 16px)" }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Map */}
        <div style={{ marginTop: "clamp(20px, 2.5vw, 36px)" }}>
          <iframe
            src={MAP_EMBED_SRC}
            title="MODA Auto Studio — 52 S Linden Ave #2, South San Francisco"
            style={{
              width: "100%",
              height: "clamp(260px, 38vw, 380px)",
              border: "1px solid var(--line)",
              filter: "grayscale(0.4) brightness(0.85)",
            }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Contact form */}
        <div style={{ marginTop: "clamp(40px, 5vw, 72px)" }}>
          {sent ? (
            <div
              style={{
                padding: "clamp(28px, 4vw, 48px)",
                border: "1px solid var(--accent)",
                background: "rgba(201,169,97,0.04)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  border: "1px solid var(--accent)",
                  color: "var(--accent)",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: 26,
                }}
              >
                ✓
              </div>
              <SH
                size="clamp(22px, 2.4vw, 30px)"
                style={{ marginTop: 16 }}
              >
                Message received.
              </SH>
              <div
                style={{
                  fontSize: "clamp(13px, 1.1vw, 15px)",
                  color: "var(--bone-2)",
                  marginTop: 10,
                  lineHeight: 1.55,
                }}
              >
                We&rsquo;ll reach out within 24 hours.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <Ey>Get in touch</Ey>
              <SH
                size="clamp(26px, 3vw, 36px)"
                style={{ marginTop: 8, marginBottom: "clamp(18px, 2.5vw, 28px)" }}
              >
                Send us a message.
              </SH>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "clamp(10px, 1.5vw, 16px)",
                  marginBottom: "clamp(12px, 1.5vw, 18px)",
                }}
              >
                <FormField
                  label="Name"
                  required
                  value={name}
                  onChange={setName}
                  placeholder="Your name"
                  fontFamily="var(--serif)"
                  autoComplete="name"
                />
                <FormField
                  label="Phone"
                  required
                  value={phone}
                  onChange={setPhone}
                  placeholder="(415) 555-0123"
                  inputMode="tel"
                  fontFamily="var(--mono)"
                  autoComplete="tel"
                  invalid={phone.length > 0 && !phoneValid}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "clamp(10px, 1.5vw, 16px)",
                  marginBottom: "clamp(12px, 1.5vw, 18px)",
                }}
              >
                <FormField
                  label="Email (optional)"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="you@email.com"
                  inputMode="email"
                  fontFamily="var(--mono)"
                  autoComplete="email"
                />
                <FormField
                  label="Vehicle (optional)"
                  value={vehicle}
                  onChange={setVehicle}
                  placeholder="e.g. 2024 BMW M4"
                  fontFamily="var(--serif)"
                />
              </div>

              <SelectField
                label="What you're interested in (optional)"
                value={interest}
                onChange={setInterest}
                options={SERVICE_INTEREST_OPTIONS}
                placeholder="Choose a service"
              />

              <label style={{ display: "block", marginTop: "clamp(12px, 1.5vw, 18px)" }}>
                <Ey style={{ marginBottom: 8 }}>Message</Ey>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  placeholder="Tell us about your car and what you're after — color direction, timing, questions…"
                  style={{
                    width: "100%",
                    padding: 14,
                    background: "var(--ink-2)",
                    border: "1px solid var(--line)",
                    color: "var(--bone)",
                    fontFamily: "var(--sans)",
                    fontSize: 14,
                    resize: "vertical",
                    minHeight: 120,
                    lineHeight: 1.55,
                  }}
                />
              </label>

              {error && (
                <div
                  style={{
                    marginTop: 14,
                    padding: "12px 14px",
                    border: "1px solid var(--accent-deep)",
                    background: "rgba(140, 107, 47, 0.12)",
                    color: "var(--bone)",
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    letterSpacing: ".08em",
                    lineHeight: 1.5,
                  }}
                >
                  {error}
                </div>
              )}

              <GBtn
                style={{ width: "100%", marginTop: "clamp(18px, 2.5vw, 28px)" }}
                disabled={!valid || loading}
                onClick={handleSubmit}
              >
                {loading ? "Sending…" : "Send message"}
              </GBtn>
              <div
                style={{
                  textAlign: "center",
                  fontSize: 10.5,
                  color: "var(--mute)",
                  marginTop: 10,
                  fontFamily: "var(--mono)",
                  letterSpacing: ".14em",
                }}
              >
                WE READ EVERY MESSAGE · 24-HOUR REPLY
              </div>
            </form>
          )}
        </div>

        <GBtn
          style={{ width: "100%", marginTop: "clamp(40px, 5vw, 72px)" }}
          onClick={() => router.push("/book")}
        >
          Book your fitting
        </GBtn>
        <GBtn
          v="ghost"
          style={{ width: "100%", marginTop: 10 }}
          onClick={() => router.push("/reviews")}
        >
          Read all reviews
        </GBtn>
      </section>
    </Screen>
  );
}
