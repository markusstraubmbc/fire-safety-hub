import { useParams, Link, useNavigate } from "react-router-dom";
import { modules } from "@/data/module-data";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CheckCircle2,
  Lightbulb,
  Settings2,
  ShieldCheck,
  Info,
  Sparkles,
  Zap
} from "lucide-react";
import { useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ModulDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const module = slug ? modules[slug] : null;

  useEffect(() => {
    if (slug && !module) {
      navigate("/");
    }
    window.scrollTo(0, 0);
  }, [slug, module, navigate]);

  const colorConfig = useMemo(() => {
    const color = module?.color || "blue";
    const configs: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
      blue: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/20", gradient: "from-blue-600/20 via-transparent to-transparent" },
      amber: { bg: "bg-amber-500/10", text: "text-amber-500", border: "border-amber-500/20", gradient: "from-amber-600/20 via-transparent to-transparent" },
      red: { bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/20", gradient: "from-red-600/20 via-transparent to-transparent" },
      slate: { bg: "bg-slate-500/10", text: "text-slate-500", border: "border-slate-500/20", gradient: "from-slate-600/20 via-transparent to-transparent" },
      indigo: { bg: "bg-indigo-500/10", text: "text-indigo-500", border: "border-indigo-500/20", gradient: "from-indigo-600/20 via-transparent to-transparent" },
      zinc: { bg: "bg-zinc-500/10", text: "text-zinc-500", border: "border-zinc-500/20", gradient: "from-zinc-600/20 via-transparent to-transparent" },
      emerald: { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/20", gradient: "from-emerald-600/20 via-transparent to-transparent" },
      purple: { bg: "bg-purple-500/10", text: "text-purple-500", border: "border-purple-500/20", gradient: "from-purple-600/20 via-transparent to-transparent" },
      sky: { bg: "bg-sky-500/10", text: "text-sky-500", border: "border-sky-500/20", gradient: "from-sky-600/20 via-transparent to-transparent" },
      orange: { bg: "bg-orange-500/10", text: "text-orange-500", border: "border-orange-500/20", gradient: "from-orange-600/20 via-transparent to-transparent" },
      green: { bg: "bg-green-500/10", text: "text-green-500", border: "border-green-500/20", gradient: "from-green-600/20 via-transparent to-transparent" },
    };
    return configs[color] || configs.blue;
  }, [module]);

  if (!module) return null;

  const Icon = module.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background Decor */}
      <div className={`absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b ${colorConfig.gradient} -z-10 opacity-50`} />
      <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse" />

      <Header />

      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb / Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-all mb-12 group py-2 px-4 rounded-full border border-transparent hover:border-border hover:bg-card/30"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Zurück zur Übersicht</span>
          </Link>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
            <div className="lg:col-span-7 space-y-8">
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${colorConfig.bg} ${colorConfig.text} text-xs font-bold tracking-widest uppercase border ${colorConfig.border}`}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>RESQIO Modul</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                  {module.title}
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl leading-relaxed italic">
                  "{module.shortDesc}"
                </p>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                {module.longDesc}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="h-14 px-8 bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                  Jetzt Demo anfordern
                </Button>
                <Link to="/#contact">
                  <Button variant="outline" size="lg" className="h-14 px-8 rounded-2xl hover:bg-card/50 transition-all">
                    Beratungstermin buchen
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-10 bg-primary/20 rounded-full blur-[100px] opacity-20 animate-pulse" />
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-tr from-primary/50 to-purple-500/50 rounded-[2.5rem] blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-card/80 backdrop-blur-2xl border border-border rounded-[2.5rem] p-8 md:p-12 shadow-2xl flex flex-col items-center text-center space-y-8">
                  <div className={`w-28 h-28 rounded-3xl ${colorConfig.bg} flex items-center justify-center animate-float border ${colorConfig.border}`}>
                    <Icon className={`w-14 h-14 ${colorConfig.text}`} />
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-primary uppercase tracking-[0.2em]">Platform Integration</p>
                    <h3 className="text-2xl font-bold text-foreground">RESQIO Console</h3>
                    <p className="text-muted-foreground text-sm max-w-[240px] mx-auto">
                      Vollständig integriert in das RESQIO-Ökosystem (Kiosk, Web & Mobile).
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 w-full pt-4">
                    <div className="px-5 py-4 bg-muted/50 rounded-2xl border border-border flex flex-col items-center">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight mb-1">Status</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <p className="text-sm font-bold text-foreground uppercase">Operational</p>
                      </div>
                    </div>
                    <div className="px-5 py-4 bg-muted/50 rounded-2xl border border-border flex flex-col items-center">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight mb-1">Integration</p>
                      <p className="text-sm font-bold text-foreground">API Native</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 mb-24">
            {/* Main Content Area */}
            <div className="xl:col-span-8 space-y-12">

              {/* Why Section */}
              <section className="relative overflow-hidden bg-card/40 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-border group hover:border-primary/20 transition-all duration-500">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Zap className="w-32 h-32 text-primary" />
                </div>

                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-foreground">Der RESQIO Mehrwert</h2>
                    <p className="text-muted-foreground text-sm">Warum sich Profis für dieses Modul entscheiden</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {module.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex gap-4 group/item">
                      <div className="mt-1">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover/item:bg-primary/20 transition-colors">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed font-medium">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Functional Highlights */}
              <section className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-500/10 flex items-center justify-center">
                    <Settings2 className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-foreground">Funktionale Highlights</h2>
                    <p className="text-muted-foreground text-sm">Tiefgehende Features für Ihren Erfolg</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {module.features.map((feature, idx) => (
                    <div key={idx} className="group p-6 bg-card/20 backdrop-blur-sm rounded-2xl border border-border hover:border-primary/30 transition-all hover:bg-card/40">
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 rounded-full bg-primary/40 mt-2.5 group-hover:scale-150 transition-transform" />
                        <p className="text-base font-medium text-foreground leading-snug">
                          {feature}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar Information */}
            <div className="xl:col-span-4 space-y-8">
              {/* Technical Box */}
              {module.technicalDetails && (
                <div className="bg-card/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-border border-l-4 border-l-primary shadow-2xl sticky top-28">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Info className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground tracking-tight">Tech-Spezifikationen</h3>
                  </div>

                  <div className="space-y-5">
                    {module.technicalDetails.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-3 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-2 group-hover:bg-primary transition-colors" />
                        <p className="text-sm text-muted-foreground font-medium leading-relaxed group-hover:text-foreground transition-colors">
                          {detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 pt-8 border-t border-border">
                    <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-2xl border border-border">
                      <ShieldCheck className="w-5 h-5 text-green-500" />
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-foreground uppercase tracking-wider">Compliance</p>
                        <p className="text-[10px] text-muted-foreground uppercase font-medium">DSGVO Ready</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Banner */}
              <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-[2.5rem] p-8 border border-border">
                <h4 className="text-foreground font-bold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  Hosting & Sicherheit
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  DSGVO-konforme Serverstandorte in Deutschland.
                  Ihre Daten bleiben sicher in einer geschützten, deutschen Cloud-Umgebung.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ModulDetail;
