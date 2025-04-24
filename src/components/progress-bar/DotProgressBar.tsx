// Define the props as an interface instead of a constant object
interface StepProps {
  currentStep: number;
  totalSteps: number;
}

const DotProgressBar = ({ currentStep, totalSteps }: StepProps) => {
  return (
    <div className="relative flex items-center">
      <div className="absolute left-3 right-3 h-1 bg-blue-300"></div>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          //eslint-disable-next-line
          key={`step-dot-${index}`}
          className={`z-10 mx-3 w-6 h-6 rounded-full ${
            index < currentStep
              ? "bg-blue-500"
              : "bg-gray-300 border-2 border-blue-200"
          }`}
        ></div>
      ))}
    </div>
  );
};

export default DotProgressBar;
