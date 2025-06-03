import { useLocation, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
function getPaginationRange(current: number, total: number) {
  const delta = 2;
  const range: (number | "...")[] = [];

  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  range.push(1);
  if (left > 2) range.push("...");

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < total - 1) range.push("...");
  if (total > 1) range.push(total);

  return range;
}
function PageLink({
  page,
  label,
  active = false,
}: {
  page: number | "...";
  label: string;
  active: boolean;
}) {
  const [params] = useSearchParams();

  const copyParams = new URLSearchParams(params);
  const pathname = useLocation().pathname;
  copyParams.set("page", String(page));

  if (page === "...") {
    return (
      <p className="p-2 bg-zinc-700 rounded-full w-[50px] h-[50px] flex items-center justify-center">
        {label}
      </p>
    );
  }
  return (
    <Link to={`${pathname}?${copyParams.toString()}`}>
      <p
        className={`${active ? "text-primary" : ""} p-2 bg-zinc-700 rounded-full w-[50px] h-[50px] flex items-center justify-center`}
      >
        {label}
      </p>
    </Link>
  );
}
export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const range = getPaginationRange(currentPage, totalPages);

  return (
    <div className="pagination flex justify-center gap-4">
      {range &&
        range.map((page, index) => (
          <PageLink
            key={index}
            page={page}
            label={typeof page === "number" ? String(page) : page}
            active={currentPage === page}
          />
        ))}
    </div>
  );
}
