import PrimitiveButton from "@/features/shared/components/primitive-button";
import { dateOnlyToString } from "@/features/shared/utils/formatting/date-formatter";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { EntryContext } from "../context/entry-context";
import { Entry } from "../types/entry";

type EditEntryFormProps = {
  entryId: string;
  onSubmitted: () => void;
};

const UpdateEntryForm: React.FC<EditEntryFormProps> = ({ entryId, onSubmitted }) => {
  const emptyEntry: Entry = { title: "", description: "", created_at: new Date() };

  const { updateEntry, entries } = useContext(EntryContext)!;
  const [newEntry, setNewEntry] = useState<Entry>(emptyEntry);

  useEffect(() => {
    const entry = entries.find((entry) => entry.id == entryId)!;
    setNewEntry(entry);
  }, [entries, entryId]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setNewEntry({
      ...newEntry,
      [event.target.name]: event.target.value,
    });
  };

  const handleSend = (): void => {
    updateEntry(entryId as string, newEntry);
  };

  return (
    newEntry && (
      <section className="flex justify-center flex-col w-fit ml-auto mr-auto gap-5 my-2 rounded-md">
        <div>
          <div className="font-medium mb-1">Title</div>
          <input type="text" placeholder="Title" name="title" value={newEntry.title} onChange={handleInputChange} />
        </div>

        <div>
          <div className="font-medium mb-1">Description</div>
          <textarea
            className="w-72"
            placeholder="Description"
            name="description"
            value={newEntry.description}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <div className="font-medium mb-1">Created on</div>
          <input
            type="date"
            name="created_at"
            value={dateOnlyToString(new Date(newEntry.created_at))}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <div className="font-medium mb-1">Scheduled on</div>
          <input
            type="date"
            name="scheduled_at"
            value={
              newEntry.scheduled_at == undefined ? undefined : dateOnlyToString(new Date(newEntry.scheduled_at ?? ""))
            }
            min={dateOnlyToString(new Date())}
            onChange={handleInputChange}
          />
        </div>

        <PrimitiveButton
          onClick={() => {
            handleSend();
            onSubmitted();
          }}
          className="bg-primary font-semibold p-3 rounded-md"
        >
          Update
        </PrimitiveButton>
      </section>
    )
  );
};

export default UpdateEntryForm;
