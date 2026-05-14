"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  return (
    <div className="container py-16 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <Card>
        <CardHeader>
          <CardTitle>Send a Message</CardTitle>
          <CardDescription>
            We usually respond within a business day.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Submitted!");
            }}
          >
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              required
            />
            <Textarea
              rows={5}
              placeholder="Message"
              value={form.message}
              onChange={(e) =>
                setForm((f) => ({ ...f, message: e.target.value }))
              }
              required
            />
            <Button type="submit" className="w-full">
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
