import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './ScatteredGallery.css';

gsap.registerPlugin(ScrollTrigger);

interface DirectionVector {
  x: number;
  y: number;
}

const DIRECTION_VECTORS: DirectionVector[] = [
  { x: -0.75, y: -0.6 },
  { x: 0.75, y: -0.5 },
  { x: -0.85, y: 0.4 },
  { x: 0.8, y: 0.6 },
  { x: -0.4, y: -0.8 },
  { x: 0.45, y: -0.75 },
  { x: -0.55, y: 0.7 },
  { x: 0.6, y: 0.65 },
];

const GALLERY_IMAGES = [
  '/green_tunnel_hero.jpg',
  '/5343831866722683794_121.jpg',
  '/5343831866722683814_119.jpg',
  '/5343831866722683834_121.jpg',
  '/B5343528684981259896_121.jpg',
  '/M5343831866722683736_119.jpg',
  '/PH5343831866722683791_121.jpg',
  '/Q5343831866722683772_121.jpg',
];

const LOCAL_VIDEO_SRC = '/tunnel_video.mp4';
const REMOTE_VIDEO_SRC = 'https://cdn.coverr.co/videos/coverr-walking-through-a-tunnel-5636/1080p.mp4';

export const ScatteredGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const galleryImagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const coverImageRef = useRef<HTMLDivElement>(null);
  const helloTitleRef = useRef<HTMLHeadingElement>(null);
  const storyTitleRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!spotlightRef.current) return;

    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    // 1. Lenis Smooth Scroll Engine Initialization
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const getMultiplier = () => (window.innerWidth < 768 ? 1.5 : 1.0);

      // Initial Image & Title States
      galleryImagesRef.current.forEach((imgEl) => {
        if (!imgEl) return;
        gsap.set(imgEl, {
          x: 0,
          y: 0,
          z: -2000,
          scale: 0,
          opacity: 0,
          rotationX: 0,
          rotationY: 0,
        });
      });

      if (coverImageRef.current) {
        gsap.set(coverImageRef.current, {
          z: -1200,
          scale: 0.35,
          opacity: 0,
          borderRadius: '24px',
        });
      }

      if (helloTitleRef.current) {
        gsap.set(helloTitleRef.current, { opacity: 1, y: 0 });
      }

      if (storyTitleRef.current) {
        gsap.set(storyTitleRef.current, { opacity: 0, y: 40 });
      }

      // 2. Fast & Snappy Pinning Sequence
      ScrollTrigger.create({
        trigger: spotlightRef.current,
        start: 'top top',
        end: '+=240%',
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          const multiplier = getMultiplier();
          const screenW = window.innerWidth;
          const screenH = window.innerHeight;

          // Background stays strictly #1E1E1E
          if (spotlightRef.current) {
            spotlightRef.current.style.backgroundColor = '#1E1E1E';
          }

          // --- Stage 1: Scatter Gallery Images (0% to 65% progress) ---
          const totalImages = GALLERY_IMAGES.length;
          galleryImagesRef.current.forEach((imgEl, index) => {
            if (!imgEl) return;
            const vector = DIRECTION_VECTORS[index % DIRECTION_VECTORS.length];
            const staggerOffset = (index / totalImages) * 0.22;
            const scatterDuration = 0.45;

            const imgProgress = Math.max(
              0,
              Math.min(1, (progress - staggerOffset) / scatterDuration)
            );

            if (imgProgress > 0) {
              const x = vector.x * screenW * 0.65 * multiplier * imgProgress;
              const y = vector.y * screenH * 0.65 * multiplier * imgProgress;
              const z = -2000 + imgProgress * 2800;

              const scale =
                imgProgress <= 0.15
                  ? imgProgress * 6.66
                  : 1 + (imgProgress - 0.15) * 0.2;

              let opacity = 1;
              if (imgProgress <= 0.08) {
                opacity = imgProgress / 0.08;
              } else if (imgProgress >= 0.8) {
                opacity = Math.max(0, (1 - imgProgress) / 0.2);
              }

              const rotationX = vector.y * 25 * imgProgress;
              const rotationY = -vector.x * 25 * imgProgress;

              gsap.set(imgEl, {
                x,
                y,
                z,
                scale,
                opacity,
                rotationX,
                rotationY,
              });
            } else {
              gsap.set(imgEl, { opacity: 0, scale: 0, z: -2000 });
            }
          });

          // --- Stage 2: Hero Video Cover Scales to 100% Viewport (35% to 85% progress) ---
          const coverProgress = Math.max(
            0,
            Math.min(1, (progress - 0.35) / 0.5)
          );
          if (coverImageRef.current) {
            if (coverProgress > 0) {
              const coverZ = -1200 + coverProgress * 1200;
              const coverScale = 0.35 + coverProgress * 0.65;
              const coverOpacity = Math.min(1, coverProgress * 2);
              const borderRadius = `${(1 - coverProgress) * 24}px`;

              gsap.set(coverImageRef.current, {
                z: coverZ,
                scale: coverScale,
                opacity: coverOpacity,
                borderRadius,
              });
            } else {
              gsap.set(coverImageRef.current, {
                z: -1200,
                scale: 0.35,
                opacity: 0,
                borderRadius: '24px',
              });
            }
          }

          // --- Stage 3: Title Transition ('Hello' fades out, 'The story begins here' fades in) ---
          if (helloTitleRef.current) {
            const helloOpacity = Math.max(0, 1 - progress * 2.5);
            gsap.set(helloTitleRef.current, {
              opacity: helloOpacity,
              y: -progress * 40,
            });
          }

          if (storyTitleRef.current) {
            const storyProgress = Math.max(
              0,
              Math.min(1, (progress - 0.6) / 0.4)
            );
            gsap.set(storyTitleRef.current, {
              opacity: storyProgress,
              y: (1 - storyProgress) * 40,
            });
          }
        },
      });
    }, containerRef);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert();
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="scattered-gallery-container" ref={containerRef}>
      {/* Pinned Spotlight Hero Section */}
      <section className="spotlight-hero-section" ref={spotlightRef} id="hero">
        {/* 3D Scattered Gallery Canvas */}
        <div className="spotlight-images">
          {GALLERY_IMAGES.map((src, i) => (
            <div
              key={`gallery-img-${i}`}
              className="gallery-image"
              ref={(el) => (galleryImagesRef.current[i] = el)}
            >
              <img src={src} alt="" loading="eager" />
            </div>
          ))}
        </div>

        {/* Final Video Background */}
        <div className="hero-cover-bg" ref={coverImageRef}>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster="/green_tunnel_hero.jpg"
            className="hero-video-element"
          >
            <source src={LOCAL_VIDEO_SRC} type="video/mp4" />
            <source src={REMOTE_VIDEO_SRC} type="video/mp4" />
            <img src="/green_tunnel_hero.jpg" alt="Hero Background" />
          </video>
          <div className="hero-bg-overlay" />
        </div>

        {/* Initial Entry Title: 'Hello' in font 'Oi' */}
        <div className="hero-content-bottom">
          <h1 className="title-hello" ref={helloTitleRef}>
            Hello
          </h1>
          <h1 className="title-story" ref={storyTitleRef}>
            The story begins here
          </h1>
        </div>
      </section>
    </div>
  );
};

export default ScatteredGallery;
