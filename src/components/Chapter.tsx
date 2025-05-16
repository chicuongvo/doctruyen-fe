import { useNavigate } from "react-router-dom";

const Chapter = ({
  id,
  chapter,
}: {
  id: string | undefined;
  chapter: number;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/story/${id}/${chapter}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-black px-4 py-3 rounded-xl text-lg cursor-pointer transition duration-300 hover:text-primary"
    >
      Chapter {chapter}
    </div>
  );
};

export default Chapter;
