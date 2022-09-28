import React from "react";
import DirectoryItem from "../directory-item/directory-item.component";

import "./directory.style.scss";

const Directory = ({ categories }) => {
  return (
    <div className="categories-container">
      {categories.map((user) => {
        return <DirectoryItem key={user.id} user={user} />;
      })}
    </div>
  );
};

export default Directory;
