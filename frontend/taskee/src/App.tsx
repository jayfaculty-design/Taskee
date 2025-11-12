import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router";
import Index from "./pages/Index";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import { AuthProvider } from "./contexts/AuthContext";
import { TaskProvider } from "./contexts/TasksContext";

function App() {
  return (
    <>
      <MantineProvider>
        <Notifications />
        <AuthProvider>
          <TaskProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" index element={<Index />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route path="/login" index element={<Login />} />
                <Route path="/register" index element={<Register />} />
              </Routes>
            </BrowserRouter>
          </TaskProvider>
        </AuthProvider>
      </MantineProvider>
    </>
  );
}

export default App;
