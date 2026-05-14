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

interface CardItem {
  front: string;
  back: string;
}

export default function FlashcardsToolPage() {
  const [source, setSource] = useState("");
  const [cards, setCards] = useState<CardItem[]>([]);
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!source.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setCards([
      {
        front: "Definition of Gradient Descent",
        back: "Iterative optimization algorithm reducing loss.",
      },
      {
        front: "Impact of Learning Rate",
        back: "Too high overshoots, too low converges slowly.",
      },
      {
        front: "Stopping Criteria",
        back: "When improvement < threshold or max iterations.",
      },
    ]);
    setIndex(0);
    setShowBack(false);
    setLoading(false);
  };

  const next = () => {
    setIndex((i) => (i + 1) % cards.length);
    setShowBack(false);
  };

  return (
    <div className="container py-10 space-y-8">
      <h1 className="text-3xl font-bold">Flashcards</h1>
      <Card>
        <CardHeader>
          <CardTitle>Create Deck</CardTitle>
          <CardDescription>
            Generate active recall cards from content.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            rows={4}
            placeholder="Paste topic or notes..."
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
          <Button onClick={generate} disabled={loading}>
            {loading ? "Generating..." : "Build Deck"}
          </Button>
          {cards.length > 0 && (
            <div className="mt-6">
              <div
                onClick={() => setShowBack((s) => !s)}
                className="cursor-pointer h-40 flex items-center justify-center text-center rounded-lg border bg-accent/40 p-4 select-none"
              >
                {showBack ? cards[index].back : cards[index].front}
              </div>
              <div className="flex gap-3 mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowBack((s) => !s)}
                >
                  Flip
                </Button>
                <Button size="sm" onClick={next}>
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
