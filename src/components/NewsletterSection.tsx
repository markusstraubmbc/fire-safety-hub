import { useEffect } from "react";

const BREVO_STYLESHEET_ID = "brevo-newsletter-stylesheet";
const BREVO_SCRIPT_ID = "brevo-newsletter-script";
const BREVO_FORM_ACTION =
  "https://fbf6fbd2.sibforms.com/serve/MUIFAC_LUp66QBasaWeIA8YzoBMyhNVw_k-mg2HhXOKKVq2duxH7Qp5DY7jp5vsLo17vcBpkjZAXatRZbshbLBGjmj3K9jue5yxpPUjiHNj85jdDe_258sPweotgdDlQnkz0wozU4LoXoNhq3lldvlrSgxlJDc-9O9jmSzgKDvp9XZSS_3cOxMlxhAgHB4kA11f1Ket0l4ukl4ZQXw==";

// Brevos main.js liest diese globalen Werte beim Laden aus, um die
// Formular-Validierungsmeldungen zu lokalisieren.
declare global {
  interface Window {
    REQUIRED_CODE_ERROR_MESSAGE?: string;
    LOCALE?: string;
    EMAIL_INVALID_MESSAGE?: string;
    SMS_INVALID_MESSAGE?: string;
    REQUIRED_ERROR_MESSAGE?: string;
    GENERIC_INVALID_MESSAGE?: string;
    INVALID_NUMBER?: string;
    INVALID_DATE?: string;
    REQUIRED_MULTISELECT_MESSAGE?: string;
    translation?: Record<string, unknown>;
    AUTOHIDE?: boolean;
  }
}

const NewsletterSection = () => {
  useEffect(() => {
    if (!document.getElementById(BREVO_STYLESHEET_ID)) {
      const link = document.createElement("link");
      link.id = BREVO_STYLESHEET_ID;
      link.rel = "stylesheet";
      link.href = "https://sibforms.com/forms/end-form/build/sib-styles.css";
      document.head.appendChild(link);
    }

    window.REQUIRED_CODE_ERROR_MESSAGE = "Wähle bitte einen Ländervorwahl aus.";
    window.LOCALE = "de";
    window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE =
      "Die eingegebenen Informationen sind nicht gültig. Bitte überprüfe das Feldformat und versuche es erneut.";
    window.REQUIRED_ERROR_MESSAGE = "Dieses Feld darf nicht leer sein. ";
    window.GENERIC_INVALID_MESSAGE =
      "Die eingegebenen Informationen sind nicht gültig. Bitte überprüfe das Feldformat und versuche es erneut.";
    window.INVALID_NUMBER =
      "Die eingegebenen Informationen sind nicht gültig. Bitte überprüfe das Feldformat und versuche es erneut.";
    window.INVALID_DATE = "Bitte gib ein gültiges Datum ein";
    window.REQUIRED_MULTISELECT_MESSAGE = "Wähle bitte mindestens eine Option aus";
    window.translation = {
      common: {
        selectedList: "{quantity} Liste ausgewählt",
        selectedLists: "{quantity} Listen ausgewählt",
        selectedOption: "{quantity} ausgewählt",
        selectedOptions: "{quantity} ausgewählt",
      },
    };
    window.AUTOHIDE = false;

    if (!document.getElementById(BREVO_SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = BREVO_SCRIPT_ID;
      script.src = "https://sibforms.com/forms/end-form/build/main.js";
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section id="newsletter" className="py-16 md:py-24">
      <style>{`
        @font-face {
          font-display: block;
          font-family: Roboto;
          src: url(https://assets.brevo.com/font/Roboto/Latin/normal/normal/7529907e9eaf8ebb5220c5f9850e3811.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/normal/normal/25c678feafdc175a70922a116c9be3e7.woff) format("woff")
        }
        @font-face {
          font-display: fallback;
          font-family: Roboto;
          font-weight: 600;
          src: url(https://assets.brevo.com/font/Roboto/Latin/medium/normal/6e9caeeafb1f3491be3e32744bc30440.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/medium/normal/71501f0d8d5aa95960f6475d5487d4c2.woff) format("woff")
        }
        @font-face {
          font-display: fallback;
          font-family: Roboto;
          font-weight: 700;
          src: url(https://assets.brevo.com/font/Roboto/Latin/bold/normal/3ef7cf158f310cf752d5ad08cd0e7e60.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/bold/normal/ece3a1d82f18b60bcce0211725c476aa.woff) format("woff")
        }
        :where(.sib-form-message-panel) {
          display: none;
        }
        :where(.sib-form-message-panel .sib-notification__icon) {
          width: 20px;
          height: 20px;
        }
        #sib-container input:-ms-input-placeholder {
          font-family: Helvetica, sans-serif;
          text-align: left;
          color: #c0ccda;
        }
        #sib-container input::placeholder {
          font-family: Helvetica, sans-serif;
          text-align: left;
          color: #c0ccda;
        }
        #sib-container textarea::placeholder {
          font-family: Helvetica, sans-serif;
          text-align: left;
          color: #c0ccda;
        }
        #sib-container a {
          text-decoration: underline;
          color: #2BB2FC;
        }
      `}</style>

      <div className="sib-form" style={{ textAlign: "center", backgroundColor: "#EFF2F7" }}>
        <div id="sib-form-container" className="sib-form-container">
          <div
            id="error-message"
            className="sib-form-message-panel"
            style={{
              fontFamily: "Helvetica, sans-serif",
              fontSize: 16,
              textAlign: "left",
              color: "#661d1d",
              backgroundColor: "#ffeded",
              borderColor: "#ff4949",
              borderRadius: 3,
              maxWidth: 540,
              margin: "0 auto",
            }}
          >
            <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
              <svg viewBox="0 0 512 512" className="sib-icon sib-notification__icon">
                <path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z" />
              </svg>
              <span className="sib-form-message-panel__inner-text">
                Deine Anmeldung konnte nicht gespeichert werden. Bitte versuche es erneut.
              </span>
            </div>
          </div>

          <div
            id="success-message"
            className="sib-form-message-panel"
            style={{
              fontFamily: "Helvetica, sans-serif",
              fontSize: 16,
              textAlign: "left",
              color: "#085229",
              backgroundColor: "#e7faf0",
              borderColor: "#13ce66",
              borderRadius: 3,
              maxWidth: 540,
              margin: "0 auto",
            }}
          >
            <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
              <svg viewBox="0 0 512 512" className="sib-icon sib-notification__icon">
                <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z" />
              </svg>
              <span className="sib-form-message-panel__inner-text">
                Deine Anmeldung war erfolgreich.
              </span>
            </div>
          </div>

          <div
            id="sib-container"
            className="sib-container--large sib-container--vertical"
            style={{
              maxWidth: 540,
              margin: "0 auto",
              textAlign: "center",
              backgroundColor: "rgba(255,255,255,1)",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#C0CCD9",
              borderRadius: 3,
              direction: "ltr",
            }}
          >
            <form
              id="sib-form"
              method="POST"
              action={BREVO_FORM_ACTION}
              data-type="subscription"
            >
              <div style={{ padding: "8px 0" }}>
                <div
                  className="sib-form-block"
                  style={{
                    fontFamily: "Helvetica, sans-serif",
                    fontSize: 32,
                    fontWeight: 700,
                    textAlign: "left",
                    color: "#3C4858",
                    backgroundColor: "transparent",
                  }}
                >
                  <p>Newsletter</p>
                </div>
              </div>
              <div style={{ padding: "8px 0" }}>
                <div
                  className="sib-form-block"
                  style={{
                    fontFamily: "Helvetica, sans-serif",
                    fontSize: 16,
                    textAlign: "left",
                    color: "#3C4858",
                    backgroundColor: "transparent",
                  }}
                >
                  <div className="sib-text-form-block">
                    <p>Melde dich zu unserem Newsletter an, um auf dem Laufenden zu bleiben.</p>
                  </div>
                </div>
              </div>
              <div style={{ padding: "8px 0" }}>
                <div className="sib-input sib-form-block">
                  <div className="form__entry entry_block">
                    <div className="form__label-row">
                      <label
                        className="entry__label"
                        style={{
                          fontWeight: 700,
                          textAlign: "left",
                          fontFamily: "Helvetica, sans-serif",
                          fontSize: 16,
                          color: "#3c4858",
                        }}
                        htmlFor="EMAIL"
                        data-required="*"
                      >
                        Gib deine E-Mail-Adresse ein, um dich anzumelden
                      </label>
                      <div className="entry__field">
                        <input
                          className="input"
                          type="text"
                          id="EMAIL"
                          name="EMAIL"
                          autoComplete="off"
                          defaultValue=""
                          placeholder="EMAIL"
                          data-required="true"
                          required
                        />
                      </div>
                    </div>
                    <label
                      className="entry__error entry__error--primary"
                      style={{
                        fontFamily: "Helvetica, sans-serif",
                        fontSize: 16,
                        textAlign: "left",
                        color: "#661d1d",
                        backgroundColor: "#ffeded",
                        borderColor: "#ff4949",
                        borderRadius: 3,
                      }}
                    />
                    <label
                      className="entry__specification"
                      style={{
                        fontFamily: "Helvetica, sans-serif",
                        fontSize: 12,
                        textAlign: "left",
                        color: "#8390A4",
                      }}
                    >
                      Gib bitte deine E-Mail-Adresse für die Anmeldung an, z. B. abc@xyz.com.
                    </label>
                  </div>
                </div>
              </div>
              <div style={{ padding: "8px 0" }}>
                <div className="sib-form-block" style={{ textAlign: "left" }}>
                  <button
                    className="sib-form-block__button sib-form-block__button-with-loader"
                    style={{
                      fontFamily: "Helvetica, sans-serif",
                      fontSize: 16,
                      fontWeight: 700,
                      textAlign: "left",
                      color: "#FFFFFF",
                      backgroundColor: "#3E4857",
                      borderWidth: 0,
                      borderRadius: 3,
                    }}
                    form="sib-form"
                    type="submit"
                  >
                    <svg
                      className="icon clickable__icon progress-indicator__icon sib-hide-loader-icon"
                      viewBox="0 0 512 512"
                    >
                      <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" />
                    </svg>
                    ANMELDEN
                  </button>
                </div>
              </div>
              <input type="text" name="email_address_check" defaultValue="" className="input--hidden" />
              <input type="hidden" name="locale" value="de" />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
