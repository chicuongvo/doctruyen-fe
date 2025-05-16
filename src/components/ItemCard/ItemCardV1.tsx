export default function ItemCardV1({ story }: { story: any }) {
  return (
    <div className="item-card-v1 w-fit flex gap-3 lg:border-1 lg:border-gray-200 rounded-xl p-3">
      <div className="w-[160px] max-md:w-[116px] flex-none">
        <img
          src={story.cover_image}
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
      <div className="main-info font-spartan gap-2 flex flex-col">
        <div className="title-field font-semibold text-lg leading-5">
          <span className="line-clamp-1">{story.title}</span>
        </div>
        <div className="genre-field text-primary">
          <span>
            {story.story_genres.length > 0
              ? story.story_genres[0].name
              : "Chưa xác định thể loại"}
          </span>
        </div>
        <div className="description-field grow">
          <span className=" line-clamp-3 text-sm">{story.description}</span>
        </div>
        <div className="flex justify-between text-sm items-center">
          <span className="whitespace-nowrap">{story.like_counts} loves</span>
          <span>{story.progress}</span>
        </div>
      </div>
    </div>
  );
}
