import React, { Component } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import Card from '../Card'
import '../../App.css'

const TaskList = styled.div`
  /* display: flex;
  flex-direction: row;
  flex-wrap: wrap; */
  width: 400px;
  height: 400px;
  background: #efefef;
  margin: 20px;
  padding: 2em;
  transition: background 0.2s ease;
  background: ${props => (props.isDraggingOver ? '#dee8f9' : 'white')};
`;

class BoxA extends Component {
  
  partitionArray = (array, size) => array.map( (e,i) => (i % size === 0) ? array.slice(i, i + size) : null ) .filter( (e) => e )
  
  render() {
    console.log("BOXA: ", this.props)
    const items = this.partitionArray(this.props.category.products, 4)
    console.log(items)

    return (
      <Droppable droppableId={this.props.index} direction="horizontal">
        {(provided, snapshot) => (
          <TaskList 
            {...provided.droppableProps } 
            ref={provided.innerRef} 
            isDraggingOver={snapshot.isDraggingOver}
          >
          {/* <div 
            style={{ 
              marginBottom: '1em', 
              fontSize: '24px', 
              fontWeight: 'bold' 
            }}>{this.props.category.name}</div> */}
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
