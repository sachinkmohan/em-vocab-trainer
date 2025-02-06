const CreditContributors = () => {
  const contributors = [
    {
      name: "Sachin",
      status: "Actively Contributing",
      contact: "@easymalayalam",
      year: "2024-now",
    },
    {
      name: "Favas",
      status: "Actively Contributing",
      contact: "@favaskb",
      year: "2024-now",
    },
    {
      name: "Femy",
      status: "Part of the Journey",
      contact: "@femybabufemy",
      year: "2024-now",
    },
    {
      name: "Jismi",
      status: "Part of the Journey",
      contact: "-",
      year: "2024-now",
    },
    {
      name: "Akshara",
      status: "Part of the Journey",
      contact: "-",
      year: "2024-now",
    },
    {
      name: "Anna",
      status: "Part of the Journey",
      contact: "-",
      year: "2024-now",
    },
    {
      name: "Anne",
      status: "Part of the Journey",
      contact: "-",
      year: "2024-now",
    },
    {
      name: "Anugraha",
      status: "Part of the Journey",
      contact: "-",
      year: "2024-now",
    },
    {
      name: "Chippy",
      status: "Part of the Journey",
      contact: "-",
      year: "2024-now",
    },
    {
      name: "Arathy",
      status: "Part of the Journey",
      contact: "-",
      year: "2024-now",
    },
    {
      name: "Nithin",
      status: "Part of the Journey",
      contact: "-",
      year: "2024-now",
    },
    {
      name: "Sayooj",
      status: "Part of the Journey",
      contact: "-",
      year: "2024-now",
    },
  ];
  return (
    <div>
      {" "}
      <table className="table-auto min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Status</th>
            <th className="py-2 px-4 border-b text-left">Year</th>
            <th className="py-2 px-4 border-b text-left">Contact</th>
          </tr>
        </thead>
        <tbody>
          {contributors.map((contributor, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{contributor.name}</td>
              <td className="py-2 px-4 border-b">{contributor.status}</td>
              <td className="py-2 px-4 border-b">{contributor.year}</td>
              <td className="py-2 px-4 border-b">{contributor.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreditContributors;
