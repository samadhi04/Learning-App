import React, { useState, useRef } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { IoReorderThreeOutline } from "react-icons/io5";
import { mainu } from "./SidebarConfig";
import SearchComponent from "../SearchComponent/SearchComponent";
import CreatePostModal from "../Post/Create/CreatePostModal";
import CreateReelModal from "../Create/CreateReel";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store);
  const [activeTab, setActiveTab] = useState("Home");
  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const excludedBoxRef = useRef(null);
  const sidebarRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isCreateReelModalOpen, setIsCreateReelModalOpen] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case "Profile":
        navigate(`/${user.reqUser?.username}`);
        break;
      case "Home":
        navigate("/");
        break;
      case "Create Post":
        onOpen();
        break;
      case "About Us":
        navigate("/about");
        break;
      case "Reels":
        navigate("/reels");
        break;
      case "Create Reels":
        setIsCreateReelModalOpen(true);
        break;
      case "Notifications":
        navigate("/notifications");
        break;
      case "Create Story":
        navigate("/create-story");
        break;
      case "Learning Plan":
        navigate("/learning_plan");
        break;
      case "Learning Progress":
        navigate("/learning-progress");
        break;
      case "Search":
        setIsSearchBoxVisible(true);
        break;
      default:
        break;
    }

    if (tab !== "Search") setIsSearchBoxVisible(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sidebar-container">
      <div 
        className={`sidebar-content ${isSearchBoxVisible ? "with-search" : ""}`}
        ref={sidebarRef}
      >
        {!isSearchBoxVisible && (
          <img
            className="sidebar-logo"
            src="https://scorebeyond.com/wp-content/uploads/2023/05/Skillshare-Logo.jpg"
            alt="Skillshare Logo"
          />
        )}
        
        <div className="sidebar-menu">
          {mainu.map((item, index) => (
            <div
              key={index}
              onClick={() => handleTabClick(item.title)}
              className={`menu-item ${activeTab === item.title ? "active" : ""}`}
            >
              {activeTab === item.title ? item.activeIcon : item.icon}
              <p className={`menu-text ${isSearchBoxVisible ? "hidden" : ""}`}>
                {item.title}
              </p>
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            className="more-button"
          >
            <IoReorderThreeOutline className="more-icon" />
            {!isSearchBoxVisible && <p>More</p>}
          </div>

          {showDropdown && (
            <div className="dropdown-menu">
              <p
                onClick={handleLogout}
                className="dropdown-item"
              >
                Log out
              </p>
            </div>
          )}
        </div>
      </div>

      {isSearchBoxVisible && (
        <div className="search-container">
          <SearchComponent setIsSearchVisible={setIsSearchBoxVisible} />
        </div>
      )}

      <CreatePostModal onClose={onClose} isOpen={isOpen} />
      <CreateReelModal
        onClose={() => setIsCreateReelModalOpen(false)}
        isOpen={isCreateReelModalOpen}
      />
    </div>
  );
};

export default Sidebar;