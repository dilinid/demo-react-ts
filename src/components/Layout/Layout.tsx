import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import QuickAccessMenu from "../QuickAccessMenu";
import type { NavItem } from "../../config/navigation";
import { navigationApi } from "../../services/navigationService";
import { transformApiNavToNavItems } from "../../utils/navigationTransform";
import "./Layout.css";

interface LayoutProps {
  children: React.ReactNode;
  userName?: string;
  userAvatar?: string;
  logoText?: string;
  userId?: number;
  onNavigate?: (path: string, title?: string) => void;
  onLogoClick?: () => void;
  onUserClick?: () => void;
  onNavItemsLoaded?: (items: NavItem[]) => void;
  onLanguageChange?: (language: string) => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  userName = "John Doe",
  userAvatar,
  logoText = "MyApp",
  userId = 42, // Default user ID, can be passed as prop
  onNavigate,
  onLogoClick,
  onUserClick,
  onNavItemsLoaded,
  onLanguageChange,
}) => {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await navigationApi.getUserNavigation(userId);
        const transformedItems = transformApiNavToNavItems(response.nav_rights);
        setNavItems(transformedItems);
        onNavItemsLoaded?.(transformedItems);
      } catch (err) {
        console.error("Failed to fetch navigation:", err);
        setError("Failed to load navigation menu");
        setNavItems([]); // Set empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchNavigation();
  }, [userId, onNavItemsLoaded]);

  const handleNavigation = (path: string, title?: string) => {
    console.log("Navigating to:", path, title);
    onNavigate?.(path, title);
  };

  if (error) {
    console.warn(error);
  }

  return (
    <div className="layout">
      <Navbar
        userName={userName}
        userAvatar={userAvatar}
        logoText={logoText}
        onLogoClick={onLogoClick}
        onUserClick={onUserClick}
        onLanguageChange={onLanguageChange}
      />

      <div className="layout-body">
        {isLoading ? (
          <div className="sidebar-loading">Loading navigation...</div>
        ) : (
          <Sidebar items={navItems} onItemClick={handleNavigation} />
        )}

        <div className="layout-main">
          {!isLoading && (
            <QuickAccessMenu items={navItems} onItemClick={handleNavigation} />
          )}

          <main className="layout-content">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
