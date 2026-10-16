export interface ProjectItem {
  id: number;
  title: string;
  category: string;
  challenge: string;
  approach: string;
  result: string;
  image: string;
  link?: string;
  color: string;
  isLight?: boolean;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 1,
    title: "Creative Stories",
    category: "Directing & Storytelling",
    challenge:
      "Creative Stories is a video series that highlights professionals working in drama and advertising.",
    approach:
      "The project focuses on the people behind the work, exploring their creative journeys, mindsets, and real experiences within the industry. Rather than traditional interviews, the series presents honest conversations that reveal how ideas are shaped, how challenges are faced, and how creativity turns into impactful visual stories. The project aims to document authentic creative voices and reflect the reality of working in drama and advertising, through a calm, human-centered visual approach.",
    result: "A highly acclaimed documentary-style series documenting authentic voices across the creative industry.",
    image: "/1-2.png",
    link: "https://youtube.com/playlist?list=PLVOAbvn0kqtqQ_tfwE6TrV5WjL6IB71mf&si=y4kV71dJn0_dxuRs",
    color: "#587678", // 1. Muted Teal Slate
    isLight: false,
  },
  {
    id: 2,
    title: "Setton",
    category: "Platform Direction",
    challenge:
      "Setton is a creative content platform focused on children, built to deliver safe, meaningful, and culturally rooted storytelling.",
    approach:
      "The platform creates educational and entertaining content that speaks to children in a simple, engaging, and relatable way. Setton explores different worlds of curiosity such as creativity, learning, sports, and imagination, encouraging children to discover their interests while building positive values and confidence. Inspired by classic Arabic children’s content and reimagined through a modern creative lens.",
    result: "Shaping a new generation of thoughtful, curious, and expressive young minds.",
    image: "/setton photo.png",
    link: "https://youtube.com/@settonkids?si=N2ElvFiLHZ5TLhjn",
    color: "#A97761", // 2. Warm Terracotta / Sand
    isLight: false,
  },
  {
    id: 3,
    title: "iPhone 16 – Reflection Concept",
    category: "Creative Direction",
    challenge:
      "A creative Instagram reel featuring Iraqi influencer Mais Thaer (Masa), presenting the iPhone 16 as a close companion rather than just a device.",
    approach:
      "Through reflective visuals on the phone’s mirror-like surface, iconic Iraqi landmarks appear as shared moments, reinforcing the idea of the phone as a trusted friend that captures memories and identity. The piece blends emotional storytelling with visual concepting, connecting technology, personal experience, and cultural presence.",
    result: "High organic engagement blending culture with modern flagship tech.",
    image: "/PH5343831866722683791_121.jpg",
    link: "https://www.instagram.com/reel/DD7UnBLTRrB/?igsh=N2c4cWhreW93MXRr",
    color: "#505162", // 3. Slate Indigo / Elephant Grey
    isLight: false,
  },
  {
    id: 4,
    title: "Vanilla 20 Years",
    category: "Commercial Film",
    challenge:
      "A narrative-driven promotional video for Vanilla Ice Cream, created to celebrate the brand’s 20-year journey.",
    approach:
      "The story follows a young girl as she grows over time, symbolizing the brand’s evolution, until she becomes a star walking the red carpet and arrives at Vanilla to celebrate with a cake marked “20”. The film is elevated through the use of drone shots, adding scale and cinematic depth to the visual storytelling, while reinforcing the sense of achievement and celebration.",
    result: "Cinematic commercial celebrating two decades of heritage and sweetness.",
    image: "/5343831866722683794_121.jpg",
    link: "https://www.instagram.com/reel/DGds4KgKLhn/?igsh=MXI3N2Z2bHhwcjI5Yw==",
    color: "#8C5353", // 4. Dusty Rose / Burgundy
    isLight: false,
  },
  {
    id: 5,
    title: "Billionaire Content Series",
    category: "Brand Storytelling",
    challenge:
      "Content development and brand storytelling project for Billionaire, where I created over 30 video scripts and scenarios designed to strengthen the brand’s voice and positioning.",
    approach:
      "The work focused on shaping consistent messaging, defining promotional offer structures, and developing engaging narratives that supported the brand’s growth and market presence. This project highlights strategic copywriting, long-term content planning, and creative direction.",
    result: "Over 30 viral video scripts and coherent brand positioning.",
    image: "/B5343528684981259896_121.jpg",
    link: "https://www.instagram.com/reel/C_tFnYevR8w/?igsh=eWkwNm5oZG9jbGo2",
    color: "#D7D7D7", // 5. Refined Silver Light Grey
    isLight: true,
  },
  {
    id: 6,
    title: "TECNO Product Video",
    category: "Product Launch",
    challenge:
      "A product-focused video highlighting the key features of TECNO smartphones through clear and engaging visual presentation.",
    approach:
      "The piece emphasizes product functionality, design details, and user benefits, using clean shots and structured storytelling to communicate value in a concise and effective way. This work reflects an approach that balances technical clarity with visual appeal.",
    result: "Dynamic, fast-paced product showcase maximizing visual retention.",
    image: "/5343831866722683814_119.jpg",
    link: "https://www.instagram.com/reel/DDM63-yJIho/?igsh=a3V1YjhtODZpc3F6",
    color: "#98849D", // 6. Vintage Mauve / Lavender
    isLight: false,
  },
  {
    id: 7,
    title: "Qasr Aliya – Documentary Ad",
    category: "Documentary Film",
    challenge:
      "This reel showcases the Journey of Qasr Aliya—a unique hub hosting over 100,000 offices and manufacturers, highlighting a vibrant space full of opportunities and creative work.",
    approach:
      "The piece focuses on showing the real energy and potential behind the scenes in a bustling production environment.",
    result: "Powerful documentary ad highlighting manufacturing scale and human energy.",
    image: "/Q5343831866722683772_121.jpg",
    link: "https://www.instagram.com/reel/DEnbaPKu1BX/?igsh=MTd4dG5xdHFvN3lobA==",
    color: "#465D5F", // Complementary Deep Teal Slate
    isLight: false,
  },
  {
    id: 8,
    title: "Medical Lenses – Creative Beauty",
    category: "Beauty Direction",
    challenge:
      "A beauty-focused brand video for medical contact lenses, presented through an unconventional and experimental visual style.",
    approach:
      "The piece challenges traditional beauty visuals, combining medical precision with artistic expression to create a distinctive and memorable brand presence.",
    result: "Surreal and artistic visual style distinguishing the brand in the medical beauty niche.",
    image: "/5343831866722683834_121.jpg",
    link: "https://www.instagram.com/reel/DEDZJXRR0kG/?igsh=YmpsdDI5b2JxNDcy",
    color: "#2B2D37", // Complementary Slate Charcoal
    isLight: false,
  },
];
