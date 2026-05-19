"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ey, SH, GBtn, Progress } from "../../_lib/design";
import { Screen } from "../../_components/screen-shell";
import { useBooking } from "../../_lib/booking-context";

const MAKES = [
  "Porsche",
  "BMW",
  "Audi",
  "Tesla",
  "Mercedes-Benz",
  "Lucid",
  "Ferrari",
  "Lamborghini",
  "McLaren",
  "Lexus",
  "Honda",
  "Toyota",
];

const MODELS = {
  Porsche: ["911 Carrera", "911 GT3", "Taycan", "Cayenne GTS", "Macan"],
  BMW: ["M3", "M4", "M5", "i4 M50", "X5M"],
  Audi: ["RS6", "RS7", "R8", "E-tron GT"],
  Tesla: ["Model S Plaid", "Model 3", "Model Y", "Cybertruck"],
  "Mercedes-Benz": ["C63 AMG", "E63 AMG", "G63 AMG", "EQS"],
  Lucid: ["Air Pure", "Air Touring", "Air GT"],
  Ferrari: ["296 GTB", "SF90", "Roma"],
  Lamborghini: ["Huracán", "Urus"],
  McLaren: ["720S", "Artura"],
  Lexus: ["LC500", "RC F", "IS500"],
  Honda: ["Civic Type R", "S2000"],
  Toyota: ["Supra", "GR86"],
};

const YEARS = ["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"];

const SelField = ({ label, value, onChange, options, placeholder }) => (
  <label style={{ display: "block", marginBottom: 14 }}>
    <Ey style={{ marginBottom: 6 }}>{label}</Ey>
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          height: 52,
          padding: "0 14px",
          background: "var(--ink-2)",
          border:
            "1px solid " + (value ? "var(--accent)" : "var(--line)"),
          color: value ? "var(--bone)" : "var(--mute)",
          fontFamily: "var(--serif)",
          fontSize: 18,
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

export default function BookVehiclePage() {
  const router = useRouter();
  const { booking, setBooking } = useBooking();
  const [year, setYear] = useState(booking.year || "");
  const [make, setMake] = useState(booking.make || "");
  const [model, setModel] = useState(booking.model || "");
  const [trim, setTrim] = useState(booking.trim || "");

  const valid = year && make && model;

  return (
    <Screen title="The Vehicle" noTab>
      <Progress step={1} />
      <div style={{ padding: "8px 22px" }}>
        <Ey>Step 01 of 04</Ey>
        <SH size={30} style={{ marginTop: 6, marginBottom: 22 }}>
          What are we fitting?
        </SH>
        <SelField
          label="Year"
          value={year}
          onChange={setYear}
          options={YEARS}
          placeholder="Select year"
        />
        <SelField
          label="Make"
          value={make}
          onChange={(v) => {
            setMake(v);
            setModel("");
          }}
          options={MAKES}
          placeholder="Select make"
        />
        <SelField
          label="Model"
          value={model}
          onChange={setModel}
          options={make ? MODELS[make] || [] : []}
          placeholder={make ? "Select model" : "Pick make first"}
        />
        <label style={{ display: "block", marginBottom: 14 }}>
          <Ey style={{ marginBottom: 6 }}>Trim / package (optional)</Ey>
          <input
            value={trim}
            onChange={(e) => setTrim(e.target.value)}
            placeholder="e.g. Competition xDrive"
            style={{
              width: "100%",
              height: 52,
              padding: "0 14px",
              background: "var(--ink-2)",
              border: "1px solid var(--line)",
              color: "var(--bone)",
              fontFamily: "var(--serif)",
              fontSize: 18,
            }}
          />
        </label>
        <div
          style={{
            padding: 14,
            background: "var(--ink-2)",
            border: "1px solid var(--line)",
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              border: "1px solid var(--accent)",
              color: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 18,
              flexShrink: 0,
            }}
          >
            i
          </div>
          <div
            style={{
              fontSize: 12.5,
              color: "var(--bone-2)",
              lineHeight: 1.5,
            }}
          >
            Have an exotic? Message us — some cars get a private intake outside
            business hours.
          </div>
        </div>
      </div>
      <div style={{ padding: 22 }}>
        <GBtn
          style={{ width: "100%" }}
          disabled={!valid}
          onClick={() => {
            setBooking({ year, make, model, trim });
            router.push("/book/service");
          }}
        >
          Continue →
        </GBtn>
      </div>
    </Screen>
  );
}
