import { createContext, useContext, useState } from "react"

interface Position {
  x: number
  y: number
}

type Menu = 'photo' | 'canvas' | null

interface MenuContextType {
  position: Position | null
  menu: Menu | null
  changePosition: (x: number, y: number, menu: Menu) => void
  removePosition: () => void
}

const MenuContext = createContext<MenuContextType>({
  position: null,
  menu: null,
  changePosition: () => {},
  removePosition: () => {},
})

interface MenuProviderProps {
  children: React.ReactNode
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [position, setPosition] = useState<Position | null>(null)
  const [menu, setMenu] = useState<Menu>(null)


  const changePosition = (x: number, y: number, menu: Menu) => {
    setPosition({ x, y })
    setMenu(menu)
  }

  const removePosition = () => {
    setPosition(null)
    setMenu(null)
  }

  const contextValue: MenuContextType = {
    menu,
    position,
    changePosition,
    removePosition,
  }

  return (
    <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
  )
}

export const useMenu = () => useContext(MenuContext)
