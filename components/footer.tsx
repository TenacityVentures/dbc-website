"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Facebook, Twitter, Award, Heart } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contact" className="gradient-primary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto container-padding relative z-10">
        <div className="pt-20 pb-12">
          {/* Main footer content */}
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
            {/* About */}
            <div className="lg:col-span-2">
              <Link href="/">
                <div className="flex items-center gap-3 mb-6 cursor-pointer group">
                  <img
                    src="/logoIcon.jpg"
                    alt="DBC Logo"
                    className="w-12 h-12 object-contain rounded-xl shadow-soft"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-xl text-white tracking-tight group-hover:text-secondary transition-colors">
                      Dream Big for Children
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-secondary font-semibold">
                      For every child
                    </span>
                  </div>
                </div>
              </Link>
              <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-md">
                A community-based, non-profit organization established in 2022 in Sierra Leone, dedicated to creating lasting
                change in the lives of vulnerable children and families.
              </p>
              <div className="flex gap-3">
                <motion.a
                  href="https://www.facebook.com/profile.php?id=61560313693954"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all shadow-soft"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all shadow-soft"
                >
                  <Twitter className="w-5 h-5 text-white" />
                </motion.a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex gap-3 group">
                  <MapPin className="text-secondary w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-white/70 text-sm leading-relaxed group-hover:text-white transition-colors">
                    Simbaru-2, Hanci Road, Bo, Sierra Leone
                  </span>
                </li>
                <li className="flex gap-3 group">
                  <Phone className="text-secondary w-5 h-5 flex-shrink-0" />
                  <a
                    href="tel:+23276762965"
                    className="text-white/70 text-sm hover:text-secondary transition-colors"
                  >
                    +232 76 762965
                  </a>
                </li>
                <li className="flex gap-3 group">
                  <Mail className="text-secondary w-5 h-5 flex-shrink-0" />
                  <a
                    href="mailto:mohamedskillz32@gmail.com"
                    className="text-white/70 text-sm hover:text-secondary transition-colors break-all"
                  >
                    mohamedskillz32@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Compliance & Trust */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Our Commitment</h4>
              <ul className="space-y-4">
                {[
                  "Registered Non-Profit",
                  "Child Care Aligned",
                  "Transparent Impact",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 group">
                    <div className="w-6 h-6 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <Award className="text-secondary w-4 h-4" />
                    </div>
                    <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm flex items-center gap-2">
              <span>&copy; {currentYear} Dream Big for Children Organization</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">All Rights Reserved</span>
            </p>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-accent fill-accent animate-pulse" />
              <span>for children</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
