import { Link, Outlet, useLocation, useParams } from "react-router-dom";

const NAVLINKS = [
  {
    text: "Stream",
    path: "/dashboard/stream/",
  },
  {
    text: "Assignments",
    path: "/dashboard/assignments/",
  },
  {
    text: "People",
    path: "/dashboard/people/",
  },
];

export default function ClassPageLayout() {
  const { class_id } = useParams();
  const { pathname } = useLocation();

  return (
    <section className="relative w-full">
      <nav className="sticky inset-x-0 top-[68px] flex border-b-2 bg-bgWhite px-7">
        {NAVLINKS.map((navLink, index) => (
          <Link key={index} to={navLink.path + class_id}>
            <p
              className={`px-7 py-4 transition hover:bg-slate-200 ${pathname.includes(navLink.path) && "border-b-2 border-b-blue-700 text-blue-700"}`}
            >
              {navLink.text}
            </p>
          </Link>
        ))}
      </nav>
      <div className="flex w-full items-center justify-center p-6">
        <Outlet />
      </div>
    </section>
  );
}
