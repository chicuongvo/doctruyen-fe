type TagProps = {
  label: string;
};

const Tag = ({ label }: TagProps) => {
  return (
    <span className="h-8 inline-block py-1 px-3 rounded-full font-light bg-[#3F3F46] text-zinc-100 hover:bg-zinc-600 leading-tight transition-colors">
      {label}
    </span>
  );
};

export default Tag;
