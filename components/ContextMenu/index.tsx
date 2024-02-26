import { useMenu } from '@/context/MenuContext'
import React, { useEffect, useRef } from 'react'
import CanvasContextMenu from './CanvasContextMenu'
import PhotoContextMenu from './PhotoContextMenu'

const ContextMenu = () => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { position, menu, removePosition } = useMenu()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        // Add your custom logic here
        if (position && menu) {
          removePosition()
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [wrapperRef, position, menu])

  return (
    <div ref={wrapperRef}>
      <PhotoContextMenu />
      <CanvasContextMenu />
    </div>
  )
}

export default ContextMenu
