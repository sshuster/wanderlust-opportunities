
import { useState } from "react";
import { Search, Briefcase, MapPin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BadgeCustom } from "@/components/ui/badge-custom";

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // In a real app, you would filter jobs or redirect to search results
  };

  const popularSearches = [
    "Developer", "Designer", "Marketing", "Sales", "Customer Support"
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div 
          className="absolute top-0 -right-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl animate-pulse-subtle" 
          style={{ animationDelay: "0s" }}
        />
        <div 
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-3xl animate-pulse-subtle" 
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 max-w-3xl mx-auto animate-slide-down">
          <div className="flex justify-center mb-6">
            <BadgeCustom variant="marketing" className="px-3 py-1 text-sm">
              <Globe className="h-3.5 w-3.5 mr-1" /> 
              Remote work that comes to you
            </BadgeCustom>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-balance">
            Discover the best <span className="text-primary">remote jobs</span> from top companies
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
            Curated remote jobs in design, engineering, product, project management, marketing, and more
          </p>

          <form 
            onSubmit={handleSearch} 
            className="max-w-2xl mx-auto mt-8 relative"
          >
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Job title, keyword, or company"
                  className="pl-10 h-12 shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" size="lg" className="h-12">
                Find Jobs
              </Button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-2 mt-4 text-sm text-muted-foreground">
            <span>Popular:</span>
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => setSearchQuery(term)}
                className="hover:text-primary transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-8 text-center md:text-left animate-slide-up">
          <div className="flex flex-col items-center md:items-start">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Briefcase className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Remote Only</h3>
            <p className="text-muted-foreground">100% remote jobs, no office requirements or restrictions</p>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <div className="h-14 w-14 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
              <MapPin className="h-7 w-7 text-secondary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Work From Anywhere</h3>
            <p className="text-muted-foreground">Location-independent positions from global companies</p>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <Globe className="h-7 w-7 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-2">Global Opportunities</h3>
            <p className="text-muted-foreground">Work with leading companies around the world</p>
          </div>
        </div>
      </div>
    </section>
  );
}
