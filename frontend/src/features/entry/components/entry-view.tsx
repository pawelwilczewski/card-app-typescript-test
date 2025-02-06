import PrimitiveButton from "@/features/shared/components/primitive-button";
import { useContext } from "react";
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
      <h1 className="font-bold text-sm md:text-lg">{entry.title}</h1>
      <p className="text-center text-lg font-light md:mt-2 md:mb-4 mt-1 mb-3">{entry.description}</p>
      <div className="flex items-center justify-between flex-col md:flex-row pt-2 md:pt-0">
        <div className="flex justify-center">
          <PrimitiveButton
            variant="ghost"
            onClick={() => {
              deleteEntry(entry.id as string);
            }}
          >
            ✖
          </PrimitiveButton>
          <PrimitiveButton
            variant="ghost"
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
      </div>
    </div>
  );
};

export default EntryView;
