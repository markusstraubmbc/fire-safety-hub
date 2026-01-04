import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feuerwehr: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Anfrage gesendet!",
      description:
        "Vielen Dank für Ihr Interesse. Wir melden uns in Kürze bei Ihnen.",
    });
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
            Demo anfragen
          </h2>
          <p className="text-lg text-secondary-foreground/80">
            Überzeugen Sie sich selbst von resqio. Kontaktieren Sie uns
            für eine unverbindliche Live-Demo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-secondary-foreground mb-6">
              Ihr Ansprechpartner
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-foreground">
                    Markus Straub
                  </h4>
                  <p className="text-secondary-foreground/70">
                    Produktentwicklung & Support
                  </p>
                  <a 
                    href="mailto:support@resqio.de" 
                    className="text-primary hover:underline"
                  >
                    support@resqio.de
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-secondary-foreground">Eschenstraße 37</p>
                  <p className="text-secondary-foreground">72141 Walddorfhäslach</p>
                  <p className="text-secondary-foreground/70">Deutschland</p>
                </div>
              </div>
            </div>

            <Card className="mt-8 bg-secondary-foreground/5 border-secondary-foreground/10">
              <CardContent className="p-6">
                <h4 className="font-semibold text-secondary-foreground mb-2">
                  Was Sie erwartet:
                </h4>
                <ul className="space-y-2 text-secondary-foreground/80 text-sm">
                  <li>• Persönliche Live-Demo der Software</li>
                  <li>• Beantwortung all Ihrer Fragen</li>
                  <li>• Individuelles Angebot für Ihre Feuerwehr</li>
                  <li>• Cloud oder Self-Hosted Optionen</li>
                  <li>• Keine versteckten Kosten</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-card border-border">
            <CardContent className="p-6 md:p-8">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Vielen Dank!
                  </h3>
                  <p className="text-muted-foreground">
                    Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns
                    in Kürze bei Ihnen.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Max Mustermann"
                      required
                      className="bg-background border-border"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      E-Mail *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="max@feuerwehr.de"
                      required
                      className="bg-background border-border"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="feuerwehr"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Feuerwehr / Organisation
                    </label>
                    <Input
                      id="feuerwehr"
                      name="feuerwehr"
                      value={formData.feuerwehr}
                      onChange={handleChange}
                      placeholder="FF Musterstadt"
                      className="bg-background border-border"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Nachricht
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Erzählen Sie uns von Ihren Anforderungen..."
                      rows={4}
                      className="bg-background border-border resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      "Wird gesendet..."
                    ) : (
                      <>
                        Demo anfragen
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
