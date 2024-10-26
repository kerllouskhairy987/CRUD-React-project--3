import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { ReactNode } from 'react';


interface IProps {
    isOpen: boolean;
    close: () => void;
    children: ReactNode;
    title?: string;
    description?: string;
}

export default function Modal({ isOpen, close, children, title, description }: IProps) {
    return (
        <>
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/15">
                    <div className="flex min-h-full items-center justify-center p-4 ">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 bg-white border-2 shadow-md"
                        >
                            {title && <DialogTitle as="h3" className="text-base/7 font-medium">
                                {title}
                            </DialogTitle>}

                            {description && <p className="mt-2 text-sm/6 text-white/50">{description}</p>}

                            <div className="mt-4">{children}</div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
