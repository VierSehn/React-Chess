import React from "react";

import "./SquareIdentifier.css"

const SquareIdentifier = ({ vertical, horizontal, children }) => (
  <div className="identifier">
    {children}
  </div>
);

export default SquareIdentifier;
