// App.js
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TodoPage from './pages/TodoPage'; 
import DndPage from './pages/DndPage'; 

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/dnd" element={<DndPage />}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;