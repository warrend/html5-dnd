import React, { Component } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const Season = styled.div`
  padding: 15px 30px;
  border: 3px solid #777;
  margin-bottom: 2em;
  text-align: center;
  background: ${props => (props.isDragging ? '#ccc' : 'white')};
`

class Card extends Component {
	render() {   
		return (
      <Draggable draggableId={this.props.card.id} index={this.props.index}>
      {(provided, snapshot) => (
			  <Season 
          {...provided.draggableProps} 
          {...provided.dragHandleProps} 
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          { this.props.card.name }
        </Season>
      )}
      </Draggable>
	  );
	}
}

export default Card