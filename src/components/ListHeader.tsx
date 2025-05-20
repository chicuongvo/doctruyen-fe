import ArrowIcon from "../assets/arrow-icon.svg";

export default function ListHeader({ title }: { title: string }) {
  return (
    <div className="title font-semibold text-2xl flex justify-between mb-4 font-spartan">
      <span className="">{title}</span>
      <div className="">
        <a className="text-sm text-violet-600 cursor-pointer p-2 bg border border-violet-600 flex font-semibold items-center justify-between rounded relative">
          <span className="h-[22px]">See all</span>
          <img className="" src={ArrowIcon} />
        </a>
      </div>
    </div>
  );
}
