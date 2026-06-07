import { Mail, Play } from "lucide-react";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const footerLinks = [
  "Audio Description",
  "Help Centre",
  "Gift Cards",
  "Media Centre",
  "Investor Relations",
  "Jobs",
  "Terms of Use",
  "Privacy",
];

const socialIcons = [
  {
    name: "Facebook",
    icon: FaFacebookF,
    link: "#",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    link: "#",
  },
  {
    name: "X",
    icon: FaXTwitter,
    link: "#",
  },
  {
    name: "GitHub",
    icon: FaGithub,
    link: "#",
  },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050505]">
      <div className="absolute left-1/2 top-0 h-32 w-96 -translate-x-1/2 rounded-full bg-red-600/10 blur-[100px]" />

      <div className="relative mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-12">
        <div className="grid gap-8 border-b border-white/10 pb-8 md:grid-cols-[1.2fr_2fr]">
          <div>
            <Link
              to="/"
              className="inline-block text-2xl font-black tracking-tighter text-red-600"
            >
              NETFLIX
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-500">
              Unlimited entertainment, unforgettable stories and a
              personalised streaming experience.
            </p>

            <div className="mt-5 flex items-center gap-2">
              {socialIcons.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.link}
                    aria-label={social.name}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 transition duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:bg-red-600 hover:text-white"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
            {footerLinks.map((footerLink) => (
              <a
                key={footerLink}
                href="#"
                className="text-sm text-neutral-500 transition hover:text-white"
              >
                {footerLink}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600">
              <Play size={16} fill="currentColor" />
            </span>

            <div>
              <p className="text-sm font-semibold text-neutral-300">
                Ready to watch?
              </p>

              <p className="text-xs text-neutral-600">
                Select any movie and start streaming.
              </p>
            </div>
          </div>

          <a
            href="mailto:support@example.com"
            className="flex items-center gap-2 text-sm text-neutral-500 transition hover:text-white"
          >
            <Mail size={16} />
            support@example.com
          </a>

          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} Netflix UI Practice Project
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;