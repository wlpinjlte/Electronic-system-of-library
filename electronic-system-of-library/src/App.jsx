import { useContext } from 'react';
import './App.css';
import BookContext from './contexts/Books.context';
import BookList from './components/BookList';
function App() {
  return (
    <div className="App">
      <BookContext>
        <BookList></BookList>
      </BookContext>
    </div>
  );
}

export default App;
