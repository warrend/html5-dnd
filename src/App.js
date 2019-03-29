import React, { Component } from 'react'
import { DragDropContext } from 'react-beautiful-dnd';
import './App.css'
import BoxA from './components/BoxA'

const data = {
  categories: {
    'cat-1': {
      id: 'cat-1',
      name: 'Meat',
      products: ['1', '3', '6', '7', '8', '9', '10'],
    },
    'cat-2':{
      id: 'cat-2',
      name: 'Vegan',
      products: ['2', '4', '5'],
    },
  },
  categoryOrder: ['cat-1', 'cat-2'],
  products: {
    '1': {
      id: '1',
      name: 'Chicken',
    },
    '2': {
      id: '2',
      name: 'Tofu',
    },
    '3': {
      id: '3',
      name: 'Sausage',
    },
    '4': {
      id: '4',
      name: 'Beans',
    },
    '5': {
      id: '5',
      name: 'Kale'
    },
    '6': {
      id: '6',
      name: 'Chicken',
    },
    '7': {
      id: '7',
      name: 'Tofu',
    },
    '8': {
      id: '8',
      name: 'Sausage',
    },
    '9': {
      id: '9',
      name: 'Beans',
    },
    '10': {
      id: '10',
      name: 'Kale'
    }
  },
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

    if (destination.droppableId === source.droppableId) {

      const newOrder = [...this.state.cards.categories[destination.droppableId].products]
      newOrder.splice(source.index, 1)
      newOrder.splice(destination.index, 0, draggableId)

      this.setState({ 
        cards: {
          ...this.state.cards,
          categories: {
            ...this.state.cards.categories,
            [destination.droppableId]: {
              ...this.state.cards.categories[destination.droppableId],
              products: newOrder,
            }
          }
        }
      })
    }

    if (destination.droppableId !== source.droppableId) {
      const sourceOrder = [ ...this.state.cards.categories[source.droppableId].products ]
      const destinationOrder = [ ...this.state.cards.categories[destination.droppableId].products ]

      const updatedSourceOrder = sourceOrder.filter(product => draggableId !== product)
      console.log("Source order", updatedSourceOrder)
      console.log("Destination array", destinationOrder)
      destinationOrder.splice(destination.index, 0, draggableId)
      console.log("Dest updated", destinationOrder)

      this.setState({ 
        cards: {
          ...this.state.cards,
          categories: {
            ...this.state.cards.categories,
            [destination.droppableId]: {
              ...this.state.cards.categories[destination.droppableId],
              products: destinationOrder,
            },
            [source.droppableId]: {
              ...this.state.cards.categories[source.droppableId],
              products: updatedSourceOrder,
            }
          }
        }
      })


    }


  }

  render() {
    console.log("STATE",this.state.cards)
    return (
      <div className="main">
        <DragDropContext
          onDragEnd={this.onDragEnd}
        >
          {this.state.cards.categoryOrder.map((cat, index) => (
            <BoxA category={this.state.cards.categories[cat]} index={cat} products={this.state.cards.products} />
          ))}
        </DragDropContext>
      </div>
    );
  }
}


export default App;
