

import React from "react";
import ModelViewer from "../../public/ModelViewer";

const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Abstract shapes for background */}
      <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-black opacity-20"></div>
      <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-black opacity-10"></div>

      <div className="container mx-auto px-6 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6 animate-fade-in">
            The story begins here <span className="text-pistachio"></span>{" "}
            <span className="text-pistachio"></span>
          </h1>

          <p className="text-lg md:text-xl mb-10 leading-relaxed opacity-0 animate-fade-in animate-delay-200">
            {/* I'm Anna Mitchell, a copywriter crafting compelling narratives that drive results
            for brands that want to make an impact. */}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 opacity-0 animate-fade-in animate-delay-300">
            {/* <button 
              onClick={() => scrollToSection('portfolio')}
              className="bg-pistachio hover:bg-opacity-90 text-white py-3 px-8 rounded-md transition-all transform hover:scale-105"
            >
              See My Work
            </button> */}

            <button
              onClick={() => scrollToSection("contact")}
              className="bg-transparent border-2 border-pistachio text-gray-500 py-3 px-8 rounded-md hover:bg-pistachio hover:text-white transition-all transform hover:scale-105"
            >
              Let's Talk
            </button>
          </div>
        </div>
      </div>

      {/* 3D Model Viewer Container */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <ModelViewer
          url="/iron_howl_v8.glb"
          width="100%"
          height="100%"
          autoRotate={true}
          autoRotateSpeed={0.5}
          enableManualRotation={false}
          enableManualZoom={false}
          environmentPreset="studio"
          // أضف هذه السطور
          defaultRotationX={9}
          defaultRotationY={-28}
        />
      </div>
      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
