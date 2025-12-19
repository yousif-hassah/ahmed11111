import React from "react";
import Threads from "./Threads";
import Model3 from "../../public/Model3";

const About: React.FC = () => {
  return (
    <section id="about" className="section-padding relative">
      <div className="absolute inset-0 bg-black">
        <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
      </div>

      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div className="relative">
            <div className=" rounded-full w-64 h-64 md:w-80 md:h-80 mx-auto  border-4 border-pistachio">
              {/* <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80" 
                alt="Copywriter portrait" 
                className="w-full h-full object-cover"
              /> */}
              <div className="absolute inset-0 flex items-center justify-center z-0">
                <Model3
                  url="/knight__chibi_sf_101.glb"
                  width="100%"
                  height="100%"
                  autoRotate={false}
                  autoRotateSpeed={0.5}
                  enableManualRotation={false}
                  enableManualZoom={false}
                  environmentPreset="studio"
                  defaultRotationX={9}
                  defaultRotationY={-20}
                />
              </div>
            </div>
            <div className="absolute -z-10 w-64 h-64 md:w-80 md:h-80 rounded-full bg-lightgray -bottom-3 -right-3"></div>
          </div>

          {/* Content Column */}
          <div className="opacity-0 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
              About Me
            </h2>

            <p className="text-lg mb-6 leading-relaxed">
              I’m Ahmed Hassan Ahmed, a writer and director who crafts ideas
              through a visual language with a clear identity and an authentic
              spirit. I build creative campaigns from concept to image,
              transforming messages into experiences that truly connect with the
              viewer. My experience spans inside and outside Iraq — from Baghdad
              to Riyadh and Cairo — across projects that blend art with
              advertising, and reality with fantasy. I specialize in writing and
              directing podcasts and programs for content creators, shaping each
              episode with a voice that reflects the mindset and journey of
              every guest, and delivering content that carries real value and
              meaning.
            </p>



            <div className="opacity-0 animate-fade-in">
              <h3 className="text-xl font-playfair font-semibold mb-3">
                skills
              </h3>
              <p className="italic"></p>
              <p>Directing & Visual Storytelling</p>
              <p>Podcast Writing & Production</p>
              <p>Art-Driven Brand Development</p>
              <p>Magical Realism&Symbolic Narrative</p>
              <p>Educational & Creative Projects</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* <div>
                <h4 className="font-playfair font-semibold mb-2">skills</h4>
                <p>Directing & Visual Storytelling</p>
                <p>Podcast Writing & Production</p>
                <p>Art-Driven Brand Development</p>
                <p>Magical Realism&Symbolic Narrative</p>
                <p>Educational & Creative Projects</p>

              </div> */}
              {/* <div>
                <h4 className="font-playfair font-semibold mb-2">Education</h4>
                <p>BA in English Literature</p>
                <p>Copywriting Certification</p>
                <p>Digital Marketing Diploma</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
