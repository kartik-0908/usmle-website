import React, { useEffect, useRef, useState } from "react";

const HumanoidSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ticking = useRef(false);
  const lastScrollY = useRef(0);

  // More responsive timing function with shorter duration
  const cardStyle = {
    height: "60vh",
    maxHeight: "600px",
    borderRadius: "20px",
    transition:
      "transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1)",
    willChange: "transform, opacity",
  };

  useEffect(() => {
    // Create intersection observer to detect when section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 } // Start observing when 10% of element is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Optimized scroll handler using requestAnimationFrame
    const handleScroll = () => {
      if (!ticking.current) {
        lastScrollY.current = window.scrollY;

        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return;

          const sectionRect = sectionRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const totalScrollDistance = viewportHeight * 2;

          // Calculate the scroll progress
          let progress = 0;
          if (sectionRect.top <= 0) {
            progress = Math.min(
              1,
              Math.max(0, Math.abs(sectionRect.top) / totalScrollDistance)
            );
          }

          // Determine which card should be visible based on progress
          if (progress >= 0.66) {
            setActiveCardIndex(2);
          } else if (progress >= 0.33) {
            setActiveCardIndex(1);
          } else {
            setActiveCardIndex(0);
          }

          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Card visibility based on active index instead of direct scroll progress
  const isFirstCardVisible = isIntersecting;
  const isSecondCardVisible = activeCardIndex >= 1;
  const isThirdCardVisible = activeCardIndex >= 2;

  return (
    <div ref={sectionRef} className="relative" style={{ height: "300vh" }}>
      <section
        className="w-full h-screen py-10 md:py-16 sticky top-0 overflow-hidden bg-white"
        id="why-humanoid"
      >
        <div className="container px-6 lg:px-8 mx-auto h-full flex flex-col">
          <div className="mb-2 md:mb-3">
            <div className="flex items-center gap-4 mb-2 md:mb-2 pt-8 sm:pt-6 md:pt-4">
              <div
                className="pulse-chip opacity-0 animate-fade-in"
                style={{
                  animationDelay: "0.1s",
                }}
              >
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 text-white mr-2">
                  02
                </span>
                <span>AI-Powered RCM</span>
              </div>
            </div>

            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-1 md:mb-2">
              Why AI-Powered Revenue Cycle Management?
            </h2>
          </div>

          <div
            ref={cardsContainerRef}
            className="relative flex-1 perspective-1000"
          >
            {/* First Card */}
            <div
              className={`absolute inset-0 overflow-hidden shadow-xl ${
                isFirstCardVisible ? "animate-card-enter" : ""
              }`}
              style={{
                ...cardStyle,
                zIndex: 10,
                transform: `translateY(${
                  isFirstCardVisible ? "90px" : "200px"
                }) scale(0.9)`,
                opacity: isFirstCardVisible ? 0.9 : 0,
              }}
            >
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: `
                    radial-gradient(ellipse at top left, rgba(255, 165, 0, 0.9) 0%, transparent 50%),
                    radial-gradient(ellipse at bottom right, rgba(255, 69, 0, 0.8) 0%, transparent 50%),
                    linear-gradient(135deg, 
                      rgba(255, 140, 0, 0.95) 0%, 
                      rgba(255, 69, 0, 0.9) 35%, 
                      rgba(220, 20, 60, 0.85) 70%, 
                      rgba(139, 0, 139, 0.9) 100%
                    )
                  `,
                  backgroundSize: "100% 100%, 100% 100%, 100% 100%",
                }}
              >
                {/* Animated overlay pattern */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
                      radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: "50px 50px, 80px 80px",
                    animation: "float 20s ease-in-out infinite",
                  }}
                />
              </div>

              <div className="absolute top-4 right-4 z-20">
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30">
                  <span className="text-sm font-medium">
                    💡 Automate Your Billing with Confidence
                  </span>
                </div>
              </div>

              <div className="relative z-10 p-5 sm:p-6 md:p-8 h-full flex items-center">
                <div className="max-w-2xl">
                  <ul className="text-white text-lg space-y-3 list-disc pl-5">
                    <li>
                      <b>Real-time Claim Scrubbing:</b> Catch errors instantly
                      with payer-specific rules, clinical accuracy checks, and
                      dynamic policy updates.
                    </li>
                    <li>
                      <b>Automated Billing & Coding:</b> AI-driven CPT, ICD-10,
                      HCPCS coding assistance, optimized for maximum compliance
                      and reimbursement.
                    </li>
                    <li>
                      <b>Intelligent Prior Authorizations:</b> Agentic AI
                      handles pre-authorization submissions, tracking, and
                      follow-ups—hands-free.
                    </li>
                    <li>
                      <b>Denial Management & Resolution:</b> AI proactively
                      identifies and prevents denials before submission, and
                      autonomously resolves common payer rejections.
                    </li>
                    <li>
                      <b>Effortless Claim Submissions:</b> Seamless EMR and
                      clearinghouse integration ensures accurate, rapid claim
                      submissions with minimal manual intervention.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Second Card */}
            <div
              className={`absolute inset-0 overflow-hidden shadow-xl ${
                isSecondCardVisible ? "animate-card-enter" : ""
              }`}
              style={{
                ...cardStyle,
                zIndex: 20,
                transform: `translateY(${
                  isSecondCardVisible
                    ? activeCardIndex === 1
                      ? "55px"
                      : "45px"
                    : "200px"
                }) scale(0.95)`,
                opacity: isSecondCardVisible ? 1 : 0,
                pointerEvents: isSecondCardVisible ? "auto" : "none",
              }}
            >
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: `
                    radial-gradient(ellipse at top right, rgba(255, 99, 71, 0.9) 0%, transparent 50%),
                    radial-gradient(ellipse at bottom left, rgba(255, 140, 0, 0.8) 0%, transparent 50%),
                    linear-gradient(45deg, 
                      rgba(255, 69, 0, 0.95) 0%, 
                      rgba(255, 140, 0, 0.9) 25%, 
                      rgba(255, 165, 0, 0.9) 50%, 
                      rgba(255, 69, 0, 0.95) 75%, 
                      rgba(178, 34, 34, 0.9) 100%
                    )
                  `,
                  backgroundSize: "100% 100%, 100% 100%, 100% 100%",
                }}
              >
                {/* Geometric pattern overlay */}
                <div 
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: `
                      linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%),
                      linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%),
                      linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.1) 75%),
                      linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.1) 75%)
                    `,
                    backgroundSize: "30px 30px",
                    backgroundPosition: "0 0, 0 15px, 15px -15px, -15px 0px",
                  }}
                />
              </div>

              <div className="absolute top-4 right-4 z-20">
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30">
                  <span className="text-sm font-medium">
                    📊 Supercharge Your Revenue Performance
                  </span>
                </div>
              </div>

              <div className="relative z-10 p-5 sm:p-6 md:p-8 h-full flex items-center">
                <div className="max-w-2xl">
                  <ul className="text-white text-lg space-y-3 list-disc pl-5">
                    <li>
                      📌 <b>95%+</b> First-Pass Approval Rate
                    </li>
                    <li>
                      📌 <b>80%</b> Reduction in Denials & Rejections
                    </li>
                    <li>
                      📌 <b>70%</b> Faster Billing Cycles
                    </li>
                    <li>📌 Enhanced Cash Flow & Practice Profitability</li>
                    <li>
                      📌 <b>$100-200K+</b> Annual Revenue Increase per Provider
                    </li>
                  </ul>
                  <div className="mt-6">
                    <span className="block text-white font-semibold mb-2">
                      🤖 Agentic AI That Learns and Grows
                    </span>
                    <ul className="text-white text-base space-y-2 list-disc pl-5">
                      <li>
                        <b>Adaptive Learning:</b> Automatically incorporates
                        changing payer guidelines and billing policies.
                      </li>
                      <li>
                        <b>Clinical Intelligence:</b> Integrates clinical
                        context into billing decisions for accurate, compliant
                        coding.
                      </li>
                      <li>
                        <b>Collaborative Workflow:</b> Works alongside your
                        billing staff, handling complex, repetitive tasks so
                        they can focus on high-value activities.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Third Card */}
            <div
              className={`absolute inset-0 overflow-hidden shadow-xl ${
                isThirdCardVisible ? "animate-card-enter" : ""
              }`}
              style={{
                ...cardStyle,
                zIndex: 30,
                transform: `translateY(${
                  isThirdCardVisible
                    ? activeCardIndex === 2
                      ? "15px"
                      : "0"
                    : "200px"
                }) scale(1)`,
                opacity: isThirdCardVisible ? 1 : 0,
                pointerEvents: isThirdCardVisible ? "auto" : "none",
              }}
            >
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: `
                    radial-gradient(ellipse at center top, rgba(255, 140, 0, 0.9) 0%, transparent 70%),
                    radial-gradient(ellipse at bottom center, rgba(220, 20, 60, 0.8) 0%, transparent 70%),
                    linear-gradient(180deg, 
                      rgba(255, 165, 0, 0.95) 0%, 
                      rgba(255, 69, 0, 0.9) 30%, 
                      rgba(220, 20, 60, 0.9) 60%, 
                      rgba(139, 0, 139, 0.95) 100%
                    )
                  `,
                  backgroundSize: "100% 100%, 100% 100%, 100% 100%",
                }}
              >
                {/* Hexagonal pattern overlay */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.3) 2px, transparent 2px),
                      radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
                      radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
                    `,
                    backgroundSize: "60px 60px, 30px 30px, 40px 40px",
                  }}
                />
              </div>

              <div className="absolute top-4 right-4 z-20">
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30">
                  <span className="text-sm font-medium">
                    🔐 Secure, Scalable, Compliant
                  </span>
                </div>
              </div>

              <div className="relative z-10 p-5 sm:p-6 md:p-8 h-full flex items-center">
                <div className="max-w-2xl">
                  <ul className="text-white text-lg space-y-3 list-disc pl-5">
                    <li>
                      <b>HIPAA-Compliant & Secure:</b> Advanced data security
                      measures ensure compliance and peace of mind.
                    </li>
                    <li>
                      <b>EMR and PMS Integration:</b> Compatible with leading
                      EMRs and billing software.
                    </li>
                    <li>
                      <b>Scalable Architecture:</b> Designed to grow seamlessly
                      with your practice.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(5px, -5px) rotate(1deg); }
          66% { transform: translate(-5px, 5px) rotate(-1deg); }
        }

        .animate-card-enter {
          animation: cardEnter 0.6s ease-out;
        }

        @keyframes cardEnter {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default HumanoidSection;