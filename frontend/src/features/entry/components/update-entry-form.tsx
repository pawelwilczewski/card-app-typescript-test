import PrimitiveButton from "@/features/shared/components/primitive-button";
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
        <input
          className="p-3 rounded-md"
          type="text"
          placeholder="Title"
          name="title"
          value={newEntry.title}
          onChange={handleInputChange}
        />
        <textarea
          className="p-3 rounded-md"
          placeholder="Description"
          name="description"
          value={newEntry.description}
          onChange={handleInputChange}
        />
        <input
          className="p-3 rounded-md"
          type="date"
          name="created_at"
          value={new Date(newEntry.created_at).toISOString().split("T")[0]}
          onChange={handleInputChange}
        />
        <input
          className="p-3 rounded-md"
          type="date"
          name="scheduled_at"
          value={
            newEntry.scheduled_at == undefined
              ? undefined
              : new Date(newEntry.scheduled_at ?? "").toISOString().split("T")[0]
          }
          onChange={handleInputChange}
        />
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
