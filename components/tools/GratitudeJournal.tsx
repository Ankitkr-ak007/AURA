import React, { useState } from 'react';
import CloseIcon from '../icons/CloseIcon';

interface GratitudeJournalProps {
    onClose: () => void;
    onSave: (entry: string) => void;
}

const GratitudeJournal: React.FC<GratitudeJournalProps> = ({ onClose, onSave }) => {
    const [entry, setEntry] = useState('');

    const handleSave = () => {
        if (entry.trim()) {
            onSave(entry);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4 relative animate-fade-in-up">
             <button onClick={onClose} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600" aria-label="Close">
                <CloseIcon />
            </button>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Gratitude Journal</h3>
            <p className="text-slate-600 mb-4">What is something you're grateful for today?</p>
            <textarea
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                placeholder="It can be something big or small..."
                className="w-full h-32 p-3 bg-slate-100 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                aria-label="Gratitude journal entry"
            />
            <div className="mt-4 flex justify-end space-x-2">
                 <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200">
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    disabled={!entry.trim()}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                    Save & Share
                </button>
            </div>
        </div>
    );
};

export default GratitudeJournal;
