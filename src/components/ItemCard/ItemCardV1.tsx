import { Link } from "react-router-dom";
import ImagePlaceholder from "../../assets/image-placeholder.svg";
export default function ItemCardV1({ story }: { story: any }) {
  return (
    <Link to={`/story/${story.story_id}`}>
      <div className="item-card-v1 flex gap-3 lg:border-1 lg:border-zinc-700 font-spartan rounded-xl p-3">
        <div className="w-[160px] max-md:w-[116px] flex-none h-[160px] md:h-[260px] bg-gray-900 rounded-lg">
          <img
            loading="lazy"
            alt="Ảnh bìa truyện"
            width="160"
            height="260"
            src={story.cover_image || ImagePlaceholder}
            className="w-full h-full rounded-lg object-cover"
          />
        </div>
        <div className="main-info font-spartan gap-2 flex flex-col">
          <div className="title-field font-semibold text-lg leading-5">
            <span className="line-clamp-1">{story.title}</span>
          </div>
          <div className="genre-field text-violet-500">
            <span>
              {story.story_genres?.length > 0
                ? story.story_genres[0].genre.name
                : "Chưa xác định thể loại"}
            </span>
          </div>
          <div className="description-field grow text-gray-400">
            <span className=" line-clamp-3 text-sm">{story.description}</span>
          </div>
          <div className="flex justify-between text-sm items-center text-gray-400">
            <span className="whitespace-nowrap">{story.like_counts} loves</span>
            <span>{story.progress}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
