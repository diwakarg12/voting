import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QuestionComponent from './QuestionComponent';
import ResultsComponent from './ResultsComponent';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<QuestionComponent />} />
        <Route exact path='/vote-percent' element={<ResultsComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
