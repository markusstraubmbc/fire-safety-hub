import { Resend } from "resend";

export const config = {
  runtime: "nodejs",
};

const resend = new Resend("re_bCqQgZJy_GAZv4Ti5xtpEEUsvxXwvU2kV");

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  console.log("Contact API called, body type:", typeof req.body, "body:", JSON.stringify(req.body));

  const { name, email, phone, message, feuerwehr } = req.body || {};

  if (!name || !email || !message) {
    console.error("Missing required fields:", { name: !!name, email: !!email, message: !!message });
    return res.status(400).json({ error: "Name, E-Mail und Nachricht sind Pflichtfelder." });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = phone ? escapeHtml(phone) : "";
  const safeFeuerwehr = feuerwehr ? escapeHtml(feuerwehr) : "";
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  try {
    console.log("Sending email via Resend...");
    const { data, error } = await resend.emails.send({
      from: "RESQIO Kontaktformular <kontakt@resqio.io>",
      to: "markus@straub-it.de",
      subject: `Neue Kontaktanfrage von ${safeName}`,
      replyTo: email,
      html: `
        <h2>Neue Kontaktanfrage über resqio.de</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${safeName}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">E-Mail</td><td style="padding:8px;border-bottom:1px solid #eee;">${safeEmail}</td></tr>
          ${safePhone ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Telefon</td><td style="padding:8px;border-bottom:1px solid #eee;">${safePhone}</td></tr>` : ""}
          ${safeFeuerwehr ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Feuerwehr</td><td style="padding:8px;border-bottom:1px solid #eee;">${safeFeuerwehr}</td></tr>` : ""}
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Nachricht</td><td style="padding:8px;border-bottom:1px solid #eee;">${safeMessage}</td></tr>
        </table>
      `,
    });

    if (error) {
      console.error("Resend API error:", JSON.stringify(error));
      return res.status(422).json({
        error: "E-Mail konnte nicht gesendet werden.",
        detail: error.message || error.name || "Unbekannter Resend-Fehler",
      });
    }

    console.log("Resend success, email ID:", data?.id);
    return res.status(200).json({ success: true, emailId: data?.id });
  } catch (err) {
    console.error("Resend exception:", err);
    return res.status(500).json({
      error: "E-Mail konnte nicht gesendet werden.",
      detail: err instanceof Error ? err.message : "Unbekannter Fehler",
    });
  }
}
