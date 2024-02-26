import React from 'react'
import { Range, getTrackBackground } from 'react-range'

const primaryColor = '#98A3AD'
const secondaryColor = '#98A3AD29'

type Props = {
  min: number
  max: number
  step: number
  values: number[]
  onFinalChange?: (values: number[]) => void
  onChange: (values: number[]) => void
}

export default function Slider({
  min = 0,
  max = 100,
  step = 1,
  values,
  onChange,
  onFinalChange,
}: Props) {
  return (
    <Range
      values={values}
      step={step}
      min={min}
      max={max}
      onChange={onChange}
      onFinalChange={onFinalChange}
      renderTrack={({ props, children }) => (
        <div
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          className="flex h-6 w-full"
          style={{ ...props.style }}
        >
          <div
            ref={props.ref}
            className="h-2 w-full self-center rounded"
            style={{
              background: getTrackBackground({
                values,
                colors: [primaryColor, secondaryColor],
                min,
                max,
              }),
            }}
          >
            {children}
          </div>
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          className="flex h-4 w-4 items-center justify-center rounded-full bg-white focus:outline-none"
          style={{ ...props.style }}
        >
          <div
            className="h-3 w-3 rounded-full"
            style={{
              backgroundColor: primaryColor,
            }}
          />
        </div>
      )}
    />
  )
}
