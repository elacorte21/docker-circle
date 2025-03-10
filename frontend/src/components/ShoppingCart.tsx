import { useEffect, useState } from 'react'
import { Book, Status } from '../Types';
import { Button } from '@headlessui/react';
import { fetchCartIds, useStore } from '../store/zustand';
import Modal from './Modal';

const ShoppingCart = () => {
    const url = import.meta.env.VITE_API_URL;
    const [status, setStatus] = useState<Status>('idle');
    const [bookCartItems, setBookCartItems] = useState<Book[]>([]);
    const [bookCartIds, setBookCartIds] = useState<number[]>([]);
    const [isModal, setIsModal] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>();

    const fetchBook = async (id: number) => {
        try {
            const response = await fetch(`${url}/books/${id}`);
            const json = await response.json();
            return json.book;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const fetchBooks = async () => {
        setStatus('loading');
        try {
            const books = await Promise.all(bookCartIds.map(fetchBook));
            setBookCartItems(books);
            setStatus('success');
        } catch (error) {
            setStatus('error');
        }
    }

    const purchaseBook = async (id: number) => {
        try {
            const response = await fetch(`${url}/books/${id}/purchase`, {
                method: "POST"
            });
            const json = await response.json();
            return json.book;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    const purchaseBooks = async () => {
        const { clearCart } = useStore.getState();
        setStatus('loading');
        try {
            await Promise.all(bookCartIds.map(purchaseBook));
            clearCart();
            setStatus('success');
            setModalTitle('Successful checkout');
            setIsModal(true);
        } catch (error) {
            setStatus('error');
            setModalTitle('Checkout failed');
            setIsModal(true);
        }
    }

    const handleRemoveCart = (id: number) => {
        const { bookCartIds, removeBookFromCart } = useStore.getState();
        const ids: number[] = bookCartIds.filter(bookId => bookId !== id)
        setBookCartIds(ids);
        removeBookFromCart(id);
    }

    useEffect(() => {
        const cartIds = fetchCartIds();
        setBookCartIds(cartIds);
    }, []);
    
    useEffect(() => {
        fetchBooks();
    }, [bookCartIds]);

    if (status === 'error') {
        return <div>Error loading books. Please try again later.</div>;
    }
    
    return (
        <>
            <h1 className='font-medium tracking-tighter text-pretty text-gray-950 sm:text-6xl mt-8'>Shopping Bag</h1>

            {status === 'loading' ? 
                <div className="w-full text-center mt-10">Loading...</div> 
            :
                <table className="w-full text-left mt-10">
                    <thead>
                        <tr className='border-b border-gray-200'>
                            <th className="p-4 font-mono text-xs/5 font-semibold tracking-widest text-gray-500 uppercase">Title</th>
                            <th className="p-4 font-mono text-xs/5 font-semibold tracking-widest text-gray-500 uppercase">ISBN</th>
                            <th className="p-4 font-mono text-xs/5 font-semibold tracking-widest text-gray-500 uppercase">Amount</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody className='group'>
                    {bookCartItems.map((book: Book) => {
                        return(
                            <tr className='border-b border-gray-200' key={book.id}>
                                <td className="p-4 text-sm/6 font-semibold">{book.title}</td>
                                <td className="p-4 text-sm/6">{book.isbn}</td>
                                <td className="p-4 text-sm/6">${book.price}</td>
                                <td className="p-4 text-sm/6">
                                    <button
                                        onClick={() => handleRemoveCart(book.id)}
                                        className='cursor-pointer inline-flex items-center justify-center px-2 py-[calc(--spacing(1.5)-1px)] rounded-lg border border-transparent ring-1 shadow-sm ring-black/10 text-sm font-medium whitespace-nowrap text-gray-950 data-hover:bg-gray-50'
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            }
            <div className='mt-10 flex justify-between'>
                <div className="flex gap-6">
                    <p className='sm:text-2xl'>Total Amount: ${bookCartItems.reduce((acc, book) => acc + book.price, 0)}</p>
                </div>
                <div className="flex">
                    <Button
                        className="cursor-pointer inline-flex items-center gap-2 rounded-md text-white bg-gray-950 data-[hover]:bg-gray-800 px-6 py-3.5 text-lg font-semibold shadow-inner shadow-white/10 data-[open]:bg-gray-700 mr-2"
                        onClick={purchaseBooks}
                    >
                        Checkout
                    </Button>
                </div>
            </div>

            <Modal 
                title={modalTitle} 
                isOpen={isModal} 
                onClose={() => setIsModal(!isModal)}
                redirect=''
            />
        </>
    )
}

export default ShoppingCart