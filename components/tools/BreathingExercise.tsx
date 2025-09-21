import React, { useState, useEffect } from 'react';
import CloseIcon from '../icons/CloseIcon';

interface BreathingExerciseProps {
    onClose: () => void;
    onComplete: (message: string) => void;
}

const TOTAL_DURATION_SECONDS = 60; // 1 minute exercise

const BreathingExercise: React.FC<BreathingExerciseProps> = ({ onClose, onComplete }) => {
    const [phase, setPhase] = useState('get-ready'); // get-ready, inhale, hold, exhale, finished
    const [count, setCount] = useState(4);
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
        let cycleTimer: NodeJS.Timeout;
        let countdownTimer: NodeJS.Timeout;
        let progressTimer: NodeJS.Timeout;

        if (phase === 'inhale' || phase === 'hold' || phase === 'exhale') {
            progressTimer = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(progressTimer);
                        setPhase('finished');
                        return 100;
                    }
                    return prev + (100 / TOTAL_DURATION_SECONDS);
                });
            }, 1000);
        }

        const cycle = () => {
            setPhase('inhale');
            setCount(4);
            cycleTimer = setTimeout(() => {
                setPhase('hold');
                setCount(4);
                cycleTimer = setTimeout(() => {
                    setPhase('exhale');
                    setCount(6);
                    cycleTimer = setTimeout(cycle, 6000); // loop
                }, 4000);
            }, 4000);
        };
        
        if (phase === 'start') {
            cycle();
        }

        if (phase === 'inhale' || phase === 'hold' || phase === 'exhale') {
            countdownTimer = setInterval(() => {
                 setCount(prev => (prev > 1 ? prev - 1 : 1));
            }, 1000);
        }

        return () => {
            clearTimeout(cycleTimer);
            clearInterval(countdownTimer);
            clearInterval(progressTimer);
        };
    }, [phase]);
    
    const handleStart = () => {
        setProgress(0);
        setPhase('start');
    }
    
    const handleShare = () => {
        onComplete("I just completed a breathing exercise. I'm feeling a bit calmer now.");
    };

    const getInstruction = () => {
        switch(phase) {
            case 'get-ready': return "Find a comfortable position. We'll do a 1-minute breathing exercise.";
            case 'inhale': return `Breathe in...`;
            case 'hold': return `Hold...`;
            case 'exhale': return `Breathe out slowly...`;
            case 'finished': return "Great job! You've completed the exercise.";
            default: return '';
        }
    };
    
    const isRunning = phase === 'inhale' || phase === 'hold' || phase === 'exhale';

    return (
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm m-4 relative animate-fade-in-up flex flex-col">
            <button onClick={onClose} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600" aria-label="Close">
                <CloseIcon />
            </button>
            <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">1-Minute Breathing Exercise</h3>
            
            <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                 <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#e6e6e6" strokeWidth="8" />
                    <circle
                        cx="60"
                        cy="60"
                        r="54"
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="8"
                        strokeDasharray="339.292"
                        strokeDashoffset={339.292 - (progress / 100) * 339.292}
                        className="transition-all duration-1000 linear"
                    />
                </svg>
                <div className="text-center z-10">
                    <p className="text-lg text-slate-600 transition-opacity duration-500">{getInstruction()}</p>
                    {isRunning && <div className="text-5xl font-bold text-indigo-600 animate-fade-in">{count}</div>}
                </div>
            </div>

            <div className="mt-6 space-y-2">
            {phase === 'get-ready' && (
                <button
                    onClick={handleStart}
                    className="w-full px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                    Start Exercise
                </button>
            )}
             {phase === 'finished' && (
                <button
                    onClick={handleShare}
                    className="w-full px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                    Share with Aura
                </button>
             )}
             {isRunning && (
                 <button
                    onClick={() => setPhase('get-ready')}
                    className="w-full px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200"
                >
                    Stop
                </button>
             )}
             {phase === 'finished' && (
                 <button
                    onClick={onClose}
                    className="w-full px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200"
                >
                    Close
                </button>
             )}
            </div>
        </div>
    );
};

export default BreathingExercise;
