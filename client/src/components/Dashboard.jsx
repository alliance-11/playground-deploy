import { useContext, useEffect } from "react";
import { DataContext } from "../App";

const Dashboard = () => {

  const { books, setBooks } = useContext(DataContext)

  console.log(books)

  // load books from backend!
  useEffect(() => {
    
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/books`, {
          credentials: 'include' // send cookies along!
        })
        const result = await response.json()
        if(result.error) {
          return console.log("[OUCH] When fetching books that happened: ", result.error)
        }
        setBooks(result)
      }
      catch(err) {
        console.log("[OUCH] Cannot fetch books from API!", err.message)
      }
    }

    fetchBooks()
  }, [])

  return ( <div className="books">
      { (books).map(book => (
        <div key={book._id}>{book.title} ({book.author})</div>
      ))}
  </div> );
}
 
export default Dashboard;