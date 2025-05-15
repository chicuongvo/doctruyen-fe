interface CommentProps {
  user_id: string;
  content: string;
}

export default function Comment({ user_id, content }: CommentProps) {
  return (
    <div className="bg-black p-3 rounded-lg inline-block max-w-fit ">
      <span className="text-primary font-bold">{user_id}: </span>
      <p className="text-white inline">{content}</p>
    </div>
  );
}
