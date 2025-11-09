import "@mantine/core/styles.css";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router";
import Index from "./pages/Index";

function App() {
  return (
    <>
      <MantineProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" index element={<Index />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </>
  );
}

export default App;
