import type { SVGProps } from 'react'

export function IconCamera(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width={40} height={40} rx={8} fill="#D2C3B4" />
      <g fill="#fff">
        <path d="M26.34 18.423v6.517H13.66v-8.153h3.583v-.83c0-.496.403-.897.897-.897h4.164c.495 0 .896.403.896.897v.83h4.798v-1.66h-3.275a2.563 2.563 0 00-2.42-1.727H18.14c-1.12 0-2.073.724-2.42 1.727H12V26.6h16v-8.177h-1.66z" />
        <path d="M20.065 17.314a3.086 3.086 0 00-3.083 3.082c0 1.7 1.383 3.083 3.083 3.083 1.7 0 3.083-1.382 3.083-3.083 0-1.7-1.382-3.082-3.083-3.082zm0 4.505a1.424 1.424 0 010-2.845 1.424 1.424 0 010 2.845z" />
      </g>
      <defs>
        <clipPath id="clip0_713_1836">
          <path
            fill="#fff"
            transform="translate(12 13.4)"
            d="M0 0H16V13.1993H0z"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
