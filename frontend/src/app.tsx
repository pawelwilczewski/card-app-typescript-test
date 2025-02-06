import { EntryProvider } from "@/features/entry/context/entry-context";
import AllEntries from "@/features/entry/routes/all-entries";
import EditEntry from "@/features/entry/routes/edit-entry";
import Footer from "@/features/shared/components/footer";
import NavBar from "@/features/shared/components/nav-bar";
import { ThemeProvider } from "@/features/theme/context/theme-context";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

export default function App(): JSX.Element {
  return (
    <Router>
      <EntryProvider>
        <ThemeProvider>
          <div className="grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
            <NavBar />
            <main>
              <Routes>
                <Route path="/" element={<AllEntries />}></Route>
                <Route path="edit/:id" element={<EditEntry />}></Route>
              </Routes>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </EntryProvider>
    </Router>
  );
}
