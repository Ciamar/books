import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import CreateBook from './components/CreateBook.js';
import ShowBookList from './components/ShowBookList.js';
import ShowBookDetails from './components/ShowBookDetails.js';
import UpdateBookInfo from './components/UpdateBookInfo.js';
import Register from './components/Register.js';
import Login from './components/Login.js';

import RequireAuth from "./components/RequireAuth.js";


export default function App() {
  return (
        <Routes>
          <Route exact path='/register' element={<Register/>} />
          <Route exact path='/' element={<Login/>} />
          <Route path='/:user' element={<RequireAuth><ShowBookList/></RequireAuth>} />
          <Route path='/:user/create-book' element={<RequireAuth><CreateBook/></RequireAuth>} />
          <Route path='/:user/edit-book/:id' element={<RequireAuth><UpdateBookInfo/></RequireAuth>} />
          <Route path='/:user/show-book/:id' element={<RequireAuth><ShowBookDetails/></RequireAuth>} />
        </Routes>
    );
}
