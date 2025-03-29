import React from 'react'

function Button({ onClick, text }) {
    return (
        <button onClick={onClick } className="w-full bg-blue-500  p-2 rounded hover:bg-blue-600  text-black">
            {text}
        </button>
    );
};
export default Button
