import React, { useState } from 'react';

interface WelcomeScreenProps {
  onStartChat: (mood: string, topic: string) => void;
}

const moods = [
  { name: 'Happy', emoji: '😊' },
  { name: 'Sad', emoji: '😔' },
  { name: 'Anxious', emoji: '😟' },
  { name: 'Angry', emoji: '😠' },
  { name: 'Calm', emoji: '😌' },
  { name: 'Unsure', emoji: '🤔' },
];

const topicsByMood: { [key: string]: string[] } = {
  'Happy': ["Share what's making me happy", "Practice gratitude", "Set a positive goal"],
  'Sad': ["Understand my sadness", "Find ways to cope", "Just need to vent"],
  'Anxious': ["Calm my thoughts", "Work through a worry", "Practice a grounding exercise"],
  'Angry': ["Explore what's behind my anger", "Find a healthy outlet", "Cool down"],
  'Calm': ["Reflect on my peace", "How to maintain this feeling", "Do a mindfulness exercise"],
  'Unsure': ["Explore my feelings", "Talk about my day", "Get a gentle pep talk"],
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartChat }) => {
  const [step, setStep] = useState<'mood' | 'topic'>('mood');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleMoodSelect = (moodName: string) => {
    setSelectedMood(moodName);
    setStep('topic');
  };
  
  const handleTopicSelect = (topic: string) => {
    if (selectedMood) {
      onStartChat(selectedMood, topic);
    }
  };

  const renderMoodStep = () => (
    <>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">How are you feeling right now?</h2>
      <p className="text-slate-600 mb-8">Your answer will help me understand you better.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-md">
        {moods.map((mood) => (
          <button
            key={mood.name}
            onClick={() => handleMoodSelect(mood.name)}
            className="p-4 bg-white rounded-xl shadow-sm border border-slate-200 hover:bg-indigo-50 hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all text-center"
          >
            <div className="text-4xl mb-2" aria-hidden="true">{mood.emoji}</div>
            <div className="font-semibold text-slate-700">{mood.name}</div>
          </button>
        ))}
      </div>
    </>
  );

  const renderTopicStep = () => {
    const topics = selectedMood ? topicsByMood[selectedMood] : [];
    return (
      <>
        <button onClick={() => setStep('mood')} className="text-sm text-indigo-600 hover:underline mb-4 self-start">&larr; Back to moods</button>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">What's on your mind?</h2>
        <p className="text-slate-600 mb-8">Let's talk about it. Choose a starting point.</p>
        <div className="flex flex-col space-y-3 w-full max-w-md">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => handleTopicSelect(topic)}
              className="w-full px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
            >
              {topic}
            </button>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 mb-6 flex items-center justify-center shadow-lg">
         <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
      </div>
      {step === 'mood' ? renderMoodStep() : renderTopicStep()}
       <div className="bg-slate-100 p-4 rounded-lg mt-8 max-w-md">
        <p className="text-sm text-slate-500">
          <span className="font-bold">Remember:</span> I'm an AI, not a doctor. If you're in crisis, please reach out to a trusted adult or a professional helpline in your region. Your safety is most important.
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;