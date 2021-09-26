import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import Card from '../Card/index'

const Container = styled.div`
  border: 3px solid lightgrey;
  border-radius: 2px;
  /* width: 100%; */
  padding: 8px;
  /* margin-bottom: 8px; */
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
  display: flex;
  flex-direction: column;
  align-items: center;
  vertical-align: middle;
  justify-content: space-around;
  text-align: center;
  width: ${(props) => (props.grow ? "100%" : "25%")};;
`;

// if a draggable is dragged and is currently not over a droppable, then draggingOver is null
const draggableSnapshot = {
  isDragging: true,
  // id of the droppable that the current dragging over,
  draggingOver: "year-1-semester-1",
};
export default class Unit extends React.Component {
  static defaultProps = {
    grow: true,
  };

  render() {
    return (
      <Draggable
        draggableId={this.props.task._id}
        index={this.props.index}
      // prevent <Draggable /> from being dragged
      // isDragDisabled={true}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            // use this prop to drag a large item by just a small part of it
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            //pass a prop to affect css
            isDragging={snapshot.isDragging}
            grow={this.props.grow}
          >
            <div>{this.props.task.unitCode}</div>
            <div>{this.props.task.title}</div>
            {this.props.task.availability.map(semester => (
              <small key={semester._id}>{semester.name}</small>
            )
            )}
          </Container>
        )}
      </Draggable>
    );
  }
}


