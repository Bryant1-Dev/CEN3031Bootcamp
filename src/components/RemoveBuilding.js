import React from "react";

const RemoveBuilding = props => {
  const { id, removeBuilding } = props;

  return (
    <>
      <button onClick={() => removeBuilding(id)}>Delete</button>
    </>
  );
};

export default RemoveBuilding;
