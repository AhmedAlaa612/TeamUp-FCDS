import React, { useState } from "react";
import { sendContactMessage } from "../services/Contact";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
//import "../../assets/styles/Contact.css";
function ContactUs() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    try {
      const response = await sendContactMessage(
        data.name,
        data.email,
        data.message
      );
      if (response.status === "success") {
        navigate("/");
      }
    } catch (err) {
      setError("Failed to send message");
    }
  };
  return (
    <div className="contact-container">
      {error && <div className="error-message">{error}</div>}
      <div className="contact-content">
        <div className="contact-info">
          <h1 className="arc">Let's Connect! 🚀</h1>
          <p>
            We'd love to hear from you! Whether you have a question about
            features, trials, pricing, or anything else, our team is ready to
            answer all your questions.
          </p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Name should only contain letters",
                },
              })}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters long",
                },
              })}
            />
            {errors.message && (
              <p className="error">{errors.message.message}</p>
            )}
          </div>

          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
