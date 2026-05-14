"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
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

export default function OnboardingPage() {
  const { user, completeProfile } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [subjects, setSubjects] = useState("Data Structures, Calculus");

  useEffect(() => {
    if (!user) router.replace("/sign-in");
    else if (user.profileCompleted) router.replace("/dashboard");
  }, [user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    completeProfile({ name, school, grade, subjects: subjects.split(/,\s*/) });
    router.push("/dashboard");
  };

  return (
    <div className="container max-w-2xl py-12">
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>
            Just a few details to personalize recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium block mb-1">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium block mb-1">
                  School / College
                </label>
                <Input
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="e.g. IIT Delhi"
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">
                  Grade / Year
                </label>
                <Input
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder="e.g. 2nd Year"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">
                Subjects (comma separated)
              </label>
              <Textarea
                value={subjects}
                onChange={(e) => setSubjects(e.target.value)}
                rows={3}
              />
            </div>
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
