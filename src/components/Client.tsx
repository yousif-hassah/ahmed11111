import React, { useState, useEffect } from "react";
import InfiniteMenu from "./InfiniteMenu";

const Testimonials: React.FC = () => {
  const items = [
    {
      image: "/saitama.jpg",
      link: "https://www.youtube.com/watch?v=H4FJJcNrMv0&list=RDH4FJJcNrMv0&start_radio=1",
      title: "Item 1",
      description: "This is pretty cool, right?",
    },
    {
      image: "/5363902884548310224_120.jpg",
      link: "https://google.com/",
      title: "Item 2",
      description: "This is pretty cool, right?",
    },
    {
      image: "https://picsum.photos/500/500?grayscale",
      link: "https://google.com/",
      title: "Item 3",
      description: "This is pretty cool, right?",
    },
    {
      image: "https://picsum.photos/600/600?grayscale",
      link: "https://google.com/",
      title: "Item 4",
      description: "This00knkjn",
    },
    {
      image: "/one.jpeg",
      link: "https://google.com/",
      title: "",
      description: "",
    },
  ];

  return (
    <section id="menu" className=" bg-black relative overflow-hidden">
      {/* <div className="container mx-auto"> */}
      <div className="text-center mb-4">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
          Client Feedback
        </h2>
      </div>

      <div style={{ height: "600px", position: "relative" }}>
        <InfiniteMenu items={items} />
      </div>
    </section>
  );
};

export default Testimonials;
