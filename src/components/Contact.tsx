'use client';

import { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 4000);
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

          <button type="submit" className="form-submit">
            {submitted ? 'Message Sent ✓' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}
