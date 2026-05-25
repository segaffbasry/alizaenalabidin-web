"use client";

import { useActionState, useEffect, useRef } from "react";
import { subscribeNewsletter } from "@/lib/actions";

const initialState = { success: false, message: "" };

export function NewsletterForm({ variant = "default" }: { variant?: "default" | "red" }) {
  const [state, action, pending] = useActionState(subscribeNewsletter, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const isRed = variant === "red";

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state.success]);

  return (
    <form ref={formRef} action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label style={{ fontFamily: "'General Sans Variable', sans-serif", fontWeight: 400, fontSize: 16, color: isRed ? "rgba(255,255,255,0.7)" : "rgb(0,0,0)" }}>
          Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Full name"
          required
          className="w-full h-11 px-4 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#6B8F8E]/40"
          style={{ fontFamily: "'General Sans', sans-serif", fontWeight: 500, fontSize: 15, color: "rgb(38,38,38)" }}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label style={{ fontFamily: "'General Sans Variable', sans-serif", fontWeight: 400, fontSize: 16, color: isRed ? "rgba(255,255,255,0.7)" : "rgb(0,0,0)" }}>
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          required
          className="w-full h-11 px-4 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#6B8F8E]/40"
          style={{ fontFamily: "'General Sans', sans-serif", fontWeight: 500, fontSize: 15, color: "rgb(38,38,38)" }}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full h-11 rounded-lg text-white transition-colors bg-[#6B8F8E] hover:bg-[#5a7978] disabled:opacity-60"
        style={{ fontFamily: "'General Sans', sans-serif", fontWeight: 500, fontSize: 15 }}
      >
        {pending ? "Submitting…" : "Submit"}
      </button>

      {state.message && (
        <p
          style={{
            fontFamily: "'General Sans', sans-serif",
            fontSize: 14,
            color: state.success ? "#4a7c59" : "#c0392b",
          }}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
