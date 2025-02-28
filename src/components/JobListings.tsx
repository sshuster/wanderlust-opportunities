
import { useState, useEffect } from "react";
import { Briefcase, Globe, Clock, MapPin, DollarSign, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BadgeCustom } from "@/components/ui/badge-custom";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface JobPosting {
  id: string;
  title: string;
  company: string;
  logo: string;
  salary: string;
  location: string;
  category: string;
  type: string;
  date: Date;
  description: string;
  featured?: boolean;
  isNew?: boolean;
}

// Sample job data
const jobData: JobPosting[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechGlobal Inc.",
    logo: "https://via.placeholder.com/150",
    salary: "$120k - $150k",
    location: "Worldwide",
    category: "Development",
    type: "Full-time",
    date: new Date(2023, 8, 28),
    description: "We're looking for an experienced frontend developer with React expertise to join our remote team.",
    featured: true,
    isNew: true
  },
  {
    id: "2",
    title: "UX/UI Designer",
    company: "DesignFusion",
    logo: "https://via.placeholder.com/150",
    salary: "$90k - $120k",
    location: "USA, Canada",
    category: "Design",
    type: "Full-time",
    date: new Date(2023, 8, 27),
    description: "Join our design team to create beautiful and functional interfaces for our clients.",
    isNew: true
  },
  {
    id: "3",
    title: "Product Manager",
    company: "InnovateCorp",
    logo: "https://via.placeholder.com/150",
    salary: "$110k - $140k",
    location: "Europe, UK",
    category: "Product",
    type: "Full-time",
    date: new Date(2023, 8, 25),
    description: "Lead product strategy and roadmap for our SaaS platform. 5+ years of experience required."
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "CloudNative Solutions",
    logo: "https://via.placeholder.com/150",
    salary: "$130k - $160k",
    location: "Worldwide",
    category: "DevOps",
    type: "Full-time",
    date: new Date(2023, 8, 24),
    description: "Help us build and maintain our cloud infrastructure using AWS, Kubernetes, and Terraform."
  },
  {
    id: "5",
    title: "Content Marketing Specialist",
    company: "GrowthMarket",
    logo: "https://via.placeholder.com/150",
    salary: "$70k - $90k",
    location: "USA, Canada, UK",
    category: "Marketing",
    type: "Full-time",
    date: new Date(2023, 8, 23),
    description: "Create engaging content that drives traffic and conversions for our B2B SaaS clients."
  },
  {
    id: "6",
    title: "React Native Developer",
    company: "MobileFirst Apps",
    logo: "https://via.placeholder.com/150",
    salary: "$100k - $130k",
    location: "Worldwide",
    category: "Development",
    type: "Contract",
    date: new Date(2023, 8, 22),
    description: "Build cross-platform mobile applications using React Native for our diverse client base."
  },
  {
    id: "7",
    title: "Customer Success Manager",
    company: "ServiceDelight",
    logo: "https://via.placeholder.com/150",
    salary: "$80k - $100k",
    location: "North America",
    category: "Customer Service",
    type: "Full-time",
    date: new Date(2023, 8, 21),
    description: "Ensure our enterprise clients get maximum value from our platform through proactive support."
  },
];

const allCategories = ["All", ...Array.from(new Set(jobData.map(job => job.category)))];
const allTypes = ["All", ...Array.from(new Set(jobData.map(job => job.type)))];
const allLocations = ["All", ...Array.from(new Set(jobData.map(job => job.location)))];

export function JobListings() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleJobs, setVisibleJobs] = useState<JobPosting[]>([]);
  const [jobsToShow, setJobsToShow] = useState(5);

  // Filter jobs based on selected filters
  useEffect(() => {
    let filtered = jobData;
    
    if (selectedCategory !== "All") {
      filtered = filtered.filter(job => job.category === selectedCategory);
    }
    
    if (selectedType !== "All") {
      filtered = filtered.filter(job => job.type === selectedType);
    }
    
    if (selectedLocation !== "All") {
      filtered = filtered.filter(job => job.location === selectedLocation);
    }
    
    setVisibleJobs(filtered);
  }, [selectedCategory, selectedType, selectedLocation]);

  const loadMoreJobs = () => {
    setJobsToShow(prev => prev + 5);
  };

  // Initialize visibility detection for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".fade-in-view");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [visibleJobs]);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Remote Job Opportunities
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Browse our curated list of remote positions across various industries and roles
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            {/* Category filter for desktop */}
            <div className="hidden md:flex flex-wrap gap-2">
              {allCategories.map(category => (
                <BadgeCustom
                  key={category}
                  variant="category"
                  className={cn(
                    "py-1 px-3 text-sm",
                    selectedCategory === category ? "bg-primary/10 text-primary dark:bg-primary/20" : ""
                  )}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </BadgeCustom>
              ))}
            </div>

            {/* Mobile filter button */}
            <Button 
              variant="outline" 
              size="sm" 
              className="md:hidden flex items-center gap-2 w-full justify-center"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>

            {/* Sort dropdown would go here */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Showing {Math.min(jobsToShow, visibleJobs.length)} of {visibleJobs.length} jobs</span>
            </div>
          </div>

          {/* Mobile filter panel */}
          {isFilterOpen && (
            <div className="md:hidden glass p-4 rounded-lg mb-6 animate-fade-in">
              <div className="mb-4">
                <h4 className="font-medium mb-2">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {allCategories.map(category => (
                    <BadgeCustom
                      key={category}
                      variant="category"
                      className={cn(
                        "py-1 px-3 text-sm",
                        selectedCategory === category ? "bg-primary/10 text-primary dark:bg-primary/20" : ""
                      )}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </BadgeCustom>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Job Type</h4>
                <div className="flex flex-wrap gap-2">
                  {allTypes.map(type => (
                    <BadgeCustom
                      key={type}
                      variant="category"
                      className={cn(
                        "py-1 px-3 text-sm",
                        selectedType === type ? "bg-primary/10 text-primary dark:bg-primary/20" : ""
                      )}
                      onClick={() => setSelectedType(type)}
                    >
                      {type}
                    </BadgeCustom>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Location</h4>
                <div className="flex flex-wrap gap-2">
                  {allLocations.map(location => (
                    <BadgeCustom
                      key={location}
                      variant="category"
                      className={cn(
                        "py-1 px-3 text-sm",
                        selectedLocation === location ? "bg-primary/10 text-primary dark:bg-primary/20" : ""
                      )}
                      onClick={() => setSelectedLocation(location)}
                    >
                      {location}
                    </BadgeCustom>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {visibleJobs.slice(0, jobsToShow).map((job, index) => (
            <div 
              key={job.id}
              className={cn(
                "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-md fade-in-view",
                job.featured ? "ring-2 ring-primary/20" : ""
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Company logo */}
                  <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center overflow-hidden shrink-0">
                    <img src={job.logo} alt={`${job.company} logo`} className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Job details */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg">{job.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {job.isNew && (
                          <BadgeCustom variant="success" className="text-xs">New</BadgeCustom>
                        )}
                        {job.featured && (
                          <BadgeCustom variant="accent" className="text-xs">Featured</BadgeCustom>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {job.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {job.salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {format(job.date, "MMM d, yyyy")}
                      </span>
                    </div>
                    
                    <p className="mt-3 text-sm text-foreground/80">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      <BadgeCustom variant="category">{job.category}</BadgeCustom>
                      <BadgeCustom variant="category">{job.type}</BadgeCustom>
                    </div>
                  </div>
                  
                  {/* Apply button */}
                  <div className="shrink-0 mt-4 md:mt-0">
                    <Button className="w-full md:w-auto">Apply Now</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {visibleJobs.length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
              <Globe className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters to find more opportunities</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedType("All");
                  setSelectedLocation("All");
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
          
          {jobsToShow < visibleJobs.length && (
            <div className="text-center mt-8">
              <Button variant="outline" onClick={loadMoreJobs} className="px-8">
                <Clock className="h-4 w-4 mr-2" />
                Load More Jobs
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
