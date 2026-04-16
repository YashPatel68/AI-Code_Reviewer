import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ArrowRight, Mail, MessageSquare, Phone, ShieldCheck } from 'lucide-react';
import axios from 'axios';

const contactItems = [
  {
    icon: Mail,
    label: 'Email',
    value: 'example@example.com',
    href: 'mailto:example@example.com?subject=Inquiry'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91-1234567890',
    href: 'tel:+911234567890'
  }
];

const Feedback = () => {
  const [data, setData] = useState({
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  function getValue(e) {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  async function save(e) {
    e.preventDefault();

    if (!data.email.trim()) {
      toast.info('Please fill the email');
      return;
    }

    if (!data.message.trim()) {
      toast.info('Please fill the message');
      return;
    }

    try {
      setSubmitting(true);
      await axios.post('http://localhost:8000/ai/code-reviewer/insert', data);
      toast.success('Feedback successfully sent');
      setData({
        email: '',
        message: ''
      });
    } catch (err) {
      console.error('Error saving feedback:', err);
      toast.error('Unable to send feedback right now');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <ToastContainer theme="dark" position="top-right" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-10 right-0 h-[280px] w-[280px] rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section className="overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_40%),linear-gradient(180deg,rgba(13,15,24,0.98),rgba(6,7,13,0.98))] px-6 py-8 sm:px-8 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr] lg:items-end">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-sm font-medium text-cyan-100">
                <MessageSquare size={16} />
                Feedback
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Shape the next iteration of the reviewer workspace
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300">
                Share bugs, UX friction, missing features, or ideas that would make reviews faster and clearer. Every
                detailed note helps us tighten the product.
              </p>
            </div>

            <div className="grid gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Best feedback is specific</p>
                  <p className="text-sm text-zinc-400">Tell us what you tried, what happened, and what should have happened.</p>
                </div>
              </div>
              <div className="h-px bg-white/10" />
              <p className="text-sm text-zinc-400">
                Please avoid sharing secrets, private keys, or other sensitive information in this form.
              </p>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.25fr]">
          <section className="rounded-[30px] border border-white/10 bg-[#0a0d14]/90 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)] sm:p-8">
            <div className="border-b border-white/10 pb-5">
              <h2 className="text-2xl font-semibold text-white">Contact</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Reach out directly or send feedback using the form below.
              </p>
            </div>

            <div className="mt-6 grid gap-4">
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group flex items-start gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.06]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-cyan-200 ring-1 ring-white/10">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="m-0 text-xs uppercase tracking-[0.22em] text-zinc-500">{item.label}</p>
                      <p className="mt-1 break-all text-sm font-medium text-white">{item.value}</p>
                    </div>
                    <ArrowRight size={16} className="ml-auto mt-1 text-zinc-500 transition group-hover:text-cyan-200" />
                  </a>
                );
              })}
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-5">
              <p className="m-0 text-sm font-semibold text-white">What helps most</p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Include what you were trying to do, what happened, and what you expected instead.
              </p>
            </div>
          </section>

          <section className="rounded-[30px] border border-white/10 bg-[#090c13]/95 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)] sm:p-8">
            <div className="border-b border-white/10 pb-5">
              <h2 className="text-2xl font-semibold text-white">Send feedback</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                We review submissions to improve clarity, quality, and overall usability.
              </p>
            </div>

            <form onSubmit={save} className="mt-6 space-y-6">
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium text-zinc-200">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={getValue}
                  placeholder="name@company.com"
                  className="h-[52px] rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-white placeholder:text-zinc-500 outline-none transition focus:border-cyan-400/45 focus:bg-cyan-400/[0.03]"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="message" className="text-sm font-medium text-zinc-200">
                  Feedback
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="10"
                  value={data.message}
                  onChange={getValue}
                  placeholder="Describe the issue, friction, or idea in detail..."
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-cyan-400/45 focus:bg-cyan-400/[0.03]"
                />
              </div>

              <div className="flex flex-col items-center gap-4 border-t border-white/10 pt-5 sm:flex-row sm:justify-between">
                <p className="text-center text-sm text-zinc-500 sm:text-left">
                  Please avoid sharing sensitive information in this form.
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-300"
                >
                  {submitting ? 'Sending...' : 'Submit feedback'}
                  {!submitting && <ArrowRight size={16} />}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
