import { useState, useEffect } from "react";
import axios from "axios"
import {Link} from "react-router-dom"

const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/books`);
                setBooks(data)
                console.log(data);
            }
            catch (err) {
                console.log(err);
            } 
        }
        fetchData()
    }, [])

    const handleDelete = async(id)=>{
   try{
     await axios.delete(`${import.meta.env.VITE_SERVER_URL}/books/${id}`)
     window.location.reload()
   }
   catch(err){
    console.log(err);
   }
    }
    return (
        <div>
            <h1>The Book Shop</h1>
            <div className="books">
                {books.map((book, index) => (
                    <div className="book" key={index}>
                        {book.cover && <img src={book.cover} alt="" />}
                        <h2>{book.title}</h2>
                        <p>{book.desc}</p>
                        <span>{book.price}</span>
                        <button className="delete" onClick={()=>handleDelete(book.id)}>Delete</button>
                        <button className="update"><Link style={{textDecoration:"none"}} to={`/update/${book.id}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            <Link to="/add">
            <button className="New">Add new book</button>
            </Link>
        </div>
    )
}

export default Books