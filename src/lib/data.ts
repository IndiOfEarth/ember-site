import { ReactNode } from "react";
import { Rocket, Palette, Layers, LineChart, MonitorSmartphone, Wrench } from "lucide-react";


export const visionCards = [
    {
        icon: Palette,
        title: "Move With Purpose.",
        text: "Ember builds brand worlds that are strategic, polished, and impactful.",
        // text: "Ember crafts distinctive brand worlds - strategically positioned, visually refined, and built to resonate at every level.",
    },
    {
        icon: Layers,
        title: "Built To Last.",
        text: "We design and build digital products—intuitive, modern, and scalable.",
        // text: "We design and build sophisticated digital products - intuitive interfaces, modern stacks, and scalable mvps engineered for excellence.",
    },
    {
        icon: Rocket,
        title: "Creativity Never Sleeps.",
        text: "Strategic campaigns, striking visuals, and digital touchpoints that captivate.",
        // text: "Ember launches with intention - strategic campaigns, creative visuals, and digital touchpoints designed to convert and captivate.",
    },
] as const;


export const featureCards = [
    {
        icon: Palette,
        title: "Define Your Brand Identity",
        sub: "Create a recognisable brand where UI/UX designs meets your vision",
        cta: { label: "Branding Services", href: "#contact" },
        img: "/images/emberheroimage.png",
    },
    {
        icon: MonitorSmartphone,
        title: "Create Your Online Presence",
        sub: "A website tailored to your company. A journey from design to code.",
        cta: { label: "Web Design", href: "#contact" },
        img: "/images/emberheroimage.png",
    },
    {
        icon: Wrench,
        title: "Maintain and Evolve Your Product",
        sub: "Ongoing improvements. Performance Tweaks, Feature Updates, Marketing and Social Updates",
        cta: { label: "Support & Consulting", href: "#contact" },
        img: "/images/emberheroimage.png",
    },
    {
        icon: LineChart,
        title: "Optimise Business Growth and SEO",
        sub: "Marketing Strategies. Social Media. App and Software Designs, SEO.",
        cta: { label: "Marketing", href: "#contact" },
        img: "/images/emberheroimage.png",
    },
] as const;


export const processSlides = [
    {
        title: "Discovery",
        text: "This is where clarity begins. Through thoughtful dialogue and deep exploration, we uncover the core of your brand, business goals, and technical needs - aligning vision with purpose to lay the foundation for meaningful, memorable collaboration.",
    },
    {
        title: "Strategy",
        text: "With insight as our guide, we define what we're building- and why it matters. This phase shapes the creative and technical direction, ensuring every decision is intentional, aligned, and built to move your brand forward with purpose.",
    },
    {
        title: "Design",
        text: "Rooted in strategic clarity. We craft design systems that unify brand expression and user experience from visual identities to digital interfaces. Every element is considered-refined, intuitive, and built to resonate across every touchpoint.",
    },
    {
        title: "Build",
        text: "We bring ideas to life with precision and care. Whether developing full-stack digital products or refining and testing brand executions. this state is about translating design into reality - seamlessly. True to the vision and with growth in mind.",
    },
    {
        title: "Launch & Support",
        text: "With the foundation in place, we move into momentum. From launch through ongoing support, we ensure every solution runs smoothly, evolves intelligently, and scales with purpose - refining, optimising, and growing alongside your brand.",
    },
] as const;

export const packages = {
    branding: {
        line: "Branding & Marketing Packages",
        tiers: [
            { name: "Spark", items: ["Logo", "Colours", "Basic style guide", "Social profiles"] },
            { name: "Flame", items: ["Extended brand guide", "Social templates", "Business cards", "Messaging"] },
            { name: "Blaze", items: ["Full brand system", "Creative direction", "Marketing assets", "Product mockups"] },
        ],
    },
    webapp: {
        line: "Web & App Packages",
        tiers: [
            { name: "Launch", items: ["1‑page site", "Contact form", "Basic SEO"] },
            { name: "Build", items: ["Up to 10 pages", "Blog/CMS", "Analytics", "Intermediate SEO"] },
            { name: "Scale", items: ["Unlimited pages", "Advanced UX", "E‑commerce/Membership", "Integrations", "Perf & a11y"] },
        ],
    },
    retainers: {
        line: "Marketing & Growth Retainers",
        tiers: [
            { name: "Starter Retainer", items: ["4–6 content pieces", "1 ad campaign", "Basic analytics"] },
            { name: "Growth Retainer", items: ["8–10 content pieces", "2 ad campaigns", "A/B testing", "SEO updates"] },
            { name: "Scale Retainer", items: ["Full strategy", "Multi‑platform campaigns", "CRO", "Email funnels", "Quarterly reporting"] },
        ],
    },
} as const;
    
    
export const tools = [
    "Next JS", "Shopify", "Figma", "Instagram", "iOS", "X", "YouTube", "TikTok"
] as const;