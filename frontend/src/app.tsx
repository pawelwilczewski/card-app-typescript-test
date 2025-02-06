import { EntryProvider } from "@/features/entry/context/entry-context";
import AllEntries from "@/features/entry/routes/all-entries";
import EditEntry from "@/features/entry/routes/edit-entry";
import NewEntry from "@/features/entry/routes/new-entry";
import NavBar from "@/features/shared/components/nav-bar";
import { ThemeProvider } from "@/features/theme/context/theme-context";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

export default function App(): JSX.Element {
  return (
    <div>
      <Router>
        <EntryProvider>
          <ThemeProvider>
            <NavBar />
            <Routes>
              <Route path="/" element={<AllEntries />}></Route>
              <Route path="create" element={<NewEntry />}></Route>
              <Route path="edit/:id" element={<EditEntry />}></Route>
            </Routes>
          </ThemeProvider>
        </EntryProvider>
      </Router>
    </div>
  );
}
