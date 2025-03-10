import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useNavigate } from '@tanstack/react-router';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
    redirect: 'cart' | '';
}

export default function Modal({
    isOpen,
    onClose,
    title,
    message,
    redirect
}: ModalProps) {

    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10">
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <DialogTitle as="h3" className="text-base/7 font-medium">
                            {title}
                        </DialogTitle>
                        <p className="mt-2 text-sm/6">
                            {message}
                        </p>
                        <div className="mt-4">
                            {redirect === 'cart' &&
                                <Button
                                    className="cursor-pointer inline-flex items-center gap-2 rounded-md text-white bg-gray-600 data-[hover]:bg-gray-500 py-1.5 px-3 text-sm/6 font-semibold shadow-inner shadow-white/10 data-[open]:bg-gray-700 mr-2"
                                    onClick={onClose}
                                >
                                    Continue shopping
                                </Button>
                            }
                            <Button
                                className="cursor-pointer inline-flex items-center gap-2 rounded-md text-white bg-gray-800 data-[hover]:bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold shadow-inner shadow-white/10 data-[open]:bg-gray-700"
                                onClick={() => navigate({to: `/${redirect}`})}
                            >
                                {redirect === 'cart' ? 'View Shopping Bag' : 'Close'}
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
