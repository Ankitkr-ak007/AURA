
import React from 'react';
import BotIcon from './icons/BotIcon';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-3 p-4">
      <BotIcon />
      <div className="bg-slate-200 rounded-2xl rounded-bl-lg px-4 py-3 flex items-center space-x-1.5">
        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-0"></span>
        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-300"></span>
      </div>
    </div>
  );
};

export default TypingIndicator;
