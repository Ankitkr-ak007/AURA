import React from 'react';
import { Message } from '../types';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (input: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading, onSendMessage }) => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <MessageList messages={messages} />
      {isLoading && <TypingIndicator />}
      <div className="flex-shrink-0 p-4 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
            <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
