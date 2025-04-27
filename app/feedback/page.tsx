"use client"

import { useState } from "react";
import Link from "next/link";
import { Loader2, SendIcon, CheckCircle } from "lucide-react";
import Breadcrumb from "@/components/ui/breadcrumb";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export default function FeedbackPage() {
  const [feedbackType, setFeedbackType] = useState<string>("suggestion");
  const [feedback, setFeedback] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFeedback("");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb 
          items={[
            { label: "Info", href: "/info" },
            { label: "Feedback", current: true }
          ]} 
        />
        
        <div className="max-w-2xl mx-auto mt-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Share Your Feedback</h1>
            <p className="text-lg text-muted-foreground">
              Your thoughts help us improve. Tell us what you think about Scholarly.
            </p>
          </div>
          
          {isSubmitted ? (
            <div className="bg-primary/5 rounded-xl p-8 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
              <p className="text-muted-foreground mb-6">
                Your feedback has been submitted successfully. We appreciate your input and will use it to make Scholarly better.
              </p>
              <div className="flex justify-center gap-4">
                <Button onClick={() => setIsSubmitted(false)}>
                  Submit Another Response
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">Return to Home</Link>
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-card rounded-xl p-8 border shadow-sm">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-medium mb-4">What kind of feedback do you have?</h2>
                    <RadioGroup 
                      defaultValue="suggestion" 
                      value={feedbackType} 
                      onValueChange={setFeedbackType}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="suggestion" id="suggestion" />
                        <Label htmlFor="suggestion" className="cursor-pointer">Suggestion</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="issue" id="issue" />
                        <Label htmlFor="issue" className="cursor-pointer">Issue Report</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="praise" id="praise" />
                        <Label htmlFor="praise" className="cursor-pointer">Praise</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label htmlFor="feedback" className="text-lg font-medium block mb-4">
                      Your feedback
                    </Label>
                    <Textarea
                      id="feedback"
                      placeholder={
                        feedbackType === "suggestion" 
                          ? "I think it would be great if Scholarly could..." 
                          : feedbackType === "issue" 
                          ? "I encountered an issue when trying to..."
                          : "I really like how Scholarly..."
                      }
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="min-h-32"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-lg font-medium block mb-4">
                      Email address (optional)
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="max-w-md"
                    />
                    <p className="mt-2 text-sm text-muted-foreground">
                      We'll only use this to follow up on your feedback if needed
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting || !feedback.trim()} className="px-8">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting
                    </>
                  ) : (
                    <>
                      <SendIcon className="mr-2 h-4 w-4" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
          
          <div className="mt-16 border-t pt-8">
            <h3 className="text-xl font-semibold mb-4">Other ways to reach us</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-medium mb-1">Email Support</h4>
                <p className="text-sm text-muted-foreground">
                  <a href="mailto:support@scholarly.world" className="text-primary hover:underline">
                    support@scholarly.world
                  </a>
                </p>
              </div>
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-medium mb-1">Feature Requests</h4>
                <p className="text-sm text-muted-foreground">
                  <a 
                    href="https://github.com/probabilityzero/scholarly/issues/new" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Submit on GitHub
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}