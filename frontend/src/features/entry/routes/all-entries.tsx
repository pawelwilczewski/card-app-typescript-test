import PrimitiveButton from "@/features/shared/components/primitive-button";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EntryContext } from "../context/entry-context";
import { Entry } from "../types/entry";

export default function AllEntries(): JSX.Element {
  const { entries, deleteEntry } = useContext(EntryContext)!;
  const navigate = useNavigate();
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
    <section className="container grid grid-cols-2 md:grid-cols-4">
      {entries.map((entry: Entry, index: number) => {
        return (
          <div
            id={entry.id}
            key={index}
            className="bg-card text-card-foreground m-3 p-4 rounded flex flex-col justify-between"
          >
            <h1 className="font-bold text-sm md:text-lg">{entry.title}</h1>
            <p className="text-center text-lg font-light md:mt-2 md:mb-4 mt-1 mb-3">{entry.description}</p>
            <section className="flex items-center justify-between flex-col md:flex-row pt-2 md:pt-0">
              <div className="flex justify-center">
                <PrimitiveButton
                  onClick={() => {
                    deleteEntry(entry.id as string);
                  }}
                >
                  ✖
                </PrimitiveButton>
                <PrimitiveButton
                  onClick={() => {
                    navigate(`/edit/${entry.id}`, { replace: true });
                  }}
                >
                  🖊
                </PrimitiveButton>
              </div>
              <time className="text-right text-sm md:text-lg">
                {new Date(entry.created_at.toString()).toLocaleDateString()}
              </time>
            </section>
          </div>
        );
      })}
    </section>
  );
}
