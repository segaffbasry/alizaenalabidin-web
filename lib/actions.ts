"use server";

import { createClient } from "@/lib/supabase/server";
import { sendEmail, subscriberWelcomeEmail } from "@/lib/email";

export async function subscribeNewsletter(
  _prev: { success: boolean; message: string } | null,
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();

  if (!name || !email) {
    return { success: false, message: "Please fill in all fields." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("subscribers")
      .upsert({ name, email }, { onConflict: "email" });

    if (error) throw error;

    // Fire-and-forget welcome email — never block or fail the subscription on it.
    const { subject, html } = subscriberWelcomeEmail(name);
    void sendEmail({ to: email, subject, html }).catch(() => {});

    return { success: true, message: "You're subscribed! Thank you." };
  } catch {
    return { success: false, message: "Something went wrong. Please try again." };
  }
}
