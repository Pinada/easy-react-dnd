<!-- [![npm version](https://badge.fury.io/js/angular2-expandable-list.svg)](https://badge.fury.io/js/angular2-expandable-list) -->

# Easy-React-Dnd

> Easy drag and drop grid for React


## Installation

```sh
$ npm i easy-react-dnd
```

## Demo
https://master.d34ix3fbmn7czh.amplifyapp.com/

## Usage

###

```js
import React, { Component } from "react";
import { EasyDraggable, EasyItem } from "react-easy-dnd";

class App extends Component {
  constructor(props) {
    super(props);
  }

  _handleDrag = (key) => {
    // getting the key of the item being draged
  };
  _handleDragStop = (index) => {
    // getting index of final position
  };
  _handleSwitch = (newArray) => {
    // getting the new array of items
  };

  render() {
    return (
      <EasyDraggable
        cursor={"grab"}
        hSpacing={"10px"}
        vSpacing={"10px"}
        onDragStart={this._handleDrag}
        onDragStop={this._handleDragStop}
        onItemSwitch={this._handleSwitch}
        itemsPerRow={4}
      >
        {["item 1", "item 2"].map((item) => (
          <EasyItem key={item}>
            <div className="box">{item}</div>
          </EasyItem>
        ))}
      </EasyDraggable>
    );
  }
}
export default App;
```


#### EasyDraggable Props


`Appearance props`

|prop| Type   | Default value | Description          |
|-----| ------ | ------------- | -------------------- |
| itemsPerRow | number | 1             | The amount of items per row (columns per rows) |
| handle | HTML component | none  | A handle that allow dragging from a specific point |
| hSpacing | string | 0px             | Horizontal spacing between items (ex:12px) |
| vSpacing | string | 0px             | Vertical spacing between rows (ex:12px) |
| cursor | string | auto             | The cursor used on drag (cursor style property, ex : grab,pointer, ...) |





`Events props`

|prop| Type   | parameter(s) | Description          |
|-----| ------ | ------------- | -------------------- |
| onDragStart | funtion | The key of the item being draged   | When drag starts| 
| onDragStop |  funtion | The key of the final position   | When drag stops |
| onItemSwitch |  funtion | The new array of items   | When an item switch |



#### EasyItem Props

|prop| Type   | Default value |Required| Description          |
|-----| ------ | ------------- |---------| -------------------- |
| key | number/string | none   |no| Unique id for the item |






## Credits

Adam Pinheiro

## Authors

- **Adam Pinheiro**
