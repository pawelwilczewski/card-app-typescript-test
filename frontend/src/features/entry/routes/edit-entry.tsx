import PrimitiveButton from "@/features/shared/components/primitive-button";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EntryContext } from "../context/entry-context";
import { Entry } from "../types/entry";

export default function EditEntry(): JSX.Element {
  const { id } = useParams();
  const emptyEntry: Entry = { title: "", description: "", created_at: new Date() };

  const { updateEntry, entries } = useContext(EntryContext)!;
  const [newEntry, setNewEntry] = useState<Entry>(emptyEntry);

  useEffect(() => {
    const entry = entries.find((entry) => entry.id == id)!;
    setNewEntry(entry);
  }, []);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setNewEntry({
      ...newEntry,
      [event.target.name]: event.target.value,
    });
  };
  const handleSend = (): void => {
    updateEntry(id as string, newEntry);
  };
  return (
    <section className="flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 p-8 rounded-md">
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
      <PrimitiveButton
        onClick={() => {
          handleSend();
        }}
        className="bg-primary font-semibold p-3 rounded-md"
      >
        Update
      </PrimitiveButton>
    </section>
  );
}
