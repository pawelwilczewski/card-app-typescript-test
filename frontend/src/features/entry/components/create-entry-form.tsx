import { Entry } from "@/features/entry/types/entry";
import PrimitiveButton from "@/features/shared/components/primitive-button";
import { ChangeEvent, useContext, useState } from "react";
import { EntryContext } from "../context/entry-context";

type CreateEntryFormProps = {
  onSubmitted: () => void;
};

const CreateEntryForm: React.FC<CreateEntryFormProps> = ({ onSubmitted }) => {
  const emptyEntry: Entry = { title: "", description: "", created_at: new Date(), scheduled_at: undefined };
  const { saveEntry } = useContext(EntryContext)!;
  const [newEntry, setNewEntry] = useState<Entry>(emptyEntry);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setNewEntry({
      ...newEntry,
      [event.target.name]: event.target.value,
    });
  };

  const handleSend = (): void => {
    saveEntry(newEntry);
    setNewEntry(emptyEntry);
  };

  return (
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
          newEntry.scheduled_at == null ? undefined : new Date(newEntry.scheduled_at ?? "").toISOString().split("T")[0]
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
        Create
      </PrimitiveButton>
    </section>
  );
};

export default CreateEntryForm;
