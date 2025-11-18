import { useState, useEffect } from "react";
import "./App.css";
import Layout from "./components/Layout";
import PageView from "./components/PageView";
import type { NavItem } from "./config/navigation";
import { parseKeyEvent, normalizeKeyBinding } from "./utils/keyboardUtils";
import { TranslationProvider } from "./contexts/TranslationContext";

function App() {
  const [currentPage, setCurrentPage] = useState<{
    title: string;
    path: string;
  } | null>(null);
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  const handleNavigation = (path: string, title?: string) => {
    console.log("Navigating to:", path);
    setCurrentPage({
      title: title || path.split("/").filter(Boolean).pop() || "Page",
      path: path,
    });
    // Here you would integrate with your router (e.g., React Router)
  };

  const handleLogoClick = () => {
    console.log("Logo clicked");
    setCurrentPage(null);
  };

  const handleUserClick = () => {
    console.log("User profile clicked");
  };

  const handleLanguageChange = (language: string) => {
    console.log("Language changed to:", language);
    // Here you would implement language change logic (i18n, etc.)
  };

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Build a map of keyboard shortcuts from navItems
      const shortcutMap = new Map<string, { path: string; title: string }>();

      navItems.forEach((item) => {
        // Add parent item shortcuts
        if (item.keyBinding && item.quickAccess) {
          shortcutMap.set(normalizeKeyBinding(item.keyBinding), {
            path: item.path,
            title: item.label,
          });
        }

        // Add sub-menu item shortcuts
        if (item.subMenu) {
          item.subMenu.forEach((subItem) => {
            if (subItem.keyBinding && subItem.quickAccess) {
              shortcutMap.set(normalizeKeyBinding(subItem.keyBinding), {
                path: subItem.path,
                title: subItem.label,
              });
            }
          });
        }
      });

      // Debug logging
      console.log("Available shortcuts:", Array.from(shortcutMap.keys()));
      console.log(
        "NavItems with keyBinding:",
        navItems
          .filter((i) => i.keyBinding)
          .map((i) => ({
            label: i.label,
            keyBinding: i.keyBinding,
            quickAccess: i.quickAccess,
          }))
      );

      // Parse the key combination from the event
      const combo = parseKeyEvent(event);
      console.log("Key pressed:", combo);

      // Check if this combination matches any shortcut
      if (shortcutMap.has(combo)) {
        event.preventDefault();
        const target = shortcutMap.get(combo)!;
        console.log(`Keyboard shortcut triggered: ${combo} -> ${target.title}`);
        handleNavigation(target.path, target.title);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navItems]);

  return (
    <TranslationProvider defaultLanguage="english">
      <Layout
        userName="John Doe"
        logoText="MyApp"
        userId={43}
        onNavigate={handleNavigation}
        onLogoClick={handleLogoClick}
        onUserClick={handleUserClick}
        onNavItemsLoaded={setNavItems}
        onLanguageChange={handleLanguageChange}
      >
        {currentPage && (
          <PageView title={currentPage.title} path={currentPage.path} />
        )}
      </Layout>
    </TranslationProvider>
  );
}

export default App;
