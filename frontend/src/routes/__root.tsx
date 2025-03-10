import { createRootRoute, Outlet } from '@tanstack/react-router'
import Header from '../components/Header'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className='mx-auto max-w-2xl lg:max-w-6xl pb-12'>
        <Header />
        
        <Outlet />
    </div>
  )
}