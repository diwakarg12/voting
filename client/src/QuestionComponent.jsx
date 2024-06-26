import { useState } from 'react';
import axios from 'axios';

const QuestionComponent = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isVoteEnabled, setIsVoteEnabled] = useState(false);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setIsVoteEnabled(true);
  };

  const handleVote = async () => {
    try {
      await axios.post('http://localhost:5000/vote', {
        option: selectedOption,
      });
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
            onChange={() => handleOptionChange('JavaScript')}
          />
          <span className='ml-2'>JavaScript (Node.js)</span>
        </label>

        <label className='inline-flex items-center'>
          <input
            type='radio'
            className='form-radio text-indigo-600 h-5 w-5'
            checked={selectedOption === 'Python'}
            onChange={() => handleOptionChange('Python')}
          />
          <span className='ml-2'>Python (Django/Flask)</span>
        </label>
      </div>
      <button
        onClick={handleVote}
        disabled={!isVoteEnabled}
        className={`mt-4 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
          !isVoteEnabled && 'cursor-not-allowed'
        }`}
      >
        Vote
      </button>
    </div>
  );
};

export default QuestionComponent;
