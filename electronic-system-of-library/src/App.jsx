import { useContext } from 'react';
import './App.css';
import BookContext from './contexts/Books.context';
import BookList from './components/BookList';
import UserContext from './contexts/User.context';
import Navbar from './components/Navbar';
import BookForm from './components/BookForm';
import LogIn from './components/LogIn';
import Register from './components/Register';
import SingleBookPage from './components/SingleBookPage';
import Basket from './components/Basket';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import History from './components/History';

function App() {
  return (
    <div className="App">
      <BookContext>
        <UserContext>
        <BrowserRouter>
            <Navbar></Navbar>  
            <Routes>
              <Route path='/' element={<BookList></BookList>}></Route>
              <Route path='/add' element={<BookForm></BookForm>}></Route>
              <Route path='/login' element={<LogIn></LogIn>}></Route>
              <Route path='/edit/:bookId' element={<BookForm isEdit={true}></BookForm>}></Route>
              <Route path='/register' element={<Register></Register>}></Route>
              <Route path='/:bookId' element={<SingleBookPage></SingleBookPage>}></Route>
              <Route path = '/basket' element={<Basket></Basket>}></Route>
              <Route path='/history' element={<History></History>}></Route>
            </Routes>
          </BrowserRouter>
        </UserContext>
      </BookContext>
    </div>
  );
}

export default App;
