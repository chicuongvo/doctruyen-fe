export default function ItemCardV2() {
  return (
    <div className="">
      <div className="relative">
        <a href="/">
          <img
            className="object-cover object-center rounded-lg lg:w-[186px] lg:h-[260px] sm:w-[116px] lg:h-[162px]"
            src="https://fictionme.net/_ipx/f_webp&q_80&s_372x520/https://d1januq98nfr6g.cloudfront.net/production/books/6688/op_R7AArMFk3gYSQjheLB3AgBG43S7qDrSOhrsiErui.jpeg"
          />
        </a>
        <div className="flex flex-col text-xs absolute top-4 left-0 gap-2">
          <span className="p-1 bg-[#325E3E] rounded-r inline-block">
            Completed
          </span>
          <span className="p-1 bg-[#6415BE] rounded-r">Recommended</span>
        </div>
      </div>
      <div className="flex flex-col">
        <a className="font-semibold">
          {" "}
          <span>The Viking's Mate Hunt</span>
        </a>
        <span>216.9K views</span>
      </div>
    </div>
  );
}
