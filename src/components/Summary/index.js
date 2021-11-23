import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';

function Summary({ unanswered, correct, wrong }) {
    const navigate = useNavigate();
    const goBack = () => navigate('/');

    return (
        <section className='summary-page'>
            <div className='summary-page--text'>
                <h3 className='summary-page--title header'>hey, you made it.</h3>
                <p className='summary-page--correct-answers'>you got {correct} questions right.</p>
                <p className='summary-page--incorrect-answers'>
                    <strong>{unanswered}</strong> questions were left unanswered, and <strong>{wrong}</strong> answers
                    were wrong.</p>
            </div>
            <Button onClick={goBack} text='back to start page' disabled={false} />
        </section>
    );
}

export default Summary;
