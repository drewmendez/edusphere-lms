import { Link, useLocation } from "react-router-dom";

interface LayoutNavProps {
  navlinks: { text: string; path: string }[];
  id?: string;
}

export default function LayoutNav({ navlinks, id }: LayoutNavProps) {
  const { pathname } = useLocation();

  return (
    <nav className="sticky inset-x-0 top-[68px] flex border-b-2 bg-bgWhite px-7">
      {navlinks.map((navLink, index) => (
        <Link key={index} to={id ? navLink.path + id : navLink.path}>
          <p
            className={`px-7 py-4 transition hover:bg-slate-200 ${pathname.includes(navLink.path) && "border-b-2 border-b-blue-700 text-blue-700"}`}
          >
            {navLink.text}
          </p>
        </Link>
      ))}
    </nav>
  );
}
