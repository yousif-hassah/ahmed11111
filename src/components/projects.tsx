import React, { useRef, useState, useEffect } from "react";
import { useScroll } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { PROJECTS_DATA, ProjectItem } from "../data/projectsData";
import { X, ExternalLink } from "lucide-react";

export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  // Lock background scroll when modal is open (especially on mobile)
  useEffect(() => {
    if (activeProject) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "relative";
      document.body.style.touchAction = "none";
      return () => {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.touchAction = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [activeProject]);

  // Global scroll tracking across the whole projects stacking sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="projects" className="relative bg-[#1E1E1E] text-white pt-16 pb-20">
      {/* ── Section Header ─────────────────────────────────────────── */}
      <div className="container mx-auto px-6 text-center mb-10 md:mb-14">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-3 flex items-center justify-center gap-3">
          <span className="w-8 h-[1px] bg-white/20" />
          <span>02 / Works</span>
          <span className="w-8 h-[1px] bg-white/20" />
        </p>

        <h2 className="font-playfair text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
          Featured Projects
        </h2>

        <p className="max-w-xl mx-auto text-sm md:text-base text-white/60 font-light leading-relaxed">
          A selected portfolio of directing, commercial campaigns, podcasts, and creative brand platforms.
        </p>
      </div>

      {/* ── Sticky Stacking Parallax Cards Container ───────────────── */}
      <div ref={containerRef} className="relative">
        {PROJECTS_DATA.map((project, i) => {
          const targetScale = 1 - (PROJECTS_DATA.length - i) * 0.045;
          const range: [number, number] = [i * (1 / PROJECTS_DATA.length), 1];

          return (
            <ProjectCard
              key={project.id}
              project={project}
              i={i}
              progress={scrollYProgress}
              range={range}
              targetScale={targetScale}
              onOpenModal={setActiveProject}
            />
          );
        })}
      </div>

      {/* ── Project Detail Modal ───────────────────────────────────── */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-md"
          onClick={() => setActiveProject(null)}
          style={{ touchAction: "auto" }}
        >
          <div
            className="bg-[#202226] border border-white/10 rounded-3xl max-w-3xl w-full max-h-[88vh] overflow-y-auto shadow-2xl text-white relative overscroll-contain"
            style={{ WebkitOverflowScrolling: "touch" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Banner */}
            <div className="h-60 md:h-72 w-full relative overflow-hidden bg-black/40">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#202226] via-transparent to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all duration-200"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                <span className="text-xs uppercase tracking-[0.2em] text-[#FF6B35] font-semibold">
                  {activeProject.category}
                </span>

                {activeProject.link && (
                  <a
                    href={activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-white/80 hover:text-white underline underline-offset-4"
                  >
                    <span>View External Work</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white">
                {activeProject.title}
              </h3>

              {/* Challenge / Concept */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50">
                  Concept &amp; Challenge
                </h4>
                <p className="text-sm md:text-base text-white/80 leading-relaxed font-light">
                  {activeProject.challenge}
                </p>
              </div>

              {/* Approach */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50">
                  Creative Direction
                </h4>
                <p className="text-sm md:text-base text-white/80 leading-relaxed font-light">
                  {activeProject.approach}
                </p>
              </div>

              {/* Result - Clean Editorial Format */}
              {activeProject.result && (
                <div className="space-y-1.5 pt-2 border-t border-white/10">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    Result &amp; Impact
                  </h4>
                  <p className="text-sm md:text-base text-white/90 leading-relaxed font-light">
                    {activeProject.result}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
