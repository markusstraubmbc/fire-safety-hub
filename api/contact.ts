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
  "re_ddWd1x8w_G5nyxe78Y5b6xgZoFSohPoZp";
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

/** Interner Empfaenger der Anfragen. */
const CONTACT_TO =
  (typeof process !== "undefined" && process.env?.CONTACT_TO) ||
  "markus@straub-it.de";

/**
 * Antwortadresse der Eingangsbestaetigung an den Absender. Bewusst die auf der
 * Website beworbene Adresse und nicht die Resend-Absenderdomain.
 */
const CONTACT_REPLY_TO =
  (typeof process !== "undefined" && process.env?.CONTACT_REPLY_TO) ||
  "kontakt@resqio.de";

/**
 * Grobe Plausibilitaetspruefung der Absenderadresse. Sie entscheidet nur
 * darueber, ob die Bestaetigungskopie ueberhaupt verschickt wird - die
 * eigentliche Anfrage an CONTACT_TO geht in jedem Fall raus.
 */
function isPlausibleEmail(value: string): boolean {
  return /^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/.test(value.trim());
}

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

  const confirmationHtml = `
    <h2>Ihre Anfrage bei RESQIO</h2>
    <p>Hallo ${safeName},</p>
    <p>
      vielen Dank für Ihre Anfrage über resqio.de. Wir haben sie erhalten und
      melden uns innerhalb von 24 Stunden bei Ihnen. Unten finden Sie eine Kopie
      Ihrer Nachricht.
    </p>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${safeName}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">E-Mail</td><td style="padding:8px;border-bottom:1px solid #eee;">${safeEmail}</td></tr>
      ${safePhone ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Telefon</td><td style="padding:8px;border-bottom:1px solid #eee;">${safePhone}</td></tr>` : ""}
      ${safeFeuerwehr ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Feuerwehr</td><td style="padding:8px;border-bottom:1px solid #eee;">${safeFeuerwehr}</td></tr>` : ""}
      <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Nachricht</td><td style="padding:8px;border-bottom:1px solid #eee;">${safeMessage}</td></tr>
    </table>
    <p style="color:#666;font-size:12px;">
      Diese E-Mail wurde automatisch erzeugt. Antworten Sie einfach darauf, wenn
      Sie etwas ergänzen möchten – sie erreicht uns unter ${CONTACT_REPLY_TO}.
    </p>
  `;

  const sendMail = (payload: Record<string, unknown>) =>
    fetch(RESEND_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

  try {
    const resendResponse = await sendMail({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      subject: `Neue Kontaktanfrage von ${safeName}`,
      reply_to: email,
      html: htmlContent,
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

    // Eingangsbestätigung an den Absender. Sie ist bewusst nachrangig: schlägt
    // sie fehl, bleibt die Anfrage trotzdem erfolgreich, denn die eigentliche
    // Benachrichtigung liegt dann schon im Postfach.
    let confirmationSent = false;
    if (isPlausibleEmail(email)) {
      try {
        const confirmationResponse = await sendMail({
          from: CONTACT_FROM,
          to: [email.trim()],
          subject: "Ihre Anfrage bei RESQIO",
          reply_to: CONTACT_REPLY_TO,
          html: confirmationHtml,
        });

        const confirmationData = await confirmationResponse.json();
        confirmationSent = confirmationResponse.ok;

        if (!confirmationResponse.ok) {
          console.error("Resend confirmation error:", JSON.stringify(confirmationData));
        } else {
          console.log("Resend confirmation success:", JSON.stringify(confirmationData));
        }
      } catch (confirmationErr) {
        console.error("Resend confirmation fetch error:", confirmationErr);
      }
    } else {
      console.warn("Keine Bestätigung verschickt: unplausible Absenderadresse.");
    }

    return Response.json({
      success: true,
      emailId: resendData?.id,
      confirmationSent,
    });
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
