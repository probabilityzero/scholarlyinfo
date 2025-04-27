import Image from "next/image"
import Link from "next/link"
import Breadcrumb from "@/components/ui/breadcrumb"
import { FAQSection, FAQItem } from "@/components/ui/faq-section"
import { 
  Heart, 
  CreditCard, 
  Gift, 
  Coffee, 
  Briefcase, 
  Code, 
  ChevronRight, 
  CircleDollarSign, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Trophy,
  Users
} from "lucide-react"
import { Metadata } from "next"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Support Scholarly | Help Us Make Research Accessible",
  description: "Support Scholarly's mission to democratize access to academic research. Contribute through donations, sponsorships, or by joining our open source community.",
  openGraph: {
    title: "Support Scholarly | Help Us Make Research Accessible",
    description: "Support Scholarly's mission to democratize access to academic research. Contribute through donations, sponsorships, or by joining our open source community.",
    url: `${siteConfig.url}/info/contribute`,
    type: "website",
    images: [siteConfig.images.defaultOG],
  },
  twitter: {
    card: "summary_large_image",
    title: "Support Scholarly | Help Us Make Research Accessible",
    description: "Support Scholarly's mission to democratize access to academic research. Contribute through donations, sponsorships, or by joining our open source community.",
    images: [siteConfig.images.defaultOG],
  },
  alternates: {
    canonical: `${siteConfig.url}/info/support-us`,
  }
}

const donationTiers = [
  {
    name: "Contributor",
    amount: "$5/month",
    description: "Support our basic operations and help keep Scholarly free for everyone.",
    benefits: [
      "Ad-free experience",
      "Recognition on our supporters page",
      "Monthly newsletter with research highlights"
    ],
    highlighted: false,
    icon: <Coffee className="h-6 w-6" />,
    buttonText: "Become a Contributor"
  },
  {
    name: "Advocate",
    amount: "$10/month",
    description: "Help us expand our resources and enhance the platform's capabilities.",
    benefits: [
      "All Contributor benefits",
      "Advanced search filters",
      "Citation management tools",
      "Early access to new features"
    ],
    highlighted: true,
    icon: <Heart className="h-6 w-6" />,
    buttonText: "Become an Advocate"
  },
  {
    name: "Patron",
    amount: "$25/month",
    description: "Become a key supporter enabling us to expand to more research repositories.",
    benefits: [
      "All Advocate benefits",
      "Priority email support",
      "API access (100 requests/day)",
      "Custom PDF annotations",
      "Exclusive research webinars"
    ],
    highlighted: false,
    icon: <Star className="h-6 w-6" />,
    buttonText: "Become a Patron"
  }
];

// Other ways to support
const supportMethods = [
  {
    title: "GitHub Sponsor",
    description: "Support our open source development directly through GitHub Sponsors.",
    icon: <Code className="h-6 w-6 text-primary" />,
    link: siteConfig.links.github,
    buttonText: "Sponsor on GitHub"
  },
  {
    title: "Corporate Sponsorship",
    description: "Partner with us to provide Scholarly access to your organization or educational institution.",
    icon: <Briefcase className="h-6 w-6 text-primary" />,
    link: "/info/contact?subject=Corporate Sponsorship",
    buttonText: "Inquire About Sponsorships"
  },
  {
    title: "One-Time Donation",
    description: "Make a single contribution of any amount to support our mission.",
    icon: <Gift className="h-6 w-6 text-primary" />,
    link: "#one-time-donation",
    buttonText: "Make a Donation"
  }
];

// Impact statistics
const impactStats = [
  {
    metric: "2.3M+",
    description: "Researchers using Scholarly monthly"
  },
  {
    metric: "15M+",
    description: "Papers made more accessible"
  },
  {
    metric: "130+",
    description: "Countries with active users"
  },
  {
    metric: "92%",
    description: "Of funding goes directly to development"
  }
];

// Testimonials from supporters
const testimonials = [
  {
    quote: "Scholarly has transformed how our department accesses research. Supporting this platform was an easy decision for us.",
    author: "Dr. James Wilson",
    role: "Professor of Computer Science, Stanford University",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  },
  {
    quote: "As a PhD student without institutional access to many journals, Scholarly has been invaluable. I'm proud to be a monthly supporter.",
    author: "Maria Chen",
    role: "Doctoral Candidate, University of Tokyo",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  },
  {
    quote: "Our foundation supports Scholarly because they share our mission of democratizing knowledge. Their impact in developing regions has been substantial.",
    author: "Robert Kiyosaki",
    role: "Director, Open Knowledge Foundation",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
  }
];

// FAQ items
const faqItems: FAQItem[] = [
  {
    question: "Is my donation tax-deductible?",
    answer: "Yes, Scholarly operates as a 501(c)(3) non-profit organization in the United States. Donations are tax-deductible to the extent allowed by law. We provide receipts for donations over $250."
  },
  {
    question: "How is my donation used?",
    answer: "92% of donations go directly to development, server costs, and expanding our coverage of research repositories. The remaining funds support administrative costs and community outreach."
  },
  {
    question: "Can I donate if I'm outside the US?",
    answer: "Absolutely! We accept international donations through our payment processors. You'll receive all the same benefits regardless of your location."
  },
  {
    question: "Can organizations become sponsors?",
    answer: "Yes, we welcome institutional and corporate sponsorships. These partnerships help provide Scholarly access to organizations while supporting our broader mission. Contact us for more information."
  }
];

export default function SupportUsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-muted/10 via-muted/5 to-background overflow-hidden">
        
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumb 
            items={[
              { label: "Info", href: "/info" },
              { label: "Support Us", current: true }
            ]} 
            className="mb-12"
          />
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center justify-center mb-6 bg-primary/10 text-primary px-4 py-2 rounded-full">
              <Heart className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Support Open Research</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Help Us Make Research <span className="text-primary">Accessible to Everyone</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Scholarly is a non-profit project dedicated to democratizing access to academic knowledge. Your support helps us maintain and expand this free resource.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto p-4">
        {/* Why Support Section */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-semibold mb-6">Why Support Scholarly?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Scholarly operates on a primarily volunteer-driven model, with minimal financial support. Yet, we're committed to keeping our core services free and accessible to everyone.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Expanding Access</h3>
                    <p className="text-muted-foreground">
                      Your support helps us connect more researchers to papers they might otherwise not be able to access.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Code className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Building Better Tools</h3>
                    <p className="text-muted-foreground">
                      We're continuously improving our search algorithms, reading experience, and discovery features.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Supporting Open Science</h3>
                    <p className="text-muted-foreground">
                      We advocate for and support open access research principles and transparent scientific communication.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative h-[500px] w-full rounded-2xl overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1647252397326-1faae660c85f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Researchers collaborating" 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
              <div className="absolute -bottom-8 -left-8 bg-card p-6 rounded-xl shadow-lg border max-w-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Our Funding</h3>
                  <CircleDollarSign className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Individual Supporters</span>
                      <span className="font-medium">67%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "67%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Institutional Sponsors</span>
                      <span className="font-medium">21%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "21%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Grants</span>
                      <span className="font-medium">12%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "12%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Impact Stats */}
        <section className="mb-24 bg-primary/5 rounded-3xl p-12">
          <h2 className="text-3xl font-semibold mb-12 text-center">Our Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.metric}</p>
                <p className="text-muted-foreground">{stat.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Recurring Donation Tiers */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">Support Scholarly Monthly</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Become a recurring supporter and help us plan for sustainable growth while enjoying premium benefits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {donationTiers.map((tier, index) => (
              <div 
                key={index} 
                className={`rounded-xl p-8 border transition-all ${
                  tier.highlighted 
                    ? 'border-primary shadow-lg relative bg-card' 
                    : 'border-muted bg-card/50'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-semibold py-1 px-3 rounded-full">
                    Most Popular
                  </div>
                )}
                
                <div className={`h-12 w-12 rounded-full mb-6 flex items-center justify-center ${
                  tier.highlighted ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                }`}>
                  {tier.icon}
                </div>
                
                <h3 className="text-2xl font-semibold mb-2">{tier.name}</h3>
                <p className="text-xl font-bold text-primary mb-4">{tier.amount}</p>
                <p className="text-muted-foreground mb-6">{tier.description}</p>
                
                <div className="mb-8">
                  <h4 className="font-medium mb-3">Benefits Include:</h4>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button className={`w-full py-3 rounded-md font-medium transition-colors flex items-center justify-center ${
                  tier.highlighted 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                    : 'bg-muted hover:bg-muted/80'
                }`}>
                  {tier.buttonText}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8 text-sm text-muted-foreground">
            All recurring donations can be canceled at any time. We use secure payment processing via Stripe.
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="mb-24">
          <h2 className="text-3xl font-semibold mb-12 text-center">Why Our Supporters Love Scholarly</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card border rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-full overflow-hidden relative">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">{`"${testimonial.quote}"`}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Other Ways to Support */}
        <section className="mb-24" id="one-time-donation">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">Other Ways to Support</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Monthly subscriptions aren't the only way to help. You can support Scholarly through these additional methods.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportMethods.map((method, index) => (
              <div key={index} className="bg-card rounded-xl border p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{method.title}</h3>
                </div>
                <p className="text-muted-foreground mb-6">{method.description}</p>
                <Link 
                  href={method.link}
                  className="text-sm font-medium text-primary hover:text-primary/80 flex items-center"
                >
                  {method.buttonText}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </section>
        
        {/* One-Time Donation */}
        <section className="mb-24 bg-card rounded-3xl border p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Make a One-Time Donation</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Contribute any amount to support Scholarly's mission of democratizing access to research.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {["$10", "$25", "$50", "$100"].map((amount, index) => (
                <button 
                  key={index} 
                  className={`py-3 rounded-md font-medium border ${
                    index === 1 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-card border-input hover:bg-muted/50'
                  }`}
                >
                  {amount}
                </button>
              ))}
            </div>
            
            <div className="mb-8">
              <label htmlFor="custom-amount" className="block text-sm font-medium mb-2">
                Custom Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-muted-foreground">$</span>
                </div>
                <input
                  type="number"
                  id="custom-amount"
                  placeholder="Enter amount"
                  min="1"
                  className="w-full pl-8 pr-4 py-3 border rounded-md bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>
            
            <div className="flex justify-center mb-8">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Donate Now
              </button>
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              Donations are processed securely via Stripe. For donations over $250, we'll provide a receipt for tax purposes.
            </div>
          </div>
        </section>
        
        {/* FAQ - Now using the reusable component */}
        <FAQSection 
          title="Frequently Asked Questions"
          items={faqItems}
          className="mb-24"
        />
        
        {/* Final CTA */}
        <section className="bg-primary/10 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-semibold mb-4">Join Our Community of Supporters</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Every contribution makes a difference in our mission to make research accessible to everyone, everywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              <Heart className="mr-2 h-4 w-4" />
              Support Now
            </button>
            <Link 
              href="/info/about" 
              className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Learn About Our Mission
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}