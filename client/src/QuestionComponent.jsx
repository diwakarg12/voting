import { useState } from 'react';
import axios from 'axios';

const QuestionComponent = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleVote = async () => {
    try {
      await axios.post('/vote', {
        option: selectedOption,
      });
      // Redirect to results page
      window.location.href = '/vote-percent';
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md'>
      <h2 className='text-xl font-semibold mb-4'>
        What is your preferred programming language for building web
        applications?
      </h2>
      <div className='flex flex-col gap-4'>
        <label className='inline-flex items-center'>
          <input
            type='radio'
            className='form-radio text-indigo-600 h-5 w-5'
            checked={selectedOption === 'JavaScript'}
            onChange={() => setSelectedOption('JavaScript')}
          />
          <span className='ml-2'>JavaScript (Node.js)</span>
        </label>

        <label className='inline-flex items-center'>
          <input
            type='radio'
            className='form-radio text-indigo-600 h-5 w-5'
            checked={selectedOption === 'Python'}
            onChange={() => setSelectedOption('Python')}
          />
          <span className='ml-2'>Python (Django/Flask)</span>
        </label>
      </div>
      <button
        onClick={handleVote}
        className='mt-4 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400'
      >
        Vote
      </button>
    </div>
  );
};

export default QuestionComponent;
