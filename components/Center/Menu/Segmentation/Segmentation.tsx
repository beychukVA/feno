import { useActions } from '@/context/ActionsContent'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
interface IProps {
  onClose: (isOpen: boolean) => void
}

const colors = [
  {
    id: 1,
    color: '#EF4444',
    name: 'red',
  },
  {
    id: 2,
    color: '#F97316',
    name: 'orange',
  },
  {
    id: 3,
    color: '#F59E0B',
    name: 'amber',
  },
  {
    id: 4,
    color: '#EAB308',
    name: 'yellow',
  },
  {
    id: 5,
    color: '#84CC16',
    name: 'lime',
  },
  {
    id: 6,
    color: '#22C55E',
    name: 'green',
  },
  {
    id: 7,
    color: '#10B981',
    name: 'emerald',
  },
  {
    id: 8,
    color: '#14B8A6',
    name: 'teal',
  },
  {
    id: 9,
    color: '#06B6D4',
    name: 'cyan',
  },
  {
    id: 10,
    color: '#0EA5E9',
    name: 'sky',
  },
  {
    id: 11,
    color: '#3B82F6',
    name: 'blue',
  },
  {
    id: 12,
    color: '#6366F1',
    name: 'indigo',
  },
  {
    id: 13,
    color: '#8B5CF6',
    name: 'violet',
  },
  {
    id: 14,
    color: '#A855F7',
    name: 'purple',
  },
  {
    id: 15,
    color: '#D946EF',
    name: 'fuchsia',
  },
  {
    id: 16,
    color: '#EC4899',
    name: 'pink',
  },
  {
    id: 17,
    color: '#F43F5E',
    name: 'rose',
  },
]

export const Segmentation: React.FC<IProps> = ({ onClose }) => {
  const { segmentColor, changeSegmentColor } = useActions()
  const [selectedColor, setSelectedColor] = useState(segmentColor)

  return (
    <>
      <div
        className="fixed top-0 left-0 z-[999] h-full w-full"
        onClick={() => onClose(false)}
      ></div>
      <div className="absolute bottom-[calc(100%+16px)] left-[16px] z-[9999] flex flex-col items-start rounded-2xl bg-[#FFFFFF] p-[16px] shadow-spread">
        <span className="mb-[8px] font-hoves text-[14px] font-medium not-italic leading-[120%] tracking-[-0.02em] text-[#141920]">
          Colours
        </span>
        <div className="mb-4 grid grid-cols-5 gap-2">
          {colors.map((color, index) => {
            return (
              <ClassSegmentationButton
                selectedColor={selectedColor}
                onChangeColor={setSelectedColor}
                key={`segment-color-${index}`}
                color={color.color}
                value={color.id}
              >
                RG
              </ClassSegmentationButton>
            )
          })}
        </div>
        <button
          onClick={() => {
            if (selectedColor) {
              changeSegmentColor(selectedColor)
              onClose(false)
            }
          }}
          disabled={!selectedColor}
          className={clsx(
            'w-full rounded-lg bg-[#98A3AD] p-[12px] hover:bg-gray-500 disabled:bg-slate-300',
            'font-hoves text-xs font-medium not-italic tracking-[-0.02em] text-[#ffffff]'
          )}
        >
          Apply
        </button>
      </div>
    </>
  )
}

function ClassSegmentationButton(props: {
  color: string
  value: number
  children: string
  onChangeColor: (color: string) => void
  selectedColor: string
}) {
  return (
    <button
      onClick={() =>
        props.onChangeColor(
          props.selectedColor === props.color ? '' : props.color
        )
      }
      className={clsx(
        'inline-flex items-center justify-center rounded-[48px] p-[6px] text-center font-medium text-white transition',
        `${
          props.selectedColor === props.color
            ? 'border-[1.5px] border-solid border-custom-black'
            : 'border-[1.5px] border-solid border-inherit'
        }`
      )}
      style={{ backgroundColor: props.color }}
    >
      <span
        className="h-4 w-5 rounded-full bg-[#F7FEE7] pl-[2px] pr-[2px] font-hoves text-[10px]"
        style={{ color: props.color }}
      >
        {props.value}
      </span>
      <span className="col-span-8 ml-[4px] font-hoves text-[10px]">
        {props.children}
      </span>
    </button>
  )
}
