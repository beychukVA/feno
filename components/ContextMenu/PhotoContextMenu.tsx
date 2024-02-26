import { useMenu } from '@/context/MenuContext'
import { IconFile, IconFly, IconTrash } from '../svg/menu-icons'
import { MenuItem } from './MenuItem'

export default function PhotoContextMenu() {
  const { position, menu } = useMenu()

  if (position && position.x && position.y && menu === 'photo') {
    return (
      <div
        className="absolute z-50 mt-2 w-64 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
        style={{ left: position.x + 50, top: position.y }}
      >
        <div className="divide-y py-1 px-2">
          <MenuItem icon={<IconFly />} label="Assign a Photo" />
          <MenuItem icon={<IconFile />} label="Upload Files" />
          <MenuItem icon={<IconTrash />} label="Reject Photo" color="red-500" />
        </div>
      </div>
    )
  }
  return null
}
