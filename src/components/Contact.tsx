'use client';

import { useState } from 'react';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Failed to send message');
    }
  };

  return (
    <section id="contact">
      <div className="contact-inner">
        <div className="contact-left">
          <div className="section-label reveal">Get In Touch</div>
          <h2 className="reveal reveal-delay-1">
            Let's Make <span>History</span>
          </h2>
          <p className="reveal reveal-delay-2">
            Have a story that demands to be told? Reach out to Maddock Films for production inquiries, script submissions, press opportunities, or distribution.
          </p>
        </div>

        <form className="contact-form reveal reveal-delay-2" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              id="name"
              type="text"
              required
              placeholder="e.g. Dinesh Vijan"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              required
              placeholder="name@company.com"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <select
              id="subject"
              value={formData.subject}
              onChange={e => setFormData({ ...formData, subject: e.target.value })}
            >
              <option value="General Inquiry">General Inquiry</option>
              <option value="Feature Development">Feature Development</option>
              <option value="Press & Media">Press & Media</option>
              <option value="Distribution">Distribution</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              required
              placeholder="Tell us about your project..."
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <button type="submit" className="form-submit" disabled={status === 'sending'}>
            {status === 'sending' && 'Sending...'}
            {status === 'success' && 'Message Sent ✓'}
            {(status === 'idle' || status === 'error') && 'Send Message'}
          </button>

          {status === 'error' && (
            <p className="form-error" role="alert">
              {errorMessage || 'Something went wrong. Please try again.'}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
