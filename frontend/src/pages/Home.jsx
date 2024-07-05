
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Spinner from '../Components/Spinner'
import { Link } from 'react-router-dom'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
import BooksTable from '../Components/Home/BooksTable'
import BooksCard from '../Components/Home/BooksCard'

const Home = () => {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)
    const [showType, setShowType] = useState('card')
    const CardBtn = useRef(null)
    const TableBtn = useRef(null)

    useEffect(() => {
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
    }, [])

    useEffect(() => {
        if (showType === 'card') {
            CardBtn.current.classList.remove('bg-green-300')
            CardBtn.current.classList.add('bg-green-400')
            TableBtn.current.classList.remove('bg-green-400')
            TableBtn.current.classList.add('bg-green-300')
        } else {
            CardBtn.current.classList.remove('bg-green-400')
            CardBtn.current.classList.add('bg-green-300')
            TableBtn.current.classList.add('bg-green-400')
            TableBtn.current.classList.remove('bg-green-300')
        }
    }, [showType])

    return (
        <div className='p-4'>

            <div className="flex justify-center items-center gap-4">
                <button ref={CardBtn} className='px-4 py-2 hover:bg-green-400 text-gray-600 rounded-lg' onClick={() => setShowType('card')}>Card</button>
                <button ref={TableBtn} className='px-4 py-2 hover:bg-green-400 text-gray-600 rounded-lg' onClick={() => setShowType('table')}>Table</button>
            </div>

            <div className="flex justify-between items-center py-4 px-4">
                <h1 className='text-2xl'>Books List</h1>
                <Link to={'/books/create'}>
                    <MdOutlineAddBox className='text-4xl text-green-700' />
                </Link>
            </div>

            {loading ? (
                <Spinner />
            ) : (
                showType === 'table' ? <BooksTable books={books} setLoading={setLoading} setBooks={setBooks} /> : <BooksCard books={books} setLoading={setLoading} setBooks={setBooks} />
            )}
        </div>
    )
}

export default Home

