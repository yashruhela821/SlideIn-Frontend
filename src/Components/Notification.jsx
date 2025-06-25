// Notification.js
const Notification = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in">
        <svg
          className="w-6 h-6 mr-2 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span className="font-medium">{message}</span>
        <button
          className="ml-4 text-white hover:text-green-200 focus:outline-none"
          onClick={onClose}
          aria-label="Close notification"
        >
          &times;
        </button>
      </div>
      <style>
        {`
          @keyframes slide-in {
            from { opacity: 0; transform: translateY(-20px) translateX(-50%);}
            to { opacity: 1; transform: translateY(0) translateX(-50%);}
          }
          .animate-slide-in {
            animation: slide-in 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
        `}
      </style>
    </div>
  );
};

export default Notification;
