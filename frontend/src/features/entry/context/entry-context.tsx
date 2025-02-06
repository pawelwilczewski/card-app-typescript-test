import { Entry } from "@/features/entry/types/entry";
import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";

export const EntryContext = createContext<{
  entries: Entry[];
  saveEntry: (entry: Entry) => void;
  updateEntry: (id: string, entryData: Entry) => void;
  deleteEntry: (id: string) => void;
} | null>(null);

export const EntryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const initState = async (): Promise<void> => {
      const data = await axios.get<Entry[]>("http://localhost:3001/get/");
      const initialStateBody = data.data;
      setEntries(initialStateBody);
    };

    initState();
  }, []);

  const saveEntry = async (entry: Entry): Promise<void> => {
    const requestData = await axios.post<Entry>("http://localhost:3001/create/", entry);
    const newEntry = requestData.data;
    setEntries([...entries, newEntry]);
  };

  const updateEntry = async (id: string, entry: Entry): Promise<void> => {
    await axios.put<Entry>(`http://localhost:3001/update/${id}`, entry);
    setEntries((entries) => {
      const entryIndex = entries.findIndex((obj) => obj.id == id);
      entries[entryIndex] = entry;
      console.log(entries);
      return entries;
    });
  };

  const deleteEntry = async (id: string): Promise<void> => {
    await axios.delete<Entry>(`http://localhost:3001/delete/${id}`);
    setEntries((e) => e.filter((entry) => entry.id != id));
  };

  return (
    <EntryContext.Provider value={{ entries, saveEntry, updateEntry, deleteEntry }}>{children}</EntryContext.Provider>
  );
};
