import React, { useState, useEffect } from 'react'
import BackButton from '../Components/BackButton'
import Spinner from '../Components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const EditBook = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [publishYear, setPublishYear] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:5656/books/${id}`)
            .then((res) => {
                setTitle(res.data.title)
                setAuthor(res.data.author)
                setPublishYear(res.data.publishYear)
                setDescription(res.data.description)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                alert("Something went wrong, please try again")
                setLoading(false)
            })
    }, [])

    const handleEditBook = () => {
        const data = {
            title,
            author,
            publishYear,
            description
        };
        setLoading(true)
        axios.put(`http://localhost:5656/books/${id}`, data)
            .then(() => {
                setLoading(false)
                enqueueSnackbar('Book updated successfully', { variant: 'success' })
                navigate('/')
            })
            .catch((err) => {
                // alert("Something went wrong, please try again")
                enqueueSnackbar('Something went wrong, please try again', { variant: 'error' })
                console.log(err)
                setLoading(false)
            })
    }

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4 text-center'>Edit Book</h1>
            {loading ? (<Spinner />) : ''}
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label htmlFor="" className='text-xl mr-4 text-gray-500'>Title</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
                </div>
                <div className="my-4">
                    <label htmlFor="" className='text-xl mr-4 text-gray-500'>Author</label>
                    <input type="text" value={author} onChange={e => setAuthor(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
                </div>
                <div className="my-4">
                    <label htmlFor="" className='text-xl mr-4 text-gray-500'>Publish Year</label>
                    <input type="text" value={publishYear} onChange={e => setPublishYear(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
                </div>
                <div className="my-4">
                    <label htmlFor="dec" className='text-xl mr-4 text-gray-500'>Description (optional)</label>
                    <textarea name="description" id="dec" value={description} cols="30" rows="5" className='border-2 border-gray-500 px-4 py-2 w-full' onChange={e => setDescription(e.target.value)}></textarea>
                </div>

                <button className="p-2 bg-sky-300 m-8 " onClick={handleEditBook}>Save</button>
            </div>
        </div>
    )
}

export default EditBook
