'use client';

import { useMemo, useState } from "react";
import styles from "./page.module.css";

type Idea = {
  title: string;
  description: string;
  tags: string[];
  pricePoint: string;
};

type StarterPack = {
  title: string;
  deliverables: string[];
  priceFloor: string;
  positioning: string;
};

type LaunchStep = {
  phase: string;
  focus: string;
  actions: string[];
};

type MarketingAngle = {
  label: string;
  copy: string;
};

const trendingIdeas: Idea[] = [
  {
    title: "Creator Automation Toolkit",
    description:
      "A plug-and-play bundle of Airtable bases, Make/Zapier recipes, and SOPs that help Gumroad sellers process orders, deliver bonuses, and nurture repeat buyers automatically.",
    tags: ["Airtable", "Automation", "Template"],
    pricePoint: "$59 starter · $129 pro",
  },
  {
    title: "AI Prompt Vault for Micro-SaaS Founders",
    description:
      "Curated prompt libraries, prompt-chaining canvases, and Notion dashboards that turn AI experiments into shipping velocity for indie SaaS teams.",
    tags: ["AI", "Notion", "Productivity"],
    pricePoint: "$39 base · $79 premium",
  },
  {
    title: "Digital Art Monetization Blueprint",
    description:
      "An actionable roadmap with pricing experiments, mini-course scripts, and launch emails that help illustrators convert art drops into recurring Gumroad revenue.",
    tags: ["Playbook", "Email Copy", "Art"],
    pricePoint: "$47 playbook · $97 deluxe",
  },
  {
    title: "Podcast B-Roll Factory",
    description:
      "A catalog of editable video templates, hooks, and YouTube Shorts scripts that let podcasters repackage every episode into viral-ready vertical clips.",
    tags: ["Video", "Scripts", "Repurposing"],
    pricePoint: "$69 pack · $149 agency license",
  },
];

const starterPacks: StarterPack[] = [
  {
    title: "Zero-to-Launch Weekend Lab",
    deliverables: [
      "Storyboard of the flagship digital product",
      "Landing page copy & checkout upsell ideas",
      "52-week retention content calendar",
    ],
    priceFloor: "$149",
    positioning: "For makers with an audience but no product yet.",
  },
  {
    title: "Recurring Revenue Upgrade",
    deliverables: [
      "Subscription tier matrix & cohort perks",
      "Automated onboarding email flow",
      "Community activation dashboard template",
    ],
    priceFloor: "$199",
    positioning: "For Gumroad sellers who want to layer in memberships.",
  },
  {
    title: "High-Ticket Launch Engine",
    deliverables: [
      "High-converting sales page outline",
      "12-day launch email & DM script sequence",
      "Interactive ROI calculator widget",
    ],
    priceFloor: "$249",
    positioning: "For consultants productizing premium systems.",
  },
];

const launchRoadmap: LaunchStep[] = [
  {
    phase: "Validate",
    focus: "Collect signals that the idea resonates before building assets.",
    actions: [
      "Run a 5-question survey to shortlist pains worth solving.",
      "Prototype the deliverable inside Notion or Canva, then share a walkthrough Loom.",
      "Pre-sell on Gumroad with limited founder pricing to fund the build.",
    ],
  },
  {
    phase: "Build",
    focus: "Layer leverage into the product so it feels premium on day one.",
    actions: [
      "Bundle core assets with quick-start videos and swipe files.",
      "Add 'implementation accelerators' like calculator templates or AI prompt sets.",
      "Craft onboarding emails that unlock extra value over the first 14 days.",
    ],
  },
  {
    phase: "Launch",
    focus: "Repurpose every touchpoint into momentum and social proof.",
    actions: [
      "Livestream a behind-the-scenes build session that ends with the release.",
      "Offer a two-tier anchor: base product + collaborator license upgrade.",
      "Collect first-week testimonials with a Notion form + automation zap.",
    ],
  },
  {
    phase: "Scale",
    focus: "Turn hits into systems that ship every quarter.",
    actions: [
      "Spin the product into a recurring drop (templates, prompts, case studies).",
      "Recruit affiliates with unique coupon codes and plug-and-play ad creative.",
      "Bundle previous drops into themed vaults for seasonal promos.",
    ],
  },
];

const marketingAngles: MarketingAngle[] = [
  {
    label: "Transformation Snapshot",
    copy: "Show the before → after using a 30-second screen recording paired with a bold promise. Make the first three steps feel unbelievably doable.",
  },
  {
    label: "Tiny Win Challenge",
    copy: "Offer a 48-hour micro-challenge that uses one slice of your product. Bundle a leaderboard template so creators publish their wins publicly.",
  },
  {
    label: "Ops Debt Stress Relief",
    copy: "Tap into the anxiety creators feel about admin tasks. Lead with a 'stop doing this manually' hook and hand them automated fixes.",
  },
  {
    label: "Signal Boost Bundle",
    copy: "Partner with 3 complementary makers, package your deliverables, and co-sell a 'launch pod' with shared promo assets and cross-referrals.",
  },
];

const audiences = [
  {
    id: "designer",
    label: "Indie Designers",
    pain: "need polished assets to sell without client work",
    bonus: "Figma components & brand style boards",
  },
  {
    id: "coach",
    label: "Business Coaches",
    pain: "want scalable playbooks beyond 1:1 sessions",
    bonus: "Cohort curriculum map + accountability tracker",
  },
  {
    id: "dev",
    label: "Indie Hackers",
    pain: "want fast validation before coding full products",
    bonus: "AI prompt workflows + launch KPIs dashboard",
  },
  {
    id: "artist",
    label: "Digital Artists",
    pain: "need monetization systems without galleries",
    bonus: "Limited edition launch kit + collector CRM",
  },
];

const formats = [
  {
    id: "template",
    label: "Template Stack",
    highlight: "Drag-and-drop workflows ship outcomes fast.",
  },
  {
    id: "miniCourse",
    label: "Mini Course",
    highlight: "Short, actionable videos reduce buyer overwhelm.",
  },
  {
    id: "playbook",
    label: "Playbook",
    highlight: "Step-by-step roadmaps create confidence instantly.",
  },
  {
    id: "swipe",
    label: "Swipe Files",
    highlight: "Ready-to-paste copy accelerates go-to-market.",
  },
];

const bonuses = [
  {
    id: "community",
    label: "Private community pop-up",
    perk: "host weekly co-working to keep momentum high",
  },
  {
    id: "automation",
    label: "Automation pack",
    perk: "deliver tool zaps so buyers feel immediate leverage",
  },
  {
    id: "analytics",
    label: "Scorecard dashboard",
    perk: "give them a notion/airtable tracker for wins",
  },
];

const formatTitleMap: Record<string, string> = {
  template: "Template Vault",
  miniCourse: "Sprint Mini-Course",
  playbook: "Blueprint Playbook",
  swipe: "Conversion Swipe File",
};

export default function Home() {
  const [audience, setAudience] = useState(audiences[0]);
  const [format, setFormat] = useState(formats[0]);
  const [bonus, setBonus] = useState(bonuses[0]);

  const generatedIdea = useMemo(() => {
    const title = `${audience.label} ${formatTitleMap[format.id]}`;
    const promise = `Help ${audience.label.toLowerCase()} ${audience.pain} using a ${format.label.toLowerCase()} that feels like a done-for-you system.`;
    const kit = `Bundle includes: ${format.highlight}, plus a bonus ${bonus.label.toLowerCase()} to ${bonus.perk}.`;
    const pitch = `Position it as the fastest path to paid results on Gamrod by packaging assets, tutorials, and accountability into one purchase.`;

    return {
      title,
      promise,
      kit,
      pitch,
    };
  }, [audience, format, bonus]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroBadge}>Gamrod Launch Lab</div>
          <h1>Spin up digital products that sell out on Gamrod.</h1>
          <p>
            Curated idea boards, ready-to-bundle starter packs, and a rapid
            ideation tool so you can ship your next hit without guessing. Built
            for makers, consultants, and indie creative teams.
          </p>
          <div className={styles.heroHighlights}>
            <span>30+ validated product angles</span>
            <span>Launch scripts & monetization ladders</span>
            <span>Instant idea generator</span>
          </div>
        </section>

        <section className={styles.section}>
          <header className={styles.sectionHeader}>
            <h2>Launch-ready product ideas</h2>
            <p>
              Borrow these high-converting concepts, remix the assets, and drop
              them on Gamrod with confidence.
            </p>
          </header>
          <div className={styles.cardGrid}>
            {trendingIdeas.map((idea) => (
              <article key={idea.title} className={styles.ideaCard}>
                <div className={styles.cardHeader}>
                  <h3>{idea.title}</h3>
                  <span className={styles.priceTag}>{idea.pricePoint}</span>
                </div>
                <p className={styles.cardBody}>{idea.description}</p>
                <ul className={styles.tagList}>
                  {idea.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <header className={styles.sectionHeader}>
            <h2>Starter packs that feel premium</h2>
            <p>
              Mix and match deliverables to build a high perceived-value bundle
              in a weekend.
            </p>
          </header>
          <div className={styles.packGrid}>
            {starterPacks.map((pack) => (
              <article key={pack.title} className={styles.packCard}>
                <h3>{pack.title}</h3>
                <p className={styles.packPositioning}>{pack.positioning}</p>
                <span className={styles.priceFloor}>
                  Anchor price: {pack.priceFloor}
                </span>
                <ul className={styles.deliverables}>
                  {pack.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.generator}>
          <div className={styles.generatorPanel}>
            <header>
              <h2>Idea generator</h2>
              <p>
                Pick a niche, choose a format, and instantly draft a Gamrod
                offer with built-in bonuses.
              </p>
            </header>
            <div className={styles.optionBlock}>
              <span>Audience</span>
              <div className={styles.optionChips}>
                {audiences.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAudience(item)}
                    className={
                      item.id === audience.id
                        ? styles.optionChipActive
                        : styles.optionChip
                    }
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.optionBlock}>
              <span>Format</span>
              <div className={styles.optionChips}>
                {formats.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFormat(item)}
                    className={
                      item.id === format.id
                        ? styles.optionChipActive
                        : styles.optionChip
                    }
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.optionBlock}>
              <span>Bonus Layer</span>
              <div className={styles.optionChips}>
                {bonuses.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setBonus(item)}
                    className={
                      item.id === bonus.id
                        ? styles.optionChipActive
                        : styles.optionChip
                    }
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.generatorResult}>
            <h3>{generatedIdea.title}</h3>
            <p>{generatedIdea.promise}</p>
            <p>{generatedIdea.kit}</p>
            <p>{generatedIdea.pitch}</p>
            <div className={styles.generatorNote}>
              Tip: Layer in a{" "}
              <strong>
                {bonus.label.toLowerCase()} for your first 25 buyers
              </strong>{" "}
              to create urgency and score social proof screenshots.
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <header className={styles.sectionHeader}>
            <h2>Marketing angles that convert</h2>
            <p>
              Use these copy frames across landing pages, launch threads, and
              creator collabs.
            </p>
          </header>
          <div className={styles.angleGrid}>
            {marketingAngles.map((angle) => (
              <article key={angle.label} className={styles.angleCard}>
                <h3>{angle.label}</h3>
                <p>{angle.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.roadmap}>
          <header className={styles.sectionHeader}>
            <h2>4-phase launch operating system</h2>
            <p>
              Follow this cadence to validate demand, ship quickly, and scale
              beyond your first drop.
            </p>
          </header>
          <ol className={styles.roadmapList}>
            {launchRoadmap.map((step) => (
              <li key={step.phase} className={styles.roadmapCard}>
                <div className={styles.roadmapPhase}>{step.phase}</div>
                <h3>{step.focus}</h3>
                <ul>
                  {step.actions.map((action) => (
                    <li key={action}>{action}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.footerCta}>
          <h2>Ready to launch your next Gamrod bestseller?</h2>
          <p>
            Pick an idea, remix the starter pack, and schedule a drop date this
            week. Momentum beats perfection.
          </p>
          <a
            className={styles.ctaButton}
            href="https://gumroad.com/"
            target="_blank"
            rel="noreferrer"
          >
            Ship it on Gamrod
          </a>
        </section>
      </main>
    </div>
  );
}
