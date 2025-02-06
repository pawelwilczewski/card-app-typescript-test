import NavBar from './features/shared/components/nav-bar'
import AllEntries from './features/entry/routes/all-entries'
import NewEntry from './features/entry/routes/new-entry'
import EditEntry from './features/entry/routes/edit-entry'
import { EntryProvider } from './features/entry/context/entry-context'
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
