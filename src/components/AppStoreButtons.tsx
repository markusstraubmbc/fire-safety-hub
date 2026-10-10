import { Smartphone, Apple } from "lucide-react";
import { ALARM_APP } from "@/data/app-links";
import { cn } from "@/lib/utils";

interface AppStoreButtonsProps {
  className?: string;
  /** "dark" für helle Flächen, "light" für dunkle (Footer). */
  tone?: "dark" | "light";
}

/**
 * Store-Buttons der Alarm-App. Ein Store ohne hinterlegte URL wird nicht
 * angezeigt (siehe src/data/app-links.ts).
 */
const AppStoreButtons = ({ className, tone = "dark" }: AppStoreButtonsProps) => {
  const stores = [
    { key: "play", label: "Google Play", prefix: "Jetzt bei", href: ALARM_APP.googlePlayUrl, Icon: Smartphone },
    { key: "apple", label: "App Store", prefix: "Laden im", href: ALARM_APP.appStoreUrl, Icon: Apple },
  ].filter((s) => !!s.href);

  const toneClasses =
    tone === "dark"
      ? "bg-slate-900 text-white border-slate-700 hover:bg-slate-800"
      : "bg-white/5 text-white border-white/20 hover:bg-white/10";

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {stores.map(({ key, label, prefix, href, Icon }) => (
        <a
          key={key}
          href={href as string}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-3 rounded-xl border px-4 py-2.5 transition-colors touch-manipulation",
            toneClasses
          )}
        >
          <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
          <span className="flex flex-col text-left leading-tight">
            <span className="text-[10px] uppercase tracking-wider opacity-80">{prefix}</span>
            <span className="text-base font-semibold">{label}</span>
            <span className="sr-only"> – RESQIO Alarm-App (öffnet in neuem Tab)</span>
          </span>
        </a>
      ))}
    </div>
  );
};

export default AppStoreButtons;
