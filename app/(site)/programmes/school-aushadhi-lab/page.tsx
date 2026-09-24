import { SectionBadge } from "@/components/composition/SectionBadge";
import { HalftoneBackground } from "@/components/composition/HalftoneBackground";
import { Leaf, Sprout, HeartPulse, GraduationCap, ShieldCheck, TreePine, Beaker, Recycle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "School Aushadhi Lab | One Vision",
  description: "Decentralized Living Herbal Sanctuaries, Ethnobotanical Bio-Commons, and Planetary One Health Pedagogy across 50 Schools of Manipur.",
};

const coreGoals = [
  {
    icon: <Leaf className="w-6 h-6 text-primary" />,
    title: "In-Situ Conservation",
    description: "Establishing permanent gene banks protecting 20 critical medicinal taxa, emphasizing vulnerable endemic species like Paris polyphylla."
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-primary" />,
    title: "Pedagogical Transformation",
    description: "Training 5,000 certified 'One Health Junior Fellows' integrating hands-on ethnobotany into the National Education Policy."
  },
  {
    icon: <HeartPulse className="w-6 h-6 text-primary" />,
    title: "Nutritional Security",
    description: "Synergizing garden yields (Moringa, Amla) directly with PM POSHAN meals to address pediatric anemia and micronutrient deficiencies."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    title: "Biocultural Safeguarding",
    description: "Connecting youth with traditional Meitei healers (Maibas/Maibis) to preserve indigenous pharmacology through QR field tagging."
  }
];

const zones = [
  { name: "Central Timber Agora", desc: "Raised timber deck for open-air Socratic amphitheater and ethnobotanical seminars.", flora: "Native climbing vines (*Shatavari*)" },
  { name: "Zone 1: Respiratory & Immune", desc: "Sunny, well-drained loam for anti-tussive and bronchodilatory study.", flora: "Ocimum sanctum (Tulsi), Adhatoda vasica (Adusa)" },
  { name: "Zone 2: Neuro-Adaptogenic", desc: "Moist, semi-shaded basin for cognitive tonic education.", flora: "Bacopa monnieri (Brahmi), Centella asiatica (Peruk)" },
  { name: "Zone 3: Hepatic & Metabolic", desc: "Friable sandy loam for bitter alkaloid study and seasonal viral prophylaxis.", flora: "Andrographis paniculata (Kalmegh), Phyllanthus niruri" },
  { name: "Zone 4: Meitei Rhizomes", desc: "Deep rich leaf mould for traditional starch processing and gut health.", flora: "Curcuma angustifolia (Tikhur), Acorus calamus (Vacha)" },
];

export default function SchoolAushadhiLabPage() {
  return (
    <div className="flex flex-col w-full bg-background pt-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-background border-b border-border">
        <HalftoneBackground />
        <div className="container mx-auto px-4 md:px-12 max-w-6xl relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <SectionBadge>
                Project Proposal
              </SectionBadge>
              <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                Seeking Funding
              </span>
            </div>
            
            <h1 className="font-fraunces text-6xl md:text-8xl font-light leading-none tracking-tight text-foreground mb-8">
              School <br/> Aushadhi Lab
            </h1>
            <p className="font-inter text-xl text-muted-foreground leading-relaxed font-light max-w-3xl mb-12">
              Decentralized Living Herbal Sanctuaries, Ethnobotanical Bio-Commons, and Planetary One Health Pedagogy across 50 Schools of Manipur. A modern transformation designed under the ethos of Nordic Lagom functional minimalism and zero-waste circularity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-none bg-primary px-8 py-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
                Partner with us
              </Link>
              <a href="/pdf/School_Aushadhi_Lab_Manipur_Lagom_Proposal.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-none border border-input bg-background px-8 py-4 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
                Read Full Proposal (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lagom Principles */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            <div>
              <h2 className="font-fraunces text-4xl md:text-5xl font-light tracking-tight mb-8 text-foreground">
                The Lagom Framework
              </h2>
              <p className="font-inter text-lg text-muted-foreground leading-relaxed">
                Inte för mycket, inte för lite, utan precis lagom. (Not too much, not too little, just right). We integrate the ecological defense ethos of Greenpeace with the systemic rigor of the WHO.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="border-l border-primary/20 pl-6">
                <Beaker className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-inter font-medium text-foreground mb-2">Functional Equilibrium</h3>
                <p className="text-sm text-muted-foreground">Every plant and pathway fulfills a specific ecological or therapeutic purpose. Unnecessary synthetic ornamentation is eliminated.</p>
              </div>
              <div className="border-l border-primary/20 pl-6">
                <TreePine className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-inter font-medium text-foreground mb-2">Organic Materiality</h3>
                <p className="text-sm text-muted-foreground">Utilizing local seasoned bamboo, river stones, and natural pine resin treatments harmonizing with local biology.</p>
              </div>
              <div className="border-l border-primary/20 pl-6">
                <Recycle className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-inter font-medium text-foreground mb-2">Circular Metabolism</h3>
                <p className="text-sm text-muted-foreground">Zero-waste resource flows cycle on-site biomass through vermicomposting, bio-char, and rainwater recharge bioswales.</p>
              </div>
              <div className="border-l border-primary/20 pl-6">
                <Sprout className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-inter font-medium text-foreground mb-2">Visual Restraint</h3>
                <p className="text-sm text-muted-foreground">Clear spatial zoning gives each specimen room to thrive while providing calm pedagogical spaces for open-air inquiry.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Goals */}
      <section className="py-24 bg-background border-y border-border">
        <div className="container mx-auto px-4 md:px-12 max-w-6xl">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <SectionBadge className="mb-6 mx-auto">Core Strategic Goals</SectionBadge>
            <h2 className="font-fraunces text-4xl md:text-5xl font-light tracking-tight text-foreground">
              A Systemic Impact Architecture
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreGoals.map((goal, i) => (
              <div key={i} className="flex flex-col p-8 bg-muted/20 border border-border/50 hover:border-primary/30 transition-colors">
                <div className="mb-6">{goal.icon}</div>
                <h3 className="font-inter text-lg font-medium text-foreground mb-3">{goal.title}</h3>
                <p className="font-inter text-sm text-muted-foreground leading-relaxed">{goal.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spatial Layout */}
      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-4 md:px-12 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <h2 className="font-fraunces text-4xl font-light tracking-tight mb-6">
                Biophysical Layout (500m²)
              </h2>
              <p className="font-inter text-muted text-lg leading-relaxed mb-8 opacity-80">
                Each campus plot is partitioned into five specialized ecological zones surrounding a central timber agora, providing clear sightlines and tailored microclimates.
              </p>
            </div>
            
            <div className="lg:w-2/3">
              <div className="flex flex-col space-y-4">
                {zones.map((zone, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-start justify-between border-b border-background/20 pb-6 pt-4">
                    <div className="sm:w-1/2 pr-4 mb-2 sm:mb-0">
                      <h3 className="font-inter text-lg font-medium text-primary mb-1">{zone.name}</h3>
                      <p className="text-sm opacity-70 leading-relaxed">{zone.desc}</p>
                    </div>
                    <div className="sm:w-1/2 sm:text-right">
                      <p className="font-inter text-sm font-medium italic opacity-90">{zone.flora}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Implementation Roadmap */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-12 max-w-6xl">
           <div className="mb-16 max-w-2xl">
            <h2 className="font-fraunces text-4xl md:text-5xl font-light tracking-tight mb-6 text-foreground">
              5-Year Resilience Roadmap
            </h2>
            <p className="font-inter text-lg text-muted-foreground leading-relaxed">
              From initial bio-inception to full autonomous school stewardship by the Herbal Garden Management Committee (HGMC).
            </p>
          </div>
          
          <div className="relative border-l border-primary/20 pl-8 ml-4 md:ml-8 space-y-12">
            
            <div className="relative">
              <div className="absolute -left-10.25 top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-background"></div>
              <p className="font-inter text-xs font-bold uppercase tracking-wider text-primary mb-2">Year 1 (2026)</p>
              <h3 className="font-fraunces text-2xl font-light text-foreground mb-2">Bio-Inception</h3>
              <p className="text-muted-foreground text-sm max-w-2xl">Ground establishment. Soil remediation with bio-char, bamboo fencing, bioswale digging, planting 10,000 hardened saplings.</p>
            </div>
            
            <div className="relative">
              <div className="absolute -left-10.25 top-1.5 h-4 w-4 rounded-full border-2 border-primary/40 bg-background"></div>
              <p className="font-inter text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Year 2 (2027)</p>
              <h3 className="font-fraunces text-2xl font-light text-foreground mb-2">Systemic Pedagogy</h3>
              <p className="text-muted-foreground text-sm max-w-2xl">Installing QR tags, launching Junior Fellows program, integrating Moringa into PM POSHAN meals.</p>
            </div>
            
            <div className="relative">
              <div className="absolute -left-10.25 top-1.5 h-4 w-4 rounded-full border-2 border-primary/40 bg-background"></div>
              <p className="font-inter text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Year 3 (2028)</p>
              <h3 className="font-fraunces text-2xl font-light text-foreground mb-2">Community Weaving</h3>
              <p className="text-muted-foreground text-sm max-w-2xl">Hosting 200 Maiba/Maibi masterclasses, running seed exchanges, spraying organic Neemastra.</p>
            </div>
            
            <div className="relative">
              <div className="absolute -left-10.25 top-1.5 h-4 w-4 rounded-full border-2 border-primary/40 bg-background"></div>
              <p className="font-inter text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Year 4 (2029)</p>
              <h3 className="font-fraunces text-2xl font-light text-foreground mb-2">Value Creation</h3>
              <p className="text-muted-foreground text-sm max-w-2xl">Training students in solar leaf drying and herbal teas; launching nursery seedling sales for school funds.</p>
            </div>
            
            <div className="relative">
              <div className="absolute -left-10.25 top-1.5 h-4 w-4 rounded-full border-2 border-primary/40 bg-background"></div>
              <p className="font-inter text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Year 5 (2030)</p>
              <h3 className="font-fraunces text-2xl font-light text-foreground mb-2">Autonomy</h3>
              <p className="text-muted-foreground text-sm max-w-2xl">Publishing the Manipur Ethnobotanical Atlas, final financial audits, transferring 100% management to local HGMC.</p>
            </div>
            
          </div>
        </div>
      </section>

    </div>
  );
}
