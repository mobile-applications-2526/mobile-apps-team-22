import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://deno.land/x/resend/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

serve(async (req) => {
  const { name, email, message } = await req.json();

  try {
    const data = await resend.emails.send({
      from: "",
      to: "aaa@gmail.com",
      reply_to: email,
      subject: `New message from ${name}`,
      html: `<p>You have received a new message from your contact form.</p>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p>
             <p>${message}</p>`,
    });

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
