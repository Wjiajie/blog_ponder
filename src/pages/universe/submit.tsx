import React, { useState } from 'react';
import { useHistory } from '@docusaurus/router';

export default function SubmitPage() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    tags: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // Check if local API server is available (development mode)
    // In production, we redirect to GitHub instead
    const isLocalDev = window.location.hostname === 'localhost';

    if (isLocalDev) {
      // Try local API first, fallback to GitHub if not available
      const API_PORT = 3001;
      try {
        // First check if API server is running
        const healthCheck = await fetch(`http://localhost:${API_PORT}/api/health`, {
          method: 'HEAD'
        }).catch(() => null);

        const useLocalApi = healthCheck !== null;

        if (!useLocalApi) {
          // No local API, redirect to GitHub
          window.location.href = `/universe?redirectToGithub=true&title=${encodeURIComponent(formData.title)}&url=${encodeURIComponent(formData.url)}&desc=${encodeURIComponent(formData.description)}&tags=${encodeURIComponent(formData.tags)}`;
          setSubmitting(false);
          return;
        }

        const response = await fetch(`http://localhost:${API_PORT}/api/submit-blog`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to submit blog');
        }

        setSuccess(true);
        setTimeout(() => {
          history.push('/universe');
        }, 2000);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setSubmitting(false);
      }
    } else {
      // Production: Redirect to GitHub issue creation
      const issueTitle = encodeURIComponent(`[Blog Universe] ${formData.title}`);
      const issueBody = encodeURIComponent(
        `## Blog Submission\n\n### URL: ${formData.url}\n\n### Description: ${formData.description}\n\n### Tags: ${formData.tags || 'none'}\n\n---\n*Submitted via Blog Universe*`
      );

      const githubUrl = `https://github.com/Wjiajie/blog_ponder/issues/new?title=${issueTitle}&body=${issueBody}`;

      // Open GitHub in a new tab
      window.open(githubUrl, '_blank');

      // Show success message
      setSuccess(true);
      setTimeout(() => {
        history.push('/universe');
      }, 2000);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    marginBottom: '20px',
    border: '1px solid rgba(0, 0, 0, 0.15)',
    borderRadius: '4px',
    fontSize: '16px',
    fontFamily: 'var(--font-family-text)',
    background: 'var(--ifm-background-color)',
    color: 'var(--ifm-font-color-base)',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 500,
    color: 'var(--ifm-font-color-base)',
  };

  if (success) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>✓</div>
        <h1 style={{ fontFamily: 'var(--font-family-title)', marginBottom: '16px' }}>
          {typeof window !== 'undefined' && window.location.hostname === 'localhost'
            ? 'Submission Received!'
            : 'Redirecting to GitHub...'}
        </h1>
        <p style={{ opacity: 0.7, marginBottom: '30px' }}>
          {typeof window !== 'undefined' && window.location.hostname === 'localhost'
            ? 'Your blog has been submitted for review. The universe awaits!'
            : 'Please create an issue on GitHub with your blog details.'}
        </p>
        <p style={{ opacity: 0.5, fontSize: '14px' }}>
          Redirecting to universe...
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-family-title)', marginBottom: '12px' }}>
          Join the Universe
        </h1>
        <p style={{ opacity: 0.7 }}>
          Submit your independent blog to join the cosmos
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label style={labelStyle}>Blog Name *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Your blog's name"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Blog URL *</label>
          <input
            type="url"
            required
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            placeholder="https://your-blog.com"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Description *</label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Briefly describe your blog..."
            rows={4}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        <div>
          <label style={labelStyle}>Tags (comma separated)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="tech, life, programming"
            style={inputStyle}
          />
        </div>

        {error && (
          <div
            style={{
              padding: '12px 16px',
              marginBottom: '20px',
              background: 'rgba(231, 111, 81, 0.1)',
              border: '1px solid #e76f51',
              borderRadius: '4px',
              color: '#e76f51',
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          style={{
            width: '100%',
            padding: '14px 24px',
            fontSize: '16px',
            fontWeight: 500,
            color: '#fff',
            background: submitting ? 'var(--ifm-color-primary-light)' : 'var(--ifm-color-primary)',
            border: 'none',
            borderRadius: '4px',
            cursor: submitting ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s ease',
          }}
        >
          {submitting ? 'Submitting...' : 'Submit to Universe'}
        </button>

        <p style={{ textAlign: 'center', marginTop: '20px', opacity: 0.5, fontSize: '14px' }}>
          After submission, your blog will be reviewed and added to the universe
        </p>
      </form>
    </div>
  );
}
