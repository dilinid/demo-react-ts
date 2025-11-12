import React from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import QuickAccessMenu from "../QuickAccessMenu";
import { NAV_ITEMS } from "../../config/navigation";
import "./Layout.css";

interface LayoutProps {
  children: React.ReactNode;
  userName?: string;
  userAvatar?: string;
  logoText?: string;
  onNavigate?: (path: string) => void;
  onLogoClick?: () => void;
  onUserClick?: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  userName = "John Doe",
  userAvatar,
  logoText = "MyApp",
  onNavigate,
  onLogoClick,
  onUserClick,
}) => {
  const handleNavigation = (path: string) => {
    console.log("Navigating to:", path);
    onNavigate?.(path);
  };

  return (
    <div className="layout">
      <Navbar
        userName={userName}
        userAvatar={userAvatar}
        logoText={logoText}
        onLogoClick={onLogoClick}
        onUserClick={onUserClick}
      />

      <div className="layout-body">
        <Sidebar items={NAV_ITEMS} onItemClick={handleNavigation} />

        <div className="layout-main">
          <QuickAccessMenu items={NAV_ITEMS} onItemClick={handleNavigation} />

          <main className="layout-content">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
