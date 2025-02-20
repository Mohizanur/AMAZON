import React from "react";
import Header from "../Header/Header";

function Layout({ children }) {
  // Destructure children from props
  return (
    <div>
      <Header />
      {children} {/* Render the children  */}
    </div>
  );
}

export default Layout;
