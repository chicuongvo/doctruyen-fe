type TagProps = {
  label: string;
};

const Tag = ({ label }: TagProps) => {
  return (
    <span className="h-8 inline-block text-gray-900 py-1 px-3 rounded-full bg-purple-50 hover:bg-purple-100 font-light dark:bg-zinc-700 dark:text-gray-300 dark:hover:dark:bg-zinc-600 leading-tight">
      {label}
    </span>
  );
};

export default Tag;
