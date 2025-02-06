import { FaCheckCircle } from "react-icons/fa"; // Importing necessary icons

const UserFeed = () => {
  interface TimelineItem {
    date: string;
    title: string;
  }

  const timelineData: TimelineItem[] = [
    {
      date: "06-02-2025",
      title: "Added a Credits page.",
    },
    {
      date: "01-01-2025",
      title: "Pre-launched Bhasha Trainer 🥳.",
    },
  ].sort((a, b) => {
    // Sorting by date in DD-MM-YYYY format
    const [dayA, monthA, yearA] = a.date.split("-").map(Number);
    const [dayB, monthB, yearB] = b.date.split("-").map(Number);
    return (
      new Date(yearB, monthB - 1, dayB).getTime() -
      new Date(yearA, monthA - 1, dayA).getTime()
    );
  });

  const calculateDaysAgo = (date: string) => {
    const [day, month, year] = date.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);
    const diffTime = Math.abs(new Date().getTime() - dateObj.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 30) {
      const diffMonths = Math.floor(diffDays / 30);
      return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
    }
    return `${diffDays} days ago`;
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <div className="space-y-6">
        {timelineData.map((item, index) => (
          <div key={item.date} className="relative flex items-center gap-4">
            {/* Vertical line */}
            {index !== timelineData.length - 1 && (
              <div className="absolute left-6 top-12 bottom-0 w-px bg-gray-200" />
            )}

            {/* Icon */}
            <div className="relative z-10 flex-shrink-0 text-green-500">
              <FaCheckCircle className="text-2xl" />{" "}
            </div>
            <div>
              <h3>{item.title}</h3>
              <p className="text-gray-500">{calculateDaysAgo(item.date)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserFeed;
