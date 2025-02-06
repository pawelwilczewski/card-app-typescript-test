import PrimitiveButton from "@/features/shared/components/primitive-button";
import { useContext } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { EntryContext } from "../context/entry-context";
import { Entry } from "../types/entry";

type EntryViewProps = {
  entry: Entry;
};

const EntryView: React.FC<EntryViewProps> = ({ entry }) => {
  const { deleteEntry } = useContext(EntryContext)!;
  const navigate = useNavigate();

  return (
    <div className="bg-card text-card-foreground m-3 p-4 rounded flex flex-col justify-between">
      <h1 className="font-bold text-lg break-words overflow-auto">{entry.title}</h1>
      <p className="text-center text-lg font-light md:mt-2 md:mb-4 mt-1 mb-3">{entry.description}</p>
      <div className="flex justify-between flex-wrap gap-2">
        <time className="block self-end">{new Date(entry.created_at.toString()).toLocaleDateString()}</time>
        <div className="flex justify-center ml-auto">
          <PrimitiveButton
            variant="ghost"
            size="small"
            className="!text-card-foreground hover:bg-card-foreground hover:!text-primary-foreground"
            onClick={() => {
              navigate(`/edit/${entry.id}`, { replace: true });
            }}
          >
            <BiPencil size="1.5rem" />
          </PrimitiveButton>
          <PrimitiveButton
            variant="ghost"
            size="small"
            className="!text-card-foreground hover:bg-card-foreground hover:!text-primary-foreground"
            onClick={() => {
              deleteEntry(entry.id as string);
            }}
          >
            <BiTrash size="1.5rem" />
          </PrimitiveButton>
        </div>
      </div>
    </div>
  );
};

export default EntryView;
