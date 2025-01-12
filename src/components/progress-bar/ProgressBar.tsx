const ProgressBar = ({
  current,
  total,
}: {
  current: number;
  total: number;
}) => {
  const progress = (current / total) * 100;
  return (
    <div className="w-full bg-gray-200 h-8 rounded-full relative">
      <div
        className="bg-blue-600 h-8 rounded-full"
        style={{ width: `${progress}%` }}
      >
        <span className="flex items-center justify-center absolute inset-0">
          {current} of {total} learned
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
