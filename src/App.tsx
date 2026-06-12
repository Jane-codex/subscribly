import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/Login";
import SignupPage from "@/pages/Signup";
import SelectAccountType from "@/pages/SelectAccountType";
import SubscriptionLinkPage from "./pages/SubscriptionLinkPage";
import SupportPage from "./pages/Support";
import Layout from "./components/Layout";
import type { AppNotification } from "./components/Layout";
import SettingsPage from "./pages/Settings";
import SubscriptionsPage from "./pages/Subscriptions";
import SubscriptionDetail from "./pages/SubscriptionDetail";
import { JoinByLink } from "./pages/JoinByLink";
import { SubscriptionCatalog } from "./pages/SubscriptionCatalog";
import ProviderAuthPage from "./pages/ProviderAuthPage";
import ProviderSignupPage from "./pages/ProviderSignup";
import ProviderOnboarding from "./pages/ProviderOnboarding";
import ProviderSubscriptions from "./pages/ProviderSubscriptions";
import ProviderDashboard from "./pages/ProviderDashboard";
import SubscriptionBreakdown from "./pages/SubscriptionBreakdown";
import DashboardSwitchboard from "./pages/Dashboard"; 
import TransactionsDashboard from "./pages/TransactionsDashboard";
import ProviderSetting from "./pages/ProviderSetting";


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('userToken'); 
 

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() { 
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('currentUser') || "";
  });
  
  const [notifications, setNotifications] = useState<AppNotification[]>([]); 
  const [hasUnread, setHasUnread] = useState(false);

  
 const [globalProfilePic, setGlobalProfilePic] = useState<string>(() => {
    return localStorage.getItem("provider_profile_pic") || "";
  });

  const saveProfilePic = (base64String: string) => {
    setGlobalProfilePic(base64String);
    localStorage.setItem("provider_profile_pic", base64String);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* PUBLIC / AUTH ROUTES */}
        <Route path="/login" element={<LoginPage setUserName={setUserName} />} />
        <Route path="/signup" element={<SignupPage setUserName={setUserName} />} />
        
        <Route path="/select-type" element={<SelectAccountType />} />

        <Route path="/provider-login" element={<ProviderAuthPage />} />
        <Route path="/provider-signup" element={<ProviderSignupPage />} />
        
        <Route path="/provider-onboarding" element={<ProviderOnboarding />} />

        {/* PROTECTED ROUTES */}
        <Route 
          element={
            <ProtectedRoute>
              <Layout
                userName={userName}
                setUserName={setUserName} 
                notifications={notifications} 
                hasUnread={hasUnread} 
                setHasUnread={setHasUnread} 
                setNotifications={setNotifications} 
              />
            </ProtectedRoute>
          }
        >
        
    <Route path="/dashboard">
  <Route 
    index 
    element={
      <DashboardSwitchboard 
        profilePic={globalProfilePic} 
        setProfilePic={saveProfilePic} 
      />
    } 
  />
  <Route 
    path="provider/subscriber/:id" 
    element={
      <ProviderDashboard 
        profilePic={globalProfilePic} 
        setProfilePic={saveProfilePic} 
      />
    } 
  />
</Route>


{/* Subscriptions Dashboard Page */}
<Route 
  path="/provider/subscriptions" 
  element={<ProviderSubscriptions userName={userName} />} 
/>
         <Route 
  path="/provider/subscriptions/plan/linear-basic" 
  element={<SubscriptionBreakdown />} 
/>
<Route path="/provider/transactions" element={<TransactionsDashboard />} />
<Route path="/provider/settings" element={<ProviderSetting />} />
          
          {/* Subscription Routes */}
          <Route path="/subscription-link" element={<SubscriptionLinkPage />} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
          <Route path="/subscription/:id" element={<SubscriptionDetail />} />
          <Route path="/subscription/join" element={<JoinByLink />} />
          <Route path="/subscription/catalog" element={<SubscriptionCatalog />} />
          
          {/* App Support & User Settings */}
          <Route path="/support" element={<SupportPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;