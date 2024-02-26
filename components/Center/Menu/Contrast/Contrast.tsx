import Slider from '@/components/Slider'
import { useActions } from '@/context/ActionsContent'
import React from 'react'

interface IProps {
  onClose: (isOpen: boolean) => void
}

export const Contrast: React.FC<IProps> = ({ onClose }) => {
  const { contrast, changeContrast } = useActions()

  return (
    <>
      <div
        className="fixed top-0 left-0 z-[999] h-full w-full"
        onClick={() => onClose(false)}
      ></div>
      <div className="absolute bottom-[calc(100%+16px)] left-[16px] z-[9999] flex flex-col items-start rounded-2xl bg-[#FFFFFF] p-[16px] shadow-spread">
        <div className="min-w-[100px]">
          <h3 className="font-medium">Contrast - {contrast}%</h3>
          <Slider
            min={0}
            max={200}
            step={1}
            values={[contrast]}
            onChange={([value]) => changeContrast(value)}
          />
        </div>
      </div>
    </>
  )
}
