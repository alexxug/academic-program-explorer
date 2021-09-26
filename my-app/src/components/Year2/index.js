import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import SemesterRow from "../SemesterRow/index";
import UnitTypeColumn from "../UnitTypeColumn/index";
import styled from "styled-components";
import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider";
import Stack from "@material-ui/core/Stack";
import CircularProgress from '../Spinner/index';
import { CSVLink, CSVDownload } from "react-csv";
import { experimentalStyled } from "@material-ui/core";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const result = {
  // onDragStart's prop
  draggableId: "task-1",
  type: "DEFAULT",
  source: {
    index: 0,
    droppableId: "year-1-semester-1",
  },
  //onDragUpdate's prop
  destination: {
    droppableId: "year-1-semester-1",
    index: 0,
  },
  //onDragEnd's prop
  reason: "DROP",
  mode: "FLUID",
  combine: null,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
`;

const Button = styled.button`
  background-color: #1976d2;
  color: white;
  font-size: 20px;
  padding: 10px 10px;
  border-radius: 5px;
  margin-left: 84vw;
  cursor: pointer;
`;

// setting the column headers for the csv file
const headers = [
  { label: 'Semester', key: 'semester'},
  { label: 'Unit Code', key: 'unitcode'}
]; 

class FullYear extends React.Component {
  // state = {units:this.props.units};
  state = {...this.props.units,csvData:[]}
  componentDidUpdate(prevProps) {
    if (prevProps.units.loading !== this.props.units.loading) {
      this.setState({ ...this.props.units });
    }
  }


// function to extract data based on the user selections made
  downloadCourse = () => {

    var tempData = []
  
    let columns = this.state.columns;
// for loop for iterating through each column(i.e semesters)
    for (const columnId in columns){
      let csvRow = {}
      var column = columns[columnId]
// matching for each selected column's units(tasks) to the actual units  
      var tasks = column.taskIds.map(id => (this.state.tasks[id]))
 
      for (const taskId in tasks){
      if(typeof tasks[taskId] !== "undefined"){

        csvRow['semester'] = column.title
        
        csvRow['unitcode'] = tasks[taskId].unitCode

        //populating a dictionary with the extracted values
        tempData.push(csvRow)

      }
      else{
        console.log("Column ", column.title, " has no courses");
      }
    }

  }
    // passing the dictionary to the current state
    this.setState({csvData:[...tempData]})
 
  }



  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // the draggable has been dropped outside the droppable area
    if (!destination) {
      return;
    }

    // the draggable has been dropped in the original location
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const semesterRows = this.state.semesterRows;
    const semesterRowIds = Object.keys(semesterRows);
    const unitTypeColumns = this.state.unitTypeColumns;
    const unitTypeColumnIds = Object.keys(unitTypeColumns);

    const semesterStart = semesterRows[source.droppableId];
    const semesterFinish = semesterRows[destination.droppableId];
    const unitTypeColumnStart = unitTypeColumns[source.droppableId];
    const unitTypeColumnFinish = unitTypeColumns[destination.droppableId];

    const draggedUnit = this.state.tasks[draggableId];
    // One semester can have a maximum of 4 units
    if (semesterRowIds.includes(destination.droppableId) && semesterFinish.taskIds.length >= 4) {
      return;
    }

    // allocating a unit into an incompatible semester column
    if (
      draggedUnit.availability.length === 1 &&
      draggedUnit.availability[0]?.name === "Semester1" &&
      (destination.droppableId === "year-1-semester-2" ||
        destination.droppableId === "year-2-semester-2")
    ) {
      toast(`${draggedUnit.unitCode} Incompatible Unit / Semester`);
      return;
    }
    if (
      draggedUnit.availability.length === 1 &&
      draggedUnit.availability[0]?.name === "Semester2" &&
      (destination.droppableId === "year-1-semester-1" ||
        destination.droppableId === "year-2-semester-1")
    ) {
      toast(`${draggedUnit.unitCode} Incompatible Unit / Semester`);
      return;
    }

    // allocating an 'na' unit into a semester
    if (draggedUnit.availability[0]?.name === "na") {
      toast(`${draggedUnit.unitCode} is an unavailable unit`);
      return;
    }
    
    // !Moving within semesters
    if (semesterStart !== undefined && semesterFinish !== undefined) {
      // !Moving within the same semester
      if (semesterStart === semesterFinish) {
        const newTaskIds = Array.from(semesterStart.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newSemesterRow = {
          ...semesterStart,
          taskIds: newTaskIds,
        };

        const newState = {
          ...this.state,
          semesterRows: {
            ...this.state.semesterRows,
            [newSemesterRow.id]: newSemesterRow,
          },
        };

        this.setState(newState);
        return;
      }

      //! moving across different semesters
      
      //removing starting column's taskId
      const startTaskIds = Array.from(semesterStart.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...semesterStart,
        taskIds: startTaskIds,
      };

      //adding in finishing task IDs array
      const finishTaskIds = Array.from(semesterFinish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...semesterFinish,
        taskIds: finishTaskIds,
      };

      const newState = {
        ...this.state,
        semesterRows: {
          ...this.state.semesterRows,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };
      this.setState(newState);
    } else {
      // Dragging from / to a unit type (not allowed)
      
      // Dragging within the same unit type
      if (unitTypeColumnStart === unitTypeColumnFinish) {
        const newTaskIds = Array.from(unitTypeColumnStart.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
          ...unitTypeColumnStart,
          taskIds: newTaskIds,
        };

        const newState = {
          ...this.state,
          unitTypeColumns: {
            ...this.state.unitTypeColumns,
            [newColumn.id]: newColumn,
          },
        };

        this.setState(newState);
        return;
      }

      //! moving from unit type into semester
      if (semesterStart === undefined && semesterFinish !== undefined) {
        //removing starting column's taskId
        const unitTypeColumnStartTaskIds = Array.from(unitTypeColumnStart.taskIds);
        unitTypeColumnStartTaskIds.splice(source.index, 1);
        const newUnitTypeColumnStart = {
          ...unitTypeColumnStart,
          taskIds: unitTypeColumnStartTaskIds,
        };

        //adding in finishing task IDs array
        const finishTaskIds = Array.from(semesterFinish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
          ...semesterFinish,
          taskIds: finishTaskIds,
        };

        const newState = {
          ...this.state,
          semesterRows: {
            ...this.state.semesterRows,
            [newFinish.id]: newFinish,
          },
          unitTypeColumns: {
            ...this.state.unitTypeColumns,
            [newUnitTypeColumnStart.id]: newUnitTypeColumnStart,
          },
        };
        this.setState(newState);
      }
    }
  }

  render() {
    const { loading } = this.props.units;
    

    return (
      <div id='container' >
 
        <CSVLink filename = 'Study-plan.csv' headers = {this.headers} data = {this.state.csvData}>
         {/* onclick calls upon the function for user selected data extraction */}
          <Button onClick = {this.downloadCourse}>Download CSV</Button>
          </CSVLink>
        {
        loading ? <CircularProgress /> : <DragDropContext onDragEnd={this.onDragEnd}>
          <Container>
            <ToastContainer />
            {this.state.semesterRowOrder.map((columnId) => {
              const semester = this.state.semesterRows[columnId];
              const units = semester.taskIds.map(
                (taskId) => this.state.tasks[taskId]
              );
              return <SemesterRow key={semester.id} column={semester} tasks={units} />;
            })}
          </Container>
          <Divider
            sx={{
              margin: "10px 0",
            }}
          />
          <Stack direction='row' spacing={2} key={this.props.units.loading}>
            {this.state.unitTypeColumnOrder.map((columnId) => {
              const column = this.state.unitTypeColumns[columnId];
              const tasks = column.taskIds.map(
                (taskId) => this.state.tasks[taskId]
              );

              return (
                <UnitTypeColumn
                  key={column.id}
                  column={column}
                  tasks={tasks}
                />
              );
            })}
          </Stack>
        </DragDropContext>
      }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  units: state.fullUnits,
});

export default connect(mapStateToProps, {})(FullYear);
