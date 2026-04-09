import React, { useState } from 'react';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Navigation,
  ArrowRight,
  Check,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';

/* WhatsApp API needs digits only — no "+" or spaces */
const WHATSAPP_NUMBER = '971527087748';
/* Formatted version for display purposes */
const WHATSAPP_DISPLAY = '+971 52 708 7748';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = true;
    if (!formData.lastName.trim()) newErrors.lastName = true;
    if (!formData.email.trim()) {
      newErrors.email = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = true;
    }
    if (!formData.subject) newErrors.subject = true;
    if (!formData.message.trim()) newErrors.message = true;
    return newErrors;
  };

  const subjectLabels = {
    general: 'General Inquiry',
    products: 'Product Information',
    quotation: 'Request a Quotation',
    bulk: 'Bulk Order',
    partnership: 'Partnership Opportunity',
    support: 'After-Sales Support',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    /* ── Plain text WhatsApp message with ALL form fields ── */
    const parts = [];

    parts.push(`Name: ${formData.firstName.trim()} ${formData.lastName.trim()}`);
    parts.push(`Email: ${formData.email.trim()}`);

    if (formData.phone.trim()) {
      parts.push(`Phone: ${formData.phone.trim()}`);
    }

    if (formData.company.trim()) {
      parts.push(`Company: ${formData.company.trim()}`);
    }

    parts.push(`Subject: ${subjectLabels[formData.subject] || formData.subject}`);
    parts.push(`Message: ${formData.message.trim()}`);

    const text = parts.join('\n');
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: '',
    });
    setErrors({});
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const inputErrorStyle = (field) =>
    errors[field]
      ? { borderColor: '#e74c3c', boxShadow: '0 0 0 4px rgba(231,76,60,0.1)' }
      : {};

  return (
    <>
      <section style={styles.section}>
        <div style={styles.container}>
          {/* ── Section Header ── */}
          <div style={styles.header}>
            <div style={styles.label}>
              <span style={styles.labelDot} />
              Get In Touch
            </div>
            <h2 style={styles.title}>
              Let&apos;s Start a{' '}
              <span style={styles.titleGradient}>Conversation</span>
            </h2>
            <p style={styles.subtitle}>
              Have a question about our hospitality supplies? We&apos;d love to
              hear from you. Send us a message and we&apos;ll respond promptly.
            </p>
          </div>

          {/* ── Main Grid ── */}
          <div style={styles.grid}>
            {/* Left: Info Cards */}
            <div style={styles.infoPanel}>
              <InfoCard
                icon={<MapPin size={20} />}
                title="Our Office"
                body={
                  <>
                    NEOM Hospitality Supplies LLC
                    <br />
                    Office No. 101 - 463, 1st Floor
                    <br />
                    Mashreq Building
                    <br />
                    Al Suq Al Kabeer, Dubai, UAE
                  </>
                }
              />
              <InfoCard
                icon={<Mail size={20} />}
                title="Email Us"
                body={
                  <>
                    <a href="mailto:info@neomhs.com" style={styles.link}>
                      info@neomhotelssupplies.com
                    </a>
                    <br />
                    <a href="mailto:sales@neomhs.com" style={styles.link}>
                      neomhospitalitydxb@gmail.com
                    </a>
                  </>
                }
              />
              <InfoCard
                icon={<Phone size={20} />}
                title="Call / WhatsApp"
                body={
                  <a href={`tel:${WHATSAPP_DISPLAY}`} style={styles.link}>
                    {WHATSAPP_DISPLAY}
                  </a>
                }
              />
              <InfoCard
                icon={<Clock size={20} />}
                title="Working Hours"
                body={
                  <>
                    Mon – Sat: 9:00 AM – 6:00 PM
                    <br />
                    Sun: Closed
                  </>
                }
              />

              {/* ── Clickable Google Maps ── */}
              <a
                href="https://www.google.com/maps/dir//Mashreq+Bank+Global+HQ+-+Umniyati+Street+-+off+Al+Asayel+St+-+Burj+Khalifa+-+Downtown+Dubai+-+Dubai/@25.1960343,55.2122624,13z/data=!4m18!1m8!3m7!1s0x3e5f696527561b31:0x9dddcda468434fe!2sMashreq+Bank+Global+HQ!8m2!3d25.1960343!4d55.2843602!15sCitNYXNocmVxIEJ1aWxkaW5nIEFsIFN1cSBBbCBLYWJlZXIgRHViYWkgVUFFIgOIAQFaLSIrbWFzaHJlcSBidWlsZGluZyBhbCBzdXEgYWwga2FiZWVyIGR1YmFpIHVhZZIBEGNvcnBvcmF0ZV9vZmZpY2WaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVUmtPSEZQUjBKM0VBReABAPoBBAgAEDg!16s%2Fg%2F11fp3xxcnd!4m8!1m0!1m5!1m1!1s0x3e5f696527561b31:0x9dddcda468434fe!2m2!1d55.2843602!2d25.1960343!3e0?entry=ttu&g_ep=EgoyMDI2MDQwNi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.mapLink}
              >
                <div style={styles.mapCard}>
                  <iframe
                    title="NEOM Hospitality Supplies LLC – Al Suq Al Kabeer, Dubai"
                    src="https://maps.google.com/maps?q=Mashreq+Building,+Al+Suq+Al+Kabeer,+Dubai,+UAE&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={styles.mapIframe}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div style={styles.mapOverlay}>
                    <div style={styles.mapOverlayIcon}>
                      <Navigation size={14} />
                    </div>
                    <div style={styles.mapOverlayText}>
                      <span style={styles.mapOverlayTitle}>
                        NEOM Hospitality Supplies LLC
                      </span>
                      <span style={styles.mapOverlaySub}>
                        Click to get directions
                        <ExternalLink size={11} style={{ marginLeft: 4, verticalAlign: 'middle' }} />
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Right: Contact Form */}
            <div style={styles.formPanel}>
              <h3 style={styles.formTitle}>Send Us a Message</h3>
              <p style={styles.formSubtitle}>
                Fill out the form below — it will open WhatsApp with all your details pre-filled.
              </p>

              <form onSubmit={handleSubmit} noValidate>
                {/* Row 1 */}
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.labelText}>
                      First Name <span style={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      style={{ ...styles.input, ...inputErrorStyle('firstName') }}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.labelText}>
                      Last Name <span style={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      style={{ ...styles.input, ...inputErrorStyle('lastName') }}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.labelText}>
                      Email Address <span style={styles.required}>*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      style={{ ...styles.input, ...inputErrorStyle('email') }}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.labelText}>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+971 56 XXX XXXX"
                      style={styles.input}
                    />
                  </div>
                </div>

                {/* Company */}
                <div style={styles.formGroup}>
                  <label style={styles.labelText}>Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Hotel / Business Name"
                    style={styles.input}
                  />
                </div>

                {/* Subject */}
                <div style={styles.formGroup}>
                  <label style={styles.labelText}>
                    Subject <span style={styles.required}>*</span>
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    style={{ ...styles.select, ...inputErrorStyle('subject') }}
                  >
                    <option value="" disabled>
                      Select a topic
                    </option>
                    <option value="general">General Inquiry</option>
                    <option value="products">Product Information</option>
                    <option value="quotation">Request a Quotation</option>
                    <option value="bulk">Bulk Order</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="support">After-Sales Support</option>
                  </select>
                </div>

                {/* Message */}
                <div style={styles.formGroup}>
                  <label style={styles.labelText}>
                    Message <span style={styles.required}>*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    style={{
                      ...styles.textarea,
                      ...inputErrorStyle('message'),
                    }}
                  />
                </div>

                <button type="submit" style={styles.submitBtn}>
                  <MessageCircle size={18} />
                  Send via WhatsApp
                  <ArrowRight size={18} />
                </button>

                <p style={styles.formNote}>
                  By submitting, you agree to our privacy policy. We&apos;ll
                  never share your information.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Toast ── */}
      <div
        style={{
          ...styles.toast,
          transform: showToast ? 'translateY(0)' : 'translateY(120%)',
          opacity: showToast ? 1 : 0,
        }}
      >
        <div style={styles.toastIcon}>
          <Check size={16} />
        </div>
        <div style={styles.toastText}>
          Redirecting to WhatsApp!
          <span style={styles.toastSub}>
            All your details have been pre-filled. Just hit send!
          </span>
        </div>
      </div>
    </>
  );
};

/* ───────── Sub-Component: InfoCard ───────── */
const InfoCard = ({ icon, title, body }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.infoCard,
        ...(hovered ? styles.infoCardHover : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.infoIcon}>{icon}</div>
      <div style={styles.infoContent}>
        <h4 style={styles.infoTitle}>{title}</h4>
        <p style={styles.infoBody}>{body}</p>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   STYLES
   ═══════════════════════════════════════════ */
const blue = {
  darkest: '#0a1628',
  dark: '#0d2b52',
  primary: '#1558a8',
  medium: '#1e6fd9',
  light: '#4a9aea',
  lighter: '#7db8f0',
  pale: '#d6e8fa',
  ghost: '#eef5fd',
  white: '#ffffff',
};

const styles = {
  section: {
    background: `linear-gradient(180deg, ${blue.ghost} 0%, ${blue.white} 100%)`,
    padding: '96px 24px',
    fontFamily: "'Inter', sans-serif",
    color: '#1a2d4a',
    WebkitFontSmoothing: 'antialiased',
  },
  container: {
    maxWidth: 1280,
    margin: '0 auto',
  },
  header: { textAlign: 'center', marginBottom: 64 },
  label: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: blue.primary,
    background: blue.pale,
    padding: '8px 20px',
    borderRadius: 100,
    marginBottom: 20,
  },
  labelDot: {
    width: 6,
    height: 6,
    background: blue.light,
    borderRadius: '50%',
    display: 'inline-block',
  },
  title: {
    fontSize: 36,
    fontWeight: 600,
    color: blue.darkest,
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
    marginBottom: 16,
  },
  titleGradient: {
    background: `linear-gradient(135deg, ${blue.primary}, ${blue.light})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: 17,
    fontWeight: 300,
    color: '#5a7091',
    maxWidth: 520,
    margin: '0 auto',
    lineHeight: 1.6,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.1fr',
    gap: 48,
    alignItems: 'start',
  },
  infoPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  infoCard: {
    background: blue.white,
    borderRadius: 16,
    padding: 28,
    display: 'flex',
    gap: 20,
    alignItems: 'flex-start',
    transition: 'all 0.3s ease',
    cursor: 'default',
  },
  infoCardHover: {
    border: `1px solid ${blue.lighter}`,
    boxShadow: '0 12px 40px -12px rgba(21,88,168,0.15)',
    transform: 'translateY(-2px)',
  },
  infoIcon: {
    flexShrink: 0,
    width: 48,
    height: 48,
    borderRadius: 12,
    background: `linear-gradient(135deg, ${blue.primary}, ${blue.medium})`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: blue.white,
    boxShadow: '0 4px 16px -4px rgba(21,88,168,0.4)',
  },
  infoContent: {},
  infoTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: blue.darkest,
    marginBottom: 6,
  },
  infoBody: {
    fontSize: 14,
    fontWeight: 400,
    color: '#5a7091',
    lineHeight: 1.6,
    margin: 0,
  },
  link: {
    color: blue.primary,
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  mapLink: {
    textDecoration: 'none',
    display: 'block',
    marginTop: 4,
    borderRadius: 16,
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  mapCard: {
    background: blue.white,
    borderRadius: 16,
    overflow: 'hidden',
    height: 200,
    position: 'relative',
    transition: 'all 0.3s ease',
  },
  mapIframe: {
    border: 'none',
    display: 'block',
    filter: 'saturate(0.85) contrast(1.05)',
    transition: 'filter 0.5s ease',
    pointerEvents: 'none',
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '14px 18px',
    background: 'linear-gradient(to top, rgba(21,88,168,0.75) 0%, rgba(21,88,168,0.3) 70%, transparent 100%)',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    color: blue.white,
    fontSize: 13,
    fontWeight: 500,
  },
  mapOverlayIcon: {
    flexShrink: 0,
    width: 34,
    height: 34,
    borderRadius: 10,
    background: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(255,255,255,0.3)',
  },
  mapOverlayText: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  mapOverlayTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: blue.white,
    letterSpacing: '0.01em',
  },
  mapOverlaySub: {
    fontSize: 11,
    fontWeight: 400,
    color: 'rgba(255,255,255,0.85)',
    display: 'flex',
    alignItems: 'center',
  },
  formPanel: {
    background: blue.white,
    border: '1px solid #e4edf7',
    borderRadius: 20,
    padding: 40,
    boxShadow: '0 20px 60px -20px rgba(10,22,40,0.08)',
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 600,
    color: blue.darkest,
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 14,
    fontWeight: 400,
    color: '#5a7091',
    marginBottom: 32,
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  labelText: {
    display: 'block',
    fontSize: 13,
    fontWeight: 500,
    color: blue.darkest,
    marginBottom: 8,
  },
  required: {
    color: '#e74c3c',
    marginLeft: 2,
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    fontWeight: 400,
    color: '#1a2d4a',
    background: blue.ghost,
    border: '1.5px solid #e4edf7',
    borderRadius: 10,
    outline: 'none',
    transition: 'all 0.25s ease',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '12px 40px 12px 16px',
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    fontWeight: 400,
    color: '#1a2d4a',
    background: `${blue.ghost} url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%235a7091' viewBox='0 0 16 16'%3E%3Cpath d='M4.646 5.646a.5.5 0 0 1 .708 0L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E") no-repeat right 14px center`,
    border: '1.5px solid #e4edf7',
    borderRadius: 10,
    outline: 'none',
    transition: 'all 0.25s ease',
    appearance: 'none',
    cursor: 'pointer',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '12px 16px',
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    fontWeight: 400,
    color: '#1a2d4a',
    background: blue.ghost,
    border: '1.5px solid #e4edf7',
    borderRadius: 10,
    outline: 'none',
    transition: 'all 0.25s ease',
    resize: 'vertical',
    minHeight: 120,
    boxSizing: 'border-box',
  },
  submitBtn: {
    width: '100%',
    padding: '14px 32px',
    fontFamily: "'Inter', sans-serif",
    fontSize: 15,
    fontWeight: 600,
    color: blue.white,
    background: 'linear-gradient(135deg, #25D366, #128C7E)',
    border: 'none',
    borderRadius: 10,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    transition: 'all 0.3s ease',
    boxShadow: '0 6px 24px -6px rgba(37,211,102,0.5)',
    marginTop: 8,
  },
  formNote: {
    textAlign: 'center',
    fontSize: 12,
    color: '#5a7091',
    marginTop: 16,
    opacity: 0.8,
  },
  toast: {
    position: 'fixed',
    bottom: 32,
    right: 32,
    background: blue.white,
    border: '1px solid #c5d9ef',
    borderLeft: '4px solid #25D366',
    borderRadius: 12,
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    boxShadow: '0 16px 48px -12px rgba(0,0,0,0.15)',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    zIndex: 999,
  },
  toastIcon: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: '#eafaf1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#25D366',
    flexShrink: 0,
  },
  toastText: {
    fontSize: 14,
    fontWeight: 500,
    color: blue.darkest,
  },
  toastSub: {
    display: 'block',
    fontSize: 12,
    fontWeight: 400,
    color: '#5a7091',
    marginTop: 2,
  },
};

export default ContactSection;