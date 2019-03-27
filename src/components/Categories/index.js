import React, { Component } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 15px 30px;
  border: 3px solid #777;
  margin-bottom: 2em;
  text-align: center;
  background: #efefef;
`

class Category extends Component {
	render() {   
    console.log("DRAG ID", this.props.card.id) 
		return (
      <Draggable draggableId={this.props.card.id} index={this.props.index}>
      {(provided) => (
			  <Wrapper 
          {...provided.draggableProps} 
          {...provided.dragHandleProps} 
          ref={provided.innerRef}>
          { this.props.card.name }
        </Wrapper>
      )}
      </Draggable>
	  );
	}
}

export default Category