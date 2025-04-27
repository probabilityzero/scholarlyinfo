import React from 'react';

// Helper function to generate random author names
export function generateRandomAuthors(count: number): string {
  const firstNames = ["John", "Maria", "David", "Emily", "Samuel", "Jennifer", "Michael", "Sarah", "Robert", "Lisa", "Wei", "Aisha", "Carlos", "Priya", "Hiroshi"];
  const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Wang", "Patel", "Rodriguez", "Singh", "Tanaka"];
  
  const authors = Array(count).fill(0).map(() => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
  });
  
  // Return a simple string instead of JSX
  const authorText = authors.join(", ");
  return count > 3 ? `${authorText} et al.` : authorText;
}

// Helper function to generate random abstract text
export function generateRandomAbstract(category: string): string {
  const introductions = [
    `This paper presents a comprehensive analysis of recent developments in the field of ${category.toLowerCase()}.`,
    `We propose a novel approach to addressing key challenges in ${category.toLowerCase()} research.`,
    `This study examines the theoretical foundations and practical applications of ${category.toLowerCase()}.`,
    `Recent advances in ${category.toLowerCase()} have opened new avenues for exploration and innovation.`,
    `This research investigates the relationship between various factors affecting ${category.toLowerCase()}.`
  ];
  
  const methodologies = [
    `Using a mixed-methods approach combining qualitative and quantitative data analysis,`,
    `Through a series of experiments and statistical analyses,`,
    `By applying advanced computational techniques and modeling,`,
    `Based on a comprehensive literature review and meta-analysis,`,
    `Utilizing state-of-the-art instrumentation and methodologies,`
  ];
  
  const findings = [
    `we demonstrate significant improvements over existing approaches.`,
    `our results reveal important insights into underlying mechanisms.`,
    `we identify several key factors that contribute to enhanced performance.`,
    `this work establishes a new framework for future research in this domain.`,
    `our findings have important implications for both theory and practice.`
  ];
  
  const randomIntro = introductions[Math.floor(Math.random() * introductions.length)];
  const randomMethod = methodologies[Math.floor(Math.random() * methodologies.length)];
  const randomFinding = findings[Math.floor(Math.random() * findings.length)];
  
  return `${randomIntro} ${randomMethod} ${randomFinding}`;
}