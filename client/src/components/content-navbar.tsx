import { Link, useLocation } from "react-router-dom";

interface ContentNavbarProps {
  navlinks: { text: string; path: string }[];
  id?: string;
}

export default function ContentNavbar({ navlinks, id }: ContentNavbarProps) {
  const { pathname } = useLocation();

  return (
    <>
      {navlinks.map((navLink, index) => (
        <Link key={index} to={id ? navLink.path + id : navLink.path}>
          <p
            className={`px-7 py-4 transition hover:bg-slate-200 ${pathname.includes(navLink.path) && "border-b-2 border-b-blue-700 text-blue-700"}`}
          >
            {navLink.text}
          </p>
        </Link>
      ))}
    </>
  );
}
