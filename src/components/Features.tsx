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
        "feature-card glass-card opacity-0 p-4 sm:p-6",
        "lg:hover:bg-gradient-to-br lg:hover:from-white lg:hover:to-pulse-50",
        "transition-all duration-300"
      )}
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      <div className="rounded-full bg-pulse-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-pulse-500 mb-4 sm:mb-5">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{title}</h3>
      <p className="text-gray-600 text-sm sm:text-base">{description}</p>
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  
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

  const handleEmailSubmit = async (e: React.FormEvent) => {
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
    <section className="py-12 sm:py-16 md:py-20 pb-0 relative bg-gray-50" id="features" ref={sectionRef}>
      <div className="section-container">
        <div className="text-center mb-10 sm:mb-16">
          <div className="pulse-chip mx-auto mb-3 sm:mb-4 opacity-0 fade-in-element">
            <span>🎯 How It Works</span>
          </div>
          <h2 className="section-title mb-3 sm:mb-4 opacity-0 fade-in-element">
            Your Personal AI Tutor <br className="hidden sm:block" />for USMLE Success
          </h2>
          <p className="section-subtitle mx-auto opacity-0 fade-in-element">
            Step Genie transforms overwhelming question banks into interactive, personalized learning conversations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="23"></line><line x1="8" x2="16" y1="23" y2="23"></line></svg>}
            title="Voice-Based Interactive Tutoring"
            description="Talk through problems naturally. Step Genie engages you in real conversations, just like studying with a human tutor."
            index={0}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 1 1-4-4"></path><path d="M12 8a4 4 0 1 0 4 4"></path><circle cx="12" cy="12" r="1"></circle></svg>}
            title="Deep Conceptual Understanding"
            description="Goes beyond memorization. Step Genie helps you understand the 'why' behind each answer, building lasting clinical reasoning skills."
            index={1}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M16 6H3v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-2"></path><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"></path><path d="M12 12h.01"></path><path d="M17 12h.01"></path><path d="M7 12h.01"></path></svg>}
            title="Personalized Coaching"
            description="AI identifies your weak areas and adapts tutoring sessions to focus on topics where you need the most improvement."
            index={2}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>}
            title="24/7 Availability"
            description="Study anytime, anywhere. Your AI tutor is always ready to help, whether it's 3 AM or during your lunch break."
            index={3}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14 2z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>}
            title="Upload Any Question"
            description="Stuck on a UWorld, Kaplan, or Amboss question? Upload it and get step-by-step guidance tailored to your learning style."
            index={4}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M9 12l2 2 4-4"></path><path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path><path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path><path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"></path><path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"></path></svg>}
            title="High-Yield Topic Coverage"
            description="Choose from cardiology, infectious disease, biostats, and more. Master the topics that matter most for your Step exams."
            index={5}
          />
        </div>

        {/* How It Works Visual Demo */}
        <div className="mt-16 sm:mt-20">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              See Step Genie in Action
            </h3>
            <p className="text-gray-600 text-lg">
              Watch how our AI tutor guides you through complex medical questions step-by-step
            </p>
          </div>
          
          {/* Clinical Question Demo */}
          <div className="">
            <img 
              src="/action.png" 
              alt="Step Genie AI tutor demonstrating step-by-step guidance through a clinical question about acid-base disorders"
              className="w-full h-auto rounded-xl shadow-md"
            />
          </div>
        </div>

        {/* Key Benefits Visual */}
        <div className="mt-12 sm:mt-16">
          <div className="bg-gradient-to-r from-pulse-50 to-purple-50 rounded-2xl p-6 sm:p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Why Medical Students Choose Step Genie
              </h3>
              <p className="text-gray-600 text-lg">
                Five core benefits that transform your USMLE preparation
              </p>
            </div>
            
            <div className="">
              <img 
                src="/benifits.png" 
                alt="Five key benefits of Step Genie: Conceptual learning, Voice guidance, Save time, Fast prep, and Medical accuracy"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Study Outcomes Section */}
        <div className="mt-16 sm:mt-20 bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              📈 Transform Your USMLE Performance
            </h3>
            <p className="text-gray-600 text-lg">
              Experience smarter study habits and elevated scores
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">3x</div>
              <div className="text-sm text-gray-700">Faster Concept Mastery</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">85%</div>
              <div className="text-sm text-gray-700">Improved Retention Rate</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">40+</div>
              <div className="text-sm text-gray-700">Point Score Improvement</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-sm text-gray-700">Study Anytime</div>
            </div>
          </div>
        </div>

        {/* AI Learning Features Section */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-pulse-50 to-purple-50 rounded-2xl p-6 sm:p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              🤖 AI That Understands How You Learn
            </h3>
            <p className="text-gray-600 text-lg">
              Personalized tutoring that adapts to your unique learning style
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-purple-600">
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 1 1-4-4"></path>
                  <path d="M12 8a4 4 0 1 0 4 4"></path>
                  <circle cx="12" cy="12" r="1"></circle>
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Adaptive Learning</h4>
              <p className="text-sm text-gray-600">Continuously adjusts difficulty and teaching style based on your progress and comprehension</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-blue-600">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" x2="12" y1="19" y2="23"></line>
                  <line x1="8" x2="16" y1="23" y2="23"></line>
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Natural Conversations</h4>
              <p className="text-sm text-gray-600">Voice-based interactions that feel like studying with a real tutor, not a chatbot</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-green-600">
                  <path d="M9 12l2 2 4-4"></path>
                  <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
                  <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
                  <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"></path>
                  <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"></path>
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Clinical Reasoning</h4>
              <p className="text-sm text-gray-600">Builds critical thinking skills by guiding you through diagnostic reasoning step-by-step</p>
            </div>
          </div>
        </div>

        {/* Platform Features Section */}
        <div className="mt-12 sm:mt-16 bg-gray-900 text-white rounded-2xl p-6 sm:p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              🎓 Built for Medical Students
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <h4 className="font-semibold mb-2">Judgment-Free Learning</h4>
              <p className="text-sm text-gray-300">Safe space to make mistakes and learn without fear of judgment or embarrassment</p>
            </div>
            {/* <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                  <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                  <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                </svg>
              </div>
              <h4 className="font-semibold mb-2">QBank Integration</h4>
              <p className="text-sm text-gray-300">Works with UWorld, Kaplan, Amboss, and other popular question banks</p>
            </div> */}
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M3 3v18h18"></path>
                  <path d="M7 12l3-3 3 3 5-5"></path>
                </svg>
              </div>
              <h4 className="font-semibold mb-2">Progress Tracking</h4>
              <p className="text-sm text-gray-300">Monitor your improvement across different topics and identify areas for focused study</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div id='waitlist' className="mt-12 sm:mt-16 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your USMLE Prep?
          </h3>
          <p className="text-gray-600 text-lg mb-6">
            Join thousands of medical students who are already studying smarter with Step Genie
          </p>
          
          {/* Email Collection Form */}
          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pulse-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-500"
                required
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-pulse-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? "Submitting..." : "Join Waitlist"}
              </button>
            </div>
            
            {/* Success/Error Message */}
            {submitMessage && (
              <p className={`mt-3 text-sm ${
                submitMessage.includes('🎉') ? 'text-green-600' : 'text-red-600'
              }`}>
                {submitMessage}
              </p>
            )}
          </form>
          
          <p className="text-gray-500 text-sm mt-4">
            We'll notify you when Step Genie is live. No spam, ever.
          </p>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
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