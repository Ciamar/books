import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function BookDetails(props) {

    const book = props.book;

    return(
      <div>
        <table className="table table-hover table-dark">
          {/* <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead> */}
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Title</td>
              <td>{ book.title }</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Author</td>
              <td>{ book.author }</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>ISBN</td>
              <td>{ book.isbn }</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Publisher</td>
              <td>{ book.publisher }</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Published Date</td>
              <td>{ book.published_date }</td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Description</td>
              <td>{ book.description }</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
};

export default BookDetails;
