import React, { Component } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import Card from '../Card'
import '../../App.css'

const TaskList = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 400px;
  height: 400px;
  background: #efefef;
  margin: 20px;
  padding: 2em;
`;

class BoxA extends Component {
  render() {
    return (
      <Droppable droppableId={1}>
        {(provided) => (
          <TaskList {...provided.droppableProps } ref={provided.innerRef}>
            {this.props.cards.order.map((card, index) => (
              <Card 
                card={this.props.cards[card]}
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
