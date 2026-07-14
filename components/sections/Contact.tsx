"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { CONTACT_INFO } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactMethodCard, {
  ContactAccent,
} from "@/components/ui/ContactMethodCard";
import ContactForm from "@/components/ui/ContactForm";

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

const whatsappDigits = CONTACT_INFO.whatsapp.replace(/[^0-9]/g, "");
const whatsappText =
  "Hi%20Yahya%2C%20I%20found%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20data%20project.";
const whatsappHref = `https://wa.me/${whatsappDigits}?text=${whatsappText}`;

const CONTACT_CARDS: ContactCard[] = [
  {
    key: "whatsapp",
    icon: <MessageCircle size={22} />,
    label: "INSTANT MESSAGE",
    title: "WhatsApp",
    meta: `📞 ${CONTACT_INFO.whatsappDisplay}`,
    description:
      "Send a quick message for fast questions, project inquiries, or scope chats. I typically reply within minutes during working hours.",
    cta: "Chat on WhatsApp",
    href: whatsappHref,
    external: true,
    accentColor: "green",
  },
  {
    key: "fiverr",
    icon: (
      <span className="font-black text-lg tracking-tight">fi</span>
    ),
    label: "VERIFIED PLATFORM",
    title: "Fiverr DM",
    meta: CONTACT_INFO.fiverrDisplay,
    description:
      "Message me through Fiverr for a verified, escrow-backed engagement. Best for fixed-scope project starts with milestone protection.",
    cta: "Open Fiverr Profile",
    href: CONTACT_INFO.fiverrUrl,
    external: true,
    accentColor: "fiverr-green",
  },
];

interface InfoStrip {
  key: string;
  icon: ReactNode;
  label: string;
  value: string;
}

const INFO_STRIPS: InfoStrip[] = [
  {
    key: "response",
    icon: <Clock size={16} className="text-brand-light" />,
    label: "Response Time",
    value: CONTACT_INFO.responseTime,
  },
  {
    key: "location",
    icon: <MapPin size={16} className="text-brand-light" />,
    label: "Location",
    value: CONTACT_INFO.location,
  },
  {
    key: "email",
    icon: <Mail size={16} className="text-brand-light" />,
    label: "Email",
    value: CONTACT_INFO.email,
  },
];

export default function Contact() {
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
            <ContactForm />
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
