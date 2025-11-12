import React, { useState } from "react";
import type { NavItem, SubMenuItem } from "../../config/navigation";
import "./Sidebar.css";

interface SidebarProps {
  items: NavItem[];
  onItemClick?: (path: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ items, onItemClick }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [activeItem, setActiveItem] = useState<string>("");

  const toggleExpand = (path: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedItems(newExpanded);
  };

  const handleItemClick = (item: NavItem) => {
    if (item.subMenu && item.subMenu.length > 0) {
      toggleExpand(item.path);
    } else {
      setActiveItem(item.path);
      onItemClick?.(item.path);
    }
  };

  const handleSubItemClick = (subItem: SubMenuItem) => {
    setActiveItem(subItem.path);
    onItemClick?.(subItem.path);
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {items.map((item) => {
            const isExpanded = expandedItems.has(item.path);
            const isActive = activeItem === item.path;
            const hasSubMenu = item.subMenu && item.subMenu.length > 0;

            return (
              <li key={item.path} className="sidebar-menu-item">
                <div
                  className={`sidebar-item ${isActive ? "active" : ""}`}
                  onClick={() => handleItemClick(item)}
                >
                  <div className="sidebar-item-content">
                    {item.icon && (
                      <span className="sidebar-icon">{item.icon}</span>
                    )}
                    <span className="sidebar-label">{item.label}</span>
                  </div>
                  {hasSubMenu && (
                    <span
                      className={`sidebar-arrow ${
                        isExpanded ? "expanded" : ""
                      }`}
                    >
                      ▼
                    </span>
                  )}
                </div>

                {hasSubMenu && isExpanded && (
                  <ul className="sidebar-submenu">
                    {item.subMenu!.map((subItem) => {
                      const isSubActive = activeItem === subItem.path;
                      return (
                        <li
                          key={subItem.path}
                          className={`sidebar-subitem ${
                            isSubActive ? "active" : ""
                          }`}
                          onClick={() => handleSubItemClick(subItem)}
                        >
                          {subItem.icon && (
                            <span className="sidebar-subicon">
                              {subItem.icon}
                            </span>
                          )}
                          <span className="sidebar-sublabel">
                            {subItem.label}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
