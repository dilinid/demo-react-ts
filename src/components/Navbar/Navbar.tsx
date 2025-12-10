import React from "react";
import LanguageSelector from "../LanguageSelector";
import "./Navbar.css";

interface NavbarProps {
  userName?: string;
  userAvatar?: string;
  logoText?: string;
  onLogoClick?: () => void;
  onUserClick?: () => void;
  onLanguageChange?: (language: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  userName = "User",
  userAvatar,
  logoText = "Logo",
  onLogoClick,
  onUserClick,
  onLanguageChange,
}) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={onLogoClick}>
        {logoText}
      </div>

      <div className="navbar-right">
        <LanguageSelector onLanguageChange={onLanguageChange} />
        <span className="navbar-user-name">{userName}</span>
        <div className="navbar-avatar" onClick={onUserClick}>
          {userAvatar ? (
            <img src={userAvatar} alt={userName} className="avatar-image" />
          ) : (
            <div className="avatar-placeholder">
              {userName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
