import Center from '@/components/Center'
import ContextMenu from '@/components/ContextMenu'
import LeftSidebar from '@/components/LeftSidebar'
import RightSidebar from '@/components/RightSidebar'
import { ActionsProvider } from '@/context/ActionsContent'
import { DrawerProvider } from '@/context/DrawerContext'
import { MenuProvider } from '@/context/MenuContext'
import Head from 'next/head'

export default function Home() {
  return (
    <MenuProvider>
      <ActionsProvider>
        <DrawerProvider>
          <Head>
            <title>Feno Health Platform</title>
            <meta name="description" content="Feno Health Platform" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className="container mx-auto grid min-h-screen bg-[#F5F6F8] text-slate-900 lg:grid-cols-12">
            <LeftSidebar />
            <Center />
            <RightSidebar />
          </main>

          <ContextMenu />
        </DrawerProvider>
      </ActionsProvider>
    </MenuProvider>
  )
}
