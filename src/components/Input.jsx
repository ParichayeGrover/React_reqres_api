import React from 'react'

const Input = ({type,placeholder,value,onChange,name}) => {
  return (
   <input
   type={type}
   name={name}
   placeholder={placeholder}
   value={value}
   onChange={onChange}
   className="w-full p-2 text-black mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
   />
);
};

export default Input
