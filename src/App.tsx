import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ConsentBanner from "./components/ConsentBanner";

// Lazy load non-critical routes
const KreisModul = lazy(() => import("./pages/KreisModul"));
const ModulDetail = lazy(() => import("./pages/ModulDetail"));
const Wissen = lazy(() => import("./pages/Wissen"));
const WissenArtikel = lazy(() => import("./pages/WissenArtikel"));
const Impressum = lazy(() => import("./pages/Impressum"));
const Datenschutz = lazy(() => import("./pages/Datenschutz"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/kreis" element={<KreisModul />} />
            <Route path="/modul" element={<Navigate to="/" replace />} />
            <Route path="/modul/" element={<Navigate to="/" replace />} />
            <Route path="/modul/:slug" element={<ModulDetail />} />
            <Route path="/wissen" element={<Wissen />} />
            <Route path="/wissen/:slug" element={<WissenArtikel />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <ConsentBanner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
