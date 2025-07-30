import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, MessageCircle } from "lucide-react";
import LottieAnimation from "./LottieAnimation";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [lottieData, setLottieData] = useState<any>(null);
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
    fetch("/loop-header.lottie")
      .then((response) => response.json())
      .then((data) => setLottieData(data))
      .catch((error) =>
        console.error("Error loading Lottie animation:", error)
      );
  }, []);

  useEffect(() => {
    // Skip effect on mobile
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !videoRef.current) return;

      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      videoRef.current.style.transform = `perspective(1000px) rotateY(${
        x * 2.5
      }deg) rotateX(${-y * 2.5}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
      if (!videoRef.current) return;
      videoRef.current.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isMobile]);

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

  const handleSignUp = () => {
    window.open("https://dashboard.stepgenie.app/sign-in", "_blank");
  };

  return (
    <section
      className="overflow-hidden relative min-h-screen flex items-center bg-cover pt-20 sm:pt-24"
      id="hero"
      style={{
        backgroundImage: 'url("/Header-background.webp")',
        backgroundPosition: "center 30%",
      }}
    >
      {/* USMLE theme background elements */}
      <div className="absolute -top-[10%] -right-[5%] w-1/2 h-[70%] bg-gradient-to-br from-blue-500/20 to-green-500/20 opacity-30 blur-3xl rounded-full"></div>

      {/* Subtle animated elements matching USMLE theme */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100/15 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-200/15 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-200/10 rounded-full blur-2xl animate-pulse"></div>
      </div>

      <div
        className="container px-4 sm:px-6 lg:px-8 relative z-10"
        ref={containerRef}
      >
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            {/* AI Badge */}
            <div
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-blue-200 rounded-full px-4 py-2 mb-6 opacity-0 animate-fade-in shadow-sm"
              style={{ animationDelay: "0.2s" }}
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700 font-medium text-sm">
                USMLE-Focused AI Learning
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-6xl font-bold leading-tight text-gray-900 mb-6 opacity-0 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              🩺 Step Genie: {" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                UWORLD
              </span>{" "}
              with actual intelligence
            </h1>

            <p
              style={{ animationDelay: "0.4s" }}
              className="text-xl sm:text-2xl leading-relaxed opacity-0 animate-fade-in text-gray-700 font-medium mb-8"
            >
             Skimming MCQs won’t cut it. If you want bullet‑proof clinical intuition, you’ve got to rip medicine down to the cellular level and rebuild it.
            </p>

            {/* Feature Pills */}
            <div
              className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8 opacity-0 animate-fade-in"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-blue-200 rounded-full px-4 py-2 shadow-sm">
                <MessageCircle className="w-4 h-4 text-blue-600" />
                <span className="text-gray-700 text-sm font-medium">
                  AI Medical Tutor
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-green-200 rounded-full px-4 py-2 shadow-sm">
                <Sparkles className="w-4 h-4 text-green-600" />
                <span className="text-gray-700 text-sm font-medium">
                  Step 1 & 2 Ready
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div
              className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in"
              style={{ animationDelay: "0.7s" }}
            >
              <button
                onClick={handleSignUp}
                className="group relative overflow-hidden text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="relative flex items-center justify-center">
                  Sign Up
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
            {/* Main Visual */}
            <div className="relative">
              {lottieData ? (
                <div
                  className="relative z-10 animate-fade-in"
                  style={{ animationDelay: "0.9s" }}
                >
                  <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 shadow-2xl">
                    <LottieAnimation
                      animationPath={lottieData}
                      className="w-full h-auto max-w-lg mx-auto"
                      loop={true}
                      autoplay={true}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className="relative transition-all duration-500 ease-out rounded-3xl overflow-hidden backdrop-blur-xl border border-gray-200 p-0 shadow-2xl animate-fade-in"
                  style={{ animationDelay: "0.9s" }}
                >
                  <video
                    ref={videoRef}
                    src="/demo.mp4"
                    className="w-full h-auto object-cover transition-transform duration-500 ease-out rounded-2xl"
                    style={{ transformStyle: "preserve-3d" }}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    onError={(e) => {
                      console.error("Video failed to load:", e);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent rounded-3xl"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Original theme parallax element */}
      <div
        className="hidden lg:block absolute bottom-0 left-1/4 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl -z-10 parallax"
        data-speed="0.05"
      ></div>

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

export default Hero;


