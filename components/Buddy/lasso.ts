import { Application } from 'pixi.js'

export type Mode = 'init' | 'drawing' | 'done' | 'move'

export type Point = {
  x: number
  y: number
}

export function isClose(a: Point, b: Point, min: number) {
  return Math.abs(a.x - b.x) <= min && Math.abs(a.y - b.y) <= min
}

export function dragElement(el: any, saveSpritePosition?: any, zoom?: number) {
  var pos1 = 0
  var pos2 = 0
  var pos3 = 0
  var pos4 = 0
  if (el) {
    el.onmousedown = dragMouseDown
  }

  function dragMouseDown(e: any) {
    e = e || window.event
    e.preventDefault()
    //
    pos3 = e.clientX
    pos4 = e.clientY

    if (el.nodeName === 'DIV') {
      document.onmouseup = closeDragElement
      document.onmousemove = elementDrag
      document.onmouseout = closeDragElement
    } else {
      el.on('mouseup', closeDragElement)
      el.on('mousemove', elementDrag)
      el.on('mouseupoutside', closeDragElement)
    }
  }

  function elementDrag(e: any) {
    e = e || window.event
    e.preventDefault()
    //
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY
    //
    if (el.nodeName === 'DIV') {
      el.style.top = el.offsetTop - pos2 + 'px'
      el.style.left = el.offsetLeft - pos1 + 'px'
    } else if (e.button === -1) {
      if (el.name === 'text' || el.name === 'dot') {
        pos1 = pos1 / zoom!
        pos2 = pos2 / zoom!
        el.transform.position.set(
          el.transform.position.x - pos1,
          el.transform.position.y - pos2
        )
      } else {
        el.transform.position.set(
          el.transform.position.x - pos1,
          el.transform.position.y - pos2
        )
        if (saveSpritePosition) {
          saveSpritePosition({
            x: el.transform.position.x,
            y: el.transform.position.y,
          })
        }
      }
    }
  }

  function closeDragElement() {
    if (el.nodeName === 'DIV') {
      document.onmouseup = null
      document.onmousemove = null
      document.onmouseout = null
    } else {
      el.off('mouseup', closeDragElement)
      el.off('mousemove', elementDrag)
      el.off('mouseupoutside', closeDragElement)
    }
  }
}

export const draw = (app: Application) => {}
