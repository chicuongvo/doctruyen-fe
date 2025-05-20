import { Link } from "react-router-dom";
import ImagePlaceholder from "../../assets/image-placeholder.svg";
export default function ItemCardV2(props: { showTags: boolean; story: any }) {
  const { showTags, story } = props;

  return (
    <Link to={`/story/${story.story_id}`}>
      <div className="item-card-v2 rounded-lg font-spartan flex-none w-[116px] md:w-[186px]">
        <div className="relative h-[160px] md:h-[260px] bg-gray-900 rounded-lg overflow-hidden">
          <a href={`story/${story.story_id}`}>
            <img
              className="object-cover object-center rounded-lg w-full w-[116px] md:w-[186px] h-[160px] md:h-[260px]"
              src={story.cover_image || ImagePlaceholder}
              alt="Ảnh bìa truyện tranh"
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
    </Link>
  );
}
