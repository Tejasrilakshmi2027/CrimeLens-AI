import {
BrowserRouter,
Routes,
Route,
Navigate
} from "react-router-dom";

import { useAuth } from "./contexts/AuthContext";
import DashboardLayout from "./components/layout/DashboardLayout";

import UserDashboard from "./pages/UserDashboard";
import OfficerDashboard from "./pages/OfficerDashboard";
import Analytics from "./pages/Analytics";
import Chat from "./pages/Chat";
import Cases from "./pages/Cases";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Public Route Component (redirect if already authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Role-based Dashboard Component
const RoleBasedDashboard: React.FC = () => {
  const { user } = useAuth();
  
  if (user?.role === 'OFFICER') {
    return <OfficerDashboard />;
  }
  
  // Default to User Dashboard for regular users and admins
  return <UserDashboard />;
};

export default function AppRoutes(){

return(

<BrowserRouter>

<Routes>

{/* Public Routes */}
<Route
path="/login"
element={
  <PublicRoute>
    <Login />
  </PublicRoute>
}
/>

<Route
path="/register"
element={
  <PublicRoute>
    <Register />
  </PublicRoute>
}
/>

{/* Protected Routes */}
<Route
path="/"
element={
  <ProtectedRoute>
    <DashboardLayout>
      <RoleBasedDashboard/>
    </DashboardLayout>
  </ProtectedRoute>
}
/>

<Route
path="/analytics"
element={
  <ProtectedRoute>
    <DashboardLayout>
      <Analytics/>
    </DashboardLayout>
  </ProtectedRoute>
}
/>

<Route
path="/cases"
element={
  <ProtectedRoute>
    <DashboardLayout>
      <Cases/>
    </DashboardLayout>
  </ProtectedRoute>
}
/>

<Route
path="/chatbot"
element={
  <ProtectedRoute>
    <DashboardLayout>
      <Chat/>
    </DashboardLayout>
  </ProtectedRoute>
}
/>

<Route
path="/map"
element={
  <ProtectedRoute>
    <DashboardLayout>
      <Map/>
    </DashboardLayout>
  </ProtectedRoute>
}
/>

<Route
path="/settings"
element={
  <ProtectedRoute>
    <DashboardLayout>
      <Settings/>
    </DashboardLayout>
  </ProtectedRoute>
}
/>

<Route
path="/profile"
element={
  <ProtectedRoute>
    <DashboardLayout>
      <Profile/>
    </DashboardLayout>
  </ProtectedRoute>
}
/>

{/* Default redirect */}
<Route path="*" element={<Navigate to="/" replace />} />
</Routes>

</BrowserRouter>

);

}