// Portfolio content — single source of truth for all site copy
export const PROFILE = {
  name: "Alex Guizar",
  handle: "alexguizar",
  role: "Senior Frontend Engineer",
  location: "California, USA",
  blurb: "Senior Frontend Engineer with 11+ years of experience building scalable UI infrastructure, design systems, and AI-augmented development workflows.",
  longBlurb: [
    "I build the layer between design and engineering — component libraries, design systems, and the tooling that lets product teams move fast without breaking things. Expert in Vue and React with a focus on framework-agnostic UI infrastructure that survives reorgs and rewrites.",
    "Lately I've been leaning hard into AI-augmented development: custom personas, prompt pipelines, and Claude/Cursor workflows that turn the boring parts of frontend work into a couple of keystrokes. I care about accessibility (WCAG 2.2), performance, and the kind of clean code that's still legible at 2 a.m.",
  ],
  now: [
    "Scaling Cisco's framework-agnostic component library — cut team time-to-delivery in half.",
    "Building AI personas and prompt pipelines for technical research and code review.",
    "Tracking rare drops in FFXIV with a dashboard I wrote so we'd stop using spreadsheets.",
    "Reading + writing about UI infrastructure at scale.",
  ],

  work: [
    {
      id: "ffxiv-tracker",
      title: "FFXIV Raid Tracker",
      year: "2024",
      stack: "Vue · Node.js · Axios",
      blurb: "A data-viz dashboard that pulls FFXIV's game APIs to track rare raid drops for a 12-person static — killing the shared spreadsheet for good.",
      status: "LIVE",
      tagline: "Replaced a 12-person shared spreadsheet with an automated dashboard that pulls live game data and tracks rare drops, attendance, and loot priority.",
      role: "Solo developer · designer · raid leader",
      duration: "Ongoing personal project",
      team: "Solo · serving a 12-person static",
      href: null,
      problem: [
        "Our 12-person raid static was tracking attendance, loot history, and rare-drop priority in a shared Google Sheet that nobody trusted by week three. Manual entry meant missing pulls, duplicated rows, and arguments about who was next in line for the chase drops.",
        "The official FFXIV APIs and community-maintained data sources had everything we needed — character profiles, gear, achievements — but nobody on the team wanted to wire them together by hand each week.",
      ],
      approach: [
        "Vue for the UI because it's what I reach for first and it makes data-driven dashboards painless. Node.js + Axios for a thin API layer that aggregates from XIVAPI, Lodestone scrapes, and our own loot ledger.",
        "Designed around the actual rhythm of a raid week: a pre-pull view (who's in, what they need), a live drop log we update during the night, and a priority table that recalculates itself from attendance + loot history. No more spreadsheet diffs at 2am.",
        "Kept the data layer separate from the visual layer so I could swap in new sources (a tier patch, a new raid) without rewriting the dashboard.",
      ],
      outcome: [
        "We retired the spreadsheet on week one and never went back. Drop disputes dropped to zero because the priority math is visible and deterministic.",
        "Side benefit: pretty graphs of our clear progression that we screenshot for the raid Discord every reset.",
      ],
      metrics: [
        { label: "RAIDERS", value: "12" },
        { label: "DROPS LOGGED", value: "400+" },
        { label: "DISPUTES", value: "0" },
        { label: "WEEKS LIVE", value: "52+" },
      ],
      features: [
        "Pulls live character + gear data from the FFXIV/XIVAPI endpoints",
        "Attendance + loot priority recalculated automatically each week",
        "Drop log with timestamps + boss + recipient",
        "Per-raider gear progression view (BiS vs. current)",
        "Discord-friendly screenshot mode for sharing clears",
      ],
      stackDetail: [
        { tech: "Vue", reason: "Reactivity model is perfect for a dashboard where everything depends on everything else." },
        { tech: "Node.js", reason: "Lightweight server to aggregate from multiple game-data endpoints and cache responses." },
        { tech: "Axios", reason: "Simple HTTP client with interceptors for rate-limit handling against XIVAPI." },
      ],
      gallery: [
        { caption: "The week-summary view — attendance, drops, and priority at a glance" },
        { caption: "Per-raider gear progression: BiS items in green, missing in dim" },
        { caption: "Drop log with priority math shown inline" },
      ],
    },

    {
      id: "cisco-component-library",
      title: "Cisco Component Library",
      year: "2022–present",
      stack: "Vue · Lit · TypeScript · Monorepo",
      blurb: "Re-engineered Cisco's framework-agnostic component library and the workflows around it, cutting team time-to-delivery by 50%.",
      status: "LIVE",
      tagline: "Took ownership of an internal component library used across multiple product teams, rebuilt the workflows around it, and cut their time-to-delivery in half.",
      role: "Owner · platform engineer",
      duration: "2+ years (ongoing)",
      team: "Cross-functional · multiple product teams as consumers",
      problem: [
        "Cisco product teams were duplicating frontend work — each shipping its own buttons, modals, forms, and accessibility patterns, each at a different level of quality. The existing component library was framework-agnostic in theory but painful to consume in practice.",
        "Teams routed around it instead of through it. That meant inconsistent UI, redundant a11y work, and weeks lost on integration friction every quarter.",
      ],
      approach: [
        "Assumed ownership of the library and audited every consumer's pain points before changing a line of code. Rebuilt the workflows — versioning, publishing, docs, demos — around what teams actually needed instead of what was easy to maintain.",
        "Built a Component Downloader tool that lets teams sync the design system to their own stack instantly, solving the legacy bottleneck that was the single biggest source of integration friction.",
        "Set engineering standards (code review patterns, accessibility checks, performance budgets) so the library stays consistent as more contributors land in it.",
      ],
      outcome: [
        "Time-to-delivery for new UI features across consuming teams dropped by ~50%.",
        "WCAG 2.2 compliance became a property of the library, not a checklist every team has to redo.",
        "Library adoption stopped being a question — teams now reach for it first because it's faster than rolling their own.",
      ],
      metrics: [
        { label: "TIME-TO-SHIP", value: "−50%" },
        { label: "TEAMS", value: "Multiple" },
        { label: "WCAG", value: "2.2" },
        { label: "FRAMEWORKS", value: "Vue · React · Lit" },
      ],
      features: [
        "Framework-agnostic components consumable from Vue, React, and vanilla Lit",
        "Component Downloader tool for instant cross-workflow sync",
        "WCAG 2.2 compliance baked in at the primitive level",
        "Mixpanel telemetry + replay tracking to find real friction in usage",
        "Cross-team API design partnership to keep data shapes aligned",
      ],
      stackDetail: [
        { tech: "Vue", reason: "Primary framework for product surfaces; expert-level reach." },
        { tech: "Lit", reason: "Where components need to be consumable from any framework or none." },
        { tech: "TypeScript", reason: "Public component APIs need to be self-documenting and refactor-safe." },
        { tech: "Monorepo", reason: "Multiple consumers, multiple frameworks, one source of truth for tokens and primitives." },
        { tech: "CircleCI", reason: "Versioning + publishing automation across the workspace." },
      ],
    },

    {
      id: "ai-dev-pipelines",
      title: "AI-Enhanced Dev Pipelines",
      year: "2024",
      stack: "Claude · Cursor · Prompt Engineering",
      blurb: "Custom AI personas + context files that compress technical research and code review into minutes instead of hours.",
      status: "IN-PROGRESS",
      tagline: "A library of AI personas and project context files that I drop into Claude/Cursor for specific task shapes — research, review, refactor, debug.",
      problem: [
        "Generic LLM prompts give generic LLM output. For real engineering work — design system trade-offs, accessibility audits, performance investigations — I needed the model to come pre-loaded with the right context, the right reference patterns, and the right standards.",
      ],
      approach: [
        "Wrote a set of personas (\"design-system reviewer,\" \"a11y auditor,\" \"performance investigator\") with explicit context, example outputs, and the patterns I actually want surfaced. Versioned them like code.",
        "Added project-specific context files that ride along with the persona so the model knows which codebase, which standards, which team conventions matter.",
      ],
      outcome: [
        "Daily output on complex design and review tasks is meaningfully faster — the model arrives at \"useful\" in one prompt instead of three.",
        "Side effect: the personas double as documentation. New team members read them to learn what \"good\" looks like here.",
      ],
      features: [
        "Persona library for design-system review, a11y audit, performance investigation",
        "Project context files that travel with the persona",
        "Versioned and shareable across the team",
      ],
    },
  ],

  experience: [
    { id: "e1", co: "Experis at Cisco", role: "Senior Frontend Engineer · UI Platform", range: "2022 — present" },
    { id: "e2", co: "Sports Warehouse", role: "Frontend Web Developer", range: "2013 — 2022" },
    { id: "e3", co: "Independent", role: "Lead Barista · soft-skill foundation", range: "2006 — 2013" },
  ],

  links: [
    { label: "github", href: "https://github.com/alexguizar" },
    { label: "linkedin", href: "https://www.linkedin.com/in/alexguizar/" },
    { label: "email", href: "mailto:alexguizar90@gmail.com" },
    { label: "resume", href: "Alex-Guizar-Resume.pdf" },
  ],
};
