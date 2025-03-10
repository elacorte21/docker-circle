import { useEffect, useState } from 'react'
import { Book } from '../Types';
import placeholder from '../assets/images/No-Image-Placeholder.svg';
import Modal from './Modal';
import { useStore } from '../store/zustand';

interface BookPriceProps {
    price: number;
}

interface AddCartProps {
    id: number;
    title: string;
}

const Books = () => {
    const url = import.meta.env.VITE_API_URL;
    const [data, setData] = useState<Book[]>([]);
    const [isModal, setIsModal] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>();

    async function fetchBooks() {
        try {
          const response = await fetch(`${url}/books`);
          const json = await response.json();
          setData(json.books);
        } catch (error) {
          console.error(error);
        }
    }

    const BookPrice: React.FC<BookPriceProps> = ({ price }) => {
        const priceStr = price.toString();
        const parts = priceStr.split('.');
      
        return (
          <div className='my-2 text-3xl/8 font-bold tracking-tight text-gray-950'>
            ${parts[0]} {parts[1] && <sup className='text-sm'>{parts[1]}</sup>}
          </div>
        );
    };

    const handleAddCart = ({ id, title }: AddCartProps): void => {
        const { bookCartIds, addBookToCart } = useStore.getState();
      
        console.log('id', id, ',', 'title', title);
      
        if (!bookCartIds.includes(id)) {
          addBookToCart(id);
          setIsModal(true);
          setModalTitle(`Added ${title} to Cart`);
          return;
        }
      
        setIsModal(true);
        setModalTitle(`${title} is already on your Cart`);
    }

    useEffect(() => {
        fetchBooks();
    }, [])

    return (
        <>
            <h1 className='font-medium tracking-tighter text-pretty text-gray-950 sm:text-6xl mt-8'>Welcome to Book Store</h1>
            <h2 className='mt-4 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8'>Over {data.length} amazing books in-stock for you.</h2>
            <div className='mt-10 grid grid-cols-1 gap-8 sm:mt-16 lg:grid-cols-6'>
                {data.map((book: Book) => {
                    return(
                        <div key={book.id}>
                            <img src={placeholder} />
                            <h3 className='mt-4 text-1xl/8 font-bold tracking-tight text-gray-950'>{book.title}</h3>
                            <p className='text-sm/6 text-gray-600'>By {book.author}</p>
                            <BookPrice price={book.price} />
                            {book.availableStock > 0 &&
                                <button 
                                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                        e.preventDefault();
                                        handleAddCart(book);
                                    }}
                                    className='cursor-pointer items-center px-4 py-[calc(--spacing(2)-1px)] w-full rounded-lg border border-transparent bg-gray-950 shadow-md text-base font-medium whitespace-nowrap text-white hover:bg-gray-800'
                                >
                                    Add to Bag
                                </button>
                            }
                            <div className='font-mono text-xs/5 font-semibold tracking-widest text-center text-gray-500 uppercase text-gray-400 mt-2'>{book.availableStock > 0 ? 'In Stock' : 'Out of Stock'}</div>
                            
                        </div>
                    )
                })}

                <Modal 
                    title={modalTitle} 
                    isOpen={isModal} 
                    onClose={() => setIsModal(!isModal)}
                    redirect='cart'
                />
            </div>

        </>
    )
}

export default Books