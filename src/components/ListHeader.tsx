import { Link } from "react-router-dom";
import ArrowIcon from "../assets/arrow-icon.svg";

export default function ListHeader({
  title,
  link,
}: {
  title: string;
  link: string;
}) {
  return (
    <div className="title font-semibold text-2xl flex justify-between mb-4 font-spartan">
      <h2 className="">{title}</h2>
      <Link to={link}>
        <div className="text-sm text-violet-600 cursor-pointer p-2 bg border border-violet-600 flex font-semibold items-center justify-between rounded relative">
          <span className="h-[22px]">See all</span>
          <img className="" src={ArrowIcon} alt="Mũi tên icon" />
        </div>
      </Link>
    </div>
  );
}
