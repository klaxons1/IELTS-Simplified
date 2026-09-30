export type Passage = {
  id: string;
  title: string;
  text: string;
};

export type Question = {
  id: number;
  type: string;
  passageId?: string;
  prompt: string;
  options: string[];
  answer: number; // index in options
  explanation: string;
};

const TFNG = ["True", "False", "Not Given"];

export const passages: Record<string, Passage> = {
  bees: {
    id: "bees",
    title: "Urban Beekeeping",
    text: "Over the past decade, beekeeping has moved from the countryside into the heart of major cities. Rooftop hives now operate in London, Paris and New York, and in some cases urban bees produce more honey per hive than their rural counterparts. Researchers suggest this is because cities offer a wider variety of flowering plants throughout the year, from park trees to balcony gardens, while farmland is often dominated by a single crop that blooms for only a few weeks. However, urban beekeeping is not without critics. Some ecologists argue that the rapid growth of honeybee colonies may put pressure on wild pollinators, such as solitary bees, which compete for the same limited food sources. They recommend that city planners focus on planting more flowers rather than simply installing more hives.",
  },
  week: {
    id: "week",
    title: "The Four-Day Week",
    text: "Several trials of a four-day working week have reported encouraging results. In a 2022 UK pilot involving 61 companies, most firms chose to continue the arrangement once the six-month trial ended, and employees reported lower levels of stress and burnout. Importantly, company revenue remained largely stable during the trial. Nevertheless, economists caution that the results may not apply to every sector. Jobs in healthcare or hospitality, for example, require constant staffing, which makes shorter weeks harder to organise. Critics also note that the companies that volunteered for the trial were probably already open to flexible working, so the sample may not be representative.",
  },
};

export const questions: Question[] = [
  // ---------- Passage 1: True / False / Not Given ----------
  {
    id: 1,
    type: "True / False / Not Given",
    passageId: "bees",
    prompt: "Urban hives always produce more honey than rural hives.",
    options: TFNG,
    answer: 1,
    explanation:
      "The text says urban bees produce more honey “in some cases”, not always. The statement contradicts the passage, so the answer is False. Watch out for absolute words like “always”, “never” and “all”.",
  },
  {
    id: 2,
    type: "True / False / Not Given",
    passageId: "bees",
    prompt: "Farmland often offers flowers for only a short period of the year.",
    options: TFNG,
    answer: 0,
    explanation:
      "The passage says farmland is dominated by a single crop “that blooms for only a few weeks”. This matches the statement, so the answer is True.",
  },
  {
    id: 3,
    type: "True / False / Not Given",
    passageId: "bees",
    prompt: "Farms use more pesticides than city gardens.",
    options: TFNG,
    answer: 2,
    explanation:
      "Pesticides are never mentioned in the passage. When the text gives no information to confirm or contradict a statement, the answer is Not Given. Don't use your own knowledge here.",
  },
  {
    id: 4,
    type: "True / False / Not Given",
    passageId: "bees",
    prompt: "Some ecologists believe honeybees may harm wild pollinators.",
    options: TFNG,
    answer: 0,
    explanation:
      "“Put pressure on wild pollinators” is a paraphrase of “harm wild pollinators”, and the text attributes this view to “some ecologists”. The answer is True.",
  },
  {
    id: 5,
    type: "Multiple Choice",
    passageId: "bees",
    prompt: "What do the critics recommend?",
    options: [
      "Banning rooftop hives in big cities",
      "Planting more flowers in urban areas",
      "Moving all hives back to the countryside",
      "Reducing the price of urban honey",
    ],
    answer: 1,
    explanation:
      "The last sentence says city planners should “focus on planting more flowers rather than simply installing more hives”. The other options are never suggested.",
  },

  // ---------- Passage 2 ----------
  {
    id: 6,
    type: "True / False / Not Given",
    passageId: "week",
    prompt: "The UK pilot lasted for one year.",
    options: TFNG,
    answer: 1,
    explanation:
      "The text mentions a “six-month trial”. Because the statement gives a different duration, it contradicts the passage, so the answer is False.",
  },
  {
    id: 7,
    type: "True / False / Not Given",
    passageId: "week",
    prompt: "Employees experienced less stress during the trial.",
    options: TFNG,
    answer: 0,
    explanation:
      "Employees “reported lower levels of stress and burnout”. “Less stress” is a paraphrase of “lower levels of stress”, so the answer is True.",
  },
  {
    id: 8,
    type: "True / False / Not Given",
    passageId: "week",
    prompt: "Workers in the trial received higher salaries.",
    options: TFNG,
    answer: 2,
    explanation:
      "The passage discusses stress and company revenue, but says nothing about employees’ salaries. The answer is Not Given.",
  },
  {
    id: 9,
    type: "Multiple Choice",
    passageId: "week",
    prompt: "Why do economists urge caution?",
    options: [
      "The trial was too short to measure any results",
      "Company revenue fell sharply during the trial",
      "The results may not be true for all industries",
      "Employees did not want to continue the arrangement",
    ],
    answer: 2,
    explanation:
      "Economists say the results “may not apply to every sector”, e.g. healthcare and hospitality. Revenue was “largely stable” and most firms chose to continue, so the other options contradict the text.",
  },
  {
    id: 10,
    type: "Multiple Choice",
    passageId: "week",
    prompt: "What do critics say about the companies that took part?",
    options: [
      "They were mostly in the healthcare sector",
      "They were probably already positive about flexible working",
      "They were paid by the government to join",
      "They had already used a four-day week before",
    ],
    answer: 1,
    explanation:
      "Critics note the companies “were probably already open to flexible working”, meaning the sample may be biased. Nothing is said about payment or previous four-day weeks.",
  },

  // ---------- Vocabulary & paraphrase ----------
  {
    id: 11,
    type: "Vocabulary",
    prompt:
      "“The government’s new policy was met with widespread scepticism.” Which word is closest in meaning to “scepticism”?",
    options: ["Enthusiasm", "Doubt", "Anger", "Confusion"],
    answer: 1,
    explanation:
      "Scepticism means a doubtful attitude towards something, so “doubt” is the closest meaning. “Enthusiasm” is the opposite.",
  },
  {
    id: 12,
    type: "Vocabulary",
    prompt:
      "“Planting trees can help to mitigate the effects of climate change.” Which word is closest in meaning to “mitigate”?",
    options: ["Predict", "Ignore", "Reduce the severity of", "Increase"],
    answer: 2,
    explanation:
      "To mitigate means to make something less harmful or serious. It is a common verb in IELTS Task 2 essays about problems and solutions.",
  },
  {
    id: 13,
    type: "Sentence completion",
    prompt:
      "The scientist’s findings were ______ with earlier research, confirming what had already been established.",
    options: ["inconsistent", "consistent", "unrelated", "competing"],
    answer: 1,
    explanation:
      "“Confirming what had already been established” signals agreement, so “consistent (with)” fits. “Inconsistent” would mean the findings disagreed with the earlier research.",
  },
  {
    id: 14,
    type: "Paraphrase",
    prompt:
      "Which sentence has the same meaning as: “Despite the heavy rain, the match went ahead.”",
    options: [
      "The match was cancelled because of the heavy rain.",
      "The match took place although it rained heavily.",
      "The match was moved to a later date due to rain.",
      "The rain started after the match had finished.",
    ],
    answer: 1,
    explanation:
      "“Despite” expresses contrast (= “although”), and “went ahead” means “took place”. The other options describe a cancellation, a delay, or a different sequence of events.",
  },
  {
    id: 15,
    type: "Grammar",
    prompt: "Hardly had she arrived ______ the meeting began.",
    options: ["than", "when", "while", "as soon"],
    answer: 1,
    explanation:
      "The structure is “Hardly … when”. “No sooner … than” is the parallel structure. Both use inversion (“had she arrived”) and are typical of high-band writing.",
  },

  // ---------- Writing-style language ----------
  {
    id: 16,
    type: "Grammar",
    prompt:
      "If governments ______ more in public transport, fewer people would rely on cars.",
    options: ["invest", "will invest", "invested", "would invest"],
    answer: 2,
    explanation:
      "This is the second conditional (unreal or unlikely situation): If + past simple, … would + infinitive. So the correct form is “invested”.",
  },
  {
    id: 17,
    type: "Word form",
    prompt:
      "The number of international students has risen ______ over the last decade.",
    options: ["dramatic", "dramatically", "drama", "dramatize"],
    answer: 1,
    explanation:
      "We need an adverb to modify the verb “risen”. Adverbs like “dramatically”, “steadily” and “sharply” are essential for Writing Task 1.",
  },
  {
    id: 18,
    type: "Linking words",
    prompt:
      "Many people prefer online shopping; ______, others still enjoy visiting physical stores.",
    options: ["therefore", "moreover", "however", "for instance"],
    answer: 2,
    explanation:
      "The two ideas contrast, so we need a contrast linker: “however”. “Therefore” shows result, “moreover” adds a similar idea, and “for instance” gives an example.",
  },
  {
    id: 19,
    type: "Describing data",
    prompt:
      "The chart shows that sales ______ from 200 units in January to 500 in June.",
    options: ["raised", "rose", "arose", "risen"],
    answer: 1,
    explanation:
      "“Rise” is intransitive (no object) and its past simple is “rose”. “Raise” needs an object (“raised prices”). “Arose” means “appeared”, and “risen” needs an auxiliary (has/have risen).",
  },
  {
    id: 20,
    type: "Academic style",
    prompt: "Which sentence is the most suitable for formal academic writing?",
    options: [
      "Kids these days are totally glued to their phones.",
      "Young people increasingly spend a considerable amount of time on mobile devices.",
      "Loads of teenagers can’t live without their gadgets.",
      "It’s obvious that phones are just awful for everyone.",
    ],
    answer: 1,
    explanation:
      "Academic writing avoids slang (“kids”, “loads of”, “glued to”), contractions (“can’t”, “it’s”), and overly strong, unsupported claims (“awful for everyone”). Option B is neutral, precise and formal.",
  },
];

// Official IELTS Academic Reading conversion (raw score out of 40 -> band).
const bandTable: [number, number][] = [
  [39, 9],
  [37, 8.5],
  [35, 8],
  [33, 7.5],
  [30, 7],
  [27, 6.5],
  [23, 6],
  [19, 5.5],
  [15, 5],
  [13, 4.5],
  [10, 4],
  [8, 3.5],
  [6, 3],
  [4, 2.5],
];

export function rawToBand(raw40: number): number {
  for (const [min, band] of bandTable) {
    if (raw40 >= min) return band;
  }
  return raw40 >= 2 ? 2 : raw40 >= 1 ? 1 : 0;
}

export const bandRanges = bandTable;

export function bandDescriptor(band: number): string {
  if (band >= 9) return "Expert user";
  if (band >= 8) return "Very good user";
  if (band >= 7) return "Good user";
  if (band >= 6) return "Competent user";
  if (band >= 5) return "Modest user";
  if (band >= 4) return "Limited user";
  if (band >= 3) return "Extremely limited user";
  return "Beginner level";
}
