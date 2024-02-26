import React, { useEffect, useRef, useState } from 'react'
import {
  Application,
  Assets,
  FederatedPointerEvent,
  Graphics,
  LINE_CAP,
  LINE_JOIN,
  Sprite,
  Text,
  TextStyle,
} from 'pixi.js'
import { AdjustmentFilter } from '@pixi/filter-adjustment'
import { dragElement, isClose, Mode } from './lasso'
import { INote, useActions } from '@/context/ActionsContent'

export const useBuddy = () => {
  const {
    zoom,
    lightFilter,
    contrastFilter,
    renderMode,
    segmentColor,
    spritePosition,
    changeSpritePosition,
    notes,
    setNotes,
    currDot,
    setCurrDot,
  } = useActions()
  const sp = useRef<Sprite | null>(null)
  const [text, setText] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>()
  const txtRef = useRef<HTMLElement>()
  const saveButtonRef = useRef<HTMLButtonElement>()
  const main = useRef<HTMLElement>()
  const app = useRef<Application>()
  const [editNote, setEditNote] = useState<Text | null>(null)

  useEffect(() => {
    txtRef.current = document.getElementById(
      'text-input-container'
    ) as HTMLElement
    inputRef.current = document.getElementById(
      'text-input'
    ) as HTMLTextAreaElement
    saveButtonRef.current = document.getElementById(
      'text-button'
    ) as HTMLButtonElement

    if (saveButtonRef.current) {
      saveButtonRef.current.onclick = () => {
        if (inputRef.current?.value && txtRef.current) {
          setText(inputRef.current?.value)
          txtRef.current.style.visibility = 'hidden'
        }
      }
    }
  }, [])

  useEffect(() => {
    if (text) {
      setNotes(prev => {
        let tmp = [...prev]
        let updNote = null
        if (editNote) {
          const tmpNote = tmp.find(
            prevNote => prevNote.note.text === editNote.text
          )
          if (tmpNote) {
            updNote = tmpNote
            tmp = tmp.filter(
              prevNote => prevNote.note.text !== tmpNote?.note.text
            )
          }
        } else {
          updNote = tmp.pop()
        }

        if (updNote) {
          updNote.note.text = text
          tmp.push(updNote)
        }
        setEditNote(null)
        return tmp
      })
    }
  }, [text])

  const createLabel = (text: string) => {
    const style = new TextStyle({
      fill: segmentColor,
      fontFamily: 'Comic Sans MS',
      wordWrap: true,
      fontSize: 14,
      wordWrapWidth: 200,
      breakWords: true,
    })
    const textLabel = new Text(text, style)
    textLabel.renderId = Math.random()
    textLabel.name = 'text'
    return textLabel
  }

  const addNote = (note: INote) => {
    setNotes(prev => [...prev, note])
  }

  const removeNote = (note: Graphics) => {
    setNotes(prev =>
      prev.filter(prevNote => prevNote.graphics.renderId !== note.renderId)
    )
  }

  useEffect(() => {
    if (!main.current || !app.current) {
      main.current = document.getElementById('canvas-wrapper')!
      app.current = new Application({
        width: main.current.offsetWidth,
        height: main.current.offsetHeight,
        antialias: true,
      })
    }
  }, [])

  useEffect(() => {
    main?.current?.replaceChildren(app?.current?.view as any)
    let currentLine: Graphics | null = null
    let points: { x: number; y: number }[] = []

    let shape: Graphics | null = null
    const canvas: any = document.querySelector('#canvas-wrapper')!
    const inp: any = document.querySelector('#text-input')!

    if (renderMode === 'move') {
      if (txtRef.current) txtRef.current.style.visibility = 'hidden'
      setText('')
    }

    const click = (e: FederatedPointerEvent) => {
      const spPos = sp?.current?.toLocal(e.global)

      if (renderMode === 'drawing' && points.length && shape) {
        const last = points[points.length - 1]
        shape.moveTo(last.x, last.y)

        if (points.length > 2 && isClose(spPos!, points[0], 10)) {
          shape.lineTo(points[0].x, points[0].y)
          shape.closePath()

          const p = new Graphics()
          p.renderId = Math.random()
          p.lineStyle({
            width: 2.0,
            color: segmentColor,
            alpha: 1,
            alignment: 1,
            cap: LINE_CAP.BUTT,
            join: LINE_JOIN.ROUND,
          })
          p.beginFill(segmentColor, 0.2)
          p.drawPolygon(points)
          p.closePath()
          p.endFill()

          sp?.current?.removeChild(shape)
          if (currentLine) sp?.current?.removeChild(currentLine)

          const textLabel = createLabel('')
          textLabel.position.set(p.x, p.y)

          addNote({
            note: textLabel,
            graphics: p,
            points: points,
          })

          shape = null
          points = []
          setText('')
          if (inputRef.current) {
            inputRef.current.value = ''
          }

          sp?.current?.addChild(p, textLabel)

          setTimeout(() => {
            inp.focus()
          }, 100)

          if (txtRef.current) {
            txtRef.current.style.visibility = 'visible'
            txtRef.current.style.left = `${
              Number(canvas.offsetLeft) + e.global.x
            }px`
            txtRef.current.style.top = `${
              Number(canvas.offsetTop) + e.global.y
            }px`
          }
          return
        } else {
          if (spPos) shape.lineTo(spPos.x, spPos.y)
        }

        if (shape) {
          sp?.current?.removeChild(shape)
          sp?.current?.addChild(shape)
        }
      } else {
        shape = new Graphics()
        shape.lineStyle({
          width: 2.0,
          color: segmentColor,
          alpha: 1,
          cap: LINE_CAP.BUTT,
          join: LINE_JOIN.ROUND,
        })
      }

      points.push({
        ...spPos!,
      })
    }

    const mousemove = (e: FederatedPointerEvent) => {
      if (points.length === 0 || renderMode !== 'drawing') return

      const spPos = sp?.current?.toLocal(e.global)
      const last = points[points.length - 1]

      if (currentLine) sp?.current?.removeChild(currentLine)

      const line = new Graphics()
      if (spPos) {
        line.moveTo(last.x, last.y).lineStyle({
          width: 2.0,
          color: segmentColor,
          alpha: 1,
          cap: LINE_CAP.BUTT,
          join: LINE_JOIN.ROUND,
        })
        line.lineTo(spPos.x, spPos.y)
        line.closePath()
      }

      sp?.current?.addChild(line)
      currentLine = line

      if (points.length > 2 && isClose(spPos!, points[0], 10)) {
        sp.current!.cursor = 'copy'
      } else {
        sp.current!.cursor = 'pointer'
      }
    }

    Assets.load('/bunny.png').then(t => {
      sp.current = new Sprite(t)
      sp.current.interactive = true
      sp.current.width = sp.current.width * zoom
      sp.current.height = sp.current.height * zoom
      if (app?.current?.renderer?.width) {
        sp.current.x =
          spritePosition.x === 0
            ? app?.current?.renderer?.width / 2
            : spritePosition.x
      }
      if (app?.current?.renderer?.height) {
        sp.current.y =
          spritePosition.y === 0
            ? app?.current?.renderer?.height / 2
            : spritePosition.y
      }
      sp.current.anchor.x = 0.5
      sp.current.anchor.y = 0.5

      sp?.current?.removeChildren()

      notes?.map((note, noteIndex) => {
        if (note.graphics && sp.current) {
          const p = new Graphics()
          p.renderId = Math.random()
          p.name = 'shape'
          p.lineStyle({
            width: 2.0,
            color: note.graphics.line.color,
            alpha: 1,
            alignment: 1,
            cap: LINE_CAP.BUTT,
            join: LINE_JOIN.ROUND,
          })
          p.beginFill(note.graphics.line.color, 0.2)
          p.drawPolygon(note.points)
          p.closePath()
          p.endFill()

          if (renderMode === 'drawing') {
            p.interactive = true
            p.cursor = 'no-drop'
          } else {
            p.interactive = false
            p.cursor = 'grab'
          }

          p.on('click', e => {
            e.stopPropagation()
            const shape = e.target as Graphics
            if (shape.name === 'shape') {
              removeNote(note.graphics)
              sp?.current?.removeChild(note.graphics)
              if (txtRef.current) txtRef.current.style.visibility = 'hidden'
            }
          })

          p.on('mouseover', function (e) {
            const dots = e.currentTarget.children as Graphics[]
            dots.map(dot => (dot.visible = true))
          })

          p.on('mouseout', function (e) {
            const dots = e.currentTarget.children as Graphics[]
            dots.map(dot => {
              const [LL, RL] = dot.children as Graphics[]
              if (LL.visible || RL.visible) return (dot.visible = true)
              return (dot.visible = false)
            })
          })

          note.points.map((point, pointIndex) => {
            var pos1 = 0
            var pos2 = 0
            var pos3 = 0
            var pos4 = 0

            const dot = new Graphics()
            dot.renderId = Number(`${noteIndex}${pointIndex}`)
            dot.lineStyle({
              width: 2.0,
              color: note.graphics.line.color,
              alpha: 1,
              alignment: 1,
              cap: LINE_CAP.BUTT,
              join: LINE_JOIN.ROUND,
            })
            dot.cursor = renderMode === 'drawing' ? 'pointer' : 'grab'
            dot.beginFill('#fff', 1)
            dot.drawCircle(point.x, point.y, 3)
            dot.closePath()
            dot.endFill()
            dot.name = 'dot'
            dot.interactive = renderMode === 'drawing' ? true : false
            dot.visible =
              currDot &&
              currDot.renderId === dot.renderId &&
              renderMode === 'drawing'
                ? true
                : false

            const lineL = new Graphics()
            lineL.interactive = true
            lineL.visible =
              currDot &&
              currDot.renderId === dot.renderId &&
              renderMode === 'drawing'
                ? true
                : false
            lineL.lineStyle({
              width: 1.0,
              color: '#FDF4FF',
              alpha: 1,
              alignment: 1,
              cap: LINE_CAP.BUTT,
              join: LINE_JOIN.ROUND,
            })
            lineL.moveTo(point.x - 3, point.y - 3)
            lineL.lineTo(point.x - 35, point.y - 30)

            const cubeL = new Graphics()
            cubeL.name = 'cubeL'
            cubeL.lineStyle({
              width: 1.0,
              color: '#FDF4FF',
              alpha: 1,
              alignment: 1,
              cap: LINE_CAP.BUTT,
              join: LINE_JOIN.ROUND,
            })
            cubeL.beginFill(note.graphics.line.color, 1)
            cubeL.drawRect(point.x - 35, point.y - 30, 4, 4)
            cubeL.closePath()
            cubeL.endFill()
            cubeL.interactive = true
            cubeL.cursor = renderMode === 'drawing' ? 'pointer' : 'grab'

            cubeL.on('click', e => {
              e.stopPropagation()
              const DL = e.currentTarget.parent?.parent as Graphics
              setCurrDot(DL)
            })
            cubeL.on('mouseover', e => e.stopPropagation())
            cubeL.on('mouseout', e => e.stopPropagation())

            lineL.addChild(cubeL)

            const lineR = new Graphics()
            lineR.interactive = true
            lineR.visible =
              currDot &&
              currDot.renderId === dot.renderId &&
              renderMode === 'drawing'
                ? true
                : false
            lineR.lineStyle({
              width: 1.0,
              color: '#FDF4FF',
              alpha: 1,
              alignment: 1,
              cap: LINE_CAP.BUTT,
              join: LINE_JOIN.ROUND,
            })
            lineR.moveTo(point.x + 3, point.y - 3)
            lineR.lineTo(point.x + 35, point.y - 30)

            const cubeR = new Graphics()
            cubeR.name = 'cubeR'
            cubeR.lineStyle({
              width: 1.0,
              color: '#FDF4FF',
              alpha: 1,
              alignment: 1,
              cap: LINE_CAP.BUTT,
              join: LINE_JOIN.ROUND,
            })
            cubeR.beginFill(note.graphics.line.color, 1)
            cubeR.drawRect(point.x + 30, point.y - 30, 4, 4)
            cubeR.closePath()
            cubeR.endFill()
            cubeR.interactive = true
            cubeR.cursor = renderMode === 'drawing' ? 'pointer' : 'grab'

            cubeR.on('click', e => {
              e.stopPropagation()
              const DR = e.currentTarget.parent?.parent as Graphics
              setCurrDot(DR)
            })
            cubeR.on('mouseover', e => e.stopPropagation())
            cubeR.on('mouseout', e => e.stopPropagation())

            lineR.addChild(cubeR)

            dot.addChild(lineL)
            dot.addChild(lineR)

            dot.on('click', e => {
              const D = e.target as Graphics
              if (D.name === 'dot') {
                setCurrDot(dot)
                const children = e.currentTarget.children as Graphics[]
                children.map(line => {
                  if (line.visible) setCurrDot(null)
                  line.visible = !line.visible
                })
              }
            })

            dot.on('mousedown', e => {
              pos3 = e.clientX
              pos4 = e.clientY
            })

            dot.on('mousemove', e => {
              const cube = e.target as Graphics
              if (
                (e.buttons > 0 && cube.name === 'cubeL') ||
                (e.buttons > 0 && cube.name === 'cubeR')
              ) {
                pos1 = pos3 - e.clientX
                pos2 = pos4 - e.clientY
                pos3 = e.clientX
                pos4 = e.clientY

                pos1 = pos1 / zoom
                pos2 = pos2 / zoom

                const x = dot.position.x - pos1
                const y = dot.position.y - pos2
                dot.visible = false
                dot.position.set(x, y)

                const dotL = dot.toLocal(e.global)

                if (cube.name === 'cubeL') {
                  dotL.set(dotL.x + 33, dotL.y + 28)
                }
                if (cube.name === 'cubeR') {
                  dotL.set(dotL.x - 32, dotL.y + 28)
                }

                setNotes(prevNotes => {
                  return prevNotes.map(prevNote => {
                    if (prevNote.note.renderId === note.note.renderId) {
                      const tmpPoints = prevNote.points.map(prevPoint => {
                        if (
                          prevPoint.x === point.x &&
                          prevPoint.y === point.y
                        ) {
                          const updPoint = {
                            x: dotL.x - pos1,
                            y: dotL.y - pos2,
                          }
                          return updPoint
                        }
                        return prevPoint
                      })
                      return { ...prevNote, points: tmpPoints }
                    }
                    return prevNote
                  })
                })
              }
            })
            p.addChild(dot)
          })
          sp?.current?.addChild(p)
        }
        if (note.note && note.graphics) {
          let startTime = 0
          if (renderMode === 'drawing') {
            note.note.interactive = true
            note.note.cursor = 'text'
          } else {
            note.note.interactive = false
            note.note.cursor = 'grab'
          }
          note.note.on('mousemove', e => {
            e.stopPropagation()
            dragElement(note.note, null, zoom)
          })
          note.note.on('mousedown', e => {
            e.stopPropagation()
            startTime = new Date().getTime() / 1000
          })
          note.note.on('click', e => {
            e.stopPropagation()
            const endTime = new Date().getTime() / 1000
            const difference = endTime - startTime
            if (difference < 0.2) {
              if (txtRef.current && inputRef.current) {
                setEditNote(note.note)
                txtRef.current.style.visibility = 'visible'
                inputRef.current.value = note.note.text
                inputRef.current.focus()
              }
            }
          })

          const localBounds = note.graphics.getLocalBounds()

          const x = localBounds.x + localBounds.width / 2 - note.note.width / 2
          const y = localBounds.y + localBounds.height

          note.note.position.set(
            note.note.position.x === Number.POSITIVE_INFINITY ||
              note.note.position.x === 0
              ? x
              : note.note.position.x,
            note.note.position.y === Number.POSITIVE_INFINITY ||
              note.note.position.y === 0
              ? y
              : note.note.position.y
          )

          sp?.current?.addChild(note.note)
        }
      })

      let filters = new AdjustmentFilter({
        brightness: lightFilter,
        contrast: contrastFilter,
      })
      if (app?.current) {
        app.current.stage.filters = [filters]
      }

      dragElement(
        renderMode === 'move' ? sp.current : txtRef.current,
        changeSpritePosition
      )

      sp.current.on('click', click)
      sp.current.on('mousemove', mousemove)

      sp.current.cursor = renderMode === 'move' ? 'grab' : 'crosshair'

      app?.current?.stage.removeChildren()
      app?.current?.stage.addChild(sp.current)
    })

    return () => {
      sp.current?.off('click', click)
      sp.current?.off('mousemove', mousemove)
      // sp.current?.destroy()
      app?.current?.stage.removeChildren()
    }
  }, [
    zoom,
    lightFilter,
    contrastFilter,
    renderMode,
    notes,
    segmentColor,
    text,
    currDot,
  ])

  return {}
}
