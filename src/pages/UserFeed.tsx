import { FaCheckCircle } from "react-icons/fa"; // Importing necessary icons
import { formatDistanceToNow, compareDesc, parse } from "date-fns";
const UserFeed = () => {
  interface TimelineItem {
    date: string;
    user: string;
  }

  const parseDate = (date: string) => {
    return parse(date, "dd-MM-yyyy", new Date());
  };

  const timelineData: TimelineItem[] = [
    {
      date: "06-02-2025",
      user: "John Doe",
    },
    {
      date: "01-01-2025",
      user: "Susan Smith",
    },
    // generate 10 more random dates
    {
      date: "15-03-2025",
      user: "Alice Johnson",
    },
    {
      date: "20-04-2025",
      user: "Bob Brown",
    },
    {
      date: "25-05-2025",
      user: "Charlie Davis",
    },
    {
      date: "30-06-2025",
      user: "Diana Evans",
    },
    {
      date: "05-07-2025",
      user: "Ethan Foster",
    },
    {
      date: "10-08-2025",
      user: "Fiona Green",
    },
    {
      date: "15-09-2025",
      user: "George Harris",
    },
    {
      date: "20-10-2025",
      user: "Hannah Ives",
    },
    {
      date: "25-11-2025",
      user: "Ian Johnson",
    },
    {
      date: "30-12-2025",
      user: "Jack King",
    },
  ].sort((a, b) => {
    // Sorting by date in DD-MM-YYYY format
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return compareDesc(dateA, dateB);
  });

  const formatRelativeTime = (date: string) => {
    const parsedDate = parseDate(date);
    return formatDistanceToNow(parsedDate, { addSuffix: true });
  };

  return (
    <div className="max-w-2xl mx-auto w-full px-4">
      <div className="px-4 py-2">
        <h2 className="text-xl font-bold py-2">Scrolls</h2>
      </div>
      <div>
        <div className="px-4 space-y-6 pb-20">
          {timelineData.map((item, index) => (
            <div key={item.date} className="relative flex items-center gap-4">
              {/* Vertical line */}
              {index !== timelineData.length - 1 && (
                <div className="absolute left-6 top-12 bottom-0 w-px bg-gray-200" />
              )}

              {/* Icon */}
              <div className="relative z-10 flex-shrink-0 text-green-500">
                <FaCheckCircle className="text-2xl" />
              </div>
              <div>
                <h3>
                  <span className="font-bold">{item.user}</span> learned{" "}
                  <span className="font-bold">5</span> new words!
                </h3>
                <p className="text-gray-500">{formatRelativeTime(item.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserFeed;
