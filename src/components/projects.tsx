import React, { useState } from "react";

interface Project {
  id: number;
  title: string;
  category: string;
  challenge: string;
  approach: string;
  result: string;
  image: string;
  link?: string;
}

const PortfolioData: Project[] = [
  {
    id: 1,
    title: "Creative Stories",
    category: "Creative Director Director",
    challenge:
      "Creative Stories is a video series that highlights professionals working in drama and advertising.",
    approach:
      "The project focuses on the people behind the work, exploring their creative journeys, mindsets, and real experiences within the industry.Rather than traditional interviews, the series presents honest conversations that reveal how ideas are shaped, how challenges are faced, and how creativity turns into impactful visual stories.The project aims to document authentic creative voices and reflect the reality of working in drama and advertising, through a calm, human-centered visual approach.",
    result: "",
    image: "/1-2.png",
    link: "https://youtube.com/playlist?list=PLVOAbvn0kqtqQ_tfwE6TrV5WjL6IB71mf&si=y4kV71dJn0_dxuRs",
  },
  {
    id: 2,
    title: "Setton",
    category: "Creative Director Director",
    challenge:
      "Setton is a creative content platform focused on children, built to deliver safe, meaningful, and culturally rooted storytelling.",
    approach:
      "The platform creates educational and entertaining content that speaks to children in a simple, engaging, and relatable way.Setton explores different worlds of curiosity such as creativity, learning, sports, and imagination, encouraging children to discover their interests while building positive values and confidence.Inspired by classic Arabic children’s content and reimagined through a modern creative lens, Setton aims to shape a new generation of thoughtful, curious, and expressive young minds.",
    result: "",
    image: "/setton photo.png",
    link: "https://youtube.com/@settonkids?si=N2ElvFiLHZ5TLhjn",
  },

  {
    id: 3,
    title: "iPhone 16 – Reflection Concep",
    category: "Creative Director",
    challenge:
      "A creative Instagram reel featuring Iraqi influencer Mais Thaer (Masa), presenting the iPhone 16 as a close companion rather than just a device.",
    approach:
      "Through reflective visuals on the phone’s mirror-like surface, iconic Iraqi landmarks appear as shared moments, reinforcing the idea of the phone as a trusted friend that captures memories and identity.The piece blends emotional storytelling with visual concepting, connecting technology, personal experience, and cultural presence in a subtle and engaging way.",
    result: "",
    image: "/PH5343831866722683791_121.jpg",
    link: "https://www.instagram.com/reel/DD7UnBLTRrB/?igsh=N2c4cWhreW93MXRr ",
  },
  {
    id: 4,
    title: "Vanilla 20 Years",
    category: "Creative Director Director",
    challenge:
      "A narrative-driven promotional video for Vanilla Ice Cream, created to celebrate the brand’s 20-year journey.",
    approach:
      "The story follows a young girl as she grows over time, symbolizing the brand’s evolution, until she becomes a star walking the red carpet and arrives at Vanilla to celebrate with a cake marked “20”.The film is elevated through the use of drone shots, adding scale and cinematic depth to the visual storytelling, while reinforcing the sense of achievement, celebration, and legacy.",
    result: "",
    image: "/5343831866722683794_121.jpg",
    link: "https://www.instagram.com/reel/DGds4KgKLhn/?igsh=MXI3N2Z2bHhwcjI5Yw==",
  },
  {
    id: 5,
    title: "Billionaire Content Series",
    category: "Creative Director",
    challenge:
      "Content development and brand storytelling project for Billionaire, where I created over 30 video scripts and scenariosdesigned to strengthen the brand’s voice and positioning.",
    approach:
      "The work focused on shaping consistent messaging, defining promotional offer structures, and developing engaging narratives that supported the brand’s growth and market presence.This project highlights strategic copywriting, long-term content planning, and creative direction aimed at building a strong and recognizable brand identity." ,
    result: "",
    image: "/B5343528684981259896_121.jpg",
    link: "https://www.instagram.com/reel/C_tFnYevR8w/?igsh=eWkwNm5oZG9jbGo2",
  },
  {
    id: 6,
    title: "TECNO Product Video",
    category: "Creative Director",
    challenge:
      "A product-focused video highlighting the key features of TECNO smartphones through clear and engaging visual presentation.",
    approach:
      "The piece emphasizes product functionality, design details, and user benefits, using clean shots and structured storytelling to communicate value in a concise and effective way.This work reflects an approach that balances technical clarity with visual appeal, aiming to make product features easy to understand and visually compelling for the audience",
   result: "",
    image: "/5343831866722683814_119.jpg",
    link:"https://www.instagram.com/reel/DDM63-yJIho/?igsh=a3V1YjhtODZpc3F6"
  },
  {
    id: 7,
    title: "Qasr Aliya – Documentary Style Ad",
    category: "Creative Director Director",
    challenge:
      "This reel showcases the Journey of Qasr Aliya—a unique hub hosting over 100,000 offices and manufacturers, highlighting a vibrant space full of opportunities and creative work.",
    approach:
      "The piece focuses on showing the real energy and potential behind the scenes in a bustling production environment.",
    result: "",
    image: "/Q5343831866722683772_121.jpg",
    link: "https://www.instagram.com/reel/DEnbaPKu1BX/?igsh=MTd4dG5xdHFvN3lobA==",
  },
  {
    id: 8,
    title: "Medical Lenses – Creative Beauty",
    category: "Creative Director Director",
    challenge:
      "A beauty-focused brand video for medical contact lenses, presented through an unconventional and experimental visual style.",
    approach:
      "The piece challenges traditional beauty visuals, combining medical precision with artistic expression to create a distinctive and memorable brand presence.",
    result: "",
    image: "/5343831866722683834_121.jpg",
    link: "https://www.instagram.com/reel/DEDZJXRR0kG/?igsh=YmpsdDI5b2JxNDcy",
  },
];

const Portfolio: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const openProject = (project: Project) => {
    setActiveProject(project);
  };

  const closeProject = () => {
    setActiveProject(null);
  };

  return (
    <section id="projects" className="section-padding bg-black">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            Featured Projects
          </h2>
          <p className="max-w-xl mx-auto">A selection of recent projects .</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {PortfolioData.map((project, index) => (
            <div
              key={project.id}
              onClick={() => openProject(project)}
              className={`bg-gray-700 mb-3 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-2 opacity-0 animate-fade-in`}
              style={{ animationDelay: `${index * 0.1 + 0.1}s` }}
            >
              <div className="h-48 overflow-hidden">
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </a>
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-black uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="font-playfair text-xl font-bold mt-1 mb-3">
                  {project.title}
                </h3>
                <p className="text-sm text-gray- mb-4">
                  {project.challenge.substring(0, 120)}...
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-pistachio font-medium">
                    View Project
                  </span>
                  <span className="h-8 w-8 rounded-full bg-pistachio bg-opacity-20 flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        {activeProject && (
          <div className="fixed inset-0 bg-charcoal bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto animate-scale-in">
              <div className="h-60 md:h-80 overflow-hidden">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex justify-between mb-4">
                  <span className="px-3 py-1 bg-pistachio text-black text-xs font-semibold rounded-full">
                    {activeProject.category}
                  </span>
                  <button
                    onClick={closeProject}
                    className="text-gray-800 hover:text-gray-700"
                  >
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
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>

                <h3 className="font-playfair text-2xl font-bold mb-4 text-black">
                  {activeProject.title}
                </h3>

                <div className="grid gap-6 mb-6">
                  <div className="text-black">
                    <h4 className="font-medium text-pistachio mb-2">
                      {/* The Challenge */}
                    </h4>
                    <p>{activeProject.challenge}</p>
                  </div>
                  <div className="text-black">
                    <h4 className="font-medium text-pistachio mb-2">
                      {/* My Approach */}
                    </h4>
                    <p>{activeProject.approach}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-pistachio mb-2">
                      {/* The Result */}
                    </h4>
                    <p className=" text-pistachio mb-2">
                      {activeProject.result}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
