import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Seite nicht gefunden | RESQIO";
    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.name = "robots";
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.content = "noindex, nofollow";
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    return () => {
      document.title = "RESQIO - Die intelligente Feuerwehr-Verwaltungssoftware für heute & morgen";
      robotsMeta?.remove();
    };
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Seite nicht gefunden</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Zurück zur Startseite
        </a>
      </div>
    </div>
  );
};

export default NotFound;
