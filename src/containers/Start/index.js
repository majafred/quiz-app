import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

function Start() {
    const navigate = useNavigate();
    const startQuiz = () => navigate('/quiz');

    return (
        <section className='start-page main'>
            <h1 className='start-page--title header'>the Apple Quiz.</h1>
            <p className='start-page--desc'>welcome to the Apple Quiz. please test your apple knowledge by clicking the start button.</p>
            <Button onClick={startQuiz} text='start' disabled={false} type='start-page' />
        </section>
    );
}

export default Start;
