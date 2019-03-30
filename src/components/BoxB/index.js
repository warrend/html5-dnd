import React, { Component } from 'react'
import '../../App.css'

class BoxB extends Component {
  state = {
    items: {
      '1': {
        id: 0,
        name: 'kale',
        color: '#64C321',
      },
      '2': {
        id: 1,
        name: 'tofu',
        color: '#DD5E25',
      },
      '3': {
        id: 2,
        name: 'beans',
        color: '#C8224F',
      },
      '4':{
        id: 3,
        name: 'rice',
        color: '#199566',
      },
    },
    itemOrder: ['1', '2', '3', '4'],
    source: null,
    destination: null,
    hovering: undefined,
    isHovering: false,
  }

  onDragStart = e => {
    console.log("[START]",e.target.id)
    this.setState({
      source: e.target.id,
    })
  }

  onDragEnd = e => {
    console.log("[SOURCE]", e.target.id)
 
    this.updateItems(this.state.source, this.state.destination)
  }

  onDragOver = (e) => {
    e.preventDefault()
    console.log('hovering over...', e.target.id)
    this.setState({ hovering: e.target.id, isHovering: true })
  }

  onDrop = e => {
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
      hovering: undefined,
      isHovering: false,
    })
  }

  render() {
    const { items, itemOrder, hovering, isHovering } = this.state
    console.log(this.state)
    return (
      <div className="box">
        {itemOrder.map((item, index) => (
          <div 
            id={index} 
            className="item"
            draggable="true"
            style={{ 
              transition: 'background 300ms ease',
              background: isHovering && hovering === index.toString() ? '#abcafc' : items[item].color, 
              opacity: this.state.source === index.toString() ? '.25' : '1'
            }}
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