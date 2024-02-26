import React, { MouseEvent } from 'react'
import styles from '@/styles/buddy.module.css'
import { useBuddy } from './useBuddy'
import { useMenu } from '@/context/MenuContext'
import clsx from 'clsx'

export const Buddy = () => {
  useBuddy()

  const { changePosition } = useMenu()

  function handleContextMenu(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault()
    changePosition(event.clientX, event.clientY, 'canvas')
  }

  return (
    <div className="flex-1 overflow-hidden rounded-t-2xl">
      <div id="text-input-container" className={styles['text-input-container']}>
        <textarea
          id="text-input"
          className={styles['text-input']}
          placeholder="your note"
        />
        <div className={styles['text-button-container']}>
          <button
            id="text-button"
            className={clsx(
              'w-full rounded-lg bg-[#98A3AD] p-[12px] hover:bg-gray-500 disabled:bg-slate-300',
              'font-hoves text-xs font-medium not-italic tracking-[-0.02em] text-[#ffffff]'
            )}
          >
            Save
          </button>
        </div>
      </div>
      <div
        id="canvas-wrapper"
        onContextMenu={handleContextMenu}
        className="h-full w-full"
      ></div>
    </div>
  )
}
