import { useContext, useEffect, useState } from "react"
import { DataContext } from "../App"
import { fetchBooksApi } from "../helpers/apiCalls"

const Dashboard = () => {
  const { books, setBooks } = useContext(DataContext)
  const [loading, setLoading] = useState(false)

  // load books from backend!
  useEffect(() => {
    
    const fetchBooks = async () => {

      setLoading(true)

      try {
        const result = await fetchBooksApi()
        console.log(result)

        if (result.error) {
          return console.log(
            "[OUCH] When fetching books that happened: ",
            result.error
          )
        }
        setBooks(result)
      } catch (err) {
        console.log("[OUCH] Cannot fetch books from API!", err.message)
      }
      setLoading(false)
    }

    // load books from API if books are not loaded so far...
    !books.length && fetchBooks()
  }, [])

  return (
    <div className="books">
      {loading
        ? "Loading..."
        : books.map((book) => (
            <div key={book._id}>
              {book.title} ({book.author})
            </div>
          ))}
    </div>
  )
}

export default Dashboard
