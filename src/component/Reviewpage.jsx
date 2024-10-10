import React from 'react';
import {useLocation } from 'react-router-dom';
import NavBar from './Navbar';
import './Reviewpage.css'; 
import Footer from './Footer';

const ReviewPage = () => {
  const location = useLocation();
  const { userAnswers, questions } = location.state || {};
  const { subject } = location.state || {};   

  const calculateResults = () => {
    let correct = 0;
    let wrong = 0;

    questions.forEach((q) => {
      if (userAnswers[q.id] !== undefined) {
        if (userAnswers[q.id] === q.answer) {
          correct++;
        } else {
          wrong++;
        }
      }
    });

    return { correct, wrong };
  };

  const { correct, wrong } = calculateResults();

  const attemptedQuestions = questions.filter((q) => userAnswers[q.id] !== undefined);
  const nonAttemptedQuestions = questions.filter((q) => userAnswers[q.id] === undefined);

  return (
    <>
      <NavBar />
      <div className="review-container">
        <div className="results-section">
          <div>
          <h2 className="review-heading">Review Your Answers</h2>
          <div className="review-summary">
            <p className="result">Correct Answers: <span>{correct}</span></p>
            <p className="result">Wrong Answers: <span>{wrong}</span></p>
            <p className="result">Total Attempted: <span>{attemptedQuestions.length}</span></p>
            <p className="result">Total Non-Attempted: <span>{nonAttemptedQuestions.length}</span></p>
          </div>
          </div>
          <div className='button'>
              <p>Learn {subject}</p>
          </div>
        </div>
        <div className='main'>
        <div className="attempted-section">
          <h3 className="section-heading">Attempted Questions</h3>
          <ul className="review-list">
            {attemptedQuestions.map((q) => (
              <li key={q.id} className="review-item">
                <p className="question-text">{q.question}</p>
                <p className={`answer-text ${userAnswers[q.id] === q.answer ? 'correct-answer' : 'wrong-answer'}`}>
                  Your Answer: {q.options[userAnswers[q.id]] || 'No Answer Selected'}
                </p>
                <p className="correct-answer-text">
                  Correct Answer: {q.options[q.answer]}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="non-attempted-section">
          <h3 className="section-heading">Non-Attempted Questions</h3>
          <ul className="review-list">
            {nonAttemptedQuestions.map((q) => (
              <li key={q.id} className="review-item">
                <p className="question-text">{q.question}</p>
                <p className="correct-answer-text">
                  Correct Answer: {q.options[q.answer]}
                </p>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>
      <Footer/>

    </>
  );
};

export default ReviewPage;
