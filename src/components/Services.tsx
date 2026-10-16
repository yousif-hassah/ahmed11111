import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Compass, Clapperboard, FileText, Lightbulb, Layers, X, ArrowUpRight } from 'lucide-react';

export interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  fullDetails: string;
  capabilities: string[];
  icon: React.ReactNode;
  gradient: string;
  desktopX: number; // Percentage (0-100)
  desktopY: number; // Percentage (0-100)
  mobileX: number;  // Mobile percentage (0-100)
  mobileY: number;  // Mobile percentage (0-100)
}

const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'creative-direction',
    title: 'CREATIVE DIRECTION',
    description: 'Shaping ideas into clear visual identities.',
    fullDetails:
      'Developing comprehensive visual identities, art directing campaigns from conception to final render, and establishing consistent artistic guidelines that define brand culture.',
    capabilities: [
      'Visual Identity & Branding',
      'Art Direction & Styling',
      'Concept Development',
      'Campaign Aesthetics',
    ],
    icon: <Compass className="w-5 h-5 text-white" />,
    gradient: 'from-purple-600 to-indigo-600',
    desktopX: 20,
    desktopY: 26,
    mobileX: 25,
    mobileY: 22,
  },
  {
    id: 'film-directing',
    title: 'FILM & VIDEO DIRECTING',
    description: 'Turning concepts into controlled and impactful visuals.',
    fullDetails:
      'Directing cinematic commercials, music videos, narrative films, and digital content with precise attention to camera movement, lighting, pace, and performance.',
    capabilities: [
      'Cinematic Directing',
      'Commercial Campaigns',
      'Pacing & Scene Composition',
      'On-Set Leadership',
    ],
    icon: <Clapperboard className="w-5 h-5 text-white" />,
    gradient: 'from-rose-600 to-orange-600',
    desktopX: 50,
    desktopY: 18,
    mobileX: 75,
    mobileY: 35,
  },
  {
    id: 'script-writing',
    title: 'SCRIPT & SCENARIO WRITING',
    description: 'Writing narratives that drive emotion and structure.',
    fullDetails:
      'Crafting storyboards, scriptwriting for films, shows, and podcasts. Structuring dialogue, character arcs, and emotional beats that deeply resonate with viewers.',
    capabilities: [
      'Screenwriting & Storyboarding',
      'Podcast Episode Scripts',
      'Narrative Arc Design',
      'Dialogue Crafting',
    ],
    icon: <FileText className="w-5 h-5 text-white" />,
    gradient: 'from-amber-500 to-orange-600',
    desktopX: 80,
    desktopY: 26,
    mobileX: 25,
    mobileY: 48,
  },
  {
    id: 'brand-storytelling',
    title: 'BRAND STORYTELLING',
    description: 'Telling brand stories through visuals and meaning.',
    fullDetails:
      'Connecting audiences to brand values through emotional visual storytelling. Transforming business goals into artistic short-form and long-form narrative content.',
    capabilities: [
      'Brand Voice & Message',
      'Documentary Shorts',
      'Emotional Engagement',
      'Content Strategy',
    ],
    icon: <Layers className="w-5 h-5 text-white" />,
    gradient: 'from-emerald-600 to-teal-600',
    desktopX: 75,
    desktopY: 74,
    mobileX: 75,
    mobileY: 62,
  },
  {
    id: 'concept-development',
    title: 'CONCEPT & IDEA DEVELOPMENT',
    description: 'Building strong ideas from insight to execution.',
    fullDetails:
      'Brainstorming raw ideas and refining them into actionable creative treatments. Analyzing audience insights to build unique pitches, proposals, and creative blueprints.',
    capabilities: [
      'Creative Treatments',
      'Ideation & Brainstorming',
      'Pitch Decks & Proposals',
      'Strategic Execution',
    ],
    icon: <Lightbulb className="w-5 h-5 text-white" />,
    gradient: 'from-yellow-500 to-amber-500',
    desktopX: 24,
    desktopY: 74,
    mobileX: 50,
    mobileY: 76,
  },
];

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardInnerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeModalService, setActiveModalService] = useState<ServiceDetail | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [pathLength, setPathLength] = useState<number>(3200);
  const [cardProgresses, setCardProgresses] = useState<number[]>([]);

  // Track viewport width (< 768px for Mobile)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeModalService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModalService]);

  // Measure SVG path length & compute card progress coordinates
  useEffect(() => {
    const measurePath = () => {
      if (!pathRef.current) return;
      const len = pathRef.current.getTotalLength();
      if (len && len > 0) {
        setPathLength(len);

        const SAMPLE_COUNT = 400;
        const samples: { x: number; y: number; progress: number }[] = [];
        for (let i = 0; i <= SAMPLE_COUNT; i++) {
          const progress = i / SAMPLE_COUNT;
          const pt = pathRef.current.getPointAtLength(progress * len);
          const px = (pt.x / 1000) * 100;
          const py = (pt.y / 600) * 100;
          samples.push({ x: px, y: py, progress });
        }

        const progresses = SERVICES_DATA.map((card) => {
          const cardX = isMobile ? card.mobileX : card.desktopX;
          const cardY = isMobile ? card.mobileY : card.desktopY;
          let minDist = Infinity;
          let bestProgress = 0;
          samples.forEach((sample) => {
            const dist = Math.hypot(sample.x - cardX, sample.y - cardY);
            if (dist < minDist) {
              minDist = dist;
              bestProgress = sample.progress;
            }
          });
          return bestProgress;
        });
        setCardProgresses(progresses);
      }
    };

    measurePath();
    const t1 = setTimeout(measurePath, 100);
    const t2 = setTimeout(measurePath, 500);

    window.addEventListener('resize', measurePath);
    return () => {
      window.removeEventListener('resize', measurePath);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isMobile]);

  // Framer Motion Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 70%'],
  });

  const strokeDashoffset = useTransform(scrollYProgress, [0, 1], [pathLength, 0]);

  // Update card highlights on scroll
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    cardRefs.current.forEach((cardEl, idx) => {
      if (!cardEl) return;
      const targetProgress = cardProgresses[idx] || 0;
      const isPassed = progress >= targetProgress - 0.02;
      const dist = progress - targetProgress;

      let scale = isMobile ? 0.78 : 0.85;
      let opacity = 0.45;
      let isHighlighted = false;

      if (isPassed) {
        scale = isMobile ? 1.0 : 1.08;
        opacity = 1;
        isHighlighted = true;
      } else if (dist > -0.15 && dist < 0) {
        const proximity = 1 - Math.abs(dist) / 0.15;
        scale = (isMobile ? 0.78 : 0.85) + proximity * (isMobile ? 0.22 : 0.23);
        opacity = 0.45 + proximity * 0.55;
        if (proximity > 0.5) isHighlighted = true;
      }

      cardEl.style.transform = `translate(-50%, -50%) scale(${scale})`;
      cardEl.style.opacity = String(opacity);

      const inner = cardInnerRefs.current[idx];
      if (inner) {
        if (isHighlighted) {
          inner.style.borderColor = 'rgba(255, 255, 255, 0.9)';
          inner.style.backgroundColor = '#2c2c2c';
          inner.style.boxShadow = '0 12px 35px rgba(0,0,0,0.6)';
        } else {
          inner.style.borderColor = 'rgba(255, 255, 255, 0.15)';
          inner.style.backgroundColor = '#222222';
          inner.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
        }
      }
    });
  });

  // Desktop: Organic multi-loop Bezier path matching reference artwork ("A DEDICATED TEAM...")
  const desktopPathD =
    'M 120 180 C 140 100, 240 90, 200 156 C 160 220, 320 60, 500 108 C 650 140, 750 60, 840 140 C 920 210, 880 300, 800 260 C 720 220, 920 340, 750 444 C 680 520, 840 540, 750 444 C 600 380, 400 560, 240 444 C 140 480, 180 340, 240 444 C 300 520, 60 360, 120 180';

  // Mobile: Clean vertical serpentine path designed specifically for mobile screen width
  const mobilePathD =
    'M 80 100 C 120 60, 220 70, 250 132 C 280 200, 550 130, 750 210 C 880 260, 480 240, 250 288 C 120 330, 520 320, 750 372 C 880 420, 680 480, 500 456 C 440 440, 420 470, 480 475';

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative w-full h-[90vh] md:h-screen min-h-[650px] py-12 md:py-24 overflow-hidden bg-[#1E1E1E] text-white flex items-center justify-center select-none"
    >
      {/* SVG Canvas covering full section */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
      >
        {/* Solid White Path bound to Framer Motion useScroll */}
        <motion.path
          ref={pathRef}
          d={isMobile ? mobilePathD : desktopPathD}
          fill="none"
          stroke="#ffffff"
          strokeWidth={isMobile ? '2.5' : '2'}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.85}
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset,
          }}
        />
      </svg>

      {/* Section Title Header (On Mobile: Top position, Title Only. On Desktop: Centered in Middle) */}
      <div className="absolute top-6 sm:top-10 md:top-1/2 left-1/2 -translate-x-1/2 md:-translate-y-1/2 text-center pointer-events-none z-10 max-w-xl px-4 w-full">
        <p className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-1.5 sm:mb-3 flex items-center justify-center gap-2 sm:gap-3">
          <span className="w-6 sm:w-8 h-[1px] bg-white/20" />
          <span>04 / Services</span>
          <span className="w-6 sm:w-8 h-[1px] bg-white/20" />
        </p>

        <h2 className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-none">
          MY SERVICES
        </h2>

        {/* Subtitle paragraph - Visible on Desktop, hidden on mobile */}
        <p className="hidden md:block text-xs sm:text-sm text-white/60 mt-3 font-light max-w-md mx-auto leading-relaxed">
          Directing, narrative crafting, visual identity, and strategic creative development.
        </p>
      </div>

      {/* Floating Cards Array */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {SERVICES_DATA.map((card, index) => {
          const posX = isMobile ? card.mobileX : card.desktopX;
          const posY = isMobile ? card.mobileY : card.desktopY;

          return (
            <div
              key={card.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="absolute pointer-events-auto cursor-pointer will-change-transform"
              style={{
                left: `${posX}%`,
                top: `${posY}%`,
                transform: 'translate(-50%, -50%) scale(0.85)',
                opacity: 0.45,
              }}
              onClick={() => setActiveModalService(card)}
            >
              <div
                ref={(el) => {
                  cardInnerRefs.current[index] = el;
                }}
                className="flex items-center gap-2 sm:gap-3 bg-[#222222] border border-white/15 rounded-2xl p-2 sm:p-3.5 shadow-2xl transition-all duration-200 hover:border-white max-w-[175px] xs:max-w-[210px] sm:max-w-[300px]"
              >
                {/* Graphic Icon Badge */}
                <div
                  className={`w-8 h-8 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shrink-0 shadow-md border border-white/20`}
                >
                  {card.icon}
                </div>

                {/* Title & Short Description */}
                <div className="flex flex-col pr-0.5 overflow-hidden">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="font-playfair text-[10px] sm:text-sm font-bold text-white tracking-wide uppercase truncate">
                      {card.title}
                    </h3>
                    <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/50 shrink-0" />
                  </div>
                  <p className="text-[9px] sm:text-[11px] text-white/60 truncate mt-0.5 font-light">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Rich Service Detail Modal ─────────────────────────────── */}
      {activeModalService && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-md pointer-events-auto overflow-y-auto"
          onClick={() => setActiveModalService(null)}
        >
          <div
            className="bg-[#202226] border border-white/15 rounded-2xl md:rounded-3xl max-w-xl w-full p-5 sm:p-6 md:p-8 shadow-2xl text-white relative animate-fade-in max-h-[90dvh] overflow-y-auto my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all cursor-pointer shadow-lg"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4 pr-10">
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activeModalService.gradient} flex items-center justify-center border border-white/20 shadow-lg shrink-0`}
              >
                {activeModalService.icon}
              </div>
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-white/50 font-semibold block mb-1">
                  Service Details
                </span>
                <h3 className="font-playfair text-xl md:text-2xl font-bold text-white">
                  {activeModalService.title}
                </h3>
              </div>
            </div>

            {/* Full Details Description */}
            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Overview &amp; Scope
              </h4>
              <p className="text-sm md:text-base text-white/80 leading-relaxed font-light">
                {activeModalService.fullDetails}
              </p>
            </div>

            {/* Capabilities */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Key Deliverables &amp; Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeModalService.capabilities.map((cap, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white/90 font-light"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Close Button */}
            <div className="pt-5 mt-6 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setActiveModalService(null)}
                className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs md:text-sm font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
