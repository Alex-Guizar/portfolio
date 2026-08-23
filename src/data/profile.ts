import type { Profile } from '@/types/profile';

export const PROFILE: Profile = {
  name: "Alex Guizar",
  handle: "alexguizar",
  role: "Software Engineer | UI Systems & Full Stack",
  location: "Denver, Colorado, USA",
  blurb: "Senior Frontend Engineer with 11+ years of experience building scalable UI infrastructure, design systems, and AI-augmented development workflows.",
  longBlurb: [
    "I build the layer between design and engineering — component libraries, design systems, and the tooling that lets product teams move fast without breaking things. Expert in Vue and React with a focus on framework-agnostic UI infrastructure that survives reorgs and rewrites.",
    "Lately I've been learning Ruby on Rails and Go, picking up backend skills to round out the frontend work I already do. I care about accessibility (WCAG 2.2), performance, and the kind of clean code that's still legible at 2 a.m.",
  ],
  now: [
    "Scaling Cisco's framework-agnostic component library — cut team time-to-delivery in half.",
    "Building AI personas and prompt pipelines for technical research and code review.",
    "Learning backend skills in Ruby on Rails and Go to round out my frontend expertise.",
    "Reading + writing about UI infrastructure at scale.",
  ],

  work: [
    {
      id: "ffxiv-tracker",
      title: "FFXIV Raid Tracker",
      year: "2024",
      stack: "Vue · Node.js · Axios",
      blurb: "A dashboard that tracks mount drops for my 8-person FFXIV raid group, so we know who still needs which mount. It also shows each player which minions they're missing and what they cost on the market.",

      status: "ARCHIVED",
      tagline: "Tracks mount drops for my 8-person raid group and shows who still needs which mount. Also includes a page where a player can check which minions they're missing and their market price.",
      role: "Solo developer · designer · raid leader",
      duration: "Ongoing personal project",
      team: "Solo · serving an 8-person static",
      href: null,
      screenshot: "/assets/mount-farm-home.png",

      problem: [
        "Our raid group tracked mount drops in a shared spreadsheet. It was easy to forget to update, and hard to tell at a glance who still needed which mount.",
        "There was also no easy way for a player to check which minions they were missing or what those minions cost on the market instead of farming them.",
      ],
      approach: [
        "Built the tracker in Vue, with a small Node.js and Axios backend that pulls character and mount data from FFXIV's APIs.",
        "The main page lists mount drops and shows which raid members still need each one, so we can check at a glance instead of searching a spreadsheet.",
        "Added a separate utility page where a player can look up their own missing minions and see the current market price for each one.",
      ],
      outcome: [
        "We stopped using the spreadsheet. The mount list stays accurate because it pulls from game data instead of manual entry.",
        "The minion page gets used outside of raid time too — people check it when deciding whether to farm a minion or just buy it.",
      ],
      metrics: [
        { label: "RAIDERS", value: "8" },
        { label: "DROPS LOGGED", value: "100+" },
        { label: "WEEKS LIVE", value: "52+" },
      ],
      features: [
        "Pulls character and mount data from FFXIV's APIs",
        "Shows which raid members still need each mount",
        "Personal page showing a player's missing minions and their market price",
      ],
      stackDetail: [
        {
          tech: "Vue",
          reason: "Used for the dashboard UI — a good fit for data that updates as new mount and minion data comes in."
        },
        {
          tech: "Node.js",
          reason: "Small server that pulls and caches data from FFXIV's APIs."
        },
        {
          tech: "Axios",
          reason: "HTTP client used to call FFXIV's API and handle rate limits."
        },
      ],
      gallery: [
        {
          src: "/assets/mount-farm-table-focus.png",
          caption: "Table view of the static's mount drops, showing current and past members and which mounts each one still needs."
        },
        {
          src: "/assets/mount-farm-minion-collecting.png",
          caption: "Utility page showing a player's missing minions and their price on the market."
        },
      ],
    },

    {
      id: "cisco-component-library",
      title: "Cisco Component Library",
      year: "2022-present",
      stack: "Vue · Lit · TypeScript · Monorepo",
      blurb: "Re-engineered Cisco's framework-agnostic component library and the workflows around it, cutting team time-to-delivery by 50%.",

      status: "LIVE",
      tagline: "Took ownership of an internal component library used across multiple product teams, rebuilt the workflows around it, and cut their time-to-delivery in half.",
      role: "Owner · platform engineer",
      duration: "2+ years (ongoing)",
      team: "Cross-functional · multiple product teams as consumers",
      screenshot: "/assets/cisco-u-home.png",

      problem: [
        "Cisco product teams were duplicating frontend work — each shipping its own buttons, modals, forms, and accessibility patterns, each at a different level of quality. The existing component library was framework-agnostic in theory but painful to consume in practice.",
        "Teams routed around it instead of through it. That meant inconsistent UI, redundant a11y work, and weeks lost on integration friction every quarter.",
      ],
      approach: [
        "Assumed ownership of the library and audited every consumer's pain points before changing a line of code. Rebuilt the workflows — versioning, publishing, docs, demos — around what teams actually needed instead of what was easy to maintain.",
        "Built a Component Downloader tool that lets teams sync the design system to their own stack instantly, solving the legacy bottleneck that was the single biggest source of integration friction.",
        "Partnered with backend teams to debug Go-based services and optimize REST API designs, keeping data delivery fast and efficient for the customer-facing apps built on the library.",
        "Set engineering standards — code review patterns, accessibility checks, performance budgets — so the library stays consistent as more contributors land in it.",
        "Mentored junior developers through structured code reviews, cutting onboarding friction and raising the team's baseline for shipped code quality.",
      ],
      outcome: [
        "Time-to-delivery for new UI features across consuming teams dropped by ~50%.",
        "Led the platform-wide accessibility audit as the primary a11y point person, resolving 80% of identified issues by building fixes into reusable, WCAG-compliant components — accessibility became a property of the library, not a checklist every team has to redo.",
        "Library adoption stopped being a question — teams now reach for it first because it's faster than rolling their own.",
      ],
      metrics: [
        { label: "TIME-TO-SHIP", value: "-50%" },
        { label: "A11Y ISSUES",  value: "-80%" },
        { label: "TEAMS",        value: "Multiple" },
        { label: "WCAG",         value: "2.2" },
        { label: "FRAMEWORKS",   value: "Vue · React · Lit" },
      ],
      features: [
        "Framework-agnostic components consumable from Vue, React, and vanilla Lit",
        "Component Downloader tool for instant cross-workflow sync",
        "WCAG 2.2 compliance baked in at the primitive level",
        "Mixpanel telemetry + replay tracking to find real friction in usage",
        "Cross-team API design partnership to keep data shapes aligned",
      ],
      stackDetail: [
        {
          tech: "Vue",
          reason: "Primary framework for product surfaces; expert-level reach."
        },
        {
          tech: "Lit",
          reason: "Where components need to be consumable from any framework or none."
        },
        {
          tech: "TypeScript",
          reason: "Public component APIs need to be self-documenting and refactor-safe."
        },
        {
          tech: "Monorepo",
          reason: "Multiple consumers, multiple frameworks, one source of truth for tokens and primitives."
        },
        {
          tech: "Go",
          reason: "Partnered with backend teams to debug Go services and optimize REST API design, keeping data delivery fast for the library's consumers."
        },
        {
          tech: "CircleCI",
          reason: "Versioning + publishing automation across the workspace."
        },
      ],
      gallery: [
        {
          src: "/assets/cisco-u-explore.png",
          caption: "Cisco U. Explore — the content-card grid consuming the library, with faceted filtering and sort"
        },
        {
          src: "/assets/cisco-u-store.png",
          caption: "Cisco U. Store — feature cards and purchase cards from the library, styled for pricing"
        },
        {
          src: "/assets/component-header-desktop.png",
          caption: "Header — desktop nav, shown here in its dark Store-page variant"
        },
        {
          src: "/assets/component-header-mobile.png",
          caption: "Header — mobile nav collapses the same primitive into a full-screen drawer"
        },
        {
          src: "/assets/component-content-cards.png",
          caption: "Content card — tutorial cards with badge, author, and metadata footer"
        },
        {
          src: "/assets/component-feature-cards.png",
          caption: "Feature card — tiered color treatment for subscription, bundle, and learning-path offers"
        },
        {
          src: "/assets/component-purchase-cards.png",
          caption: "Purchase card — three-tier plan comparison with feature lists and CTAs"
        },
        {
          src: "/assets/component-tabs.png",
          caption: "Tabs — plan-switcher tabs on the Store page"
        },
        {
          src: "/assets/component-select.png",
          caption: "Select — dropdown used for sort-by and filter controls"
        },
        {
          src: "/assets/component-icon-toggle.png",
          caption: "Icon toggle — segmented pill control for currency and grid/list view switches"
        },
      ],
      projectLinks: [
        { label: "Cisco U.", href: "https://u.cisco.com/", kind: "secondary" },
      ],
    },

    {
      id: "cisco-hackathon",
      title: "Code Quality AI (Hackathon)",
      year: "2024",
      stack: "Node.js · VS Code Extension API · LLM APIs",
      blurb: "Internal Cisco hackathon project: a VS Code extension that scans code repos and surfaces performance + style suggestions inline.",

      status: "ARCHIVED",
      tagline: "An internal hackathon prototype, built as a VS Code extension, that scans a repository and suggests performance + style improvements at the file and function level.",
      role: "Contributor · UI & LLM API integration",
      team: "Team hackathon · co-built and co-owned by the full internal team",
      screenshotNote: "no screenshots available — internal Cisco project",

      problem: [
        "Code review fatigue is real — the same stylistic and perf comments come up again and again across reviews. The interesting parts of a review (architecture, intent) get crowded out.",
      ],
      approach: [
        "Built as a VS Code extension that walks the open repo, classifies files, and runs targeted prompts per file type, surfacing suggestions inline in the editor. Output is structured so a reviewer can act on it without re-reading the diff. I built out the extension's display and organized its LLM API call layer.",
      ],
      outcome: [
        "Prototype won a slot in the next phase of the hackathon. The interesting finding: most of the value was in *consistency* — same standards applied across the whole repo at once — not in any single suggestion.",
        "Demoed the project live to the full engineering org.",
      ],
    },

    {
      id: "sports-warehouse",
      title: "Tennis Warehouse & Sibling Sites",
      year: "2013–2022",
      stack: "Custom tooling · HTML, JS, CSS · WCAG 2.2",
      blurb: "Built responsive, high-traffic e-commerce frontends across 12 sites, plus the internal tooling that let Product Managers ship mailers themselves without engineering intervention. Led the company's first WCAG audit across the Warehouse network.",
      role: "Frontend Engineer · UI Platform",
      duration: "9 years",
      team: "Cross-functional · multiple product teams",

      tagline: "Nine years building, shipping, and maintaining high-traffic global e-commerce frontends across Tennis Warehouse and its sibling sites — plus the tooling that let non-engineers ship safely.",

      problem: [
        "12 storefronts, one frontend team. Every mailer and campaign update went through engineering — PMs couldn't ship anything without filing a ticket first.",
        "Accessibility had never been addressed across the network. No audit, no standards, no baseline.",
      ],
      approach: [
        "Built internal mailer tooling that gave PMs direct control over email campaigns. Engineering handled the templates and guardrails; PMs shipped on their own schedule.",
        "Led the first WCAG audit across all 12 sites. Fixed issues at the platform level so every storefront improved at once rather than one at a time.",
      ],
      outcome: [
        "PMs could ship mailers without touching engineering, freeing the team for actual frontend work. Feature velocity across the network increased by 20%.",
        "The accessibility work had a side effect: Core Web Vitals and SEO scores improved by 25% across all sites.",
      ],
      metrics: [
        { label: "SITES", value: "12" },
        { label: "VELOCITY", value: "+20%" },
        { label: "PERF / SEO", value: "+25%" },
        { label: "TENURE", value: "9y" },
      ],
      screenshot: "/assets/tennis-warehouse.png",
      gallery: [
        {
          src: "/assets/tennis-warehouse-eu.png",
          caption: "Tennis Warehouse Europe — Europe focused tennis platform"
        },
        {
          src: "/assets/running-warehouse.png",
          caption: "Running Warehouse — US based running platform"
        },
        {
          src: "/assets/tackle-warehouse.png",
          caption: "Tackle Warehouse — Fishing focused platform"
        },
        {
          src: "/assets/tackle-bait-page.png",
          caption: "Bait & tackle PDP — Bait product page with color selection panel"
        },
        {
          src: "/assets/tackle-mobile.png",
          caption: "Mobile-first responsive layout across the network"
        },
        {
          src: "/assets/raquet-page.png",
          caption: "Racquet PDP — Racquet product page with detailed specifications"
        },
        {
          src: "/assets/skate-warehouse-builder.png",
          caption: "Skate Warehouse board builder — custom deck configuration tool"
        },
      ],
      projectLinks: [
        {
          label: "Tennis Warehouse",
          href: "https://www.tennis-warehouse.com/",
          kind: "primary"
        },
        {
          label: "Tennis Warehouse Europe",
          href: "https://www.tenniswarehouse-europe.com/",
          kind: "secondary"
        },
        {
          label: "Running Warehouse",
          href: "https://www.running-warehouse.com/",
          kind: "secondary"
        },
        {
          label: "Tackle Warehouse",
          href: "https://www.tacklewarehouse.com/",
          kind: "secondary"
        },
        {
          label: "Skate Warehouse",
          href: "https://www.skatewarehouse.com/",
          kind: "secondary"
        },
      ],
    },
  ],

  experience: [
    {
      id: "e1",
      co: "Experis at Cisco",
      role: "Senior Frontend Engineer · UI Platform",
      range: "2022 — present"
    },
    {
      id: "e2",
      co: "Sports Warehouse",
      role: "Frontend Web Developer",
      range: "2013 — 2022"
    },
    {
      id: "e3",
      co: "Independent",
      role: "Lead Barista · soft-skill foundation",
      range: "2006 — 2013"
    },
  ],

  email: "mailto:alexguizar90@gmail.com",
  resume: "/Alex-Guizar-Resume.pdf",
  links: [
    { label: "github", href: "https://github.com/Alex-Guizar" },
    { label: "linkedin", href: "https://www.linkedin.com/in/alexander-guizar-32649263/" },
    { label: "email", href: "mailto:alexguizar90@gmail.com" },
    { label: "resume", href: "/Alex-Guizar-Resume.pdf" },
  ],
};
