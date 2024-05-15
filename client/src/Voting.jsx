/* eslint-disable react/prop-types */
import { useState } from 'react';

const Voting = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerSelect = (event) => {
    setSelectedAnswer(event.target.value);
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <div>
      <h2>{questions[currentQuestion].question}</h2>
      <form>
        {questions[currentQuestion].answers.map((answer, index) => (
          <div key={index}>
            <input
              type='radio'
              id={`option-${index}`}
              name={`question-${currentQuestion}`}
              value={answer}
              onChange={handleAnswerSelect}
            />
            <label htmlFor={`option-${index}`}>{answer}</label>
          </div>
        ))}
      </form>
      {currentQuestion < questions.length - 1 && (
        <button onClick={() => setCurrentQuestion(currentQuestion + 1)}>
          Next
        </button>
      )}
      {currentQuestion === questions.length - 1 && (
        <button onClick={() => alert(`Your answer is ${selectedAnswer}`)}>
          Submit
        </button>
      )}
    </div>
  );
};


export default Voting;
