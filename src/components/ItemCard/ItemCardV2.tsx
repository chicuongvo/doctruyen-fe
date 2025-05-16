export default function ItemCardV2(props: { showTags: boolean; story: any }) {
  const { showTags, story } = props;

  return (
    <div className="item-card-v2 flex-none w-[116px] md:w-[186px]">
      <div className="relative">
        <a href={`story/${story.story_id}`}>
          <img
            className="object-cover object-center rounded-lg w-full w-[116px] md:w-[186px] h-[160px] md:h-[260px]"
            src={story.cover_image}
            alt="Ảnh truyện tranh"
          />
        </a>
        {showTags && (
          <div className="text-xs absolute top-4 left-0 gap-2 flex flex-col">
            <span className="p-1 bg-[#325E3E] rounded-r w-fit">
              {story.progress}
            </span>
          </div>
        )}
      </div>
      <div className="">
        <a className="font-semibold">
          <span className="line-clamp-2 min-h-[3rem]">{story.title}</span>
        </a>
        <span className="text-sm">{story.like_counts} loves</span>
      </div>
    </div>
  );
}
