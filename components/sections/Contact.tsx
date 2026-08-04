"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactMethodCard, {
  ContactAccent,
} from "@/components/ui/ContactMethodCard";
import ContactForm from "@/components/ui/ContactForm";
import type { ContactInfoRow } from "@/lib/supabase/database.types";

interface ContactCard {
  key: string;
  icon: ReactNode;
  label: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  meta?: string;
  external?: boolean;
  accentColor: ContactAccent;
}

interface InfoStrip {
  key: string;
  icon: ReactNode;
  label: string;
  value: string;
}

interface ContactProps {
  contactInfo: ContactInfoRow | null;
}

export default function Contact({ contactInfo }: ContactProps) {
  const email = contactInfo?.email ?? "yahyaqureshi012@gmail.com";
  // No placeholder fallback for WhatsApp — a fake number is worse than hiding
  // the card, so the WhatsApp option only appears when a real number is set.
  const whatsapp = contactInfo?.whatsapp ?? null;
  const whatsappDisplay = contactInfo?.whatsapp_display ?? whatsapp ?? "";
  const fiverrUrl =
    contactInfo?.fiverr_url ?? "https://www.fiverr.com/yahya_qureshii";
  const fiverrDisplay = contactInfo?.fiverr_display ?? "fiverr.com/yahya_qureshii";
  const responseTime = contactInfo?.response_time ?? "Within 24 hours";
  const location =
    contactInfo?.location ?? "Pakistan 🇵🇰 · Available Worldwide";

  const whatsappDigits = whatsapp ? whatsapp.replace(/[^0-9]/g, "") : "";
  const whatsappText =
    "Hi%20Yahya%2C%20I%20found%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20data%20project.";
  const whatsappHref = `https://wa.me/${whatsappDigits}?text=${whatsappText}`;

  const ALL_CONTACT_CARDS: ContactCard[] = [
    {
      key: "whatsapp",
      icon: <MessageCircle size={22} />,
      label: "INSTANT MESSAGE",
      title: "WhatsApp",
      meta: `📞 ${whatsappDisplay}`,
      description:
        "Send a quick message for fast questions, project inquiries, or scope chats. I typically reply within minutes during working hours.",
      cta: "Chat on WhatsApp",
      href: whatsappHref,
      external: true,
      accentColor: "green",
    },
    {
      key: "fiverr",
      icon: <span className="font-black text-lg tracking-tight">fi</span>,
      label: "VERIFIED PLATFORM",
      title: "Fiverr DM",
      meta: fiverrDisplay,
      description:
        "Message me through Fiverr for a verified, escrow-backed engagement. Best for fixed-scope project starts with milestone protection.",
      cta: "Open Fiverr Profile",
      href: fiverrUrl,
      external: true,
      accentColor: "fiverr-green",
    },
  ];

  // Hide the WhatsApp card entirely when no number is configured.
  const CONTACT_CARDS = ALL_CONTACT_CARDS.filter(
    (card) => card.key !== "whatsapp" || Boolean(whatsapp)
  );

  const INFO_STRIPS: InfoStrip[] = [
    {
      key: "response",
      icon: <Clock size={16} className="text-brand-light" />,
      label: "Response Time",
      value: responseTime,
    },
    {
      key: "location",
      icon: <MapPin size={16} className="text-brand-light" />,
      label: "Location",
      value: location,
    },
    {
      key: "email",
      icon: <Mail size={16} className="text-brand-light" />,
      label: "Email",
      value: email,
    },
  ];

  return (
    <section
      id="contact"
      className="py-32 px-6 md:px-8 relative overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(124,58,237,0.1)_0%,_transparent_60%)] blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(167,139,250,0.08)_0%,_transparent_60%)] blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative">
        <SectionHeading
          eyebrow="GET IN TOUCH"
          title={
            <>
              Let&apos;s Build Something{" "}
              <span className="gradient-text italic">Insightful.</span>
            </>
          }
          subtitle="Choose how you want to reach me — message me instantly, send a Fiverr DM, or drop a detailed email. I respond within 24 hours."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1fr_1fr_1.3fr] gap-6">
          {CONTACT_CARDS.map((card, index) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
            >
              <ContactMethodCard
                icon={card.icon}
                label={card.label}
                title={card.title}
                meta={card.meta}
                description={card.description}
                cta={card.cta}
                href={card.href}
                external={card.external}
                accentColor={card.accentColor}
              />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 2 * 0.12 }}
          >
            <ContactForm email={email} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {INFO_STRIPS.map((strip) => (
            <div
              key={strip.key}
              className="bg-background-surface/50 border border-white/[0.08] rounded-2xl px-5 py-4 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center shrink-0">
                {strip.icon}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase tracking-widest text-ink-muted">
                  {strip.label}
                </span>
                <span className="text-sm font-bold text-ink-primary truncate">
                  {strip.value}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
