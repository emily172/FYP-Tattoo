import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    console.log("Form submitted:", formData); // For now, we log the form data
    setFormData({ name: "", email: "", message: "" }); // Reset the form
  };

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4 mb-4">Contact Us</h1>
        <p className="lead text-muted">We’d love to hear from you! Fill out the form below to get in touch with us.</p>
      </div>

      <div className="row">
        <div className="col-md-6">
          <h4>Get in Touch</h4>
          <p>
            <strong>Phone:</strong> 123-456-7890
          </p>
          <p>
            <strong>Email:</strong> <a href="mailto:contact@tattoostudio.com">contact@tattoostudio.com</a>
          </p>
          <p>
            <strong>Address:</strong> Setu, WA, Ireland
          </p>
          <iframe
            title="Studio Location"
           // src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=Setu
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        <div className="col-md-6">
          <h4>Send Us a Message</h4>
          {formSubmitted ? (
            <p className="text-success">Thank you for your message! We’ll get back to you soon.</p>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Your Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Your Message</label>
                <textarea
                  className="form-control"
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
