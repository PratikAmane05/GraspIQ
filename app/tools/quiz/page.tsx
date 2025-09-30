"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Q {
  q: string;
  a: string;
  choices: string[];
}

export default function QuizBuilderPage() {
  const [text, setText] = useState("");
  const [quiz, setQuiz] = useState<Q[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const build = async () => {
    if (!text.trim()) return;
    await new Promise((r) => setTimeout(r, 600));
    setQuiz([
      {
        q: "What does gradient descent minimize?",
        a: "Loss function",
        choices: ["Accuracy", "Loss function", "Epoch", "Learning rate"],
      },
      {
        q: "Too high learning rate leads to?",
        a: "Overshooting minima",
        choices: [
          "Fast convergence",
          "Overshooting minima",
          "Underfitting",
          "Zero gradients",
        ],
      },
    ]);
  };

  const score = quiz.filter((q, i) => answers[i] === q.a).length;

  return (
    <div className="container py-10 space-y-8">
      <h1 className="text-3xl font-bold">Quiz Builder</h1>
      <Card>
        <CardHeader>
          <CardTitle>Generate Quiz</CardTitle>
          <CardDescription>
            Create formative assessments automatically.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            rows={4}
            placeholder="Topic or raw notes..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={build}>Build Quiz</Button>
          {quiz.length > 0 && (
            <div className="space-y-6 mt-4">
              {quiz.map((q, i) => (
                <div key={i} className="space-y-2">
                  <p className="font-medium">
                    {i + 1}. {q.q}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {q.choices.map((c) => (
                      <button
                        key={c}
                        onClick={() => setAnswers((a) => ({ ...a, [i]: c }))}
                        className={`text-left px-3 py-2 rounded-md border text-sm hover:bg-accent transition ${
                          answers[i] === c
                            ? "border-primary bg-primary/10"
                            : "border-border"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  {answers[i] && (
                    <p
                      className={`text-xs ${
                        answers[i] === q.a ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {answers[i] === q.a ? "Correct" : `Answer: ${q.a}`}
                    </p>
                  )}
                </div>
              ))}
              <div className="text-sm font-medium">
                Score: {score}/{quiz.length}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
