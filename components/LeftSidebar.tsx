import clsx from 'clsx'
import Image from 'next/image'
import photo1 from '../assets/photo_01.png'
import { IconArrowDown, IconMore } from './svg/duotone-icons'
import { IconTime } from './svg/solid-icons'
import { IconCamera } from './svg/icons'
import { useMenu } from '@/context/MenuContext'

export default function LeftSidebar() {
  return (
    <>
      <section className="grid h-screen grid-flow-col gap-1 bg-white p-6 lg:col-span-3">
        <ActionButton />
        <div className="col-span-2 mt-6 grid grid-cols-2">
          <TabButton active>All Photo</TabButton>
          <TabButton>History</TabButton>
        </div>
        <div
          className="col-span-2 row-start-5 divide-y divide-slate-100 overflow-y-scroll"
          id="image-list"
        >
          <ImageCard />
          <ImageCard type="rejected" />
          <ImageCard />
        </div>
      </section>
    </>
  )
}

function TabButton(props: { active?: boolean; children: string }) {
  return (
    <button
      className={clsx(
        'border-b-2 p-2 font-medium transition hover:bg-slate-100',
        props.active ? 'border-slate-300' : 'border-transparent'
      )}
    >
      {props.children}
    </button>
  )
}

function ActionButton() {
  return (
    <button className="col-span-2 w-full">
      <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl p-4 text-left shadow-spread transition hover:scale-105">
        <IconCamera />
        <div>
          <h2 className="font-bold">Image Annotation</h2>
          <p className="text-sm text-slate-400">Something here</p>
        </div>
        <div>
          <IconArrowDown />
        </div>
      </div>
    </button>
  )
}

function ImageCard({ type = 'accepted' }: { type?: 'accepted' | 'rejected' }) {
  const { position, changePosition, removePosition } = useMenu()

  return (
    <div className="mr-2 py-4">
      <div className="flex items-center justify-between">
        <TimeChip theme={type === 'accepted' ? 'green' : 'red'} />
        <button
          className="rounded-full p-1 transition hover:bg-slate-100"
          onClick={({ currentTarget: { offsetLeft, offsetTop } }) => {
            const list = document.getElementById("image-list");
            if (!position) {
              changePosition(offsetLeft, offsetTop - (list?.scrollTop ?? 0), "photo")
            } else {
              removePosition()
            }
          }}
        >
          <IconMore />
        </button>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl">
        <Image src={photo1} alt="Photo 1" className="w-full" />
      </div>
      <div className="mt-4 font-medium">Photo Name</div>
    </div>
  )
}

function TimeChip({ theme = 'green' }: { theme?: 'green' | 'red' }) {
  return (
    <div
      className={clsx(
        'inline-flex items-center rounded-full py-0.5 pl-1 pr-2 text-xs font-medium',
        {
          'bg-green-50 text-green-500': theme === 'green',
          'bg-red-50 text-red-500': theme === 'red',
        }
      )}
    >
      <IconTime height={12} width={12} />
      <span className="ml-1">03:45:12</span>
    </div>
  )
}
