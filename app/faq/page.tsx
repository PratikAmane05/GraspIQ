import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is GRASP IQ?",
    a: "An AI-powered adaptive learning platform with a voice-enabled tutor.",
  },
  {
    q: "Is it free?",
    a: "Yes, you can start free and upgrade for advanced features.",
  },
  {
    q: "Can I export notes?",
    a: "Export to PDF or Markdown from Smart Notes Creator.",
  },
];

export default function FAQPage() {
  return (
    <div className="container py-16 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8">FAQ</h1>
      <Accordion>
        {faqs.map((f, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="border border-border rounded-md mb-4 px-4"
          >
            <AccordionTrigger itemValue={`item-${i}`}>{f.q}</AccordionTrigger>
            <AccordionContent itemValue={`item-${i}`}>{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
