import { Mode } from '@/components/Buddy/lasso'
import { Graphics, Text } from 'pixi.js'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface ISprite {
  x: number
  y: number
}

interface IPoint {
  x: number
  y: number
}

export interface INote {
  note: Text
  graphics: Graphics
  points: IPoint[]
}

interface ActionsContextType {
  fullscreen: boolean
  toggleFullscreen: () => void
  hideFullscreen: () => void
  segmentation: boolean
  toggleSegmentation: () => void
  segmentColor: string
  changeSegmentColor: (color: string) => void
  zoom: number
  increaseZoom: () => void
  decreaseZoom: () => void
  lightMenu: boolean
  toggleLightMenu: () => void
  light: number
  changeLight: (value: number) => void
  lightFilter: number
  contrastMenu: boolean
  toggleContrastMenu: () => void
  contrast: number
  changeContrast: (value: number) => void
  contrastFilter: number
  noteMenu: boolean
  toggleNoteMenu: () => void
  renderMode: Mode
  changeRenderMode: (mode: Mode) => void
  spritePosition: ISprite
  changeSpritePosition: (sprite: ISprite) => void
  notes: INote[]
  setNotes: (value: React.SetStateAction<INote[]>) => void
  currDot: Graphics | null
  setCurrDot: (dot: React.SetStateAction<Graphics | null>) => void
}

const ActionsContext = createContext<ActionsContextType>({
  fullscreen: false,
  toggleFullscreen: () => {},
  hideFullscreen: () => {},
  segmentation: false,
  toggleSegmentation: () => {},
  segmentColor: '',
  changeSegmentColor: (color: string) => {},
  zoom: 1,
  increaseZoom: () => {},
  decreaseZoom: () => {},
  lightMenu: false,
  toggleLightMenu: () => {},
  light: 100,
  changeLight: () => {},
  lightFilter: 1,
  contrastMenu: false,
  toggleContrastMenu: () => {},
  contrast: 100,
  changeContrast: () => {},
  contrastFilter: 1,
  noteMenu: false,
  toggleNoteMenu: () => {},
  renderMode: 'move',
  changeRenderMode: (mode: Mode) => {},
  spritePosition: { x: 0, y: 0 },
  changeSpritePosition: (sprite: ISprite) => {},
  notes: [],
  setNotes: (value: React.SetStateAction<INote[]>) => {},
  currDot: null,
  setCurrDot: (dot: React.SetStateAction<Graphics | null>) => {},
})

interface ActionsProviderProps {
  children: React.ReactNode
}

export const ActionsProvider: React.FC<ActionsProviderProps> = ({
  children,
}) => {
  const ZOOM_STEP = 0.1
  const MIN_ZOOM = 0.1
  const MAX_ZOOM = 2
  const [fullscreen, setFullscreen] = useState(false)
  const [segmentation, setSegmentation] = useState(false)
  const [segmentColor, setSegmentColor] = useState('#EF4444')
  const [zoom, setZoom] = useState(1)
  const [lightMenu, setLightMenu] = useState(false)
  const [light, setLight] = useState(100)
  const [lightFilter, setLightFilter] = useState(1)
  const [contrastMenu, setContrastMenu] = useState(false)
  const [contrast, setContrast] = useState(100)
  const [contrastFilter, setContrastFilter] = useState(1)
  const [noteMenu, setNoteMenu] = useState(false)
  const [renderMode, setRenderMode] = useState<Mode>('move')
  const [spritePosition, setSpritePosition] = useState<ISprite>({
    x: 0,
    y: 0,
  })
  const [notes, setNotes] = useState<INote[]>([])
  const [currDot, setCurrDot] = useState<Graphics | null>(null)

  useEffect(() => {
    setLightFilter(light / 100)
  }, [light])

  useEffect(() => {
    setContrastFilter(contrast / 100)
  }, [contrast])

  const changeSpritePosition = (sprite: ISprite) => {
    setSpritePosition(prev => {
      return {
        ...prev,
        x: sprite.x,
        y: sprite.y,
      }
    })
  }

  const toggleSegmentation = () => {
    setSegmentation(cur => !cur)
  }

  const toggleLightMenu = () => {
    setLightMenu(cur => !cur)
  }

  const toggleContrastMenu = () => {
    setContrastMenu(cur => !cur)
  }

  const toggleNoteMenu = () => {
    setNoteMenu(cur => !cur)
    changeRenderMode(noteMenu ? 'move' : 'drawing')
  }

  const toggleFullscreen = () => {
    setFullscreen(cur => !cur)
  }

  const hideFullscreen = () => {
    setFullscreen(false)
  }

  const increaseZoom = () =>
    setZoom(prev => {
      if (+prev.toFixed(1) === MAX_ZOOM) {
        return prev
      }
      return prev + ZOOM_STEP
    })

  const decreaseZoom = () =>
    setZoom(prev => {
      if (+prev.toFixed(1) === MIN_ZOOM) {
        return prev
      }
      return prev - ZOOM_STEP
    })

  const changeLight = (value: number) => setLight(value)
  const changeContrast = (value: number) => setContrast(value)
  const changeRenderMode = (mode: Mode) => setRenderMode(mode)
  const changeSegmentColor = (color: string) => setSegmentColor(color)

  const contextValue: ActionsContextType = {
    fullscreen,
    toggleFullscreen,
    hideFullscreen,
    segmentation,
    toggleSegmentation,
    segmentColor,
    changeSegmentColor,
    zoom,
    increaseZoom,
    decreaseZoom,
    light,
    lightMenu,
    toggleLightMenu,
    changeLight,
    lightFilter,
    contrastMenu,
    toggleContrastMenu,
    contrast,
    changeContrast,
    contrastFilter,
    noteMenu,
    toggleNoteMenu,
    renderMode,
    changeRenderMode,
    spritePosition,
    changeSpritePosition,
    notes,
    setNotes,
    currDot,
    setCurrDot,
  }
  return (
    <ActionsContext.Provider value={contextValue}>
      {children}
    </ActionsContext.Provider>
  )
}

export const useActions = () => useContext(ActionsContext)
