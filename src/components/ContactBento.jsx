import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mail, Phone, MapPin, Send, CheckCircle2, Copy, Sparkles, Terminal } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export const ContactBento = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundEffects.playClick();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      soundEffects.playSuccess();

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 }
      });
    }, 800);
  };

  return (
    <div id="contact-form" className="bg-zinc-950/90 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden group">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Contact Info & Call to Action */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-lime-400 font-sans text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open for Opportunities & Collaborations</span>
          </div>

          <h2 className="text-3xl font-black text-white font-heading tracking-tight leading-tight">
            Let's Build Something <span className="text-lime-400">Exceptional</span> Together.
          </h2>

          <p className="text-sm text-zinc-300 font-sans leading-relaxed">
            Whether you have a complex architectural problem to solve, an AI workflow to build, or a full-stack engineering role — drop me a line!
          </p>

          {/* Quick Info Matrix */}
          <div className="space-y-2 pt-2 font-sans text-xs text-zinc-300 font-medium">
            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
              <Mail className="w-4 h-4 text-lime-400" />
              <span>anishdevelops@gmail.com</span>
            </div>
            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
              <Phone className="w-4 h-4 text-lime-400" />
              <span>+91 7065692440</span>
            </div>
            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
              <MapPin className="w-4 h-4 text-zinc-400" />
              <span>New Delhi, Delhi, India</span>
            </div>
          </div>
        </div>

        {/* Quick Message Form */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-5 sm:p-6 shadow-inner font-sans text-xs">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-900 text-emerald-400 border border-zinc-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-heading">Message Dispatched!</h3>
              <p className="text-xs text-zinc-400 font-sans">
                Thank you for reaching out. Anish will review your query and get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 rounded-lg bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition font-sans font-medium"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-xs font-semibold text-white border-b border-zinc-800 pb-2 flex items-center justify-between">
                <span>Direct Transmission</span>
                <Send className="w-3.5 h-3.5 text-lime-400" />
              </div>

              <div className="space-y-1">
                <label htmlFor="contact-name" className="text-zinc-400 text-xs font-medium">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-lime-400 font-sans"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="contact-email" className="text-zinc-400 text-xs font-medium">Your Email</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-lime-400 font-sans"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="contact-message" className="text-zinc-400 text-xs font-medium">Message</label>
                <textarea
                  id="contact-message"
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hi Anish, we would love to discuss a project..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-lime-400 font-sans resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-lg bg-lime-400 text-black font-bold font-sans hover:bg-lime-300 transition shadow-sm flex items-center justify-center gap-2 focus:ring-2 focus:ring-lime-400"
              >
                <Send className="w-4 h-4" />
                {loading ? 'Transmitting...' : 'Send Direct Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
