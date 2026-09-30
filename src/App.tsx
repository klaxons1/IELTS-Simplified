import { useMemo, useState } from "react";
import { cn } from "@/utils/cn";
import {
  bandDescriptor,
  passages,
  questions,
  rawToBand,
} from "@/data/questions";

type Stage = "intro" | "quiz" | "result";

const LETTERS = ["A", "B", "C", "D"];

export default function App() {
  const [stage, setStage] = useState<Stage>("intro");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null),
  );

  const total = questions.length;
  const q = questions[index];

  const score = useMemo(
    () => answers.reduce<number>((s, a, i) => (a === questions[i].answer ? s + 1 : s), 0),
    [answers],
  );

  const start = () => {
    setAnswers(Array(total).fill(null));
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setStage("quiz");
    window.scrollTo({ top: 0 });
  };

  const check = () => {
    if (selected === null) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = selected;
      return next;
    });
    setChecked(true);
  };

  const next = () => {
    if (index + 1 >= total) {
      setStage("result");
    } else {
      setIndex(index + 1);
      setSelected(null);
      setChecked(false);
    }
    window.scrollTo({ top: 0 });
  };

  const isCorrect = checked && selected === q.answer;

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded bg-red-600 text-xs font-bold text-white">
              IE
            </span>
            <span className="text-sm font-semibold tracking-tight">
              IELTS Practice Quiz
            </span>
          </div>
          {stage === "quiz" && (
            <span className="text-sm tabular-nums text-neutral-500">
              {index + 1} / {total}
            </span>
          )}
        </div>
        {stage === "quiz" && (
          <div className="h-1 w-full bg-neutral-100">
            <div
              className="h-1 bg-red-600 transition-all duration-300"
              style={{ width: `${((index + (checked ? 1 : 0)) / total) * 100}%` }}
            />
          </div>
        )}
      </header>

      <main className="mx-auto max-w-2xl px-5 py-10">
        {stage === "intro" && <Intro onStart={start} />}

        {stage === "quiz" && (
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-neutral-500">
              Question {q.id} · {q.type}
            </p>

            {q.passageId && (
              <div className="mb-6 rounded-lg border border-neutral-200 bg-white p-5">
                <h3 className="mb-2 text-sm font-semibold">
                  {passages[q.passageId].title}
                </h3>
                <p className="text-[15px] leading-relaxed text-neutral-700">
                  {passages[q.passageId].text}
                </p>
              </div>
            )}

            <h2 className="mb-5 text-xl font-semibold leading-snug">
              {q.prompt}
            </h2>

            <div className="space-y-2.5" role="radiogroup">
              {q.options.map((opt, i) => {
                const isSel = selected === i;
                const isAns = i === q.answer;
                return (
                  <button
                    key={i}
                    role="radio"
                    aria-checked={isSel}
                    disabled={checked}
                    onClick={() => setSelected(i)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-lg border bg-white px-4 py-3 text-left text-[15px] transition",
                      !checked && !isSel && "border-neutral-200 hover:border-neutral-400",
                      !checked && isSel && "border-neutral-900 ring-1 ring-neutral-900",
                      checked && isAns && "border-emerald-500 bg-emerald-50",
                      checked && isSel && !isAns && "border-red-500 bg-red-50",
                      checked && !isSel && !isAns && "border-neutral-200 opacity-60",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-px grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs font-semibold",
                        !checked && isSel
                          ? "border-neutral-900 bg-neutral-900 text-white"
                          : "border-neutral-300 text-neutral-500",
                        checked && isAns && "border-emerald-500 bg-emerald-500 text-white",
                        checked && isSel && !isAns && "border-red-500 bg-red-500 text-white",
                      )}
                    >
                      {q.options.length === 3 ? (checked && isAns ? "✓" : checked && isSel ? "✕" : "•") : LETTERS[i]}
                    </span>
                    <span className="pt-px">{opt}</span>
                  </button>
                );
              })}
            </div>

            {checked && (
              <div
                className={cn(
                  "mt-5 rounded-lg border p-4 text-[15px] leading-relaxed",
                  isCorrect
                    ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                    : "border-red-200 bg-red-50 text-red-900",
                )}
              >
                <p className="mb-1 font-semibold">
                  {isCorrect ? "Correct!" : "Not quite."}
                </p>
                {!isCorrect && (
                  <>
                    <p className="mb-1">
                      Correct answer:{" "}
                      <span className="font-semibold">{q.options[q.answer]}</span>
                    </p>
                    <p>{q.explanation}</p>
                  </>
                )}
              </div>
            )}

            <div className="mt-8 flex justify-end">
              {!checked ? (
                <button
                  onClick={check}
                  disabled={selected === null}
                  className="rounded-lg bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-300"
                >
                  Check answer
                </button>
              ) : (
                <button
                  onClick={next}
                  className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
                >
                  {index + 1 >= total ? "See results" : "Next question →"}
                </button>
              )}
            </div>
          </div>
        )}

        {stage === "result" && (
          <Result answers={answers} score={score} onRestart={start} />
        )}
      </main>

      <footer className="pb-10 text-center text-xs text-neutral-400">
        <p>Test prepared by pashansky2005</p>
        <p className="mt-1">
          © {new Date().getFullYear()} pashansky2005 · Unofficial practice
          material · not affiliated with IELTS
        </p>
      </footer>
    </div>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Test your English like it’s IELTS
      </h1>
      <p className="mx-auto mt-4 max-w-md text-neutral-600">
        20 questions in the style of the IELTS Reading and Use of English
        sections. Get instant feedback, explanations for every mistake, and an
        estimated band score.
      </p>

      <div className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-3 text-sm">
        {[
          ["20", "questions"],
          ["~15", "minutes"],
          ["0–9", "band score"],
        ].map(([n, l]) => (
          <div key={l} className="rounded-lg border border-neutral-200 bg-white py-4">
            <div className="text-xl font-semibold">{n}</div>
            <div className="text-neutral-500">{l}</div>
          </div>
        ))}
      </div>

      <ul className="mx-auto mt-8 max-w-md space-y-1.5 text-left text-sm text-neutral-600">
        <li>• 10 reading questions: True / False / Not Given and multiple choice</li>
        <li>• 5 vocabulary, paraphrase and grammar questions</li>
        <li>• 5 questions on writing-style language</li>
        <li>• Each question has one correct answer and no penalty for mistakes</li>
      </ul>

      <button
        onClick={onStart}
        className="mt-10 rounded-lg bg-red-600 px-8 py-3 text-sm font-medium text-white transition hover:bg-red-700"
      >
        Start test
      </button>
    </div>
  );
}

function Result({
  answers,
  score,
  onRestart,
}: {
  answers: (number | null)[];
  score: number;
  onRestart: () => void;
}) {
  const total = questions.length;
  const scaled = Math.round((score / total) * 40); // IELTS raw score out of 40
  const band = rawToBand(scaled);
  const wrong = questions.filter((q, i) => answers[i] !== q.answer);

  return (
    <div>
      <div className="rounded-xl border border-neutral-200 bg-white p-8 text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
          Estimated band score
        </p>
        <div className="mt-2 text-7xl font-bold tracking-tight text-red-600">
          {band.toFixed(1)}
        </div>
        <p className="mt-1 text-neutral-600">{bandDescriptor(band)}</p>

        <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-neutral-50 py-3">
            <div className="text-lg font-semibold">
              {score} / {total}
            </div>
            <div className="text-neutral-500">correct answers</div>
          </div>
          <div className="rounded-lg bg-neutral-50 py-3">
            <div className="text-lg font-semibold">{scaled} / 40</div>
            <div className="text-neutral-500">scaled raw score</div>
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-md text-xs leading-relaxed text-neutral-500">
          Scoring follows the IELTS method: every correct answer earns one mark
          and there is no negative marking. The exam has 40 questions, so your
          result is scaled to 40 and converted using the official Academic
          Reading band table (39–40 = 9.0, 30–32 = 7.0, 23–26 = 6.0, 15–18 =
          5.0). This is an estimate only.
        </p>

        <button
          onClick={onRestart}
          className="mt-6 rounded-lg bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Try again
        </button>
      </div>

      <h2 className="mb-4 mt-10 text-lg font-semibold">
        {wrong.length === 0
          ? "Perfect score! No mistakes to review 🎉"
          : `Review your mistakes (${wrong.length})`}
      </h2>

      <div className="space-y-4">
        {wrong.map((q) => {
          const given = answers[q.id - 1];
          return (
            <div
              key={q.id}
              className="rounded-lg border border-neutral-200 bg-white p-5"
            >
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-neutral-500">
                Question {q.id} · {q.type}
              </p>
              <p className="mb-3 font-medium">{q.prompt}</p>
              <p className="text-sm">
                <span className="text-neutral-500">Your answer: </span>
                <span className="font-medium text-red-600">
                  {given === null ? "—" : q.options[given]}
                </span>
              </p>
              <p className="text-sm">
                <span className="text-neutral-500">Correct answer: </span>
                <span className="font-medium text-emerald-600">
                  {q.options[q.answer]}
                </span>
              </p>
              <p className="mt-3 rounded-md bg-neutral-50 p-3 text-sm leading-relaxed text-neutral-700">
                {q.explanation}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
