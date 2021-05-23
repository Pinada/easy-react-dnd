import React, { Component } from 'react'

export class EasyDraggable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      overWidth: null,
      overHeight: null,
      data: [],
      opacity: 1,
      clickX: 0,
      clickY: 0,
      enter: false,
      transition: ''
    }
  }
  down = (e, node, position) => {
    let currentTargetRect = e.currentTarget.getBoundingClientRect()
    const event_offsetX = e.pageX - window.pageXOffset - currentTargetRect.left,
      event_offsetY = e.pageY - window.pageYOffset - currentTargetRect.top

    this.setState({ clickX: event_offsetX })
    this.setState({ clickY: event_offsetY })

    this.setState({ cursor: this.props.cursor })
    this.setState({ transition: '' })
    if (this.props.onDragStart) this.props.onDragStart(node.name)

    this.setState({ topBefore: e.currentTarget.getBoundingClientRect().top })
    this.setState({ leftBefore: e.currentTarget.getBoundingClientRect().left })
    this.setState({ isStartMoving: parseInt(node.id) })
    this.setState({ initial: position })
  }

  pauseEvent = (e) => {
    if (e.stopPropagation) e.stopPropagation()
    if (e.preventDefault) e.preventDefault()
    e.cancelBubble = true
    e.returnValue = false
    return false
  }
  generalHover = (e) => {
    this.pauseEvent(e)
    this.setState({ pageX: e.pageX })
    this.setState({ pageY: e.pageY })

    if (this.state.isStartMoving != null) {
      this.setState({ isMoving: this.state.isStartMoving })
    }
  }
  hover = (e, id, i) => {
    this.pauseEvent(e)
    let itemIndex = i

    if (this.state.isMoving != null) {
      this.setState({ transition: '' })

      if (this.props.transition == 'opacity') {
        this.setState({ opacity: 0 }, () => {
          this.setState({ transition: 'opacity 0.4s ' })
        })
        setTimeout(() => {
          this.setState({ opacity: 1 })
        }, 50)
      }
     

     this.setState({ transition: 'all 0.3s ease-in-out' }) 

 
    //    let left= e.currentTarget.getBoundingClientRect().left

    //   let top = e.currentTarget.getBoundingClientRect().top
    //   let topDif = 0
    //   let leftDif = 0


    //   topDif = top - this.state.topBefore
    //   leftDif = left - this.state.leftBefore

    //   if (topDif>0 || leftDif>0){
    //     this.setState({ transform: 'translateY(-' + topDif + 'px) translateX(-'+leftDif+'px)' })
    //   }else{
    //     topDif =  this.state.topBefore-top
    //     leftDif =  this.state.leftBefore-left
    //     this.setState({ transform: 'translateY(' + topDif + 'px) translateX('+leftDif+'px)' })
    //   }
   
    // var tB=e.currentTarget.getBoundingClientRect().top
    // var lB=e.currentTarget.getBoundingClientRect().left

    // e.currentTarget.addEventListener('transitionend', () => {
   
    //     this.setState({ transition: '' }) 
       
    //     this.setState({ topBefore: tB })
    //     this.setState({ leftBefore: lB })
    //     this.setState({ test: 10000000 })
      
    
    //   });

      const temp = [...this.state.data]
      let startingPos = this.state.initial

      this.setState({ test: itemIndex })
      let startingElem = temp[startingPos]
      this.setState({ itemIndex: itemIndex })

      temp.splice(startingPos, 1)
      temp.splice(itemIndex, 0, startingElem)
      this.setState({ initial: itemIndex })
      this.setState({ endKey: itemIndex })
      if (this.props.onItemSwitch) this.props.onItemSwitch(temp)
      this.setState({ data: temp })
     
    } else {
      if (this.props.onItemHover) {
        this.props.onItemHover(id.key, i)
      }
    }
  }

  componentDidMount() {
    this.setState({ itemPerRow: this.props.itemsPerRow })
    this.init()
    window.addEventListener('resize', (e) => {
      if (this.ref) {
        const height = this.ref.clientHeight
        const width = this.ref.clientWidth
        this.setState({ overWidth: width })
        this.setState({ overHeight: height })
      }
    })
  }

  componentDidUpdate(prevP, prevState) {
    if (
      prevP.children != this.props.children &&
      this.state.isStartMoving == null
    ) {
      this.init()

      if (this.ref) {
        const height = this.ref.clientHeight
        const width = this.ref.clientWidth
        this.setState({ overWidth: width })
        this.setState({ overHeight: height })
      }
    }

    if (this.state.data != prevState.data) {
      if (document.getElementsByClassName('modern-item')[0]) {
        if (this.props.handle) {
          const height =
            document.getElementsByClassName('modern-handle')[0].clientHeight

          const width =
            document.getElementsByClassName('modern-handle')[0].clientWidth

          this.setState({ offsetWidth: width })
          this.setState({ offsetHeight: height })
        } else {
          const height =
            document.getElementsByClassName('modern-item')[0].clientHeight

          const width =
            document.getElementsByClassName('modern-item')[0].clientWidth
          this.setState({ offsetWidth: width })
          this.setState({ offsetHeight: height })
        }

        let height = this.state.height
        let width = this.state.width
        if (this.ref) {
          height = this.ref.clientHeight
          width = this.ref.clientWidth
        }

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
    this.pauseEvent(e)
  
    if (this.props.onDragStop) this.props.onDragStop(this.state.endKey)
    this.setState({ isMoving: null })
    this.setState({ isStartMoving: null })
  
  }

  init = () => {
    let items = [...this.props.children]
    this.setState({ cursor: this.props.cursor })
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
              left: this.state.pageX - this.state.clickX,
              top: this.state.pageY - this.state.clickY,
              position: 'relative',
              zIndex: 100,
              height: '100%',
              cursor: this.props.handle ? 'auto' : this.state.cursor,
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
              style={{
                overflow: 'hidden',
                minWidth: 0
              }}
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
                      height: 'auto',
                      width: 'auto',
                      marginLeft: this.props.hSpacing,
                      marginRight: this.props.hSpacing
                    }
              }
            >
              <div
                id={item.id + '-' + i}
                ref={(ref) => {
                  if (i == this.state.test) {
                    this.moving = ref
                  }

                  if (i == this.state.initial) {
                    this.before = ref
                  }

                 
                }}
                style={
                  this.state.isMoving == item.id
                    ? {
                        cursor: this.props.handle ? 'auto' : this.state.cursor,

                        width: this.state.overWidth,
                        height: this.state.overHeight,
                        position: 'absolute',
                        left: this.state.pageX - this.state.clickX,
                        top: this.state.pageY - this.state.clickY
                      }
                    : {
                        transition: this.state.transition,
                        opacity:
                          i == this.state.test &&
                          this.props.transition == 'opacity'
                            ? this.state.opacity
                            : 1,
                        cursor: this.props.handle ? 'auto' : this.state.cursor,
                        transform:
                          i == this.state.test ? this.state.transform : '',
                        height: 'auto',
                        width: 'auto'
                      }
                }
              >
                {this.props.handle && (
                  <div
                    style={{
                      cursor: this.props.handle ? 'auto' : this.state.cursor,
                      display: 'inline-block'
                    }}
                    className='modern-handle'
                    onMouseDown={(e) => this.down(e, item, i)}
                  >
                    {this.props.handle}
                  </div>
                )}
                <div
                  style={
                    (!this.props.handle
                      ? {
                          width: this.state.overWidth,
                          height: this.state.overHeight,
                          position: 'relative',
                          zIndex: 120
                        }
                      : { position: 'relative', zIndex: 120 },
                    this.state.isMoving == item.id
                      ? {
                          cursor: this.props.handle
                            ? 'auto'
                            : this.state.cursor,

                          width: this.state.overWidth,
                          height: this.state.overHeight
                        }
                      : {
                          height: 'auto',
                          width: 'auto'
                        })
                  }
                >
                  {item.props ? item.props.children : item}
                </div>
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
                    minHeight: 0,
                    minWidth: 0,
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
                      minHeight: 0,
                      minWidth: 0,
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
        ref={(ref) => {
          this.cursor = ref
        }}
        style={{ maxWidth: '100vw', overflow: 'hidden' }}
        onMouseMove={(e) => this.generalHover(e)}
      >
        {htmlData}
      </div>
    )
  }
}
