// One-Sentence Absurd Invention Pitch
// Entry program for make.fun bounty
// u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a
//
// The program holds a small field of original one-sentence pitches, each
// pitching a ridiculous invention that fixes a tiny everyday annoyance,
// scores them on the judge's own criteria in the judge's own order, and
// writes the winner — exactly one sentence, no trailing newline — to
// /output/entry.txt.
//
// Selection follows the judge's brief literally: compare candidates
// lexicographically on (funny invention, clever fix, original idea,
// tight sentence), in that order. The first criterion where two pitches
// differ decides; there is no weighted sum, no total score, no averaging.

import { mkdirSync, writeFileSync } from "node:fs";

type Pitch = {
  text: string;
  // Judge criteria, most important first. Each is a 1-5 rating.
  funny: number; // the laugh comes from the invention itself
  clever: number; // the absurd machine fixes the annoyance in a way that is silly yet weirdly plausible
  original: number; // a fresh absurdity, not a familiar one reheated
  tight: number; // one clean sentence naming the annoyance, the invention and its silly mechanism
};

const CANDIDATES: Pitch[] = [
  {
    text: "A toaster that files a formal noise complaint against the bread for popping up too loudly at 6 a.m.",
    funny: 3,
    clever: 3,
    original: 2,
    tight: 4,
  },
  {
    text: "A doormat that sighs, rolls itself up, and refuses visitors until someone apologises for tracking mud in.",
    funny: 5,
    clever: 5,
    original: 5,
    tight: 5,
  },
  {
    text: "A toothbrush that calls a staff meeting every time you skip flossing, then sulks in its cup until Thursday.",
    funny: 4,
    clever: 4,
    original: 4,
    tight: 4,
  },
  {
    text: "A fridge light that dims itself in protest whenever you open the door just to stare inside.",
    funny: 4,
    clever: 3,
    original: 3,
    tight: 5,
  },
  {
    text: "A houseplant that texts your boss that you are working from home so it can finally get some peace and quiet.",
    funny: 4,
    clever: 4,
    original: 4,
    tight: 3,
  },
];

// Lexicographic comparison in the judge's criterion order:
// funny, then clever, then original, then tight. First difference wins.
function comparePitches(a: Pitch, b: Pitch): number {
  if (a.funny !== b.funny) return b.funny - a.funny;
  if (a.clever !== b.clever) return b.clever - a.clever;
  if (a.original !== b.original) return b.original - a.original;
  if (a.tight !== b.tight) return b.tight - a.tight;
  return 0;
}

const winner = [...CANDIDATES].sort(comparePitches)[0];

// Gate: the entry must be UTF-8 text of 1-220 characters, not only
// whitespace, with no newline (it is a single sentence).
const text = winner.text;
if (text.length < 1 || text.length > 220) {
  throw new Error(`entry is ${text.length} characters, must be 1-220`);
}
if (text.includes("\n")) {
  throw new Error("entry must be a single sentence with no newline");
}
// Exactly one sentence: a single terminal period, no other
// sentence-ending punctuation anywhere in the text.
const terminators = text.match(/[.!?]/g) ?? [];
if (terminators.length !== 1 || !text.endsWith(".")) {
  throw new Error("entry must be exactly one sentence ending in a period");
}
if (text.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", text, "utf8");
console.log(`wrote ${text.length} characters to /output/entry.txt`);
