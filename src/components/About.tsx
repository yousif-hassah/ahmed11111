import React, { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

// ── Keywords & highlight colors ──────────────────────────────────────────────
const KEYWORDS: Record<string, string> = {
  writer:      "#FF6B35",
  director:    "#7C3AED",
  visual:      "#10B981",
  identity:    "#F59E0B",
  authentic:   "#EF4444",
  creative:    "#3B82F6",
  campaigns:   "#8B5CF6",
  experiences: "#06B6D4",
  baghdad:     "#F97316",
  riyadh:      "#84CC16",
  cairo:       "#EC4899",
  art:         "#14B8A6",
  advertising: "#6366F1",
  fantasy:     "#A855F7",
  podcasts:    "#22C55E",
  content:     "#F43F5E",
  value:       "#0EA5E9",
  meaning:     "#D946EF",
  directing:   "#FB923C",
  writing:     "#34D399",
  crafts:      "#FBBF24",
  programs:    "#E879F9",
};

const PARAGRAPHS = [
  "I'm Ahmed Hassan Ahmed, a writer and director who crafts ideas through a visual language with a clear identity and an authentic spirit.",
  "I build creative campaigns from concept to image, transforming messages into experiences that truly connect with the viewer.",
  "My experience spans inside and outside Iraq — from Baghdad to Riyadh and Cairo — across projects that blend art with advertising, and reality with fantasy.",
  "I specialize in writing and directing podcasts and programs for content creators, shaping each episode with a voice that reflects the mindset and journey of every guest, and delivering content that carries real value and meaning.",
];

const SKILLS = [
  { label: "Directing & Visual Storytelling", color: "#FF6B35" },
  { label: "Podcast Writing & Production",    color: "#7C3AED" },
  { label: "Art-Driven Brand Development",    color: "#10B981" },
  { label: "Magical Realism & Symbolic Narrative", color: "#F59E0B" },
  { label: "Educational & Creative Projects", color: "#06B6D4" },
];

interface WordToken {
  text:       string;
  normalized: string;
  isKeyword:  boolean;
  color?:     string;
  paraIndex:  number;
}

function buildTokens(paragraphs: string[]): WordToken[] {
  const tokens: WordToken[] = [];
  paragraphs.forEach((para, pi) => {
    para.split(/\s+/).filter(Boolean).forEach((word) => {
      const normalized = word.toLowerCase().replace(/[^\w]/g, "");
      const color      = KEYWORDS[normalized];
      tokens.push({ text: word, normalized, isKeyword: !!color, color, paraIndex: pi });
    });
  });
  return tokens;
}

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const outerRefs    = useRef<(HTMLDivElement  | null)[]>([]);
  const innerRefs    = useRef<(HTMLSpanElement | null)[]>([]);

  const tokens = useMemo(() => buildTokens(PARAGRAPHS), []);

  const byPara = useMemo(() => {
    const groups: (WordToken & { gi: number })[][] = PARAGRAPHS.map(() => []);
    let gi = 0;
    PARAGRAPHS.forEach((_, pi) => {
      PARAGRAPHS[pi].split(/\s+/).filter(Boolean).forEach(() => {
        groups[pi].push({ ...tokens[gi], gi });
        gi++;
      });
    });
    return groups;
  }, [tokens]);

  useEffect(() => {
    const wordCount = tokens.length;
    const outers    = outerRefs.current;
    const inners    = innerRefs.current;

    // Initial hidden word styles
    outers.forEach((el) => {
      if (!el) return;
      gsap.set(el, { opacity: 0 });
      el.style.setProperty("--bg-opacity", "1");
    });
    inners.forEach((el) => { if (el) gsap.set(el, { opacity: 0 }); });

    const ctx = gsap.context(() => {
      // Natural viewport-driven ScrollTrigger without locking the screen or creating dead space
      ScrollTrigger.create({
        trigger: containerRef.current,
        start:   "top 80%",
        end:     "bottom 70%",
        scrub:   0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          const revealProgress = Math.min(1, progress * 1.15);
          const overlapRatio   = 10 / wordCount;

          outers.forEach((outer, i) => {
            if (!outer || !inners[i]) return;
            const start        = (i / wordCount) * (1 - overlapRatio);
            const end          = start + 1 / wordCount + overlapRatio;
            const wordProgress = Math.max(0, Math.min(1, (revealProgress - start) / (end - start)));

            // Outer pill opacity
            gsap.set(outer, { opacity: wordProgress });

            // Background pill fades out in final 12% of each word's reveal
            const bgOpacity = wordProgress >= 0.88
              ? 1 - Math.max(0, (wordProgress - 0.88) / 0.12)
              : 1;
            outer.style.setProperty("--bg-opacity", String(bgOpacity));

            // Inner text smoothly fades in with sqrt curve
            const textOpacity = wordProgress >= 0.88
              ? Math.sqrt((wordProgress - 0.88) / 0.12)
              : 0;
            gsap.set(inners[i], { opacity: textOpacity });
          });
        },
      });
    }, containerRef);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, [tokens]);

  let gi = 0;

  return (
    <div className="anim-text-container" ref={containerRef} id="about">
      <div className="anim-text-inner">

        {/* Section Label */}
        <p className="about-label">About</p>

        {/* Heading */}
        <h2 className="about-heading">About Me</h2>

        {/* Animated text blocks */}
        <div className="anim-text">
          {byPara.map((group, pi) => (
            <p key={pi} className="anim-paragraph">
              {group.map((token) => {
                const idx = gi++;
                return (
                  <div
                    key={idx}
                    className={`word${token.isKeyword ? " keyword-wrapper" : ""}`}
                    style={token.isKeyword ? ({ "--kw-color": token.color } as React.CSSProperties) : undefined}
                    ref={(el) => { outerRefs.current[idx] = el; }}
                  >
                    <span
                      className={token.isKeyword ? `keyword keyword-${token.normalized}` : ""}
                      ref={(el) => { innerRefs.current[idx] = el; }}
                    >
                      {token.text}
                    </span>
                  </div>
                );
              })}
            </p>
          ))}
        </div>

        {/* Dedicated Skills Section */}
        <div className="about-skills-container">
          <h3 className="about-skills-title">Skills</h3>
          <div className="about-skills-list">
            {SKILLS.map(({ label, color }) => (
              <div key={label} className="about-skill-item">
                <span className="about-skill-dot" style={{ background: color }} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
