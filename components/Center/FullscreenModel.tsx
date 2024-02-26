import React, { useEffect } from 'react'
import { Buddy } from '../Buddy'
import { IconExpand } from '../svg/menu-icons'
import { useActions } from '@/context/ActionsContent'
import Menu from './Menu'

export const FullscreenModel = () => {
  const { hideFullscreen } = useActions()

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      hideFullscreen()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50">
      <div className="flex min-h-screen items-center justify-center">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 flex flex-col bg-[#F5F6F8] p-6">
            <div className="relative flex flex-1 flex-col">
              <Buddy />
              <button
                onClick={hideFullscreen}
                className="absolute right-4 top-4 flex h-12 w-40 flex-row items-center justify-between rounded bg-gray-500 px-4 text-xs text-white"
              >
                <div className="flex flex-row items-center justify-start">
                  <IconExpand />
                  <span>Minimize</span>
                </div>
                <div>
                  <div className="mr-1 rounded bg-[#EFF6FF] p-2 text-center text-xs text-blue-500">
                    ESC
                  </div>
                </div>
              </button>
              <Menu />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
