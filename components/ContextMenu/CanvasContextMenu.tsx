import { useActions } from '@/context/ActionsContent'
import { useMenu } from '@/context/MenuContext'
import {
  IconPen,
  IconWrappedPen,
  IconDarkExpand,
  IconComment,
} from '../svg/menu-icons'
import { MenuItem } from './MenuItem'

export default function CanvasContextMenu() {
  const { position, menu } = useMenu()
  const { toggleFullscreen, toggleSegmentation, toggleNoteMenu } = useActions()

  if (position && position.x && position.y && menu === 'canvas') {
    return (
      <div
        className="absolute z-50 mt-2 w-60 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
        style={{ left: position.x, top: position.y }}
      >
        <div className="divide-y py-1 px-2">
          <MenuItem
            onPress={() => {
              toggleFullscreen()
            }}
            icon={<IconDarkExpand />}
            label="Full-Screen"
          />
          <MenuItem
            onPress={() => {
              toggleSegmentation()
            }}
            icon={<IconPen />}
            label="Segment"
          />
          <MenuItem
            onPress={() => {
              toggleNoteMenu()
            }}
            icon={<IconComment />}
            label="Comment"
          />
          <MenuItem icon={<IconWrappedPen />} label="Quick Actions" />
        </div>
      </div>
    )
  }
  return null
}
