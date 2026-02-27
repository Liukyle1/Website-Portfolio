export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  github?: string;
  live?: string;
  status: "completed" | "in-progress" | "research";
  images: string[];
  coverImage?: string; // overrides images[0] on the card, not shown in gallery
}

export const projects: Project[] = [
  {
    // Most recent — leftmost
    slug: "stellarsphere-navigation",
    title: "StellarSphere Navigation",
    description:
      "Finalist – Lockheed Martin Innovation Challenge. Embedded navigation system for simulated lunar terrain using sensor fusion and haptic feedback.",
    longDescription:
      "Developed modular C/C++ code to handle communication between multiple sensor modules, improving navigation reliability and real-time feedback in simulated lunar terrain. Integrated gyroscope and accelerometer sensors to track movement and orientation, enabling precise path reconstruction and position correction algorithms. Programmed servo motors for haptic feedback, providing directional guidance cues through vibration or motion to assist astronauts in low-visibility or high-stress conditions. Applied data structures and embedded programming concepts to process sensor data efficiently in real time.",
    tags: ["C/C++", "Embedded Systems", "STM32", "Gyroscope", "Servo Motors", "Sensor Fusion"],
    github: "https://github.com",
    status: "completed",
    images: [
      "/projects/stellasphere/StellaSphereCover.jpg",
      "/projects/stellasphere/IMG_0187.jpeg",
      "/projects/stellasphere/IMG_0206.jpeg",
      "https://res.cloudinary.com/djgzon00a/video/upload/v1772222222/video_yrgkoi.mp4",
    ],
  },
  {
    slug: "raspberry-pi-signage-system",
    title: "Raspberry Pi Signage System",
    description:
      "Centralized digital signage system controlling 4 Raspberry Pi displays over a dedicated static IP Ethernet network, deployed from an Electron desktop app via SSH/SCP with zero-touch playback recovery.",
    longDescription:
      "Designed and built a centralized digital signage system to remotely manage and deploy video content across 4 Raspberry Pi 4 displays from a single Windows controller. The desktop application was built with Electron, backed by a Node.js and Express.js server using Multer for file uploads and child process execution for SSH/SCP-based remote deployment — all using passwordless key-based authentication for seamless operation. Each Raspberry Pi runs a headless Raspberry Pi OS Lite (64-bit) environment, with VLC (cvlc) handling continuous loop playback and a Linux systemd service ensuring automatic startup on boot and instant crash recovery. The network uses a dual-interface design: a dedicated static IP Ethernet control network (192.168.100.0/24) isolates all deployment traffic from internet activity, while each Pi retains WiFi for internet access. This architecture ensures reliable, low-latency deployments with no cloud dependency and is designed to scale to additional display nodes with minimal configuration.",
    tags: ["Electron", "Node.js", "Express.js", "Raspberry Pi", "Linux", "SSH/SCP", "systemd", "VLC"],
    github: "https://github.com/Liukyle1/Signage-Controller",
    status: "completed",
    images: [
      "/projects/raspberry-pi-signage/RaspberryCover.jpeg",
      "https://www.youtube.com/watch?v=e-nEiSm0B5g",
      "https://res.cloudinary.com/djgzon00a/video/upload/v1772222238/SetupVideo_uqf0e2.mp4",
      "https://res.cloudinary.com/djgzon00a/video/upload/v1772222246/SwitchVideo_u8tip2.mp4",
    ],
  },
  {
    // Oldest — rightmost
    slug: "dino-nutrition-app",
    title: "Dino Nutrition App",
    description:
      "Mobile nutrition tracking app for WSU students featuring GPT-powered meal recognition, Supabase PostgreSQL backend, and user authentication. Built as a full-stack developer in a team of 3.",
    longDescription:
      "Built as a full-stack developer in a team of 3, this app was designed specifically for Wichita State University students to simplify nutrition tracking. Designed and managed the app's Supabase Postgres database, creating schemas, tables, and relationships to support users, meals, and nutrition tracking. Implemented backend logic in JavaScript (Supabase edge functions / API calls) to handle user authentication, meal logging, and nutrition calculations. Fine-tuned a GPT model on custom food and nutrition data so the system could more accurately identify meals, map them to nutrition entries, and suggest corrections for ambiguous inputs.",
    tags: ["JavaScript", "React Native", "Supabase", "PostgreSQL", "GPT API"],
    github: "https://github.com/mustafajamis/Dino-Nutrition-APP-",
    status: "completed",
    coverImage: "/projects/dino-nutrition/CoverDino.jpg",
    images: [
      "/projects/dino-nutrition/0.png",
      "/projects/dino-nutrition/1.png",
      "/projects/dino-nutrition/2.png",
      "/projects/dino-nutrition/3.png",
      "/projects/dino-nutrition/4.png",
      "/projects/dino-nutrition/5.png",
      "/projects/dino-nutrition/6.png",
      "https://res.cloudinary.com/djgzon00a/video/upload/v1772222266/7_oio5ne.mp4",
    ],
  },
];

export const statusConfig = {
  completed: {
    label: "Completed",
    color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  },
  "in-progress": {
    label: "In Progress",
    color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  },
  research: {
    label: "Research",
    color: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  },
};
