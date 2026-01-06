"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Facebook, Twitter, Award } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="bg-slate-950 text-slate-500 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-16 pb-16 border-b border-slate-900">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-6 text-white">
              <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center text-primary font-bold">
                D
              </div>
              <span className="font-extrabold text-xl tracking-tighter">DBC Organization</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Established 2022 in Sierra Leone. Legally constituted, non-political, and non-sectarian. Dedicated to the
              well-being of the most vulnerable.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex gap-4">
                <MapPin className="text-secondary w-5 h-5 flex-shrink-0" />
                <span>Simbaru-2, Hanci Road, Bo, Sierra Leone</span>
              </li>
              <li className="flex gap-4">
                <Phone className="text-secondary w-5 h-5 flex-shrink-0" />
                <a href="tel:+23276762965" className="hover:text-secondary transition-colors">
                  +232 76 762965
                </a>
              </li>
              <li className="flex gap-4">
                <Mail className="text-secondary w-5 h-5 flex-shrink-0" />
                <span>mohamedskillz32@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <h4 className="text-white font-bold mb-6">Compliance</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
              {["Registered Non-Profit", "Child Care Policy Aligned", "Annual Impact Audit"].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Award className="text-secondary w-5 h-5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 text-center text-[10px] uppercase tracking-[0.4em] font-bold">
          &copy; 2026 Dream Big for Children Organization. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}
