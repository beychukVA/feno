import { useMenu } from '@/context/MenuContext'
import React from 'react'

export const MenuItem = (props: {
  onPress?: () => void
  icon: JSX.Element
  label: string
  color?: string
}) => {
  const { removePosition } = useMenu()

  return (
    <a
      onClick={() => {
        removePosition()
        props.onPress && props.onPress()
      }}
      className="flex cursor-pointer flex-row items-center justify-between p-4 text-sm font-medium text-gray-700 hover:bg-gray-100"
    >
      <div className="flex flex-row items-center justify-start">
        <span className="mr-2">{props.icon}</span>
        <span className={`text-${props.color ?? 'dark'}`}>{props.label}</span>
      </div>
      <div>
        <span className="mr-1 rounded bg-[#EFF6FF] p-2 text-center text-xs text-blue-500">
          CTRL
        </span>
        <span className="rounded bg-[#EFF6FF] p-2 text-center text-xs text-blue-500">
          S
        </span>
      </div>
    </a>
  )
}
