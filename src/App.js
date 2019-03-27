import React, { Component } from 'react'
import { DragDropContext } from 'react-beautiful-dnd';
import './App.css'
import BoxA from './components/BoxA'
import BoxB from './components/BoxB'

const data = {
  '1': {
    id: '1',
    name: 'winter',
  },
  '2': {
    id: '2',
    name: 'spring',
  },
  '3': {
    id: '3',
    name: 'summer',
  },
  '4': {
    id: '4',
    name: 'fall',
  },
  order: ['1', '2', '3', '4']
}

class App extends Component {
  state = {
    cards: data,
  }


  onDragEnd = result => {
    const { destination, source, draggableId } = result

    console.log("RESULT: ",result)

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    const newCards = [...this.state.cards.order]

    newCards.splice(source.index, 1)
    newCards.splice(destination.index, 0, draggableId)

    this.setState({ 
      cards: {
        ...this.state.cards,
        order: newCards,
      }
    })

  }

  render() {
    console.log(this.state.cards)
    return (
      <div className="main">
        <DragDropContext
          onDragEnd={this.onDragEnd}
        >
          <BoxA cards={this.state.cards} />
          <BoxB />
        </DragDropContext>
      </div>
    );
  }
}

export default App;
