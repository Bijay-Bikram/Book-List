import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PiBookOpenTextLight } from 'react-icons/pi'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { BiUserCircle, BiShow } from 'react-icons/bi'
import { MdOutlineDelete } from 'react-icons/md'
import BookModal from './BookModal'
import DeleteModal from './DeleteModal'

const BookSingleCard = ({ book, setLoading, setBooks }) => {
    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)


    return (
        <div className='border-2 border-green-200 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl hover:shadow-green-100'>
            <h2 className='absolute top-2 right-2 px-4 py-1 bg-pink-300 rounded-full'>{book.publishYear}</h2>

            <h4 className="my-2 text-gray-500">{book._id}</h4>

            <div className="flex justify-start items-center gap-x-2">
                <PiBookOpenTextLight className='text-red-300 text-2xl' />
                <h2 className='my-1'>{book.title}</h2>
            </div>

            <div className="flex justify-start items-center gap-x-2">
                <BiUserCircle className='text-red-300 text-2xl' />
                <h2 className='my-1'>{book.author}</h2>
            </div>

            <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
                <BiShow className='text-sky-800 text-3xl hover:text-black cursor-pointer' onClick={() => setShowModal(true)} />
                <Link to={`/books/details/${book._id}`}>
                    <BsInfoCircle className='text-green-800 text-2xl hover:text-black' />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit className='text-yellow-600 text-2xl  hover:text-black' />
                </Link>

                <MdOutlineDelete className='text-red-600 text-2xl  hover:text-black' onClick={() => setShowDeleteModal(true)} />
            </div>

            {showModal && <BookModal book={book} onClose={() => setShowModal(false)} />}       {/* Details Modal */}
            {showDeleteModal && <DeleteModal id={book._id} onClose={() => setShowDeleteModal(false)} setLoading={setLoading} setBooks={setBooks} />}      {/* Delete Modal */}
        </div>
    )
}

export default BookSingleCard
