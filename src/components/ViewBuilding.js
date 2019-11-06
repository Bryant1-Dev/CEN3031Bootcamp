import React from "react";
import RemoveBuilding from "./RemoveBuilding";

class ViewBuilding extends React.Component {
  removeBuilding(id) {
    this.props.removeBuilding(id);
  }
  render() {
    const { selectedBuilding, data } = this.props;

    return (
      /*<div>
        <p>
          {" "}
          <i>Click on a name to view more information</i>
        </p>
	  </div>*/
      <div>
        <tr>
          <td>{data[selectedBuilding].code} </td>
          <td> {data[selectedBuilding].name} </td>
        </tr>
        <RemoveBuilding
          id={data[selectedBuilding].id}
          removeBuilding={this.removeBuilding.bind(this)}
        />
      </div>
    );
  }
}
export default ViewBuilding;
