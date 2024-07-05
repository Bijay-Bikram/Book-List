import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { PiBookOpenTextLight } from 'react-icons/pi'
import { BiUserCircle } from 'react-icons/bi'

const BookModal = ({ book, onClose }) => {
    return (
        <div className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center ' onClick={onClose}>

            <div className='w-[600px] max-w-full height-[400px] bg-white rounded-xl p-4 flex flex-col relative' onClick={(event) => event.stopPropagation()}>
                <AiOutlineClose className='text-red-600 text-2xl absolute top-6 right-6 cursor-pointer w-fit' onClick={onClose} />
                <h2 className='px-4 py-1 bg-pink-300 rounded-full w-fit'>{book.publishYear}</h2>

                <h4 className="my-2 text-gray-500">{book._id}</h4>

                <div className="flex justify-start items-center gap-x-2">
                    <PiBookOpenTextLight className='text-red-300 text-2xl' />
                    <h2 className='my-1'>{book.title}</h2>
                </div>

                <div className="flex justify-start items-center gap-x-2">
                    <BiUserCircle className='text-red-300 text-2xl' />
                    <h2 className='my-1'>{book.author}</h2>
                </div>

                <p className="mt-4 font-600">Any other details about this book</p>
                <p className="my-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio aut consectetur, quam voluptates consequatur fuga adipisci id aliquid ducimus, explicabo quo? Nam cupiditate officia expedita nobis voluptatibus ipsa commodi magni excepturi, quia quae unde.
                </p>
            </div>
        </div>
    )
}

export default BookModal
