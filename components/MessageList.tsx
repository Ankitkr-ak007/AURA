import React, { useRef, useEffect } from 'react';
import { type Message as MessageType } from '../types';
import Message from './Message';

interface MessageListProps {
  messages: MessageType[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-slate-50" role="log">
      {messages.map((msg, index) => (
        <Message key={index} {...msg} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;