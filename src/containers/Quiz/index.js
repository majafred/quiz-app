import React, { useState, useEffect } from 'react';
import { data } from '../../data/questions.json';
import Button from '../../components/Button';
import Lifelines from '../../components/Lifelines';
import Summary from '../../components/Summary';
import ListItem from '../../components/ListItem';

function Quiz() {
    const [step, setStep] = useState(0);
    const [isChecked, setChecked] = useState(null);
    const [timeLeft, setTimeLeft] = useState(15);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [unansweredQuestions, setUnansweredQuestions] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        let allQuestions = [...data.questions];
        let randomizedQuestions = [];

        while (randomizedQuestions.length < 10) {
            const random = Math.floor(Math.random() * allQuestions.length);
            const question = allQuestions[random];

            randomizedQuestions.push(question);
            allQuestions.splice(random, 1);
        }

        setQuestions(randomizedQuestions);
        setAnswers(randomizedQuestions[0].answers);
    }, []);

    useEffect(() => {
        if (timeLeft === 0) {
            setTimeLeft(null);
        }

        if (!timeLeft) return;

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const nextStep = () => {
        if (!timeLeft) {
            setUnansweredQuestions(unansweredQuestions + 1);
        }
        else if (isChecked === questions[step].correctAnswer) {
            setCorrectAnswers(correctAnswers + 1);
        }

        reset();
    }

    const skipQuestion = () => {
        setUnansweredQuestions(unansweredQuestions + 1);
        reset();
    }

    const reset = () => {
        const nextStep = step + 1;

        setStep(nextStep);
        setChecked(null);
        setTimeLeft(15);
        setAnswers(questions[nextStep] ? questions[nextStep].answers : []);
    }

    return (
        <div className='main quiz-page'>
            <div className='quiz-page--top-bar header'>the Apple Quiz.</div>
            {step < questions.length ?
                <div className='quiz-page--section'>
                    <div className='quiz-page--question'>
                        <div className='quiz-page--question--text'>
                            <p className='header'>Question {step + 1}: {questions[step].question}</p>
                        </div>
                        {answers.map((value, index) => (
                            <ListItem
                                key={index}
                                id={value.id}
                                value={value.answerText}
                                disabled={!timeLeft}
                                onChange={(id) => setChecked(id)}
                                checked={isChecked}
                            />
                        ))}
                    </div>
                    <Lifelines
                        setTimeLeft={setTimeLeft}
                        timeLeft={timeLeft}
                        setAnswers={setAnswers}
                        answers={answers}
                        questions={questions}
                        step={step}
                    />
                    <div className='quiz-page--navigation'>
                        <p className='quiz-page--timer'>{!timeLeft ? "time's up." : `${timeLeft} seconds left.`}</p>
                        <div className='quiz-page--navigation--buttons'>
                            <Button
                                onClick={skipQuestion}
                                disabled={isChecked || !timeLeft}
                                text='skip'
                                small
                                type='secondary'
                            />
                            <Button
                                onClick={nextStep}
                                disabled={!isChecked && timeLeft}
                                text='next'
                                small
                            />
                        </div>
                    </div>
                </div>
                : <Summary
                    unanswered={unansweredQuestions}
                    correct={correctAnswers}
                    wrong={questions.length - (correctAnswers + unansweredQuestions)}
                />
            }
        </div >
    );
}

export default Quiz;