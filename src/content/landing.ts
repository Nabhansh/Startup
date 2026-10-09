import {
  Atom,
  Code2,
  Database,
  GitBranch,
  Monitor,
  Plane,
  Cpu,
  Sigma,
  type LucideIcon,
} from "lucide-react";

export const WHATSAPP_NUMBER = "919423533691";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export const SEO_TITLE = "CampusTutor — College tutoring for Aerospace & CSE students | ₹500/hour";
export const SEO_DESC =
  "One-to-one tutoring for 1st and 2nd year Aerospace Engineering and CSE students — maths, physics, coding, DSA, DBMS and more. Online or in a library, ₹500 per hour. Enquire on WhatsApp.";

export const subjects: { title: string; detail: string; icon: LucideIcon; tag: string }[] = [
  {
    title: "Mathematics",
    detail: "Calculus, algebra & problem sets, worked step by step",
    icon: Sigma,
    tag: "MAKE THE NUMBERS CLICK",
  },
  {
    title: "Physics",
    detail: "Mechanics, waves & numericals, from formula to answer",
    icon: Atom,
    tag: "SEE THE LOGIC WORK",
  },
  {
    title: "Coding",
    detail: "C, Python & your first programs, written with you",
    icon: Code2,
    tag: "BUILD YOUR FOUNDATION",
  },
  {
    title: "Data Structures & Algorithms",
    detail: "Logic, dry runs & practice",
    icon: GitBranch,
    tag: "THINK STEP BY STEP",
  },
  {
    title: "Database Management Systems",
    detail: "SQL, keys & normalisation",
    icon: Database,
    tag: "CONNECT THE CONCEPTS",
  },
  {
    title: "Core Computer Science",
    detail: "OS & computer fundamentals",
    icon: Monitor,
    tag: "UNDERSTAND THE WHY",
  },
];

export const branches: { name: string; line: string; icon: LucideIcon; list: string[] }[] = [
  {
    name: "Aerospace Engineering",
    line: "First and second year subjects, from fluids to flight",
    icon: Plane,
    list: [
      "Engineering Mathematics",
      "Engineering Physics",
      "Aerodynamics",
      "Propulsion",
      "Flight Structures",
      "Materials & Mechanics",
    ],
  },
  {
    name: "Computer Science & Engineering",
    line: "First and second year subjects, from your first program to networks",
    icon: Cpu,
    list: [
      "C & Python Programming",
      "Data Structures & Algorithms",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
      "Discrete Mathematics",
    ],
  },
];

export const faqs: [string, string][] = [
  [
    "Do I need to pay before enquiring?",
    "No. Enquire first, then confirm your tutor, schedule, final rate and payment terms before booking. There’s no payment required to start the conversation.",
  ],
  [
    "Do you cover Aerospace Engineering and CSE subjects?",
    "Yes — core and branch subjects for both, across the first and second year. Tell us the exact subject and your syllabus, and we’ll check a suitable tutor is available before you book.",
  ],
  [
    "Can I learn online or in person?",
    "Yes. Choose online sessions or a suitable library location agreed in advance. Paid tutoring must be permitted by the library, and room availability may vary.",
  ],
  [
    "Can I join a session with friends?",
    "Small-group sessions can be arranged for students with similar learning goals. Availability and group pricing are confirmed before booking.",
  ],
  [
    "Which college years do you support?",
    "Our initial focus is first- and second-year college students. If you are in another year, tell us your subject and we can discuss whether a suitable tutor is available.",
  ],
  [
    "Are exam results guaranteed?",
    "No. We focus on concept clarity, practice and better preparation. Academic results depend on your effort and several other factors, so no grade or result is guaranteed.",
  ],
];
