import { foundationLessons } from "@/data/foundation-lessons";
import { programmingLessons } from "@/data/programming-lessons";
import { playwrightLessons } from "@/data/playwright-lessons";
import { cypressLessons } from "@/data/cypress-lessons";
import { typescriptTopics } from "@/data/typescript-guide";
import { apiLessons } from "@/data/api-lessons";

export type SearchItem = {
  title: string;
  description: string;
  category: string;
  href: string;
  keywords: string;
};

type SearchableLesson = {
  slug: string;
  title: string;
  description: string;
  content?: {
    objectives: string[];
    sections: { title: string }[];
  };
};

function indexLessons(
  lessons: SearchableLesson[],
  category: string,
  baseHref: string,
): SearchItem[] {
  return lessons.flatMap((lesson) => {
    if (!lesson.content) return [];

    return [
      {
        title: lesson.title,
        description: lesson.description,
        category,
        href: `${baseHref}/${lesson.slug}`,
        keywords: [
          ...lesson.content.objectives,
          ...lesson.content.sections.map((section) => section.title),
        ].join(" "),
      },
    ];
  });
}

const foundationBase = "/learning-paths/software-quality-engineering";

const introductoryFoundationLessons: SearchItem[] = [
  {
    title: "What is Software Quality Engineering?",
    description: "Understand quality engineering, testing, and the SDET role.",
    category: "Quality Engineering",
    href: `${foundationBase}/what-is-quality-engineering`,
    keywords: "quality assurance testing foundations SDET",
  },
  {
    title: "SDLC, STLC, and Quality Throughout Delivery",
    description:
      "Explore development and testing activities from requirements to release.",
    category: "Quality Engineering",
    href: `${foundationBase}/sdlc-and-stlc`,
    keywords:
      "software testing life cycle requirement analysis planning execution closure",
  },
  {
    title: "Agile, Scrum, and Team Collaboration",
    description:
      "Understand how quality activities fit into iterative delivery.",
    category: "Quality Engineering",
    href: `${foundationBase}/agile-scrum-team-collaboration`,
    keywords: "agile scrum sprint collaboration retrospective",
  },
  {
    title: "Test Levels and Test Types",
    description: "Explore unit, integration, system, and acceptance testing.",
    category: "Quality Engineering",
    href: `${foundationBase}/test-levels-and-test-types`,
    keywords:
      "functional non-functional regression smoke acceptance integration unit",
  },
];

export function getSearchItems(): SearchItem[] {
  return [
    ...introductoryFoundationLessons,

    ...foundationLessons.map((lesson) => ({
      title: lesson.title,
      description: lesson.introduction,
      category: "Quality Engineering",
      href: `${foundationBase}/${lesson.slug}`,
      keywords: [
        ...lesson.objectives,
        ...lesson.sections.map((section) => section.title),
      ].join(" "),
    })),

    ...indexLessons(
      programmingLessons,
      "Programming",
      "/learning-paths/programming",
    ),

    ...indexLessons(
      playwrightLessons,
      "Playwright",
      "/learning-paths/e2e-automation/playwright",
    ),

    ...indexLessons(
      cypressLessons,
      "Cypress",
      "/learning-paths/e2e-automation/cypress",
    ),

    ...indexLessons(apiLessons, "API Testing", "/learning-paths/api-testing"),

    ...typescriptTopics.map((topic) => ({
      title: topic.title,
      description: topic.explanation,
      category: "TypeScript Reference",
      href: `/learning-paths/programming/typescript#${topic.id}`,
      keywords: [topic.group, ...topic.points].join(" "),
    })),
  ];
}
