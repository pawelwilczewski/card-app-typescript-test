import { NavLink } from "react-router-dom";

export default function NavBar(): JSX.Element {
  return (
    <nav className="container flex justify-between gap-5">
      <NavLink to="/" className="text-5xl font-serif">
        <span className="italic">the</span>&nbsp;CARD&nbsp;<span className="italic">app</span>
      </NavLink>
      <div className="flex gap-5">
        <NavLink className="m-3 p-4 text-xl bg-primary rounded-md font-medium" to={"/"}>
          All Entries
        </NavLink>
        <NavLink className="m-3 p-4 text-xl bg-primary rounded-md font-medium" to={"/create"}>
          New Entry
        </NavLink>
      </div>
    </nav>
  );
}
