import React, { useState } from "react";

const AddBuilding = props => {
  /* Enter directory info*/
  //Display add button
  //push to data
  const { data, addBuilding } = props;

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [address, setAddress] = useState("");

  const onSubmit = event => {
    event.preventDefault();
    const buildingObj = {
      id: data.length + 1,
      code,
      name,
      coordinates: {
        latitude,
        longitude
      },
      address
    };
    addBuilding(buildingObj);
  };

  return (
    <div>
      <form onSubmit={e => onSubmit(e)}>
        <input
          type="text"
          name="code"
          value={code}
          placeholder="Enter building code here..."
          onChange={e => setCode(e.target.value)}
        />
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Enter building name here..."
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          name="latitude"
          value={latitude}
          placeholder="Enter latitudal coordinate here..."
          onChange={e => setLatitude(e.target.value)}
        />
        <input
          type="text"
          name="longitude"
          value={longitude}
          placeholder="Enter logitudal coordinate here..."
          onChange={e => setLongitude(e.target.value)}
        />
        <input
          type="text"
          name="address"
          value={address}
          placeholder="Enter address here..."
          onChange={e => setAddress(e.target.value)}
        />
        <button type="submit">Add your custom listing!</button>
      </form>
    </div>
  );
};

export default AddBuilding;
