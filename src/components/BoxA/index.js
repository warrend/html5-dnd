import React, { Component } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import Card from '../Card'
import '../../App.css'

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 400px;
  background: #efefef;
  margin: 20px;
  padding: 2em;
  transition: background 0.2s ease;
  background: ${props => (props.isDraggingOver ? '#dee8f9' : 'white')};
`;

class BoxA extends Component {
  render() {
    console.log("BOXA: ", this.props)
    return (
      <Droppable droppableId={this.props.index}>
        {(provided, snapshot) => (
          <TaskList {...provided.droppableProps } ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
          <div style={{ marginBottom: '1em', fontSize: '24px', fontWeight: 'bold' }}>{this.props.category.name}</div>
            {this.props.category.products.map((product, index) => (
              <Card 
                card={this.props.products[product]}
                index={index}
              />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    )
  }
}

export default BoxA;
