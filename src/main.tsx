import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// Poppins selbst gehostet (Latin-Subset): keine Google-Fonts-Verbindung nötig (Performance + DSGVO)
import "@fontsource/poppins/latin-400.css";
import "@fontsource/poppins/latin-500.css";
import "@fontsource/poppins/latin-600.css";
import "@fontsource/poppins/latin-700.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
