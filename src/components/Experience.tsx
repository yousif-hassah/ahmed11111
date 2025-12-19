import React, { useState } from "react";
import { toast } from "sonner";

const Experience: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate form submission
    toast.success("Message sent! I'll get back to you soon.", {
      description: "Thanks for reaching out!",
    });

    // Clear form after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section
      id="Experience"
      className="section-padding "
      style={{ backgroundColor: "#1B1B1D" }}
    >
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="opacity-0 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
              Experience
            </h2>

            <p className="mb-8 text-lg">
              Since 2020 I have been working in writing and directing
              advertising and artistic campaigns, developing the visual concept
              of each campaign and leading its execution through a powerful,
              narrative-driven approach. Since 2023 Creative Director at “Setton
              – Future Makers” I lead the development of the visual identity and
              storytelling for children’s worlds, producing educational and
              entertainment content with a contemporary Iraqi spirit. Podcast
              Production & Direction I create audio-visual experiences focused
              on creativity, writing and directing episodes that transform ideas
              into genuine, story-driven conversations. Regional Collaborations
              I have delivered advertising and narrative projects in
              collaboration with teams in Saudi Arabia and Egypt, with an
              approach that balances creative thinking and cultural identity
            </p>

            {/* <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-playfair font-semibold text-xl mb-4">What happens next?</h3>
              
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-pistachio flex items-center justify-center text-white font-semibold">1</span>
                  <div>
                    <h4 className="font-semibold">We'll schedule a call</h4>
                    <p className="text-gray-600">To discuss your project needs and goals.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-pistachio flex items-center justify-center text-white font-semibold">2</span>
                  <div>
                    <h4 className="font-semibold">I'll create a proposal</h4>
                    <p className="text-gray-600">With a custom strategy and timeline.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-pistachio flex items-center justify-center text-white font-semibold">3</span>
                  <div>
                    <h4 className="font-semibold">We'll collaborate</h4>
                    <p className="text-gray-600">To craft copy that achieves your goals.</p>
                  </div>
                </li>
              </ol>
            </div> */}
          </div>

          {/* Contact Form
          <div className="opacity-0 animate-fade-in animate-delay-200">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-6">
                  <div>
                    <label htmlFor="name" className="block font-medium mb-1">Your Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pistachio"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block font-medium mb-1">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pistachio"
                      placeholder="john@example.com"
                    />
                  </div>
                  
    
                  
                  <div>
                    <label htmlFor="message" className="block font-medium mb-1">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pistachio"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="bg-pistachio hover:bg-opacity-90 text-white py-3 px-6 rounded-md transition-all transform hover:scale-105 font-medium"
                  >
                    Send Message
                  </button>
                </div> */}
          {/* </form>
            </div>
          </div> */}
          <img src="/aaa_121.jpg" alt="" />
        </div>
      </div>
    </section>
  );
};

export default Experience;
