import { Link } from '@tanstack/react-router'
import homeIcon from '../assets/images/home_icon.svg'
import cartIcon from '../assets/images/basket_icon.svg'

const Header = () => {
  return (
    <header className="pt-12 sm:pt-16" data-headlessui-state="">
        <div className="flex justify-between group/row pt-[calc(--spacing(2)+1px)] last:pb-[calc(--spacing(2)+1px)]">
            <div className="flex gap-6">
                <Link to="/" className="mt-4 text-1xl/8 font-bold tracking-tight text-gray-950">
                    <img src={homeIcon} width={24} height={24} />
                </Link>
            </div>
            <div className="flex">
                <Link to="/cart" className='items-center px-4 py-[calc(--spacing(2)-1px)] rounded-lg border border-transparent bg-gray-950 shadow-md text-base font-medium whitespace-nowrap text-white hover:bg-gray-800'>
                    <img src={cartIcon} width={18} height={18} className='inline mr-2' /> Shopping Bag
                </Link>
            </div>
        </div>
    </header>
  )
}

export default Header