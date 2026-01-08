import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Wallet from "./pages/Wallet";
import Settings from "./pages/Setting";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Dashboard from "./pages/Dashboard";
import Communities from "./pages/Communities";
import CommunityPage from "./pages/CommunityPage";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import AdminPage from "./pages/admin/AdminPage";
import UsersManagementPage from "./pages/admin/UsersManagementPage";
import PostModerationPage from "./pages/admin/PostModerationPage";
import CommunitiesManagementPage from "./pages/admin/CommunitiesManagementPage";
import AirdropPage from "./pages/admin/AirdropPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/communities/:id" element={<CommunityPage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/users" element={<UsersManagementPage />} />
        <Route path="/admin/posts" element={<PostModerationPage />} />
        <Route path="/admin/airdrop" element={<AirdropPage />} />
        <Route
          path="/admin/communities"
          element={<CommunitiesManagementPage />}
        />
        <Route path="*" element={<div className="p-6">404 - Not Found</div>} />{" "}
      </Routes>
    </BrowserRouter>
  );
}
