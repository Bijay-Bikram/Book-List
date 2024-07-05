import React from 'react'
import BookSingleCard from './BookSingleCard'

const BooksCard = ({ books, setLoading, setBooks }) => {
    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>
            {books.map((book) => (
                <BookSingleCard key={book._id} book={book} setLoading={setLoading} setBooks={setBooks} />
            ))}
        </div >
    )
}

export default BooksCard

