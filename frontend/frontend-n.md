## 1. Application Folder Structure
```
 src
    - assets

    - components
       - Home //To keep all home page components

    - pages
    
```

## 2. To use React-router-dom
Install react-router-dom using `npm install react-router-dom` command.<br>
Import react-router-dom through BrowserRouter inside main.jsx file and wrap app tag by BrowserRouter tag. <br>

main.jsx
```
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
```
Create Pages folder inside src folder then create all pages file inside it.<br>
Now import "Routes" and "Route" from "react-router-dom" and use it in App.jsx file.<br>

App.jsx
```
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateBook from './pages/CreateBook'
import ShowBook from './pages/ShowBook'
import EditBook from './pages/EditBook'
import DeleteBook from './pages/DeleteBook'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/create" element={<CreateBook />} />
      <Route path="/books/details/:id" element={<ShowBook />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
      <Route path="/books/delete/:id" element={<DeleteBook />} />
    </Routes>
  )
}

export default App
```

## 3. To use react-icons
Install react-icons using `npm install react-icons` command.<br>
Import different react-icon inside specific pages <br>
Examples:
```
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
```
Note: The primary advantage of using React Icons lies in its efficiency and ease of use. The library supports tree-shaking, meaning it only bundles the icons used in your project, thus reducing the overall bundle size and improving load times

## 4. Loader using useEffect
```
const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:5555/books')
            .then((res) => {
                setBooks(res.data.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }, [])
```

## 5. To use Param through react-router-dom to get id from URL
Import 'useParams' from 'react-router-dom and use it inside the function.' <br>
Use destructuring as variable to get id from useParams() <br>
```
import { useParams } from 'react-router-dom'

// function
  const { id } = useParams() // get id from url
```

## 6. To use navigate from react-router-dom
Navigate is used to redirect the user to another page/URL. <br>
Import 'useNavigate' from 'react-router-dom and use it inside the function.' <br>
```
import { useNavigate } from 'react-router-dom'

// function
   const navigate = useNavigate()

   const handleEditBook = () => {
        const data = {
            title,
            author,
            publishYear
        };
        setLoading(true)
        axios.put(`http://localhost:5555/books/${id}`, data)
            .then(() => {
                setLoading(false)
                navigate('/')
            })
            .catch((err) => {
                alert("Something went wrong, please try again")
                console.log(err)
                setLoading(false)
            })
    }
   
```

## 7. Map function in JSX use paranthesis instead of curly braces.
In JSX, map function execute JSX element rather than statement so paranthesis is used instead of curly braces.
Example:
```
    <ul>
        {books.map((book) => (
            <li key={book.id}>{book.title}</li>
        ))}
    </ul>
```

## 8. Toast using notistack npm package in react
Install notistack npm package: `npm install notistack` <br>
Go to main.jsx file, import SnackbarProvider from 'notistack' package then wrap App tag by 'SnackbarProvider' tag.<br>
main.jsx
```
import { SnackbarProvider } from 'notistack'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SnackbarProvider >
      <App />
    </SnackbarProvider>
  </BrowserRouter>
)

```
Import useSnackbar from 'notistack' in any page/file where you want to use it as a toast <br>
Declare 'enqueueSnackbar' as a variable from useSnackbar() inside the function then use it <br>
CreateBook.jsx
```
import { useSnackbar } from 'notistack'

// Function
    const { enqueueSnackbar } = useSnackbar()

    //Use instead of alert to show message
    enqueueSnackbar('Something went wrong, please try again', { variant: 'error' })
```

