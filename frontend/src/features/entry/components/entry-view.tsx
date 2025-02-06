import UpdateEntryForm from "@/features/entry/components/update-entry-form";
import Dialog from "@/features/shared/components/dialog";
import PrimitiveButton from "@/features/shared/components/primitive-button";
import { useContext, useEffect, useRef, useState } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";
import { EntryContext } from "../context/entry-context";
import { Entry } from "../types/entry";

type EntryViewProps = {
  entryId: string;
};

const EntryView: React.FC<EntryViewProps> = ({ entryId }) => {
  const { entries, deleteEntry } = useContext(EntryContext)!;
  const [entry, setEntry] = useState<Entry | null>(null);
  const updateDialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    setEntry(entries.find((entry) => entry.id == entryId)!);
  }, [entries, entryId]);

  return (
    entry && (
      <div className="bg-card text-card-foreground m-3 p-4 rounded flex flex-col justify-between">
        <h1 className="font-bold text-lg break-words overflow-auto">{entry.title}</h1>
        <p className="text-lg font-light md:mt-2 md:mb-4 mt-1 mb-3 whitespace-pre">{entry.description}</p>
        <section>
          {entry.scheduled_at && (
            <>
              <span className="font-medium">
                Due: <time>{new Date(entry.scheduled_at!.toString()).toLocaleDateString()}</time>
              </span>
            </>
          )}
          <div className="flex justify-between flex-wrap gap-2">
            <time className="block self-end">{new Date(entry.created_at.toString()).toLocaleDateString()}</time>
            <div className="flex justify-center ml-auto">
              <Dialog
                ref={updateDialogRef}
                title="Update Card"
                trigger={
                  <PrimitiveButton
                    variant="ghost"
                    size="small"
                    className="!text-card-foreground hover:bg-card-foreground hover:!text-primary-foreground"
                  >
                    <BiPencil size="1.5rem" />
                  </PrimitiveButton>
                }
              >
                <UpdateEntryForm entryId={entry.id!} onSubmitted={() => updateDialogRef.current?.close()} />
              </Dialog>
              <PrimitiveButton
                variant="ghost"
                size="small"
                className="!text-card-foreground hover:!bg-destructive hover:!text-destructive-foreground"
                onClick={() => {
                  deleteEntry(entry.id as string);
                }}
              >
                <BiTrash size="1.5rem" />
              </PrimitiveButton>
            </div>
          </div>
        </section>
      </div>
    )
  );
};

export default EntryView;
