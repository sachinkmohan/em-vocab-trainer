const HomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-lg space-y-4">
        <textarea
          className="w-full border  border-gray-300 rounded-md "
          rows="10"
        />
        <div className="flex justify-center">
          <button
            type="button"
            className=" bg-blue-500 hover:bg-blue-700 text-white rounded-md px-4 py-2 ml-4"
          >
            Add Words
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
