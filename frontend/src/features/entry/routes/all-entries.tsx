import CreateEntryForm from "@/features/entry/components/create-entry-form";
import EntryView from "@/features/entry/components/entry-view";
import Dialog from "@/features/shared/components/dialog";
import PrimitiveButton from "@/features/shared/components/primitive-button";
import { useContext, useRef } from "react";
import { BiPlus } from "react-icons/bi";
import { EntryContext } from "../context/entry-context";
import { Entry } from "../types/entry";

export default function AllEntries(): JSX.Element {
  const { entries } = useContext(EntryContext)!;

  const createDialogRef = useRef<HTMLDialogElement>(null);

  const handleSubmitted: () => void = () => {
    createDialogRef.current?.close();
  };

  if (entries.length === 0) {
    return (
      <section className="container">
        <h1 className="text-center font-semibold text-2xl m-5">You don&apos;t have any cards yet...</h1>
        <Dialog
          ref={createDialogRef}
          title="Create Card"
          trigger={
            <PrimitiveButton size="large" className="!block mx-auto" aria-label="Create new card">
              Let&apos;s create one!
            </PrimitiveButton>
          }
        >
          <CreateEntryForm onSubmitted={handleSubmitted} />
        </Dialog>
      </section>
    );
  }

  return (
    <>
      <section className="container relative">
        <Dialog
          ref={createDialogRef}
          title="Create Card"
          trigger={
            <PrimitiveButton
              size="small"
              className="fixed bottom-20 right-12 z-50 shadow-xl aspect-square rounded-full"
              aria-label="Create new card"
            >
              <BiPlus size="4rem" />
            </PrimitiveButton>
          }
        >
          <CreateEntryForm onSubmitted={handleSubmitted} />
        </Dialog>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {entries.map((entry: Entry) => (
            <EntryView entryId={entry.id!} key={entry.id} />
          ))}
        </div>
      </section>
    </>
  );
}
