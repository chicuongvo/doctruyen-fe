interface CommentProps {
  username: string;
  content: string;
}

export default function Comment({ username, content }: CommentProps) {
  return (
    <div className="bg-black p-3 rounded-lg inline-block max-w-fit dark:bg-white">
      <span className="text-secondary font-bold">{username}: </span>
      <p className="text-white inline dark:text-black">{content}</p>
    </div>
  );
}
