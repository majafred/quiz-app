import React, { useState } from 'react';
import Button from '../Button';

function Lifelines({ setTimeLeft, timeLeft, setAnswers, answers, questions, step }) {
    const [isTimeLifeLineUsed, setTimeLifeLineUsed] = useState(false);
    const [is5050LifeLineUsed, set5050LifeLineUsed] = useState(false);

    const useTimeLifeLine = () => {
        if (!isTimeLifeLineUsed && timeLeft) {
            setTimeLeft(timeLeft + 10);
            setTimeLifeLineUsed(true);
        }
    }

    const use5050LifeLine = () => {
        let updatedAnswers = [];
        let wrongAnswer = null;

        if (!is5050LifeLineUsed && timeLeft) {
            answers.forEach(answer => {
                if (answer.id === questions[step].correctAnswer) {
                    updatedAnswers.push(answer);
                }
                else if (!wrongAnswer) {
                    updatedAnswers.push(answer);
                    wrongAnswer = answer;
                }
            })

            setAnswers(updatedAnswers);
            set5050LifeLineUsed(true);
        }
    }

    return (
        <section className='quiz-page--lifeline'>
            <h3 className='quiz-page--lifeline--title header'>lifelines</h3>
            <h4 className='quiz-page--lifeline--desc'>choose carefully, you can only use the lifeline once.</h4>
            <div className='quiz-page--lifeline--buttons-section' >
                <Button
                    onClick={use5050LifeLine}
                    text='50/50'
                    disabled={is5050LifeLineUsed || !timeLeft}
                    type='icon'
                />
                <Button
                    onClick={useTimeLifeLine}
                    text='+10s'
                    disabled={isTimeLifeLineUsed || !timeLeft}
                    type='icon'
                />
            </div>
        </section>
    );
}

export default Lifelines;
