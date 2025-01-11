const LearnWordsScoreCard = ({ userMessage }: { userMessage: string }) => {
  return (
    <div className="border-solid border-2 p-4 mt-2">
      <div className="flex justify-center">
        <p>{userMessage}</p>
      </div>
    </div>
  );
};

export default LearnWordsScoreCard;
