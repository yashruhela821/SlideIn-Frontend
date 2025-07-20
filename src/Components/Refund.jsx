import React from "react";

const RefundOrCancellationPolicy = () => (
  <div className="min-h-screen bg-orange-50 flex flex-col items-center py-10 px-4">
    <div className="max-w-2xl w-full bg-yellow-50 border border-orange-400 rounded-2xl shadow-lg p-8">
      <h1 className="text-3xl text-yellow-700 font-bold mb-6 font-mono tracking-tight">
        Refund / Cancellation Policy
      </h1>
      <p className="text-gray-800 font-mono mb-4 text-base">
        Thank you for choosing{" "}
        <span className="font-semibold text-orange-700">SlideIn</span>! This
        policy describes how refunds and cancellations are handled for any
        products or services purchased through our webapp.
      </p>

      <h2 className="text-lg font-semibold text-orange-600 mt-6 mb-2 font-mono">
        1. Payments & Subscriptions
      </h2>
      <p className="mb-4 text-gray-800 font-mono">
        All transactions for the purchase of premium plans or features on
        SlideIn are processed securely via our payment gateway partners. Please
        read all details carefully before confirming your purchase.
      </p>

      <h2 className="text-lg font-semibold text-orange-600 mt-6 mb-2 font-mono">
        2. No Refund Policy
      </h2>
      <p className="mb-4 text-gray-800 font-mono">
        All payments made for premium features, subscriptions, or one-time
        purchases are <b>non-refundable</b> except in the circumstances clearly
        outlined below. Please make sure you understand the features and
        services before making a payment.
      </p>

      <h2 className="text-lg font-semibold text-orange-600 mt-6 mb-2 font-mono">
        3. Double Payment/Accidental Payment
      </h2>
      <p className="mb-4 text-gray-800 font-mono">
        If you were charged twice for the same service, or made an accidental
        extra payment, please{" "}
        <a className="text-yellow-700 underline" href="/ContactUs">
          Contact Us
        </a>{" "}
        within 48 hours. Upon verification, a full refund of the extra payment
        will be issued to your original payment method within 7-14 business
        days.
      </p>

      <h2 className="text-lg font-semibold text-orange-600 mt-6 mb-2 font-mono">
        4. Failed Transactions
      </h2>
      <p className="mb-4 text-gray-800 font-mono">
        If your payment was deducted but you did not receive the premium
        features, please contact us with payment details (transaction ID, date,
        etc.). If verified, your features will either be enabled or a full
        refund will be issued, at our discretion.
      </p>

      <h2 className="text-lg font-semibold text-orange-600 mt-6 mb-2 font-mono">
        5. Subscription Cancellations
      </h2>
      <p className="mb-4 text-gray-800 font-mono">
        You may cancel your SlideIn subscription at any time. The cancellation
        will apply from the next billing cycle.{" "}
        <b>No partial or pro-rata refunds are given</b> for unused subscription
        days in the current billing period.
      </p>

      <h2 className="text-lg font-semibold text-orange-600 mt-6 mb-2 font-mono">
        6. Unauthorized Transactions
      </h2>
      <p className="mb-4 text-gray-800 font-mono">
        If you notice any unauthorized or fraudulent transactions, contact your
        bank immediately and inform us via our{" "}
        <a className="text-yellow-700 underline" href="/ContactUs">
          Contact Us
        </a>{" "}
        page. We will investigate and assist per standard security processes.
        Refunds for unauthorized transactions are subject to the payment
        gateway’s and bank’s investigation outcomes.
      </p>

      <h2 className="text-lg font-semibold text-orange-600 mt-6 mb-2 font-mono">
        7. Promotional Offers
      </h2>
      <p className="mb-4 text-gray-800 font-mono">
        All payments made for discounted, promotional, or trial offers are final
        and <b>not eligible for refunds</b> unless explicitly stated at the time
        of purchase.
      </p>

      <h2 className="text-lg font-semibold text-orange-600 mt-6 mb-2 font-mono">
        8. How To Request a Refund
      </h2>
      <p className="mb-4 text-gray-800 font-mono">
        To request a refund or report a payment issue, please contact us within
        48 hours of your transaction. Provide your name, registered email,
        transaction reference, date, and reason for your request. Use our{" "}
        <a className="text-yellow-700 underline" href="/ContactUs">
          Contact Us
        </a>{" "}
        form or email our support team.
      </p>

      <h2 className="text-lg font-semibold text-orange-600 mt-6 mb-2 font-mono">
        9. Changes to this Policy
      </h2>
      <p className="mb-4 text-gray-800 font-mono">
        SlideIn reserves the right to change or update this Refund/Cancellation
        Policy at any time. Updated policies will be posted on this page. Please
        review periodically for any changes.
      </p>

      <h2 className="text-lg font-semibold text-orange-600 mt-6 mb-2 font-mono">
        10. Contact Information
      </h2>
      <p className="mb-2 text-gray-800 font-mono">
        For questions about this policy, reach us at our{" "}
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

export default RefundOrCancellationPolicy;
