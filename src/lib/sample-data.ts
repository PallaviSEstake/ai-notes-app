import type { Note } from "@/types";

export const sampleNotes: Note[] = [
  {
    id: "1",
    title: "Meeting Notes: Q3 Brainstorm",
    content: `
# Q3 Marketing Brainstorm

**Date:** ${new Date(
      Date.now() - 2 * 24 * 60 * 60 * 1000
    ).toLocaleDateString()}
**Attendees:** Alice, Bob, Charlie

## Key Takeaways
- Focus on video content for social media.
- Launch the new 'Innovate' campaign in early August.
- Collaborate with influencers in the tech space.

## Action Items
1.  **Alice:** Draft initial video scripts.
2.  **Bob:** Research potential influencers.
3.  **Charlie:** Finalize campaign budget.
    `,
    tags: ["marketing", "q3", "planning"],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    title: "My Favorite Cheesecake Recipe",
    content: `
# The Ultimate Cheesecake Recipe

A delicious, creamy, and foolproof cheesecake recipe that will impress everyone.

## Ingredients

### For the crust:
- 1 1/2 cups graham cracker crumbs
- 1/4 cup granulated sugar
- 6 tablespoons unsalted butter, melted

### For the filling:
- 32 ounces cream cheese, softened
- 1 cup granulated sugar
- 1 cup sour cream
- 1 teaspoon vanilla extract
- 4 large eggs

## Instructions
1.  Preheat oven to 325°F (163°C).
2.  Mix graham cracker crumbs, sugar, and melted butter. Press into the bottom of a 9-inch springform pan.
3.  Bake for 10 minutes. Let cool.
4.  Beat cream cheese and sugar until smooth. Mix in sour cream and vanilla.
5.  Add eggs one at a time, mixing on low speed until just blended.
6.  Pour filling over the crust.
7.  Bake for 60-70 minutes, or until the center is almost set.
8.  Let cool completely, then refrigerate for at least 4 hours.
    `,
    tags: ["recipe", "baking", "dessert"],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    title: "Ideas for my next side project",
    content: `
# Side Project Ideas

- **AI-Powered Recipe Generator:** An app that creates recipes based on ingredients you have at home.
- **Personal Finance Tracker with Gamification:** Make saving money fun with achievements and leaderboards.
- **Local Event Aggregator:** A hyper-local app that shows events happening *right now* in your neighborhood.
- **Markdown-based Journaling App:** A simple, elegant app for daily writing (maybe this one!).
    `,
    tags: ["ideas", "programming", "startup"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
    {
    id: "4",
    title: "Learning Path for TypeScript",
    content: `
# TypeScript Learning Journey

A structured plan to master TypeScript.

## Phase 1: The Basics
- [x] Understand static typing
- [x] Basic types (string, number, boolean)
- [ ] Arrays and Tuples
- [ ] Interfaces vs. Types
- [ ] Functions and their signatures

## Phase 2: Advanced Concepts
- [ ] Generics
- [ ] Enums
- [ ] Advanced types (Union, Intersection, Mapped, Conditional)
- [ ] Decorators

## Phase 3: Practical Application
- [ ] Build a small project with React & TypeScript
- [ ] Contribute to an open-source TS project
- [ ] Set up a Node.js backend with TypeScript
    `,
    tags: ["learning", "typescript", "coding"],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
