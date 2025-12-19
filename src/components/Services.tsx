
import React from 'react';
import { FileText, Mic, Mail, Package, LayoutList, Compass, Clapperboard, Lightbulb, Layers } from 'lucide-react';

interface ServiceProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const ServiceCard: React.FC<ServiceProps> = ({ title, description, icon, delay }) => {
  return (
    <div 
      className={`bg-gray-400 p-6 rounded-lg shadow hover:shadow-lg transition-all transform hover:-translate-y-1 opacity-0 animate-fade-in`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="w-12 h-12 bg-pistachio bg-opacity-20 rounded-full flex items-center justify-center text-pistachio mb-4">
        {icon}
      </div>
      <h3 className="font-playfair text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      title: "Creative Direction",
      description: "Shaping ideas into clear visual identities.",
      icon: <Compass size={24} />

    },
    {
      title: "Film & Video Directing",
      description: "Turning concepts into controlled and impactful visuals",
      icon: <Clapperboard size={24} />,
    },
    {
      title: "Script & Scenario Writing",
      description: "Writing narratives that drive emotion and structure.",
      icon: <FileText size={24} />,
    },
    {
      title: "Concept & Idea Development",
      description: "Building strong ideas from insight to execution.",
      icon: <Lightbulb size={24} />,
    },
    {
      title: "Brand Storytelling (Visual & Narrative)",
      description: "Telling brand stories through visuals and meaning",
     icon: <Layers size={24} />,
    },
  ];

  return (
    <section id="services" className="section-padding bg-black">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">My Services</h2>
          <p className="max-w-xl mx-auto">
            {/* Specialized writing services to help your brand find its voice and connect with your audience. */}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              delay={index * 0.1 + 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
