import React from "react";
import NavBar from './features/shared/components/NavBar'
import AllEntries from './features/entry/routes/AllEntries'
import NewEntry from './features/entry/routes/NewEntry'
import EditEntry from './features/entry/routes/EditEntry'
import { EntryProvider } from './features/entry/context/EntryContext'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default function App() {
  return (
    <section>
  <Router>
    <EntryProvider>
    <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<AllEntries/>}>
        </Route>
        <Route path="create" element={<NewEntry/>}>
        </Route>
        <Route path="edit/:id" element={<EditEntry/>}>
        </Route>
      </Routes>
    </EntryProvider>
    </Router>
    </section>
  );
}
