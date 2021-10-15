import React from 'react';
import '../App.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import BookCard from './BookCard';
import authHeader from '../_helpers/auth-header.js';


function ShowBookList(props) {
  const [books, setBooks] = React.useState(null);

  const { user } = useParams();

  React.useEffect(() => {
    axios
      .get('http://localhost:8888/books/'+ user, authHeader())
      .then(res => {
        console.log(res.data);
        setBooks(res.data)
      })
      .catch(err => {
        console.log('Error from ShowBookList');
      })
  }, []);

  let bookList;

  if(!books) {
    bookList = "there is no book record!";
  } else {
    bookList = books.map((book, k) =>
      <BookCard book={book} key={k} />
    );
  }

  return (
    <div className="ShowBookList">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <h2 className="display-4 text-center">Books List</h2>
          </div>

          <div className="col-md-11">
            <Link to= {`/${user}/create-book`} className="btn btn-outline-warning float-right">
              + Add New Book
            </Link>
            <br />
            <br />
            <hr />
          </div>

        </div>

        <div className="list">
              {bookList}
        </div>
      </div>
    </div>
  );

}


export default ShowBookList;
