import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineDelete } from 'react-icons/md'

const BooksTable = ({ books }) => {
    return (
        <table className='w-full border-none '>
            <thead>
                <tr>
                    <th className=' bg-[#04AA6D] text-white border-[1px] border-[#ddd]  '>No</th>
                    <th className='bg-[#04AA6D] text-white border-[1px] border-[#ddd] '>Title</th>
                    <th className='bg-[#04AA6D] text-white border-[1px] border-[#ddd]  max-md:hidden'>Author</th>
                    <th className='bg-[#04AA6D] text-white border-[1px] border-[#ddd]  max-md:hidden'>Publish Year</th>
                    <th className='bg-[#04AA6D] text-white border-[1px] border-[#ddd] '>Operations</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, index) => (
                    <tr key={book._id} className='h-8 hover:bg-[#ddd] border-collapse' >
                        <td className='border-[1px] border-[#ddd] text-center'>{index + 1}</td>
                        <td className='border-[1px] border-[#ddd] text-center'>{book.title}</td>
                        <td className='border-[1px] border-[#ddd] text-center max-md:hidden'>{book.author}</td>
                        <td className='border-[1px] border-[#ddd] text-center max-md:hidden'>{book.publishYear}</td>
                        <td className='border-[1px] border-[#ddd] text-center'>
                            <div className='flex justify-center gap-x-4'>
                                <Link to={`/books/details/${book._id}`}>
                                    <BsInfoCircle className='text-green-800 text-2xl ' />
                                </Link>
                                <Link to={`/books/edit/${book._id}`}>
                                    <AiOutlineEdit className='text-yellow-600 text-2xl' />
                                </Link>
                                <Link to={`/books/delete/${book._id}`}>
                                    <MdOutlineDelete className='text-red-600 text-2xl' />
                                </Link>
                            </div>

                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default BooksTable
