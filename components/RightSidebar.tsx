import clsx from 'clsx'
import React from 'react'
import Slider from './Slider'
import {
  IconArrowLeftCircle,
  IconArrowRightCircle,
  IconCheckCircle,
  IconXCircle,
  IconPlusCircle,
} from './svg/duotone-icons'
import { Textarea } from '@material-tailwind/react'

interface colorstyle {
  [key: string]: string;
}

const colors : colorstyle = {
  red : '#EF4444',
  orange : '#F97316',
  amber : '#F59E0B',
  yellow : '#EAB308',
  lime : '#84CC16',
  green : '#22C55E',
  emerald : '#10B981',
  teal : '#14B8A6',
  cyan : '#06B6D4',
  sky : '#0EA5E9',
  blue : '#3B82F6',
  indigo : '#6366F1',
  violet : '#8B5CF6',
  purple : '#A855F7',
  fuchsia : '#D946EF',
  pink : '#EC4899',
  rose : '#F43F5E'
}


export default function RightSidebar() {
  const [value, setValue] = React.useState(50)

  // const colors = {
  //   'red' : '#EF4444',
  //   'orange' : '#F97316',
  //   'amber' : '#F59E0B',
  //   'yellow' : '#EAB308',
  //   'lime' : '#84CC16',
  //   'green' : '#22C55E',
  //   'emerald' : '#10B981',
  //   'teal' : '#14B89A6',
  //   'cyan' : '#06B6D4',
  //   'sky' : '#0EA5E9',
  //   'blue' : '#3B82F6',
  //   'indigo' : '#6366F1',
  //   'violet' : '#8B5CF6',
  //   'purple' : '#A855F7',
  //   'fuchsia' : '#D946EF',
  //   'pink' : '#EC4899',
  //   'rose' : '#F43F5E'
  // }

  return (
    <section className="h-screen py-6 pr-6 pl-0 lg:col-span-3">
      <div className="flex h-full flex-col items-stretch rounded-2xl bg-white p-4">
        <div className="h-auto">
          <div className="flex items-center justify-between">
            <button className="rounded-full p-1 transition hover:bg-slate-100">
              <IconArrowLeftCircle />
            </button>
            <span className="font-medium">2/5</span>
            <button className="rounded-full p-1 transition hover:bg-slate-100">
              <IconArrowRightCircle />
            </button>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Button icon={<IconCheckCircle />} theme="success">
              Accept
            </Button>
            <Button icon={<IconXCircle />} theme="danger">
              Reject
            </Button>
          </div>
          <div className="mt-2">
            <h3 className="font-medium">Total score</h3>
            <Slider
              min={0}
              max={100}
              step={1}
              values={[value]}
              onChange={([value]) => setValue(value)}
            />
            <section className="mt-3 flex items-center justify-between text-sm">
              <div className="font-medium uppercase">
                Score value:{' '}
                <span className="rounded bg-green-50 px-1 py-0.5 text-green-500">
                  {value}
                </span>
              </div>
              <button
                onClick={() => setValue(0)}
                className="inline-flex items-center justify-center rounded-lg bg-gray-400 px-4 py-1 text-center font-medium text-white transition hover:bg-gray-500/75"
              >
                Reset
              </button>
            </section>
          </div>
          <div className="mt-3">
            <h3 className="font-medium">Comments</h3>
            <div className="mt-4 flex">
              <Textarea
                defaultValue=" "
                className="h-14 rounded-md p-1"
                size="lg"
                placeholder="Please fix tooth segmentation"
              ></Textarea>
            </div>
          </div>
        </div>

        <h3 className="mt-2 font-medium">Class Segmentation</h3>

        <div className="mt-2 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 gap-2 xl:grid-cols-2">
            <ClassSegmentationButton color="red" value="3">
              Receding Gums
            </ClassSegmentationButton>
            <ClassSegmentationButton color="orange" value="3">
              Dental Caries
            </ClassSegmentationButton>
            <ClassSegmentationButton color="amber" value="3">
              Dental Caries
            </ClassSegmentationButton>
            <ClassSegmentationButton color="yellow" value="3">
              Periodontitis
            </ClassSegmentationButton>
            <ClassSegmentationButton color="lime" value="3">
              Receding Gums
            </ClassSegmentationButton>
            <ClassSegmentationButton color="green" value="3">
              Dental Caries
            </ClassSegmentationButton>
            <ClassSegmentationButton color="emerald" value="3">
              Dental Caries
            </ClassSegmentationButton>
            <ClassSegmentationButton color="teal" value="3">
              Periodontitis
            </ClassSegmentationButton>
            <ClassSegmentationButton color="cyan" value="3">
              Receding Gums
            </ClassSegmentationButton>
            <ClassSegmentationButton color="sky" value="3">
              Dental Caries
            </ClassSegmentationButton>
            <ClassSegmentationButton color="blue" value="3">
              Dental Caries
            </ClassSegmentationButton>
            <ClassSegmentationButton color="indigo" value="3">
              Periodontitis
            </ClassSegmentationButton>
            <ClassSegmentationButton color="violet" value="3">
              Receding Gums
            </ClassSegmentationButton>
            <ClassSegmentationButton color="purple" value="3">
              Dental Caries
            </ClassSegmentationButton>
            <ClassSegmentationButton color="fuchsia" value="3">
              Dental Caries
            </ClassSegmentationButton>
            <ClassSegmentationButton color="pink" value="3">
              Periodontitis
            </ClassSegmentationButton>
          </div>

          <div className="mt-2 grid grid-cols-1 gap-2">
            <ClassSegmentationButton color="rose" value="3">
              Dental Caries
            </ClassSegmentationButton>
          </div>
        </div>
        <div className="my-2 text-right">
          <button className="inline-flex items-center justify-center rounded-lg bg-gray-400 py-3 px-2 text-center font-medium text-white transition hover:bg-gray-500/75">
            <IconPlusCircle />
            <span className="ml-2 text-xs">Add Class</span>
          </button>
        </div>

        <div className="h-auto">
          <div className="mt-2 inline-flex w-full items-center justify-between">
            <h3 className="font-medium">Annotation Name</h3>
            <button
              type="button"
              className="rounded-lg bg-[#FEF2F2] p-2 text-center text-xs font-medium text-[#EF4444]"
            >
              *REQUIRED
            </button>
          </div>
          <div className="mt-1 w-full">
            <input
              type="text"
              className="text-dark-900 block w-full rounded-lg border border-gray-300 p-2.5 text-sm"
              placeholder="Some Annotation"
              required
            ></input>
          </div>
        </div>
      </div>
    </section>
  )
}

function Button(props: {
  theme?: 'success' | 'danger'
  icon: JSX.Element
  children: string
}) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-lg p-1 text-center font-medium text-white transition',
        {
          'bg-green-500 hover:bg-green-600': props.theme === 'success',
          'bg-red-500 hover:bg-red-600': props.theme === 'danger',
        }
      )}
    >
      {props.icon} <span className="ml-2">{props.children}</span>
    </button>
  )
}

function ClassSegmentationButton(props: {
  color: string
  value: string
  children: string
}) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center justify-between rounded-full p-2 text-center font-medium text-white transition'
      )}
      style={{ backgroundColor: colors[props.color] }}
    >
      <span className="col-span-8 ml-2 text-xs">{props.children}</span>
      <span
        className="h-4 w-4 rounded-full bg-white text-xs"
        style={{ color: colors[props.color] }}
      >
        {props.value}
      </span>
    </button>
  )
}
