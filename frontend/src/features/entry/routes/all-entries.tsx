import EntryView from "@/features/entry/components/entry-view";
import PrimitiveButton from "@/features/shared/components/primitive-button";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { EntryContext } from "../context/entry-context";
import { Entry } from "../types/entry";

export default function AllEntries(): JSX.Element {
  const { entries } = useContext(EntryContext)!;
  if (entries.length === 0) {
    return (
      <section className="container">
        <h1 className="text-center font-semibold text-2xl m-5">You don&apos;t have any card</h1>
        <p className="text-center font-medium text-md">
          Let&apos;s{" "}
          <Link className="text-primary underline underline-offset-1" to="/create">
            Create One
          </Link>
        </p>
      </section>
    );
  }
  return (
    <>
      <section className="container">
        <NavLink to="/create" className="block w-fit ml-auto">
          <PrimitiveButton size="large">New Entry</PrimitiveButton>
        </NavLink>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {entries.map((entry: Entry) => (
            <EntryView entry={entry} key={entry.id} />
          ))}
        </div>
      </section>
    </>
  );
}
