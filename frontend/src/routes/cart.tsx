import { createFileRoute } from '@tanstack/react-router'
import ShoppingCart from '../components/ShoppingCart'

export const Route = createFileRoute('/cart')({
  component: Cart
})

function Cart() {
  return <ShoppingCart />
}
