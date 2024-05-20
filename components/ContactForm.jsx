"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactForm = () => {
  const [messageSent, setMessageSent] = useState(false);

  const handleMessageSend = () => {
    setMessageSent(true);
    // You can add additional logic here to send the message
  };

  return (
    <section className="min-w-[80%] md:min-w-[60%]">
      <motion.div
        className="flex flex-col gap-6 px-6 py-6 contact-form"
        initial={{ opacity: 0, x: -300 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <p className="feature-accent text-baseBlack">Contact Us</p>
        <div className="flex flex-col gap-[6px]">
          <p className="content-bold text-baseBlack">Your name</p>
          <input className="input" placeholder="Name" type="text" />
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="content-bold text-baseBlack">Your email</p>
          <input className="input" placeholder="Email" type="email" />
        </div>
        <div className="flex flex-col gap-[6px]">
          <p className="content-bold text-baseBlack">Your message</p>
          <textarea
            className="input min-h-32 py-8"
            placeholder="Please enter your message"
            type="text"
          />
        </div>
        <div className="flex justify-end">
          <button className="btn-form px-2 py-8" onClick={handleMessageSend}>
            {messageSent ? "Message Sent!" : "Submit"}
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactForm;
