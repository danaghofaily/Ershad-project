import React from 'react';
import Image from 'next/image';

const ContactUs = () => {
    return (
        <div className="contact-us-container">
            <h1>Contact Us</h1>
            <p>Feel free to get in touch with us via email or WhatsApp. We're here to help!</p>
            <div className="contact-icons">
                <a href="mailto:Ershadhelp@gmail.com" className="email-icon">
                    <Image 
                        src="/images/email.png" 
                        alt="Email" 
                        width={100} 
                        height={100} 
                    />
                </a>
                <a href="https://wa.me/+966538255242" className="whatsapp-icon">
                    <Image 
                        src="/images/WhatsappIcon.png" 
                        alt="WhatsApp" 
                        width={100} 
                        height={100} 
                    />
                </a>
            </div>
        </div>
    );
};

export default ContactUs;
