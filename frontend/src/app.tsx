import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { EntryProvider } from "./features/entry/context/entry-context";
import AllEntries from "./features/entry/routes/all-entries";
import EditEntry from "./features/entry/routes/edit-entry";
import NewEntry from "./features/entry/routes/new-entry";
import NavBar from "./features/shared/components/nav-bar";

export default function App() {
  return (
    <section>
      <Router>
        <EntryProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<AllEntries />}></Route>
            <Route path="create" element={<NewEntry />}></Route>
            <Route path="edit/:id" element={<EditEntry />}></Route>
          </Routes>
        </EntryProvider>
      </Router>
    </section>
  );
}
