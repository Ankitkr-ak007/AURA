import React, { useState, useRef, useEffect } from 'react';
import SendIcon from './icons/SendIcon';
import ToolsIcon from './icons/ToolsIcon';
import BreathingExercise from './tools/BreathingExercise';
import GratitudeJournal from './tools/GratitudeJournal';
import SpotifyPlayer from './tools/SpotifyPlayer';

interface ChatInputProps {
  onSendMessage: (input: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const [showTools, setShowTools] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [input]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };
  
  const handleToolComplete = (message: string) => {
    onSendMessage(message);
    setActiveTool(null);
  };
  
  const renderActiveTool = () => {
    if (!activeTool) return null;
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-30 flex items-center justify-center">
            {activeTool === 'breathing' && <BreathingExercise onClose={() => setActiveTool(null)} onComplete={handleToolComplete} />}
            {activeTool === 'journal' && <GratitudeJournal onClose={() => setActiveTool(null)} onSave={handleToolComplete} />}
            {activeTool === 'music' && <SpotifyPlayer onClose={() => setActiveTool(null)} />}
        </div>
    );
  };

  return (
    <>
    {renderActiveTool()}
    <div className="relative">
       {showTools && (
        <div className="absolute bottom-full mb-2 w-full sm:w-64 bg-white rounded-lg shadow-xl border border-slate-200 animate-fade-in-up p-2 space-y-1">
            <button onClick={() => { setActiveTool('breathing'); setShowTools(false); }} className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-md">Breathing Exercise</button>
            <button onClick={() => { setActiveTool('journal'); setShowTools(false); }} className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-md">Gratitude Journal</button>
            <button onClick={() => { setActiveTool('music'); setShowTools(false); }} className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-md">Calming Music</button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        <button 
          type="button" 
          onClick={() => setShowTools(!showTools)}
          className="flex-shrink-0 flex items-center justify-center w-10 h-10 text-slate-500 hover:text-indigo-600 rounded-full hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Open tools"
        >
          <ToolsIcon />
        </button>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Type your message..."
          className="flex-grow p-2 pl-4 pr-4 bg-slate-100 rounded-2xl resize-none max-h-40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
          rows={1}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white disabled:bg-indigo-300 disabled:cursor-not-allowed hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          aria-label="Send message"
        >
          <SendIcon />
        </button>
      </form>
    </div>
    </>
  );
};

export default ChatInput;
