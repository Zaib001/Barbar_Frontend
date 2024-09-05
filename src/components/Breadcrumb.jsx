// src/components/Breadcrumb.js
import React from 'react';

const Breadcrumb = ({ step, onStepClick }) => {
  const steps = ['Location', 'Professional', 'Service', 'Time', 'Done'];

  return (
    <nav className="text-xs text-gray-400 p-4 mt-10">
      <ol className="flex space-x-1">
        {steps.map((label, index) => (
          <li key={index} className={`flex items-center ${index + 1 === step ? 'font-bold text-black' : ''}`}>
            <span
              className={`cursor-pointer ${index + 1 <= step ? 'text-black' : 'text-gray-400'}`}
              onClick={() => onStepClick(index + 1)}
            >
              {label}
            </span>&nbsp;&nbsp;
            {index < steps.length - 1 && <span className="text-gray-300"> &gt; </span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
