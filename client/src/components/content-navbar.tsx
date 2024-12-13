import { Link, useLocation } from "react-router-dom";

interface ContentNavbarProps {
  navlinks: { text: string; path: string; page: string }[];
  id?: string;
}

export default function ContentNavbar({ navlinks, id }: ContentNavbarProps) {
  const { pathname } = useLocation();

  return (
    <>
      {navlinks.map((navLink, index) => (
        <Link key={index} to={id ? navLink.path + id : navLink.path}>
          <p
            className={`px-7 py-4 transition hover:bg-muted ${pathname.includes(navLink.page) && "border-b-2 border-b-primary text-primary"}`}
          >
            {navLink.text}
          </p>
        </Link>
      ))}
    </>
  );
}
