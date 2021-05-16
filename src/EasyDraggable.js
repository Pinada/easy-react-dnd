import React, { Component } from 'react'

export class EasyDraggable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      overWidth: null,
      overHeight: null,
      data: []
    }
  }
  down = (e, node, position) => {
    e = e || window.event
    this.pauseEvent(e)
    if (this.props.onDragStart) this.props.onDragStart(node.name)
    document.querySelector('body').style.cursor = this.props.cursor
    this.setState({ isMoving: parseInt(node.id) })
    this.setState({ initial: position })
    // this.setState({ offsetWidth: this.ref.clientWidth })
    // this.setState({ offsetHeight: this.ref.clientHeight })
  }

  pauseEvent = (e) => {
    if (e.stopPropagation) e.stopPropagation()
    if (e.preventDefault) e.preventDefault()
    e.cancelBubble = true
    e.returnValue = false
    return false
  }
  generalHover = (e) => {
    this.setState({ pageX: e.pageX })
    this.setState({ pageY: e.pageY })
  }
  hover = (e, id, i) => {
    let itemIndex = i

    if (this.state.isMoving != null) {
      const temp = [...this.state.data]
      let startingPos = this.state.initial
      let startingElem = temp[startingPos]

      temp.splice(startingPos, 1)
      temp.splice(itemIndex, 0, startingElem)
      this.setState({ initial: itemIndex })
      this.setState({ endKey: itemIndex })
      this.setState({ data: temp })
      if (this.props.onItemSwitch) this.props.onItemSwitch(temp)
    }
  }

  componentDidMount() {
    this.setState({ itemPerRow: this.props.itemsPerRow })
    this.init()
  }

  componentDidUpdate(prevP, prevState) {
    if (this.state.data != prevState.data) {
      if (document.getElementsByClassName('modern-item')[0]) {

        if (this.props.handle){
          const height =
          document.getElementsByClassName('modern-handle')[0].clientHeight

        const width =
          document.getElementsByClassName('modern-handle')[0].clientWidth
        
          this.setState({ offsetWidth: width })
          this.setState({ offsetHeight: height })
        }else{

          const height =
          document.getElementsByClassName('modern-item')[0].clientHeight

        const width =
          document.getElementsByClassName('modern-item')[0].clientWidth
          this.setState({ offsetWidth: width })
          this.setState({ offsetHeight: height })
        }
        const height =
        this.ref.clientHeight

        const width =this.ref.clientWidth
          this.setState({ overWidth: width })
          this.setState({ overHeight: height })
      
      }
    }

    if (this.props.itemsPerRow != prevP.itemsPerRow) {
      this.setState({ itemPerRow: this.props.itemsPerRow })
      this.setState({ overWidth: 'auto' })
      this.setState({ overHeight: 'auto' })
      this.init()
    }

    if (prevP.children.length != this.props.children.length) {
      this.init()
    }
  }
  up = (e) => {
    if (this.props.onDragStop) this.props.onDragStop(this.state.endKey)
    this.setState({ isMoving: null })
    document.querySelector('body').style.cursor = 'auto'
  }

  init = () => {
    let items = [...this.props.children]
    let inside = []
    var next
    let temp = []
    var asHandle = false
    items.length > 0
      ? (items = items.map((item) => Object.assign({}, item)))
      : Object.assign({}, items)

    for (const [i, item] of items.entries()) {
      let isDraggable = true
      if (item) {
        if (item.isDraggable == false) {
          isDraggable = false
        }
      }
      items[i].id = i
      items[i].name = items[i].key

      items[i].isDraggable = isDraggable
    }

    this.setState({ data: items })
  }

  render() {
    let temp = []
    let secu = []
    let gridClass = ''
    let htmlData = []

    const items = [...this.state.data]

    if (items) {
      for (let j = 0; j < this.props.itemsPerRow; j++) {
        gridClass = gridClass + '1fr '
      }

      let onlast = items.length % this.props.itemsPerRow
      let length = this.props.itemsPerRow - onlast

      for (let j = 0; j < length; j++) {
        secu.push(
          <div
            id={items.length + j + '-' + 3}
            onMouseUp={(e) => this.up(e)}
            style={{
              left: this.state.pageX - this.state.offsetWidth / 2,
              top: this.state.pageY - this.state.offsetHeight / 2,
              position: 'relative',
              zIndex: 100,
              height: '100%',
              marginTop: this.props.vSpacing,
              marginBottom: this.props.vSpacing,
              marginLeft: this.props.hSpacing,
              marginRight: this.props.hSpacing
            }}
          >
            &nbsp;
          </div>
        )
      }

      htmlData = items.map((item, i) => {
        if (item) {
          let htmlData = (
            <div
              className='modern-item'
              onMouseDown={(e) =>
                !this.props.handle ? this.down(e, item, i) : ''
              }
              onMouseEnter={(e) => this.hover(e, item, i)}
              onMouseUp={(e) => this.up(e, item.id)}
              ref={(ref) => {
                this.ref = ref
              }}
              style={
                this.state.isMoving == item.id
                  ? {
                      marginTop: this.props.vSpacing,
                      marginBottom: this.props.vSpacing,
                      position: 'static',
                      zIndex: 100,
                      width: this.state.overWidth,
                      height: this.state.overHeight,
                      marginLeft: this.props.hSpacing,
                      marginRight: this.props.hSpacing
                    }
                  : {
                      marginTop: this.props.vSpacing,
                      marginBottom: this.props.vSpacing,
                      position: 'relative',
                      zIndex: 110,
                      width: this.state.overWidth,
                      height: this.state.overHeight,
                      marginLeft: this.props.hSpacing,
                      marginRight: this.props.hSpacing
                    }
              }
            >
              <div
                id={item.id + '-' + i}
                style={
                  this.state.isMoving == item.id
                    ? {
                        width: this.state.overWidth,
                        height: this.state.overHeight,
                        position: 'absolute',
                        zIndex: 101,
                        left: this.state.pageX - this.state.offsetWidth / 2,
                        top: this.state.pageY - this.state.offsetHeight / 2
                      }
                    : {
                        width: this.state.overWidth,
                        height: this.state.overHeight
                      }
                }
              >
                {this.props.handle && (
                  <div style={{display:"inline-block"}} className="modern-handle" onMouseDown={(e) => this.down(e, item, i)}>{this.props.handle}</div>
                )}
                {item.props ? item.props.children : item}
              </div>
            </div>
          )

          if (items.length <= this.props.itemsPerRow) {
            temp.push(htmlData)
            if (i == items.length - 1) {
              return (
                <div
                  style={{
                    overflow: 'hidden',
                    display: 'grid',
                    gridTemplateColumns: gridClass,
                    position: 'static'
                  }}
                >
                  {temp}
                </div>
              )
            }
          } else {
            temp.push(htmlData)
            if (i == items.length - 1) {
              return (
                <div>
                  <div
                    style={{
                      overflow: 'hidden',
                      display: 'grid',
                      gridTemplateColumns: gridClass,
                      position: 'static'
                    }}
                  >
                    {temp}
                    {secu}
                  </div>
                </div>
              )
            }
          }
        }
      })
    }

    return (
      <div
        style={{ maxWidth: '100vw', overflow: 'hidden' }}
        onMouseMove={(e) => this.generalHover(e)}
      >
        {htmlData}
      </div>
    )
  }
}
