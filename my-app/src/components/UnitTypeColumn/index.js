import React from "react";
import styled from "styled-components";
import Task from "../Unit/index";
import { Droppable } from "react-beautiful-dnd";
import List from '@material-ui/core/List';


const Container = styled.div`
  margin-bottom: 8px;
  margin-left: 8px;
  margin-right: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;

  /* set default column width, not needed in horizontal layout */
  width: 220px;

  //to make column have height
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  background-color: ${(props) => (props.isDraggingOver ? "skyblue" : "white")};
  transition: background-color 0.2s ease;
  /* flex-item area taking up remaining space */
  flex-grow: 1;
  /* set a area allowing dropping items easily */
  min-height: 70px;

  /* make tasks horizontally listed */
  display: flex;
  flex-direction: column;

  align-items: center;
  gap: 5px;
`;

const droppableSnapshot = {
  // will be true when a draggable is dragging over the droppable
  isDraggingOver: true,
  // id of the draggable that is dragging over a droppable
  //will be null if the droppable is not been dragged over
  draggingOverWith: "task-1",
};

export default class UnitTypeColumn extends React.Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable
          droppableId={this.props.column.id}
        // ! Two ways to controlled Droppable
        // -1 A <Draggable/> can only be dropped into a <Droppable/> that share
        // the same type as the <Droppable/> that it started in
        //in this case, we can't move item into column 4
        // type={this.props.column.id === "year-2-semester-2" ? "disabled" : "allowed"}

        // -2 when isDropDisabled is true, no <Draggable/> will be able to drop onto it
        //even with the same type
        // isDropDisabled={true}
        >
          {(provided, snapshot) => (
            <TaskList
              //provide dom to dnd
              ref={provided.innerRef}
              //prop to affect css
              isDraggingOver={snapshot.isDraggingOver}
              {...provided.droppableProps}
            >
              {this.props.tasks.map((task, index) => (
                <Task key={task._id} task={task} index={index} />
              ))}
              {/* keeping space when dragging */}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}
