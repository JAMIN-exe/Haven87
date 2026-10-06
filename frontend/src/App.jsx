import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Opportunities from "./pages/Opportunities";
import OpportunityDetail from "./pages/OpportunityDetail";
import NotFound from "./pages/NotFound";
import About from "./pages/About";

import VolunteerDashboard from "./pages/volunteer/VolunteerDashboard";
import OrganizerDashboard from "./pages/organizer/OrganizerDashboard";
import MyOpportunities from "./pages/organizer/MyOpportunities";
import OpportunityForm from "./pages/organizer/OpportunityForm";
import Applicants from "./pages/organizer/Applicants";
import AdminOrganizations from "./pages/admin/AdminOrganizations";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="pt-16 flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/opportunities" element={<Opportunities />} />
              <Route path="/opportunities/:id" element={<OpportunityDetail />} />
              <Route path="/about" element={<About />} />

              <Route
                path="/volunteer/dashboard"
                element={
                  <ProtectedRoute roles={["volunteer"]}>
                    <VolunteerDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/organizer/dashboard"
                element={
                  <ProtectedRoute roles={["organizer"]}>
                    <OrganizerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizer/opportunities"
                element={
                  <ProtectedRoute roles={["organizer"]}>
                    <MyOpportunities />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizer/opportunities/new"
                element={
                  <ProtectedRoute roles={["organizer"]}>
                    <OpportunityForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizer/opportunities/:id/edit"
                element={
                  <ProtectedRoute roles={["organizer"]}>
                    <OpportunityForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizer/opportunities/:id/applicants"
                element={
                  <ProtectedRoute roles={["organizer"]}>
                    <Applicants />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin"
                element={
                  <ProtectedRoute roles={["admin"]}>
                    <AdminOrganizations />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;