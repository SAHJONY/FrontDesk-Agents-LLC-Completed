import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  LineChart,
  Phone,
  PlayCircle,
  Shield,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Pricing", href: "#pricing" },
  { label: "Proof", href: "#proof" },
  { label: "FAQ", href: "#faq" },
];

const heroShots = [
  {
    src: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80",
    caption: "Ops bridge orchestrating multi-market demand",
  },
  {
    src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
    caption: "Executive review with live telemetry feeds",
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
    caption: "Special operations pod validating AI workflows",
  },
  {
    src: "https://images.unsplash.com/photo-1520607162513-6c549ef0b707?auto=format&fit=crop&w=900&q=80",
    caption: "Fortune 500 client success room during rollout",
  },
];

const trustedVisuals = [
  {
    name: "Fortune 500 Finance",
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Global Healthcare",
    src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Tier-1 Legal",
    src: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Enterprise Tech",
    src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=700&q=80",
  },
];

const statHighlights = [
  {
    label: "Global nodes live",
    value: "184",
    detail: "PDX1 • FRA3 • IAD2",
  },
  {
    label: "Avg. conversion lift",
    value: "+84%",
    detail: "Against staffed receptions",
  },
  {
    label: "Median response time",
    value: "42s",
    detail: "Voice, SMS, chat blended",
  },
  {
    label: "Compliance coverage",
    value: "SOC2 • HIPAA • PCI",
    detail: "Self-auditing every session",
  },
];

const capabilityHighlights = [
  {
    title: "Self-healing workflows",
    body: "Detects drop-offs, re-queues tasks, and escalates automatically so pipelines stay green without human paging.",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Signal-rich telemetry",
    body: "Every conversation emits structured metrics (latency, intent, outcome) that stream to the Ops map in <100ms.",
    icon: LineChart,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Compliance-first DNA",
    body: "Field-level encryption, immutable audit logs, and role-based masking keep legal and healthcare buyers calm.",
    icon: ShieldCheck,
    image:
      "https://images.unsplash.com/photo-1520607162513-6c549ef0b707?auto=format&fit=crop&w=900&q=80",
  },
];

const pricingPlans = [
  {
    tier: "STARTER",
    label: "Solo & small offices",
    price: 399,
    highlight: false,
    accent: "sky",
    description: "1 AI receptionist, 1 inbox, 24/7 coverage",
    ctaLabel: "Start Starter onboarding",
    ctaHref: "/setup?plan=starter",
    badge: null,
    features: [
      "1 AI Receptionist (phone + SMS)",
      "1 inbox / main line",
      "24/7 coverage",
      "English or Spanish",
    ],
  },
  {
    tier: "PROFESSIONAL",
    label: "Growing clinics & law firms",
    price: 899,
    highlight: true,
    accent: "sky",
    description: "Inbound, outbound, retention agents",
    ctaLabel: "Start Professional onboarding",
    ctaHref: "/setup?plan=professional",
    badge: "MOST POPULAR",
    features: [
      "3 AI agents (inbound, outbound, retention)",
      "Multilingual (EN/ES)",
      "CRM integration & call routing",
      "Campaigns for reactivation & no-shows",
    ],
  },
  {
    tier: "ENTERPRISE",
    label: "Multi-location & national brands",
    price: 1799,
    highlight: false,
    accent: "purple",
    description: "Unlimited agents + white-label",
    ctaLabel: "Contact Sales",
    ctaHref: "/contact?plan=enterprise",
    badge: null,
    features: [
      "Unlimited AI agents",
      "All languages supported",
      "White-label solution",
      "Dedicated account manager",
      "24/7 priority support",
      "Custom integrations",
      "SLA guarantee",
    ],
  },
];

const testimonials = [
  {
    initials: "SJ",
    name: "Sarah Jenkins",
    title: "Ops Director, TechFlow",
    quote:
      "We handed after-hours coverage to FrontDesk Agents and response times fell by 90%. Most callers think they're speaking to our in-house team.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  },
  {
    initials: "MC",
    name: "Michael Chen",
    title: "CEO, Urban Stay",
    quote:
      "The ROI showed up in month one. We replaced an entire BPO pod and still grew bookings because their agents never sleep.",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
  },
  {
    initials: "ER",
    name: "Elena Rodriguez",
    title: "Patient Experience, HealthFirst",
    quote:
      "HIPAA, empathy, bilingual coverage—checked within 48 hours. Our clinicians finally sleep because escalations are precise.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  },
];

const faqItems = [
  {
    title: "How fast can a node go live?",
    body: "Most teams connect data sources, define escalation guardrails, and ship within 48 hours. Complex compliance reviews average 5 business days.",
  },
  {
    title: "What does a \"node\" actually include?",
    body: "A node is an AI agent license with conversation quota, telemetry, compliance logging, and access to your orchestration layer.",
  },
  {
    title: "Can we control tone + persona?",
    body: "Yes. Upload brand guardrails or plug in your existing scripts. Personas can swap per queue or per customer segment.",
  },
  {
    title: "Where does data live?",
    body: "Choose our managed regions (US-EAST, US-WEST, EU, APAC) or deploy inside your VPC. All traffic stays in-region and is never used to train public models.",
  },
];

const glossaryEntries = [
  {
    term: "Node",
    definition:
      "One autonomous worker: dialog brain, compliance envelope, and telemetry stream. Add nodes to scale capacity, not headcount.",
  },
  {
    term: "Fleet",
    definition:
      "A cluster of nodes with shared objectives, unified QA, and self-balancing workloads across channels.",
  },
  {
    term: "Distribution Map",
    definition:
      "Live geospatial board that shows node density, queue health, and failover status across your markets.",
  },
];

const opsSignals = [
  {
    title: "PDX1",
    status: "Operational excellence",
    detail: "Voice + WhatsApp load balanced",
  },
  {
    title: "FRA3",
    status: "Latency 118ms",
    detail: "EU compliance tunnel engaged",
  },
  {
    title: "BOS7",
    status: "Escalations < 1%",
    detail: "Legal concierge overnight",
  },
];

type ContractTerm = "monthly" | "annual";

const formatCurrency = (value: number) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export default function Home() {
  const [contractTerm, setContractTerm] = useState<ContractTerm>("monthly");
  const [nodeValue, setNodeValue] = useState([50]);

  const nodes = nodeValue[0];
  const humanBaseline = 3600;
  const baseNodePrice = 899;
  const multiplier = contractTerm === "annual" ? 0.8 : 1;
  const nodePrice = baseNodePrice * multiplier;

  const calculator = useMemo(() => {
    const netMonthlyOpex = nodes * nodePrice;
    const unitEfficiency = nodePrice;
    const annualSavings = Math.max(
      (humanBaseline - nodePrice) * nodes * 12,
      0
    );

    return {
      nodes,
      netMonthlyOpex,
      unitEfficiency,
      annualSavings,
    };
  }, [nodes, nodePrice]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-sm font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-lg text-primary">
              FD
            </span>
            FrontDesk Agents
          </a>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground transition hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <a href="/login">Login</a>
            </Button>
            <Button size="sm" className="hidden md:inline-flex" asChild>
              <a href="/demo">
                Book demo <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="space-y-20 pb-24">
        <section id="platform" className="container pt-12">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr),0.8fr]">
            <div className="space-y-6">
              <Badge variant="secondary" className="gap-2">
                Global Workforce Initialized • PDX1
              </Badge>
              <div>
                <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                  Scale revenue without hiring more people.
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  Replace queue chaos with an autonomous workforce. FrontDesk
                  Agents monitor every channel, self-heal playbooks, and hand
                  off only the conversations that need a human.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <a href="/signup">
                    Execute deployment <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/demo">
                    Operational insights <PlayCircle className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {heroShots.map(shot => (
                  <Card key={shot.caption} className="overflow-hidden border-0 shadow-lg">
                    <AspectRatio ratio={4 / 3}>
                      <img
                        src={shot.src}
                        alt={shot.caption}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </AspectRatio>
                    <CardContent className="pt-4 text-sm text-muted-foreground">
                      {shot.caption}
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {statHighlights.map(stat => (
                  <Card key={stat.label} className="border-dashed">
                    <CardHeader className="pb-2">
                      <CardDescription>{stat.label}</CardDescription>
                      <CardTitle className="text-3xl">{stat.value}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {stat.detail}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="overflow-hidden border-primary/30 bg-gradient-to-b from-primary/5 to-background">
                <CardHeader>
                  <CardDescription>Operations console</CardDescription>
                  <CardTitle>8-Division Fleet</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-xl border bg-background/80 p-4 shadow-sm">
                    <p className="text-sm font-medium text-muted-foreground">
                      Global distribution nodes
                    </p>
                    <p className="mt-2 text-4xl font-semibold">9 regions online</p>
                    <p className="text-xs text-muted-foreground">
                      Auto-scaling based on queue heatmap every 30s
                    </p>
                  </div>
                  <div className="space-y-3">
                    {opsSignals.map(signal => (
                      <div
                        key={signal.title}
                        className="rounded-lg border border-muted/60 bg-background/60 p-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{signal.title}</span>
                          <Badge variant="outline">Live</Badge>
                        </div>
                        <p className="text-base font-semibold">{signal.status}</p>
                        <p className="text-xs text-muted-foreground">
                          {signal.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                    Call, SMS, email, and web chat orchestrated through a single
                    AI workforce. Escalations stay under 2% with deterministic
                    guardrails.
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden border-0 shadow-xl">
                <AspectRatio ratio={16 / 9}>
                  <img
                    src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80"
                    alt="Executive desk with control dashboards"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </AspectRatio>
                <CardContent className="pt-4 text-sm text-muted-foreground">
                  FrontDesk Agents embedded inside an enterprise command room.
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-4">
            {trustedVisuals.map(trust => (
              <div
                key={trust.name}
                className="relative overflow-hidden rounded-xl border bg-muted/30"
              >
                <AspectRatio ratio={5 / 3}>
                  <img
                    src={trust.src}
                    alt={trust.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </AspectRatio>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
                <p className="absolute bottom-2 left-3 text-xs font-semibold uppercase tracking-wide text-white">
                  {trust.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="container" id="platform-stack">
          <div className="grid gap-6 lg:grid-cols-2">
            {capabilityHighlights.map(capability => (
              <Card key={capability.title} className="overflow-hidden border-muted">
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={capability.image}
                    alt={capability.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </AspectRatio>
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="rounded-xl bg-primary/10 p-2 text-primary">
                    <capability.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle>{capability.title}</CardTitle>
                    <CardDescription className="mt-2 text-base">
                      {capability.body}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle>Live signals board</CardTitle>
                <CardDescription>
                  Blend queue depth, sentiment, CSAT, and conversion outputs in
                  a single pane for leadership reviews.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Revenue coverage</span>
                  <span className="font-semibold text-foreground">99.4%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Escalation accuracy</span>
                  <span className="font-semibold text-foreground">98.7%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Customer satisfaction</span>
                  <span className="font-semibold text-foreground">4.8 / 5</span>
                </div>
                <p>
                  Stream telemetry into your warehouse via PostgreSQL, Snowflake,
                  or BigQuery in under five minutes.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container" id="calculator">
          <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
            <Card>
              <CardHeader className="space-y-1">
                <Badge variant="secondary" className="w-fit">
                  Investment calculator
                </Badge>
                <CardTitle>Model your autonomous workforce</CardTitle>
                <CardDescription>
                  Toggle your contract term, select distribution nodes, and see
                  the financial impact instantly.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <Tabs
                  value={contractTerm}
                  onValueChange={value => setContractTerm(value as ContractTerm)}
                >
                  <TabsList className="grid grid-cols-2">
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="annual">
                      Annual Protocol (-20%)
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Global distribution nodes</span>
                    <span className="font-semibold text-foreground">
                      {calculator.nodes}
                    </span>
                  </div>
                  <Slider
                    value={nodeValue}
                    onValueChange={setNodeValue}
                    min={5}
                    max={150}
                    step={5}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <MetricTile
                    label="Net monthly opex"
                    value={formatCurrency(calculator.netMonthlyOpex)}
                    hint="Based on active nodes"
                  />
                  <MetricTile
                    label="Unit efficiency cost"
                    value={formatCurrency(calculator.unitEfficiency)}
                    hint="Per node with guardrails"
                  />
                  <MetricTile
                    label="Annual fiscal savings"
                    value={formatCurrency(calculator.annualSavings)}
                    hint="Vs. staffed reception"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-dashed">
              <CardHeader>
                <CardTitle>Glossary (in plain English)</CardTitle>
                <CardDescription>
                  Translate our internal language before you brief finance.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {glossaryEntries.map(entry => (
                  <div key={entry.term}>
                    <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      {entry.term}
                    </p>
                    <p className="text-base">{entry.definition}</p>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" asChild>
                  <a href="/support">
                    Schedule architecture review <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section id="pricing" className="relative z-10 py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                Simple, Transparent Pricing
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-muted-foreground"
              >
                Choose a plan that matches your growth—no hidden fees, no long-term contracts.
              </motion.p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
              {pricingPlans.map((plan, index) => {
                const isHighlight = plan.highlight;
                const baseClasses = isHighlight
                  ? "p-8 rounded-2xl bg-gradient-to-br from-sky-500/20 to-blue-500/20 border-2 border-sky-500 backdrop-blur-sm relative shadow-2xl shadow-sky-500/20"
                  : "p-8 rounded-2xl bg-muted/20 border border-border/50 backdrop-blur-sm hover:border-primary/50 transition-all";

                return (
                  <motion.div
                    key={plan.tier}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: isHighlight ? 1.05 : 1.02, y: isHighlight ? -10 : 0 }}
                    className={baseClasses}
                  >
                    {plan.badge && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full text-xs font-bold shadow-lg">
                        {plan.badge}
                      </div>
                    )}

                    <div className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">
                      {plan.tier}
                    </div>
                    <div className="text-muted-foreground text-sm mb-4">{plan.label}</div>
                    <div className="mb-6">
                      <span className="text-5xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/mo</span>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map(feature => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/90">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={plan.ctaHref}
                      className={cn(
                        "block w-full py-3 px-4 rounded-lg text-center font-semibold transition-all",
                        isHighlight
                          ? "bg-gradient-to-r from-sky-400 to-blue-500 text-white hover:shadow-lg hover:shadow-sky-500/50"
                          : "bg-muted/40 text-foreground hover:bg-muted"
                      )}
                    >
                      {plan.ctaLabel}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center mt-12"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-full backdrop-blur-sm">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium">
                  14-day money-back guarantee • Cancel anytime
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="container" id="proof">
          <div className="grid gap-8 lg:grid-cols-[0.9fr,1.1fr]">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle>Social proof</CardTitle>
                <CardDescription>Industry operators running on FrontDesk Agents.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {testimonials.map(testimonial => (
                  <div key={testimonial.name} className="rounded-xl border bg-background/80 p-4">
                    <AspectRatio ratio={3 / 2}>
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="h-full w-full rounded-lg object-cover"
                        loading="lazy"
                      />
                    </AspectRatio>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {testimonial.initials}
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{testimonial.quote}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Frequently asked</CardTitle>
                <CardDescription>Buttoned-up answers for operators, finance, and legal.</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map(item => (
                    <AccordionItem value={item.title} key={item.title}>
                      <AccordionTrigger className="text-left">
                        {item.title}
                      </AccordionTrigger>
                      <AccordionContent>{item.body}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container" id="cta">
          <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background">
            <CardContent className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
              <div>
                <Badge variant="secondary">Next step</Badge>
                <h3 className="mt-3 text-2xl font-semibold">Plug FrontDesk Agents into your stack</h3>
                <p className="text-muted-foreground">
                  Bring your scripts, CRM, and compliance rules. We take care of the rest—deployment, telemetry, and QA.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <a href="/demo">
                    Book ops review <Phone className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/support">
                    Talk to support <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t py-10">
        <div className="container flex flex-col gap-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} FrontDesk Agents LLC. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="/legal/privacy" className="hover:text-foreground">
              Privacy
            </a>
            <a href="/legal/terms" className="hover:text-foreground">
              Terms
            </a>
            <a href="/support" className="hover:text-foreground">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MetricTile({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-xl border bg-muted/20 p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
      <p className="text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}
