import React from "react";
import { Link } from "react-router-dom";

const TermsAndConditions = () => (
  <div className="min-h-screen bg-orange-50 flex flex-col items-center py-10 px-4">
    <div className="max-w-2xl w-full bg-yellow-50 border border-orange-400 rounded-2xl shadow-lg p-8">
      <h1 className="text-3xl text-yellow-700 font-bold mb-6 font-mono tracking-tight">
        Terms &amp; Conditions
      </h1>

      <p className="text-gray-800 font-mono mb-4 text-base">
        Welcome to{" "}
        <span className="font-semibold text-orange-700">SlideIn</span>. Please
        read these Terms & Conditions carefully before using the website or
        services.
      </p>

      <h2 className="text-lg font-semibold text-orange-600 mt-6 mb-2 font-mono">
        1. Eligibility
      </h2>
      <p className="mb-4 text-gray-800 font-mono">
        To use SlideIn, you must be at least 18 years old. By registering, you
        confirm that you meet this requirement.
      </p>

      <h2 className="text-lg font-semibold text-orange-600 mt-6 mb-2 font-mono">
        2. Account Registration
      </h2>
      <p className="mb-4 text-gray-800 font-mono">
        You must provide accurate and complete information when registering. You
        are responsible for maintaining the confidentiality of your login
        credentials and all activities under your account.
      </p>

      <h2 className="text-lg font-semibold text-orange-600 mt-6 mb-2 font-mono">
        3. User Conduct
      </h2>
      <ul className="list-disc list-inside mb-4 text-gray-800 font-mono pl-4">
        <li>Do not misuse the platform or violate any applicable laws.</li>
        <li>No harassment, abuse, or hateful conduct with other users.</li>
        <li>No uploading of offensive, obscene, or illegal material.</li>
        <li>Impersonation of any person or entity is prohibited.</li>
      </ul>

      <h2 className="text-lg font-semibold text-orange-600 mt-6 mb-2 font-mono">
        4. Content Ownership
      </h2>
      <p className="mb-4 text-gray-800 font-mono">
        You own the content you upload, but grant SlideIn a license to use,
        display, or remove content when necessary to protect our community or
        comply with the law.
      </p>

      <h2 className="text-lg font-semibold text-orange-600 mt-6 mb-2 font-mono">
        5. Payments & Premium Features
      </h2>
      <p className="mb-4 text-gray-800 font-mono">
        Payments for premium features are governed by our{" "}
        <Link
          className="text-yellow-700 underline"
          to="/RefundorCancellationPolicy"
        >
          Refund/Cancellation Policy
        </Link>
        . Fees are non-refundable except as described in that policy.
      </p>

      <h2 className="text-lg font-semibold text-orange-600 mt-6 mb-2 font-mono">
        6. Termination
      </h2>
      <p className="mb-4 text-gray-800 font-mono">
        We may suspend or terminate your access for violation of these terms, or
        for any harmful or suspicious activity as determined by SlideIn, with or
        without notice.
      </p>

      <h2 className="text-lg font-semibold text-orange-600 mt-6 mb-2 font-mono">
        7. Limitation of Liability
      </h2>
      <p className="mb-4 text-gray-800 font-mono">
        SlideIn is not responsible for any damages or losses arising from use of
        our platform. All usage is at your own risk.
      </p>

      <h2 className="text-lg font-semibold text-orange-600 mt-6 mb-2 font-mono">
        8. Changes to Terms
      </h2>
      <p className="mb-4 text-gray-800 font-mono">
        We may update these terms at any time. The latest version will always be
        posted on this page. Continued use of SlideIn means you accept those
        changes.
      </p>

      <h2 className="text-lg font-semibold text-orange-600 mt-6 mb-2 font-mono">
        9. Contact Us
      </h2>
      <p className="mb-2 text-gray-800 font-mono">
        For any questions about these terms, please visit our{" "}
        <a className="text-yellow-700 underline" href="/ContactUs">
          Contact Us
        </a>{" "}
        page.
      </p>

      <p className="mt-8 text-xs text-gray-500 font-mono text-right">
        Last updated: July 2025
      </p>
    </div>
  </div>
);

export default TermsAndConditions;
