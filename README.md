<p style="text-align:center">
  <img src="logo.png" width="280" title="hover text">
 
</p>

<div style="text-align:center">
<img src="https://img.shields.io/badge/build-passing-brightgreen">

<img src="https://img.shields.io/badge/npm-1.1.5-orange">


</div>

<!-- # Easy-React-Dnd -->
<div  style="text-align:center">
<br></br>
Easy <strong>drag and drop</strong> grid library for <strong>React</strong>
<br></br>
</div>



## Installation

```sh
$ npm i easy-react-dnd
```

## Demo

https://master.d34ix3fbmn7czh.amplifyapp.com/

## Usage

The only required prop is the onItemSwitch prop. It is your responsability to update
the state that renders the EasyItem components.


<br></br>
###

```js
import React, { Component } from 'react'
import { EasyDraggable, EasyItem } from 'react-easy-dnd'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemArray: ['Test 1', 'Test 2', 'Test 3']
    }
  }

  _handleDragStart = (key) => {
    // Getting the key of the item being draged
  }
  _handleDragStop = (index) => {
    // Getting index of final position
  }

  /*
   * This function is required to keep persistance
   */
  _handleItemSwitch = (newArray) => {
    // Getting the new array of items
    // Get key with newArray[index].key
    let temp = []
    for (const item of newArray) {
      temp.push(item.key)
    }
    this.setState({ itemArray: temp })
  }

  _handleItemHover = (key, index) => {
    // key and index of hovered item
  }

  render() {
    return (
      <EasyDraggable
        cursor='grab'
        hSpacing='10px'
        vSpacing='10px'
        onDragStart={this._handleDragStart}
        onDragStop={this._handleDragStop}
        onItemSwitch={this._handleItemSwitch} //Required
        onItemHover={this._handleSwitch}
        itemsPerRow={2}
      >
        {this.state.itemArray.map((item) => (
          <EasyItem key={item}>
            <div className='box'>{item}</div>
          </EasyItem>
        ))}
      </EasyDraggable>
    )
  }
}
export default App
```

#### EasyDraggable Props


`Appearance props`

| prop        | Type           | Default value | Description                                                             |
| ----------- | -------------- | ------------- | ----------------------------------------------------------------------- |
| itemsPerRow | number         | 1             | The amount of items per row (columns per rows)                          |
| handle      | HTML component | none          | A handle that allow dragging from a specific point                      |
| hSpacing    | string         | 0px           | Horizontal spacing between items (ex:12px)                              |
| vSpacing    | string         | 0px           | Vertical spacing between rows (ex:12px)                                 |
| cursor      | string         | auto          | The cursor used on drag (cursor style property, ex : grab,pointer, ...) |

<br></br>

`Events props`

| prop         | Type    | parameter(s)                                             | Description                                               |
| ------------ | ------- | -------------------------------------------------------- | --------------------------------------------------------- |
| onDragStart  | funtion | The key of the item being draged                         | When drag starts                                          |
| onDragStop   | funtion | The key of the final position                            | When drag stops                                           |
| onItemSwitch | funtion | The new array of items                                   | When an item switch. This is required to keep persistance |
| onItemHover  | funtion | key (key of hovered item), index (index of hovered item) | When an item is hovered                                   |
<br></br>

#### EasyItem Props

| prop | Type          | Default value | Required | Description            |
| ---- | ------------- | ------------- | -------- | ---------------------- |
| key  | number/string | none          | no       | Unique id for the item |
<br></br>

## Credits
Adam Pinheiro

## Authors

- **Adam Pinheiro**

## Ressources used

<div>Icons made by <a href="https://www.flaticon.com/authors/metropolicons" title="Metropolicons">Metropolicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
