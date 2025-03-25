interface CommentProps {
  user: string;
  text: string;
}

export default function Comment({ user, text }: CommentProps) {
  return (
    <div className="bg-black p-3 rounded-lg inline-block max-w-fit ">
      <span className="text-primary font-bold">{user}: </span>
      <p className="text-white inline">{text}</p>
    </div>
  );
}
