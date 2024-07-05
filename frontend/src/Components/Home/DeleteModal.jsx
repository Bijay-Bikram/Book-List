import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { AiOutlineClose } from 'react-icons/ai'

const DeleteBook = ({ id, onClose, ...props }) => {
    const { enqueueSnackbar } = useSnackbar()
    const [deleted, setDeleted] = useState(false)
    const { setLoading, setBooks } = props


    const handleDeleteBook = () => {
        axios.delete(`http://localhost:5656/books/${id}`)
            .then(() => {
                enqueueSnackbar('Book deleted successfully', { variant: 'success' })
                setDeleted(true)
            })
            .catch((err) => {
                // alert("Something went wrong, please try again")
                enqueueSnackbar('Something went wrong, please try again', { variant: 'error' })
                console.log(err)
            })
    }

    useEffect(() => {
        if (deleted) {
            onClose()
            setLoading(true)
            axios.get('http://localhost:5656/books')
                .then((res) => {
                    setBooks(res.data.books)
                    setLoading(false)
                })
                .catch((err) => {
                    console.error(err)
                    setLoading(false)
                })
        }

    }, [deleted])


    return (
        <div className='fixed  top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center '>
            <div className="flex flex-col  bg-white items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 m-auto relative">
                <AiOutlineClose className='text-red-600 text-2xl absolute top-3 right-3 cursor-pointer w-fit' onClick={onClose} />
                <h3 className="text-2xl"> Are you sure you want to delete this book?</h3>
                <button className='p-4 bg-red-600 text-white m-8 w-full cursor-pointer' onClick={handleDeleteBook}> Yes, Delete it</button>
            </div>
        </div>
    )
}

export default DeleteBook
