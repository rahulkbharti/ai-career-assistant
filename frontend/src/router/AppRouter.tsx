import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/ui/layout/Layout";

import Dashboard from "../pages/Dashboard/Dashboard";
import JobAnalysis from "../pages/JobAnalysis/JobAnalysis";
import JobTracker from "../pages/JobTracker/JobTracker";
import Profile from "../pages/Profile/Profile";
import Onboarding from "../pages/Onboarding/Onboarding";
import NotFound from "../pages/NotFound/NotFound";

// This would typically come from your authentication context
const isOnboardingComplete: Boolean = true; // Change to true after testing

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Redirect root to appropriate page based on onboarding status */}
      <Route
        path="/"
        element={
          isOnboardingComplete ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/onboarding" replace />
          )
        }
      />

      {/* Onboarding route (without layout) */}
      <Route path="/onboarding" element={<Onboarding />} />

      {/* Protected routes (with layout) */}
      <Route
        path="/*"
        element={
          isOnboardingComplete ? (
            <Layout>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="analyze" element={<JobAnalysis />} />
                <Route path="jobs" element={<JobTracker />} />
                <Route path="profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          ) : (
            <Navigate to="/onboarding" replace />
          )
        }
      />
    </Routes>
  );
};

export default AppRouter;
