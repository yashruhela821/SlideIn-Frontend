import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="flex w-full max-w-4xl bg-transparent rounded-2xl shadow-xl overflow-hidden">
        {/* Left: Illustration */}
        <div className="flex-shrink-0 flex items-center justify-center bg-yellow-50/80 backdrop-blur-sm w-1/2">
          <img
            src="contact.png"
            alt="Contact illustration"
            className="w-full h-full object-cover object-center"
          />
        </div>
        {/* Right: Contact Info */}
        <div className="w-1/2 flex flex-col items-center justify-center bg-yellow-50/80 backdrop-blur-sm p-8 md:p-12 border-l-4 border-orange-400 shadow-[4px_8px_8px_0_#f59e42]">
          <h1 className="text-3xl md:text-4xl font-bold font-mono text-yellow-700 mb-4 tracking-tight">
            Get In Touch
          </h1>
          <p className="text-orange-600 font-light text-lg mb-8 text-center px-4 max-w-xs font-mono">
            We're here to help! Whether you have a question or just want to say
            hello, reach out anytime.
          </p>
          <a
            href="mailto:slideincontact@gmail.com"
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 via-orange-300 to-orange-500 text-white text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 underline-offset-4 hover:underline font-mono border border-orange-400"
          >
            slideincontact@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
