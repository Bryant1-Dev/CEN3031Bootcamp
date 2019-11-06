import React from "react";
import Search from "./components/Search";
import ViewBuilding from "./components/ViewBuilding";
import BuildingList from "./components/BuildingList";
import Credit from "./components/Credit";
import AddBuilding from "./components/AddBuilding";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      selectedBuilding: 0,
      data: this.props.data
    };
    this.filterUpdate = this.filterUpdate.bind(this);
    this.selectedUpdate = this.selectedUpdate.bind(this);
    this.addBuilding = this.addBuilding.bind(this);
    this.removeBuilding = this.removeBuilding.bind(this);
  }

  filterUpdate(value) {
    //Here you will need to set the filterText property of state to the value passed into this function
    console.log(value);
    this.setState({ filterText: value });
  }

  selectedUpdate(id) {
    //Here you will need to update the selectedBuilding property of state to the id passed into this function
    this.setState({ selectedBuilding: id });
  }

  addBuilding(building) {
    console.log(building);
    let newData = this.state.data;
    newData.push(building);
    this.setState({ data: newData });
  }
  removeBuilding(buildingId) {
    console.log("Removing data with id: " + buildingId);
    let newData = this.state.data.filter(directory => {
      return directory.id !== buildingId;
    });
    newData.map((directory, index) => {
      directory.id = index + 1;
    });
    this.setState({ data: newData });
  }

  render() {
    return (
      <div className="bg">
        <div className="row">
          <h1>UF Directory App</h1>
        </div>

        <Search
          filterText={this.state.filterText}
          filterUpdate={this.filterUpdate}
        />
        <main>
          <div>
            <AddBuilding
              data={this.state.data}
              addBuilding={this.addBuilding}
            />
          </div>

          <div className="row">
            <div className="column1">
              <div className="tableWrapper">
                <table className="table table-striped table-hover">
                  <tr>
                    <td>
                      <b>Code Building</b>
                    </td>
                  </tr>
                  <BuildingList
                    filterText={this.state.filterText}
                    data={this.state.data}
                    selectedUpdate={this.selectedUpdate}
                  />
                </table>
              </div>
            </div>
            <div className="column2">
              <ViewBuilding
                data={this.state.data}
                selectedBuilding={this.state.selectedBuilding}
                removeBuilding={this.removeBuilding}
              />
            </div>
          </div>
          <Credit />
        </main>
      </div>
    );
  }
}

export default App;
