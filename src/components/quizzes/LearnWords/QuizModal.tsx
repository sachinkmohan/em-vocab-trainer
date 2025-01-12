const QuizModal = ({
  show,
  onClose,
  children,
}: {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center ">
      <div className="bg-white p-8 rounded-xl shadow-lg ">
        {children}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
