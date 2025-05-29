import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/">
      <div className="flex items-center ">
        <svg
          className="!text-gray-950 dark:!text-white"
          width="40"
          height="40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.176 24.381V14.043C15.176 8.496 10.679 4 5.133 4v10.34c0 5.547 4.496 10.041 10.043 10.041Zm2.292 4.753v-7.142a9.016 9.016 0 0 1 9.015-9.016v7.142a9.016 9.016 0 0 1-9.015 9.016ZM21.665 4.98a3.409 3.409 0 1 1-1.578 6.633 3.409 3.409 0 0 1 1.578-6.633Z"
            fill="#8019F8"
          ></path>
        </svg>
        <div className="text-[#EFF2F5] text-[20px]">DocTruyen</div>
      </div>
    </Link>
  );
}
