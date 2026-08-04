export const config = {
  runtime: "edge",
};

/**
 * Resend-API-Key.
 *
 * Der Key steht auf ausdrücklichen Wunsch wieder direkt im Quelltext, damit das
 * Kontaktformular ohne gesetzte Umgebungsvariable funktioniert. Er ist über die
 * Git-Historie abrufbar und daher nicht geheim – wer das Repository lesen kann,
 * kann über dieses Konto Mails verschicken. Ist RESEND_API_KEY gesetzt, hat die
 * Variable Vorrang; damit lässt sich ein neu ausgestellter Key nachziehen, ohne
 * ihn hier einzutragen.
 */
const RESEND_API_KEY =
  (typeof process !== "undefined" && process.env?.RESEND_API_KEY) ||
  "re_bCqQgZJy_GAZv4Ti5xtpEEUsvxXwvU2kV";
const RESEND_URL = "https://api.resend.com/emails";

/**
 * Absenderadresse des Kontaktformulars. Resend verschickt nur von Domains, die
 * dort verifiziert sind – deshalb steht hier bewusst noch die alte .io-Adresse
 * als Default: sie funktioniert heute. Sobald resqio.de in Resend als
 * Sending Domain verifiziert ist, genügt die Umgebungsvariable
 * CONTACT_FROM="RESQIO Kontaktformular <kontakt@resqio.de>" – kein Code-Deploy.
 * Die auf der Website beworbene Adresse ist davon unabhängig kontakt@resqio.de.
 */
const CONTACT_FROM =
  (typeof process !== "undefined" && process.env?.CONTACT_FROM) ||
  "RESQIO Kontaktformular <kontakt@resqio.io>";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function handler(request: Request) {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, email, phone, message, feuerwehr } = body;

  if (!name || !email || !message) {
    return Response.json(
      { error: "Name, E-Mail und Nachricht sind Pflichtfelder." },
      { status: 400 }
    );
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = phone ? escapeHtml(phone) : "";
  const safeFeuerwehr = feuerwehr ? escapeHtml(feuerwehr) : "";
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  const htmlContent = `
    <h2>Neue Kontaktanfrage über resqio.de</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${safeName}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">E-Mail</td><td style="padding:8px;border-bottom:1px solid #eee;">${safeEmail}</td></tr>
      ${safePhone ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Telefon</td><td style="padding:8px;border-bottom:1px solid #eee;">${safePhone}</td></tr>` : ""}
      ${safeFeuerwehr ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Feuerwehr</td><td style="padding:8px;border-bottom:1px solid #eee;">${safeFeuerwehr}</td></tr>` : ""}
      <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Nachricht</td><td style="padding:8px;border-bottom:1px solid #eee;">${safeMessage}</td></tr>
    </table>
  `;

  try {
    const resendResponse = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: ["markus@straub-it.de"],
        subject: `Neue Kontaktanfrage von ${safeName}`,
        reply_to: email,
        html: htmlContent,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend API error:", JSON.stringify(resendData));
      return Response.json(
        {
          error: "E-Mail konnte nicht gesendet werden.",
          detail: resendData?.message || resendData?.name || `HTTP ${resendResponse.status}`,
        },
        { status: 422 }
      );
    }

    console.log("Resend success:", JSON.stringify(resendData));
    return Response.json({ success: true, emailId: resendData?.id });
  } catch (err) {
    console.error("Resend fetch error:", err);
    return Response.json(
      {
        error: "E-Mail konnte nicht gesendet werden.",
        detail: err instanceof Error ? err.message : "Netzwerkfehler",
      },
      { status: 500 }
    );
  }
}
