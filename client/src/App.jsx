import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PageTransition from "./components/PageTransition";
import ProtectedRoute from "./components/ProtectedRoute";
import { ROUTES } from "./utils/constants";

import Home from "./pages/Home";
import Awareness from "./pages/Awareness";
import Conditions from "./pages/Conditions";
import Chatbot from "./pages/Chatbot";
import Support from "./pages/Support";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path={ROUTES.home}
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path={ROUTES.awareness}
          element={
            <PageTransition>
              <Awareness />
            </PageTransition>
          }
        />
        <Route
          path={ROUTES.conditions}
          element={
            <PageTransition>
              <Conditions />
            </PageTransition>
          }
        />
        <Route
          path={ROUTES.chatbot}
          element={
            <PageTransition>
              <Chatbot />
            </PageTransition>
          }
        />
        <Route
          path={ROUTES.support}
          element={
            <PageTransition>
              <Support />
            </PageTransition>
          }
        />
        <Route
          path={ROUTES.login}
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />
        <Route
          path={ROUTES.register}
          element={
            <PageTransition>
              <Register />
            </PageTransition>
          }
        />
        <Route
          path={ROUTES.dashboard}
          element={
            <ProtectedRoute>
              <PageTransition>
                <Dashboard />
              </PageTransition>
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
