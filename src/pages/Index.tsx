import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const COOKIE_MAX_AGE_DAYS = 90;
const COOKIE_EXPIRES = new Date(Date.now() + COOKIE_MAX_AGE_DAYS * 24 * 60 * 60 * 1000).toUTCString();

function setApexCookie(name: string, value: string) {
  // NOTE: client JS cannot set HttpOnly; this is a readable cookie.
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Domain=.stepgenie.app; Expires=${COOKIE_EXPIRES}; SameSite=Lax; Secure`;
}

const Index = () => {
  // 0) Capture referral/UTMs and set cookies for the apex domain
  useEffect(() => {
    const url = new URL(window.location.href);
    const ref = url.searchParams.get("ref");
    if (ref) setApexCookie("ref", ref);

    const utmKeys = ["source", "medium", "campaign", "term", "content"];
    utmKeys.forEach((k) => {
      const v = url.searchParams.get(`utm_${k}`);
      if (v) setApexCookie(`utm_${k}`, v);
    });
  }, []);

  // 1) Intersection observer (yours)
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

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  // 2) Smooth scroll (yours)
  useEffect(() => {
    const anchors = Array.from(document.querySelectorAll('a[href^="#"]'));
    const onClick = function (this: HTMLAnchorElement, e: Event) {
      e.preventDefault();
      const targetId = this.getAttribute("href")?.substring(1);
      if (!targetId) return;
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;
      const offset = window.innerWidth < 768 ? 100 : 80;
      window.scrollTo({ top: targetElement.offsetTop - offset, behavior: "smooth" });
    };
    anchors.forEach((a) => a.addEventListener("click", onClick));
    return () => anchors.forEach((a) => a.removeEventListener("click", onClick));
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="space-y-4 sm:space-y-8">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
