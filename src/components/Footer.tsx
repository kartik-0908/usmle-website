import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white py-8">
      <div className="section-container">
        <div className="text-center text-gray-600 text-sm space-y-2">
          <p>
            650, California Street - Level 7<br />
            San Francisco 94108, US
          </p>
          <p>
            © 2025 Step Genie. All rights reserved.
          </p>
          <div className="pt-2">
            <a
              href="/privacy"
              className="text-blue-600 hover:text-blue-800 underline text-sm"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;