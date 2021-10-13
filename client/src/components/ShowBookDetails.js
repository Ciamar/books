import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import BookDetails from './BookDetails';


function showBookDetails(props) {
  const [book, setBook] = React.useState({
    title: '',
    isbn:'',
    author:'',
    description:'',
    published_date:'',
    publisher:''
  });


  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get('http://localhost:8888/api/books/'+id)
      .then(res => {
        setBook(res.data);
      })
      .catch(err => {
        console.log('Error from ShowBookList');
      })
  }, [id]);

  return (
    <div className="ShowBookDetails">
      <div className="container">
        <div className="row">
          <div className="col-md-10 m-auto">
            <br /> <br />
            <Link to="/" className="btn btn-outline-warning float-left">
                Show Book List
            </Link>
          </div>
          <br />
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Book's Record</h1>
            <p className="lead text-center">
                View Book's Info
            </p>
            <hr /> <br />
          </div>
        </div>
        <div>
          <BookDetails book={book} />
        </div>

        <div className="row">
          <div className="col-md-6">
            <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={onDeleteClick(id)}>Delete Book</button><br />
          </div>

          <div className="col-md-6">
            <Link to={`/edit-book/${id}`} className="btn btn-outline-info btn-lg btn-block">
                  Edit Book
            </Link>
            <br />
          </div>

        </div>
          {/* <br />
          <button type="button" class="btn btn-outline-info btn-lg btn-block">Edit Book</button>
          <button type="button" class="btn btn-outline-danger btn-lg btn-block">Delete Book</button> */}

      </div>
    </div>
  );

}

function onDeleteClick (id) {


};

export default showBookDetails;
