import { Link } from "@tanstack/react-router";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300 py-16 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Newsletter - more prominent on mobile */}
          <div className="lg:col-span-2 pb-8 border-b border-neutral-800 md:border-0 md:pb-0">
            <h3 className="text-white text-xl font-bold mb-4">
              Frank Takeaways
            </h3>
            <p className="text-neutral-400 mb-6 max-w-md">
              Join other savvy leaders getting my mildly entertaining newsletter
              on product, leadership, and the messiness of being human.
            </p>
            <a
              href="https://www.franktakeaways.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-primary px-6 py-3"
            >
              Subscribe
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">
              Use Cases
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  hash="founders"
                  className="hover:text-white transition-colors"
                >
                  Founder Coaching
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  hash="leaders"
                  className="hover:text-white transition-colors"
                >
                  VP & Leader Coaching
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  hash="ics"
                  className="hover:text-white transition-colors"
                >
                  IC & Manager Coaching
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">
              Explore
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/hirefrank/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:frank@hirefrank.com"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            &copy; {currentYear} Frank Harris. All rights reserved.
          </div>
          {/*<div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>*/}
        </div>
      </div>
    </footer>
  );
}
