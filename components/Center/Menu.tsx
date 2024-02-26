import { useActions } from '@/context/ActionsContent'
import clsx from 'clsx'
import React from 'react'
import {
  IconDrop,
  IconEdit,
  IconExpand,
  IconFilter,
  IconMagnifyingMinus,
  IconMagnifyingPlus,
  IconMessage,
  IconSpinner,
  IconSun,
} from '../svg/duotone-light-icons'
import { Contrast } from './Menu/Contrast/Contrast'
import { Light } from './Menu/Light/Light'
import { Segmentation } from './Menu/Segmentation/Segmentation'

const Menu = () => {
  const {
    fullscreen,
    toggleFullscreen,
    segmentation,
    toggleSegmentation,
    increaseZoom,
    decreaseZoom,
    lightMenu,
    toggleLightMenu,
    contrastMenu,
    toggleContrastMenu,
    noteMenu,
    toggleNoteMenu,
  } = useActions()

  return (
    <div className="relative h-20">
      {segmentation && <Segmentation onClose={toggleSegmentation} />}
      {lightMenu && <Light onClose={toggleLightMenu} />}
      {contrastMenu && <Contrast onClose={toggleContrastMenu} />}
      <div className="grid grid-cols-[repeat(9,1fr)] rounded-b-2xl bg-white p-4">
        <Button
          isSelected={segmentation}
          icon={<IconEdit stroke={segmentation ? '#ffffff' : '#98A3AD'} />}
          onClick={() => {
            toggleSegmentation()
          }}
          tootip={
            <p>
              Edit — <Kbd>CTRL</Kbd> <Kbd>E</Kbd>
            </p>
          }
        />
        <Button
          isSelected={noteMenu}
          onClick={() => {
            toggleNoteMenu()
          }}
          icon={<IconMessage stroke={noteMenu ? '#ffffff' : '#98A3AD'} />}
          tootip={
            <p>
              Note — <Kbd>CTRL</Kbd> <Kbd>N</Kbd>
            </p>
          }
        />
        <Button
          onClick={() => {
            increaseZoom()
          }}
          icon={<IconMagnifyingPlus />}
          tootip={
            <p>
              Zoom in — <Kbd>CTRL</Kbd> <Kbd>+</Kbd>
            </p>
          }
        />
        <Button
          onClick={() => {
            decreaseZoom()
          }}
          icon={<IconMagnifyingMinus />}
          tootip={
            <p>
              Zoom out — <Kbd>CTRL</Kbd> <Kbd>-</Kbd>
            </p>
          }
        />
        <Button
          isSelected={lightMenu}
          onClick={() => {
            toggleLightMenu()
          }}
          icon={<IconSun stroke={lightMenu ? '#ffffff' : '#98A3AD'} />}
          tootip={
            <p>
              Light — <Kbd>CTRL</Kbd> <Kbd>L</Kbd>
            </p>
          }
        />
        <Button
          icon={<IconSpinner />}
          tootip={
            <p>
              Focus — <Kbd>CTRL</Kbd> <Kbd>F</Kbd>
            </p>
          }
        />
        <Button
          isSelected={contrastMenu}
          onClick={() => {
            toggleContrastMenu()
          }}
          icon={<IconDrop stroke={contrastMenu ? '#ffffff' : '#98A3AD'} />}
          tootip={
            <p>
              Drop — <Kbd>CTRL</Kbd> <Kbd>D</Kbd>
            </p>
          }
        />
        <Button
          icon={<IconFilter />}
          tootip={
            <p>
              Filter — <Kbd>CTRL</Kbd> <Kbd>F</Kbd>
            </p>
          }
        />
        <Button
          isSelected={fullscreen}
          icon={<IconExpand stroke={fullscreen ? '#ffffff' : '#98A3AD'} />}
          onClick={() => {
            toggleFullscreen()
          }}
          tootip={
            <p>
              Expand — <Kbd>CTRL</Kbd> <Kbd>E</Kbd>
            </p>
          }
        />
      </div>
    </div>
  )
}

function Button(props: {
  isSelected?: boolean
  icon: JSX.Element
  tootip?: JSX.Element | string
  onClick?: () => void
}) {
  return (
    <div className="group relative inline-flex justify-center">
      {props.tootip && (
        <div className="absolute bottom-full mb-2 hidden whitespace-nowrap rounded-lg border border-slate-200 bg-white p-2 text-center text-sm font-medium text-slate-500 shadow-spread group-hover:block">
          {props.tootip}
        </div>
      )}
      <button
        onClick={props.onClick}
        className={clsx(
          'inline-flex w-full justify-center rounded-lg p-2 transition hover:bg-slate-100',
          props.isSelected ? 'bg-[#98A3AD]' : ''
        )}
      >
        {props.icon}
      </button>
    </div>
  )
}

function Kbd(props: { children: string }) {
  return (
    <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-500">
      {props.children}
    </span>
  )
}

export default Menu
