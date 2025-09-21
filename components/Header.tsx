import React from 'react';
import RestartIcon from './icons/RestartIcon';
import LibraryIcon from './icons/LibraryIcon';
import SpeakerOnIcon from './icons/SpeakerOnIcon';
import SpeakerOffIcon from './icons/SpeakerOffIcon';

interface HeaderProps {
  chatStarted: boolean;
  onNewChat: () => void;
  onShowResources: () => void;
  isTtsEnabled: boolean;
  onToggleTts: () => void;
}

const Header: React.FC<HeaderProps> = ({ chatStarted, onNewChat, onShowResources, isTtsEnabled, onToggleTts }) => {
  return (
    <header className="bg-white shadow-sm w-full flex-shrink-0 z-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500"></div>
            <h1 className="text-xl font-bold text-slate-800">Aura</h1>
          </div>
          <div className="flex items-center space-x-2">
             <button
               onClick={onToggleTts}
               className="flex items-center justify-center w-10 h-10 text-slate-600 bg-slate-100 rounded-full hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
               aria-label={isTtsEnabled ? 'Disable text-to-speech' : 'Enable text-to-speech'}
             >
                {isTtsEnabled ? <SpeakerOnIcon /> : <SpeakerOffIcon />}
             </button>
             <button
               onClick={onShowResources}
               className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
               aria-label="Open wellness resources"
             >
                <LibraryIcon />
               <span className="hidden sm:inline">Resources</span>
             </button>
           {chatStarted && (
             <button
               onClick={onNewChat}
               className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
               aria-label="Start new chat"
             >
                <RestartIcon />
               <span className="hidden sm:inline">New Chat</span>
             </button>
           )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;