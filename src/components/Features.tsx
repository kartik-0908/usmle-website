import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={cardRef}
      className={cn(
        "opacity-0 p-6 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-2xl",
        "transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl",
        "hover:bg-white/90"
      )}
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      <div className="rounded-full bg-gradient-to-br from-blue-500/20 to-green-500/20 w-12 h-12 flex items-center justify-center text-blue-600 mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-700 text-base leading-relaxed">{description}</p>
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if mobile on mount and when window resizes
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Skip parallax on mobile
    if (isMobile) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const elements = document.querySelectorAll(".parallax");
      elements.forEach((el) => {
        const element = el as HTMLElement;
        const speed = parseFloat(element.dataset.speed || "0.1");
        const yPos = -scrollY * speed;
        element.style.setProperty("--parallax-y", `${yPos}px`);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element");
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("animate-fade-in");
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleEmailSubmit = async (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setSubmitMessage("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch('https://hook.us2.make.com/grzbj5gl5af9bnknks4oir047a9qbb8b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitMessage("🎉 Thanks! You've been added to our waitlist.");
        setEmail("");
      } else {
        setSubmitMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmitMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section 
      className="overflow-hidden relative py-20 bg-cover"
      id="features" 
      ref={sectionRef}
      style={{
        backgroundImage: 'url("/Header-background.webp")',
        backgroundPosition: "center 30%",
      }}
    >
      {/* USMLE theme background elements - matching hero */}
      <div className="absolute -top-[10%] -right-[5%] w-1/2 h-[70%] bg-gradient-to-br from-blue-500/20 to-green-500/20 opacity-30 blur-3xl rounded-full"></div>
      
      {/* Subtle animated elements matching USMLE theme */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100/15 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-200/15 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-200/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-28 h-28 bg-green-100/15 rounded-full blur-xl animate-float"></div>
      </div>

      {/* Parallax elements */}
      <div
        className="hidden lg:block absolute bottom-0 left-1/4 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl -z-10 parallax"
        data-speed="0.05"
        style={{ transform: 'translateY(var(--parallax-y, 0px))' }}
      ></div>
      <div
        className="hidden lg:block absolute top-1/3 right-1/5 w-48 h-48 bg-green-100/20 rounded-full blur-2xl -z-10 parallax"
        data-speed="0.08"
        style={{ transform: 'translateY(var(--parallax-y, 0px))' }}
      ></div>

      <div className="font-inter container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-blue-200 rounded-full px-4 py-2 mb-6 opacity-0 fade-in-element shadow-sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-blue-600">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-gray-700 font-medium text-sm">How It Works</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6 opacity-0 fade-in-element">
            Your Personal AI Tutor <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              for USMLE Success
            </span>
          </h2>
          <p className="text-xl sm:text-2xl leading-relaxed opacity-0 fade-in-element text-gray-700 font-medium max-w-4xl mx-auto">
            Step Genie transforms overwhelming question banks into interactive, personalized learning conversations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="23"></line><line x1="8" x2="16" y1="23" y2="23"></line></svg>}
            title="Voice-Based Interactive Tutoring"
            description="Talk through problems naturally. Step Genie engages you in real conversations, just like studying with a human tutor."
            index={0}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 1 1-4-4"></path><path d="M12 8a4 4 0 1 0 4 4"></path><circle cx="12" cy="12" r="1"></circle></svg>}
            title="Deep Conceptual Understanding"
            description="Goes beyond memorization. Step Genie helps you understand the 'why' behind each answer, building lasting clinical reasoning skills."
            index={1}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M16 6H3v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-2"></path><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"></path><path d="M12 12h.01"></path><path d="M17 12h.01"></path><path d="M7 12h.01"></path></svg>}
            title="Personalized Coaching"
            description="AI identifies your weak areas and adapts tutoring sessions to focus on topics where you need the most improvement."
            index={2}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>}
            title="24/7 Availability"
            description="Study anytime, anywhere. Your AI tutor is always ready to help, whether it's 3 AM or during your lunch break."
            index={3}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14 2z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>}
            title="Upload Any Question"
            description="Stuck on a UWorld, Kaplan, or Amboss question? Upload it and get step-by-step guidance tailored to your learning style."
            index={4}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M9 12l2 2 4-4"></path><path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path><path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path><path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"></path><path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"></path></svg>}
            title="High-Yield Topic Coverage"
            description="Choose from cardiology, infectious disease, biostats, and more. Master the topics that matter most for your Step exams."
            index={5}
          />
        </div>

        {/* Key Benefits Visual */}
        <div className="mb-20">
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Us ?
              </h3>
              <p className="text-gray-700 text-xl font-medium">
                Five core benefits that transform your USMLE preparation
              </p>
            </div>
            
            <div className="max-w-4xl max-h-4xl mx-auto">
              <img 
                src="/benifits.png" 
                alt="Five key benefits of Step Genie: Conceptual learning, Voice guidance, Save time, Fast prep, and Medical accuracy"
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Study Outcomes Section */}
        <div className="mb-20 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              📈 Transform Your USMLE Performance
            </h3>
            <p className="text-gray-700 text-xl font-medium">
              Experience smarter study habits and elevated scores
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-green-100/80 to-green-200/80 backdrop-blur-sm rounded-2xl border border-green-200">
              <div className="text-4xl font-bold text-green-600 mb-2">3x</div>
              <div className="text-gray-700 font-medium">Faster Concept Mastery</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-100/80 to-blue-200/80 backdrop-blur-sm rounded-2xl border border-blue-200">
              <div className="text-4xl font-bold text-blue-600 mb-2">85%</div>
              <div className="text-gray-700 font-medium">Improved Retention Rate</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-100/80 to-purple-200/80 backdrop-blur-sm rounded-2xl border border-purple-200">
              <div className="text-4xl font-bold text-purple-600 mb-2">40+</div>
              <div className="text-gray-700 font-medium">Point Score Improvement</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-orange-100/80 to-orange-200/80 backdrop-blur-sm rounded-2xl border border-orange-200">
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-700 font-medium">Study Anytime</div>
            </div>
          </div>
        </div>

        {/* AI Learning Features Section */}
        <div className="mb-20 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              🤖 AI That Understands How You Learn
            </h3>
            <p className="text-gray-700 text-xl font-medium">
              Personalized tutoring that adapts to your unique learning style
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-purple-600">
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 1 1-4-4"></path>
                  <path d="M12 8a4 4 0 1 0 4 4"></path>
                  <circle cx="12" cy="12" r="1"></circle>
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-3 text-lg">Adaptive Learning</h4>
              <p className="text-gray-700">Continuously adjusts difficulty and teaching style based on your progress and comprehension</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-green-500/20 backdrop-blur-sm border border-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-blue-600">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" x2="12" y1="19" y2="23"></line>
                  <line x1="8" x2="16" y1="23" y2="23"></line>
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-3 text-lg">Natural Conversations</h4>
              <p className="text-gray-700">Voice-based interactions that feel like studying with a real tutor, not a chatbot</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-green-600">
                  <path d="M9 12l2 2 4-4"></path>
                  <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
                  <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
                  <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"></path>
                  <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"></path>
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-3 text-lg">Clinical Reasoning</h4>
              <p className="text-gray-700">Builds critical thinking skills by guiding you through diagnostic reasoning step-by-step</p>
            </div>
          </div>
        </div>

        {/* Platform Features Section */}
        <div className="mb-20 bg-gray-900/90 backdrop-blur-xl border border-gray-700 text-white rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              🎓 Built for Medical Students
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <h4 className="font-bold mb-3 text-lg">Judgment-Free Learning</h4>
              <p className="text-gray-300">Safe space to make mistakes and learn without fear of judgment or embarrassment</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                  <path d="M3 3v18h18"></path>
                  <path d="M7 12l3-3 3 3 5-5"></path>
                </svg>
              </div>
              <h4 className="font-bold mb-3 text-lg">Progress Tracking</h4>
              <p className="text-gray-300">Monitor your improvement across different topics and identify areas for focused study</p>
            </div>
          </div>
        </div>

        {/* The StepGenie Fix - Comparison Table */}
        <div className="mb-20 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-4 sm:p-8 shadow-2xl">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ⚡ The StepGenie Fix
            </h3>
            <p className="text-lg sm:text-xl text-gray-700 font-medium">
              See the difference between traditional question banks and intelligent learning
            </p>
          </div>
          
          {/* Mobile-First Design */}
          <div className="block md:hidden space-y-6">
            {/* Mobile Headers */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-orange-100/80 to-orange-200/80 backdrop-blur-sm rounded-2xl p-3 border border-orange-200 text-center">
                <h4 className="text-lg font-bold text-orange-800">UWorld</h4>
                <p className="text-orange-600 text-xs">Traditional</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100/80 to-green-100/80 backdrop-blur-sm rounded-2xl p-3 border border-blue-200 text-center">
                <h4 className="text-lg font-bold text-blue-800">StepGenie</h4>
                <p className="text-blue-600 text-xs">Intelligent</p>
              </div>
            </div>

            {/* Mobile Comparison Cards */}
            <div className="space-y-4">
              {/* Learning Method */}
              <div className="bg-gray-50/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200">
                <h5 className="font-bold text-gray-900 mb-4 text-center">📚 Learning Method</h5>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-red-500 text-sm">🔒</span>
                      <span className="font-medium text-gray-800 text-sm">Fixed explanations</span>
                    </div>
                    <p className="text-gray-600 text-xs">Static content</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-green-500 text-sm">🔓</span>
                      <span className="font-medium text-gray-800 text-sm">Dynamic chats</span>
                    </div>
                    <p className="text-gray-600 text-xs">Symptom → gene</p>
                  </div>
                </div>
              </div>

              {/* Study Style */}
              <div className="bg-gray-50/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200">
                <h5 className="font-bold text-gray-900 mb-4 text-center">🎯 Study Style</h5>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-orange-500 text-sm">🏃‍♂️</span>
                      <span className="font-medium text-gray-800 text-sm">Random Q-banks</span>
                    </div>
                    <p className="text-gray-600 text-xs">Speed-focused</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-blue-500 text-sm">🧠</span>
                      <span className="font-medium text-gray-800 text-sm">Socratic sessions</span>
                    </div>
                    <p className="text-gray-600 text-xs">First principles</p>
                  </div>
                </div>
              </div>

              {/* Learning Approach */}
              <div className="bg-gray-50/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200">
                <h5 className="font-bold text-gray-900 mb-4 text-center">🧩 Learning Approach</h5>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-yellow-500 text-sm">🎯</span>
                      <span className="font-medium text-gray-800 text-sm">Pattern-recall</span>
                    </div>
                    <p className="text-gray-600 text-xs">Memorization</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-purple-500 text-sm">🚀</span>
                      <span className="font-medium text-gray-800 text-sm">Pattern construction</span>
                    </div>
                    <p className="text-gray-600 text-xs">Derive answers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Table - Hidden on Mobile */}
          <div className="hidden md:block">
            {/* Header Row */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div></div>
              <div className="bg-gradient-to-br from-orange-100/80 to-orange-200/80 backdrop-blur-sm rounded-2xl p-4 border border-orange-200 text-center">
                <h4 className="text-xl font-bold text-orange-800">UWorld</h4>
                <p className="text-orange-600 text-sm">Traditional Approach</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100/80 to-green-100/80 backdrop-blur-sm rounded-2xl p-4 border border-blue-200 text-center">
                <h4 className="text-xl font-bold text-blue-800">StepGenie</h4>
                <p className="text-blue-600 text-sm">Intelligent Learning</p>
              </div>
            </div>

            {/* Comparison Rows */}
            <div className="space-y-4">
              {/* Row 1 */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="bg-gray-100/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200">
                  <h5 className="font-bold text-gray-900 mb-2">📚 Learning Method</h5>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-red-500">🔒</span>
                    <span className="font-medium text-gray-800">Fixed text explanations</span>
                  </div>
                  <p className="text-gray-600 text-sm">Static content that doesn't adapt to your understanding</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-500">🔓</span>
                    <span className="font-medium text-gray-800">Dynamic "why" chats</span>
                  </div>
                  <p className="text-gray-600 text-sm">Drill down from symptom → organ → pathway → gene</p>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="bg-gray-100/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200">
                  <h5 className="font-bold text-gray-900 mb-2">🎯 Study Style</h5>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-orange-500">🏃‍♂️</span>
                    <span className="font-medium text-gray-800">Race through random Q-banks</span>
                  </div>
                  <p className="text-gray-600 text-sm">Speed-focused approach without deep understanding</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-blue-500">🧠</span>
                    <span className="font-medium text-gray-800">Guided Socratic sessions</span>
                  </div>
                  <p className="text-gray-600 text-sm">Rebuild each concept from first principles</p>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="bg-gray-100/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200">
                  <h5 className="font-bold text-gray-900 mb-2">🧩 Learning Approach</h5>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-yellow-500">🎯</span>
                    <span className="font-medium text-gray-800">Pattern-recall roulette</span>
                  </div>
                  <p className="text-gray-600 text-sm">Memorization-based pattern matching</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-purple-500">🚀</span>
                    <span className="font-medium text-gray-800">Pattern construction</span>
                  </div>
                  <p className="text-gray-600 text-sm">Train your cortex to derive the answer, not guess it</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div id='cta' className="text-center">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to Transform Your USMLE Prep?
          </h3>
          <p className="text-gray-700 text-xl font-medium mb-8">
            Join thousands of medical students who are already studying smarter with Step Genie
          </p>
          
          {/* Sign In CTA */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-xl border border-blue-200 rounded-3xl p-8 shadow-2xl text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-full p-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                    <path d="M9 12l2 2 4-4"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                </div>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">🚀 Start Learning Smarter Today</h4>
              <p className="text-gray-700 mb-6 text-lg">Access your personalized AI tutor and begin mastering the USMLE with deep understanding.</p>
              
              <a 
                href="https://dashboard.stepgenie.app/sign-in"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:from-blue-700 hover:to-green-700"
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="relative flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
                    <path d="M9 12l2 2 4-4"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                  Sign In {"->"}
                </div>
              </a>
              
              <p className="text-blue-600 text-sm mt-4 font-medium">
                ✨ Instant access • AI-powered tutoring • Transform your prep
              </p>
            </div>
            
            <p className="text-gray-600 text-lg font-medium mt-6">
              Experience the future of medical education with Step Genie
            </p>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Features;