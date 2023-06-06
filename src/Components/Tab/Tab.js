import React from "react";

const Tab = ({ label, activeTab, onClick }) => {
  const isActive = activeTab === label;

  return (
    <button className={`tab ${isActive ? "active" : ""}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Tab;
