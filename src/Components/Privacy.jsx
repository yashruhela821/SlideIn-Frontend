import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4 py-10">
      <div className="w-full max-w-2xl bg-yellow-50/80 rounded-2xl shadow-xl border-l-4 border-orange-400  md:p-10 flex flex-col items-center">
        {/* Top illustration */}
        <img
          src="private.png"
          alt="Privacy illustration"
          className="w-32 h-full md:w-full object-contain"
        />
        {/* Policy Content */}
        <h1 className="text-3xl md:text-4xl font-bold font-mono text-yellow-700 mb-3 text-center">
          Privacy Policy
        </h1>
        <span className="block text-xs text-orange-500 mb-5 font-mono text-center">
          Effective Date: 18 July 2025
        </span>
        <div className="w-full space-y-5 font-mono text-base text-orange-900">
          <div>
            <p>
              Your privacy is essential to us. This Privacy Policy explains how{" "}
              <b>SlideIn</b> (“we”, “us”, or “our”) collects, uses, and protects
              your information when you explore connections on our dating
              platform.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-lg text-yellow-600 mt-2">
              1. Information We Collect
            </h2>
            <ul className="list-disc ml-6 mt-1">
              <li>
                <b>Profile Data:</b> Name, age, gender identity, location
                (city), photos, interests, and information you include in your
                profile and prompts.
              </li>
              <li>
                <b>Contact & Login:</b> Email, phone (if you provide it), login
                credentials, and account settings.
              </li>
              <li>
                <b>Usage Data:</b> Device info, app activity, likes, matches,
                and interactions.
              </li>
              <li>
                <b>Sensitive Data:</b> Demographic info, relationship
                preferences, or sexuality (only if you choose to share).
              </li>
              <li>
                <b>Messages & Content:</b> Chats and sent content between you
                and your matches, stored securely and not shared outside the
                conversation.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-lg text-yellow-600 mt-2">
              2. How We Use Your Data
            </h2>
            <ul className="list-disc ml-6 mt-1">
              <li>To create your profile and suggest compatible matches.</li>
              <li>
                To facilitate safe, respectful communication and connections.
              </li>
              <li>
                To improve app recommendations and features based on usage
                trends.
              </li>
              <li>
                To moderate content for user safety and enforce community
                guidelines.
              </li>
              <li>
                For customer support, account recovery, and communication about
                important changes.
              </li>
              <li>
                For safety measures (such as detecting spam, scams, or abuse).
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-lg text-yellow-600 mt-2">
              3. Your Privacy Choices & Safety Features
            </h2>
            <ul className="list-disc ml-6 mt-1">
              <li>
                You control what you add to your profile and can edit or remove
                information at any time.
              </li>
              <li>
                You may choose to hide your profile, control who can message or
                see you, and unmatch or block users at your discretion.
              </li>
              <li>
                We provide in-app tools to report, block, or flag inappropriate
                behavior, harassment, or safety concerns. Such reports are
                reviewed confidentially.
              </li>
              <li>
                While we help foster connections, please be cautious when
                sharing personal information with others.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-lg text-yellow-600 mt-2">
              4. Sharing & Disclosure
            </h2>
            <ul className="list-disc ml-6 mt-1">
              <li>
                We <b>never</b> sell your data.
              </li>
              <li>
                Your basic profile info (first name, age, city, photo, prompts)
                may be visible to other users; private data like email and
                messages are never shown publicly.
              </li>
              <li>
                We may share information with trusted vendors who help us run
                the service (e.g., cloud storage), and with law enforcement if
                legally required or for safety investigations.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-lg text-yellow-600 mt-2">
              5. Data Security
            </h2>
            <ul className="list-disc ml-6 mt-1">
              <li>
                Your data is encrypted in transit and at rest where possible.
              </li>
              <li>
                We employ access controls, routine audits, and technical
                protections to diminish misuse, but no system is 100%
                secure—safeguard your password and stay alert.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-lg text-yellow-600 mt-2">
              6. Account Control & Deletion
            </h2>
            <ul className="list-disc ml-6 mt-1">
              <li>Edit or delete your account and content at any time.</li>
              <li>
                Upon deletion, your main profile is removed and messages
                anonymized or deleted as technically feasible, per legal
                requirements and backup procedures.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-lg text-yellow-600 mt-2">
              7. Community and Conduct
            </h2>
            <ul className="list-disc ml-6 mt-1">
              <li>Treat fellow users with respect and kindness.</li>
              <li>
                Impersonation, harassment, or sharing of others’ private info is
                strictly prohibited and grounds for account removal.
              </li>
              <li>
                We may investigate and take action on reported trust & safety
                issues, while respecting privacy.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-lg text-yellow-600 mt-2">
              8. Children’s Privacy
            </h2>
            <p>
              Our dating app is for users 18+. We do not knowingly collect
              information from anyone under 18. If you’re a parent or guardian
              and believe a minor’s data has been entered, please contact us
              immediately.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-lg text-yellow-600 mt-2">
              9. Updates to This Policy
            </h2>
            <p>
              We may update this policy. Significant changes will be
              communicated through in-app notifications or email.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-lg text-yellow-600 mt-2">
              10. Contact Us
            </h2>
            <p>
              Questions? Email{" "}
              <a
                href="mailto:slideincontact@gmail.com"
                className="text-yellow-700 hover:underline"
              >
                slideincontact@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
