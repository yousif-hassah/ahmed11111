import React, { useRef } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ProjectItem } from "../data/projectsData";

interface ProjectCardProps {
  project: ProjectItem;
  i: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  onOpenModal: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  i,
  progress,
  range,
  targetScale,
  onOpenModal,
}) => {
  const cardContainerRef = useRef<HTMLDivElement>(null);

  // Global scale for the card stack
  const scale = useTransform(progress, range, [1, targetScale]);

  const isLight = !!project.isLight;

  return (
    <div
      ref={cardContainerRef}
      className="h-screen flex items-center justify-center sticky top-0 px-4 md:px-6 pointer-events-none"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-4% + ${i * 24}px)`,
          backgroundColor: project.color,
          willChange: "transform",
        }}
        className={`w-full max-w-5xl h-[530px] md:h-[490px] rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col md:flex-row gap-6 md:gap-10 relative overflow-hidden pointer-events-auto border transition-colors duration-300 ${
          isLight ? "border-black/10 text-neutral-900" : "border-white/10 text-white"
        }`}
      >
        {/* ── Left Column: Project Details ─────────────────── */}
        <div className="flex flex-col justify-between flex-1 z-10">
          <div>
            {/* Header: Minimalist clean category & index */}
            <div className="flex items-center justify-between mb-4">
              <span
                className={`text-xs uppercase tracking-[0.22em] font-semibold ${
                  isLight ? "text-neutral-700" : "text-white/60"
                }`}
              >
                {project.category}
              </span>
              <span
                className={`text-xs font-mono tracking-widest ${
                  isLight ? "text-neutral-500" : "text-white/40"
                }`}
              >
                0{project.id} / 08
              </span>
            </div>

            {/* Title */}
            <h3
              className={`font-playfair text-2xl md:text-3xl lg:text-4xl font-bold mb-3 tracking-tight leading-tight ${
                isLight ? "text-neutral-950" : "text-white"
              }`}
            >
              {project.title}
            </h3>

            {/* Description */}
            <p
              className={`text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-4 font-normal ${
                isLight ? "text-neutral-700" : "text-white/75"
              }`}
            >
              {project.challenge}
            </p>
          </div>

          {/* Action Buttons */}
          <div
            className={`flex flex-wrap items-center gap-3 pt-4 border-t ${
              isLight ? "border-black/10" : "border-white/10"
            }`}
          >
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 active:scale-95 shadow-md ${
                  isLight
                    ? "bg-[#111111] hover:bg-black text-white"
                    : "bg-[#FF6B35] hover:bg-[#ff7d4d] text-black"
                }`}
              >
                <span>View Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            ) : null}

            <button
              onClick={() => onOpenModal(project)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 border ${
                isLight
                  ? "bg-black/5 hover:bg-black/10 text-neutral-800 border-black/15"
                  : "bg-white/5 hover:bg-white/10 text-white/80 border-white/10"
              }`}
            >
              <span>Details &amp; Approach</span>
            </button>
          </div>
        </div>

        {/* ── Right Column: Image Container ────────────────── */}
        <div
          className={`flex-1 h-[210px] md:h-full rounded-2xl overflow-hidden relative border cursor-pointer group ${
            isLight ? "border-black/10 bg-black/10" : "border-white/10 bg-black/30"
          }`}
          onClick={() => onOpenModal(project)}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </motion.div>
    </div>
  );
};
