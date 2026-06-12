import type { Memory, TimelineYear } from "./types";

export const beginningChapter = {
  image: "/memories/01-first-day.svg",
  alt: "First day on campus — nervous smiles and new beginnings",
  headline: "The Beginning",
  body: "We didn't know then that one conversation would become years of memories. You walked into that lecture hall like you belonged there — I was still figuring out which building was which. Somehow we found each other in the chaos of orientation week, and something in me knew this was the start of something rare.",
  aside: "Year 1 · First semester",
};

export const memories: Memory[] = [
  {
    id: "library",
    image: "/memories/sis.jpg",
    year: "Year 2",
    title: "Late nights at the library",
    shortStory:
      "You brought snacks when I was drowning in assignments. We whispered jokes between shelves until security asked us to leave. I still think about those fluorescent lights and your terrible puns.",
    alt: "Studying together in the university library",
  },
  {
    id: "campus",
    image: "/memories/03-campus.svg",
    year: "Year 3",
    title: "Our corner of campus",
    shortStory:
      "The bench under the old oak tree became ours. We talked about everything — dreams, heartbreak, what we'd do after graduation. The world felt smaller when we sat there.",
    alt: "Campus grounds in golden afternoon light",
  },
  {
    id: "group",
    image: "/memories/04-group.svg",
    year: "Year 4",
    title: "The group that became family",
    shortStory:
      "Birthdays, breakdowns, celebrations we never planned. You held the group together when things got hard. I watched you show up for people — quietly, consistently, without needing credit.",
    alt: "Friends gathered together laughing on campus",
  },
  {
    id: "graduation",
    image: "/memories/05-graduation.svg",
    year: "Year 5",
    title: "Caps in the air",
    shortStory:
      "We promised we'd stay close. In that moment, with confetti in our hair and tears we tried to hide, I realized the degree was never the real prize.",
    alt: "Graduation day celebration with caps thrown in the air",
  },
];

export const timelineYears: TimelineYear[] = [
  {
    year: 1,
    image: "/memories/01-first-day.svg",
    title: "First hello",
    memory: "Orientation week. Lost, loud, and somehow already laughing together.",
    alt: "First year university memories",
  },
  {
    year: 2,
    image: "/memories/02-library.svg",
    title: "Finding our rhythm",
    memory: "Study sessions that turned into life talks until midnight.",
    alt: "Second year memories",
  },
  {
    year: 3,
    image: "/memories/03-campus.svg",
    title: "Growing up together",
    memory: "Hard semesters, harder conversations, and showing up anyway.",
    alt: "Third year memories",
  },
  {
    year: 4,
    image: "/memories/04-group.svg",
    title: "The inner circle",
    memory: "Our people. Our traditions. Our inside jokes that still make no sense.",
    alt: "Fourth year memories",
  },
  {
    year: 5,
    image: "/memories/05-graduation.svg",
    title: "Not goodbye",
    memory: "Caps thrown. Hugs held a second longer. A promise to write the next chapter.",
    alt: "Fifth year graduation memories",
  },
];

export const thankYouParagraphs = [
  "There were moments I never properly said thank you.",
  "For the times you listened when I had nothing coherent to say.",
  "For making ordinary Tuesdays feel like they mattered.",
  "For being the person I could text at 2 a.m. without explanation.",
  "For five years of showing up — not perfectly, but genuinely.",
  "This letter is long overdue. But some things are worth taking time to say.",
];

export const finalSection = {
  headline: "One Last Letter",
  body: "We came here for degrees.\nSomehow we leave with stories.",
  signoff: "With all my love, always.",
};
