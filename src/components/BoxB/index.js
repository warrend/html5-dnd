import React, { Component } from 'react'
import '../../App.css'

class BoxB extends Component {
  state = {
    items: {
      '1': {
        id: 0,
        name: 'kale',
        color: 'green',
      },
      '2': {
        id: 1,
        name: 'tofu',
        color: '#cc9900',
      },
      '3': {
        id: 2,
        name: 'beans',
        color: '#222',
      },
      '4':{
        id: 3,
        name: 'rice',
        color: 'grey',
      },
    },
    itemOrder: ['1', '2', '3', '4'],
    source: null,
    destination: null,
    hovering: null,
  }

  onDragStart = e => {
    console.log("[START]",e.target.id)
    this.setState({
      source: e.target.id,
    })
  }

  onDragEnd = async e => {
    console.log("[SOURCE]", e.target.id)
    this.updateItems(this.state.source, this.state.destination)
  }

  onDragOver = (e) => {
    e.preventDefault()
    console.log('hovering over...', e.target.id)
    this.setState({ hovering: e.target.id })
  }

  onDrop = (e) => {
    let event = e
    event.stopPropagation()
    event.preventDefault()
    console.log("[ON DROP]", e.target.id)
    this.setState({ destination: e.target.id })
  }

  updateItems = (source, destination) => {
    console.log(source, destination)
    const updateOrder = [...this.state.itemOrder]
    const sourceItem = this.state.itemOrder[source]
    // const destinationItem = this.item.itemOrder[destination]

    updateOrder.splice(source, 1)
    updateOrder.splice(destination, 0, sourceItem)

    this.setState({
      ...this.state.items,
      itemOrder: updateOrder,
      source: null,
      destination: null,
      hovering: null,
    })
  }

  render() {
    const { items, itemOrder, hovering } = this.state
    console.log(this.state)
    return (
      <div className="box">
        {itemOrder.map((item, index) => (
          <div 
            id={index} 
            className="item"
            draggable 
            droppable
            style={{ background: hovering && hovering === index.toString() ? '#abcafc' : items[item].color, opacity: this.state.source === index.toString() ? '.25' : '1'}}
            onDragStart={(e) => this.onDragStart(e)}
            onDragEnd={(e) => this.onDragEnd(e)}
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => this.onDrop(e)}
          >
            {items[item].name} {items[item].id}
          </div>
        ))}
      </div>
    )
  }
}

export default BoxB