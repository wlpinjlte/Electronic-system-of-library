import { useContext } from 'react';
import './App.css';
import BookContext from './contexts/Books.context';
import BookList from './components/BookList';
import UserContext from './contexts/User.context';
import Navbar from './components/Navbar';
function App() {
  return (
    <div className="App">
      <BookContext>
        <UserContext>
          <Navbar></Navbar>
          <BookList></BookList>
        </UserContext>
      </BookContext>
    </div>
  );
}

export default App;
