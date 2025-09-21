import React from 'react';
import { type Message as MessageType } from '../types';
import BotIcon from './icons/BotIcon';
import UserIcon from './icons/UserIcon';

const Message: React.FC<MessageType> = ({ role, content, isError }) => {
  const isUser = role === 'user';

  const containerClasses = `flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`;
  const bubbleClasses = `max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
    isUser
      ? 'bg-indigo-600 text-white rounded-br-lg'
      : isError
      ? 'bg-red-100 text-red-800 rounded-bl-lg'
      : 'bg-slate-200 text-slate-800 rounded-bl-lg'
  }`;

  return (
    <div className={containerClasses}>
      {!isUser && <BotIcon />}
      <div className={bubbleClasses}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
       {isUser && <UserIcon />}
    </div>
  );
};

export default Message;