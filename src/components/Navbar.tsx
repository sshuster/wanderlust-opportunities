
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Globe, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6",
        isScrolled ? "py-3 glass shadow-sm" : "py-5 bg-transparent"
      )}
    >
      <div className="container max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 font-bold text-xl group"
          >
            <Globe className="h-6 w-6 text-primary transition-transform duration-300 group-hover:rotate-12" />
            <span className="text-foreground">
              Remote<span className="text-primary">OK</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-6">
              <li>
                <Link 
                  to="/" 
                  className="text-foreground/90 hover:text-primary transition-colors"
                >
                  Jobs
                </Link>
              </li>
              <li>
                <Link 
                  to="/companies" 
                  className="text-foreground/90 hover:text-primary transition-colors"
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-foreground/90 hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
            <Button size="sm" className="flex items-center gap-2 animate-fade-in">
              <Briefcase className="h-4 w-4" />
              <span>Post a Job</span>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground rounded-md focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass mt-3 p-4 rounded-lg animate-fade-in">
          <nav className="flex flex-col gap-4">
            <Link 
              to="/" 
              className="text-foreground/90 hover:text-primary py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Jobs
            </Link>
            <Link 
              to="/companies" 
              className="text-foreground/90 hover:text-primary py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Companies
            </Link>
            <Link 
              to="/blog" 
              className="text-foreground/90 hover:text-primary py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Button 
              size="sm" 
              className="flex items-center gap-2 w-full justify-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Briefcase className="h-4 w-4" />
              <span>Post a Job</span>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
