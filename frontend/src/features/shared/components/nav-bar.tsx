import { NavLink } from "react-router-dom";

export default function NavBar(): JSX.Element {
  return (
    <nav className="flex justify-center gap-5">
      <NavLink className="m-3 p-4 text-xl bg-primary rounded-md font-medium" to={"/"}>
        All Entries
      </NavLink>
      <NavLink className="m-3 p-4 text-xl bg-primary rounded-md font-medium" to={"/create"}>
        New Entry
      </NavLink>
    </nav>
  );
}
