import { Graphics } from 'pixi.js'
import { createContext, useContext, useState } from 'react'

interface DrawerContextType {
  shapes: Graphics[]
  addShape: (s: Graphics) => void,
}

const DrawerContext = createContext<DrawerContextType>({
  shapes: [],
  addShape: (s: Graphics) => {},
});

interface DrawerProviderProps {
  children: React.ReactNode
}

export const DrawerProvider: React.FC<DrawerProviderProps> = ({ children }) => {
  const [shapes, setShapes] = useState<Graphics[]>([])
 
  const addShape = (s: Graphics) => {
    setShapes(cur => [...cur, s])
  }
  const contextValue: DrawerContextType = {
    shapes,
    addShape,
  }
  return (
    <DrawerContext.Provider value={contextValue}>{children}</DrawerContext.Provider>
  )
}

export const useDrawer = () => useContext(DrawerContext)
