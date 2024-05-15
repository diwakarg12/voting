import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ResultsComponent = () => {
  const [results, setResults] = useState({});

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:5000/results');
        setResults(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className='max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md'>
      <h2 className='text-xl font-semibold mb-4'>Voting Results</h2>
      <table className='table-auto'>
        <thead>
          <tr>
            <th className='px-4 py-2 text-start'>Option</th>
            <th className='px-4 py-2 text-start'>Votes</th>
            <th className='px-4 py-2 text-start'>Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='border px-4 py-2'>Total Responses</td>
            <td className='border px-4 py-2' colSpan='2'>
              {results.totalVotes}
            </td>
          </tr>
          <tr>
            <td className='border px-4 py-2'>
              Option A - {results.optionAName}
            </td>
            <td className='border px-4 py-2'>{results.optionA}</td>
            <td className='border px-4 py-2'>{results.optionAPercentage}%</td>
          </tr>
          <tr>
            <td className='border px-4 py-2'>
              Option B - {results.optionBName}
            </td>
            <td className='border px-4 py-2'>{results.optionB}</td>
            <td className='border px-4 py-2'>{results.optionBPercentage}%</td>
          </tr>
        </tbody>
      </table>
      <Link
        to='/'
        className='block w-full mt-4 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded text-center'
      >
        Return to Main Menu
      </Link>
    </div>
  );
};

export default ResultsComponent;
