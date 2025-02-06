import { NavLink } from "react-router-dom";

export default function NavBar(): JSX.Element {
  return (
    <nav className="mx-auto my-5">
      <NavLink to="/" className="text-5xl">
        <span className="italic font-cookie">the&nbsp;</span>
        <span className="font-xanh">CARD</span>
        <span className="italic font-cookie">&nbsp;app</span>
      </NavLink>
    </nav>
  );
}
