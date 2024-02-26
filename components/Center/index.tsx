import { useActions } from '@/context/ActionsContent'
import { Buddy } from '../Buddy'
import { FullscreenModel } from './FullscreenModel'
import Menu from './Menu'

export default function Center() {
  const { fullscreen } = useActions()

  return (
    <section className="h-screen p-6 lg:col-span-6">
      {fullscreen ? (
        <FullscreenModel />
      ) : (
        <div className="flex h-full flex-col">
          <Buddy />
          <Menu />
        </div>
      )}
    </section>
  )
}
