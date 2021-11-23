import classNames from 'classnames';
import React from 'react';

function Button({ text, onClick, disabled, small, type }) {
    return (
        <button
            className={classNames('button',
                type && `button--${type}`,
                small && 'small',
                disabled ? 'disabled' : 'hoverable')}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
}

export default Button;
