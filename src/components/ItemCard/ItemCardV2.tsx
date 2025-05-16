export default function ItemCardV2(props: { showTags: boolean }) {
  const { showTags } = props;

  return (
    <div className="item-card-v2 flex-none w-[116px] md:w-[186px] items-stretch font-spartan">
      <div className="relative">
        <a href="/">
          <img
            className="object-cover object-center rounded-lg w-full"
            src="https://fictionme.net/_ipx/f_webp&q_80&s_372x520/https://d1januq98nfr6g.cloudfront.net/production/books/6688/op_R7AArMFk3gYSQjheLB3AgBG43S7qDrSOhrsiErui.jpeg"
            width="186px"
            height="260px"
          />
        </a>
        {showTags && (
          <div className="text-xs absolute top-4 left-0 gap-2 flex flex-col">
            <span className="p-1 bg-[#325E3E] rounded-r w-fit">Completed</span>
            <span className="p-1 bg-[#6415BE] rounded-r w-fit">
              Recommended
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <a className="font-semibold">
          {" "}
          <span>The Viking's Mate Hunt</span>
        </a>
        <span className="text-sm">216.9K views</span>
      </div>
    </div>
  );
}
