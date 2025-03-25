import { useNavigate } from "react-router-dom";

const Chapter = ({ storyId, number }: { storyId: string; number: number }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/story/${storyId}/${number}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-black px-4 py-3 rounded-xl text-lg cursor-pointer transition duration-300 hover:text-primary"
    >
      Chapter {number}
    </div>
  );
};

export default Chapter;
