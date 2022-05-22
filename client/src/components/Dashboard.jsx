import { useContext, useEffect, useState } from "react"
import { useDataContext } from "../contexts/DataProvider"
import { fetchBooksApi } from "../helpers/apiCalls"

const Dashboard = () => {
  const { books, setBooks, setError } = useDataContext()
  const [loading, setLoading] = useState(false)

  // load books from backend!
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true)

      try {
        const result = await fetchBooksApi()
        if (result.error) return setError(result.error)
        setBooks(result)
      } 
      catch (err) {
        console.log("[OUCH] Cannot fetch books from API!", err.message)
        setError(err.message)
      }
      setLoading(false)
    }

    // load books from API if books are not loaded so far...
    !books.length && fetchBooks()
  }, [])

  return (
    <div className="dashboard">
      {loading
        ? "Loading..."
        : books.map((book) => (
            <div className="book" key={book._id}>
              <div className="title">{book.title}</div>
              <div className="author">{book.author}</div>
            </div>
          ))}
    </div>
  )
}

export default Dashboard
