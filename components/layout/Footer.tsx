import React from "react";

export const Footer = () => (
  <footer className="bg-slate-900 text-white mt-20">
    <div className="container py-12">
      <div className="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">GRASP IQ</h3>
          <p className="text-slate-300 text-sm">
            Your personalized AI tutor for smarter, more effective learning.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Product</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li>
              <a href="/#features" className="hover:text-white">
                Features
              </a>
            </li>
            <li>
              <a href="/#pricing" className="hover:text-white">
                Pricing
              </a>
            </li>
            <li>
              <a href="/#how-it-works" className="hover:text-white">
                How it Works
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li>
              <a href="/contact" className="hover:text-white">
                Contact
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-white">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li>
              <a href="/#testimonials" className="hover:text-white">
                Testimonials
              </a>
            </li>
            <li>
              <a href="/features" className="hover:text-white">
                All Features
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 pt-6 text-center text-xs text-slate-400">
        © 2024 GRASP IQ. All rights reserved.
      </div>
    </div>
  </footer>
);
