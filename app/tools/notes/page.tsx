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

export default function NotesToolPage() {
  const [input, setInput] = useState("");
  const [notes, setNotes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateNotes = async () => {
    if (!input.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setNotes([
      "Core concept extracted",
      "Key formula highlighted",
      "Common pitfall included",
      "Example simplified",
    ]);
    setLoading(false);
  };

  return (
    <div className="container py-10 space-y-8">
      <h1 className="text-3xl font-bold">Smart Notes</h1>
      <Card>
        <CardHeader>
          <CardTitle>Generate Notes</CardTitle>
          <CardDescription>
            Paste topic text or a concept to summarize.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            rows={5}
            placeholder="Paste lecture transcript or write a topic..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={generateNotes} disabled={loading}>
            {loading ? "Generating..." : "Generate"}
          </Button>
          {!!notes.length && (
            <ul className="mt-4 space-y-2 text-sm">
              {notes.map((n) => (
                <li key={n} className="p-2 rounded-md bg-accent/40">
                  {n}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
