import React from 'react';
import CloseIcon from './icons/CloseIcon';

interface ResourceLibraryProps {
  onClose: () => void;
}

const resources = [
  {
    category: 'Understanding Anxiety',
    content: "Anxiety is a natural human response to stress. It's a feeling of fear or apprehension about what's to come. While everyone feels anxious from time to time, persistent, excessive worry can interfere with daily life. Common symptoms include a racing heart, rapid breathing, and difficulty concentrating. Recognizing these signs is the first step toward managing them. Techniques like deep breathing, mindfulness, and talking about your feelings can be very effective.",
  },
  {
    category: 'Managing Stress',
    content: "Stress is how the body reacts to any demand. It can be positive, keeping us alert and ready to avoid danger. But chronic stress can harm your health. Effective stress management involves identifying your stressors, practicing relaxation techniques (like the ones in our Tools menu!), getting regular physical activity, and ensuring you get enough sleep. It's not about eliminating stress, but about learning how to handle it in a healthy way.",
  },
  {
    category: 'Practicing Mindfulness',
    content: "Mindfulness is the practice of being present and fully engaged with whatever we’re doing at the moment — free from distraction or judgment. You can practice mindfulness anywhere. It involves paying attention to your breath, your body's sensations, and the world around you. This practice can help reduce stress, improve focus, and increase your enjoyment of life. Start small with just a few minutes each day.",
  },
  {
    category: 'The Importance of Sleep',
    content: "Sleep is crucial for both physical and mental health. It allows your mind and body to recharge, leaving you refreshed and alert when you wake up. Poor sleep can lead to problems with mood, focus, and overall health. To improve your sleep, try to maintain a regular sleep schedule, create a restful environment, limit screen time before bed, and avoid large meals or caffeine late in the day.",
  },
];

const ResourceLibrary: React.FC<ResourceLibraryProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-30 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-50 rounded-lg shadow-xl w-full max-w-2xl h-full max-h-[90vh] flex flex-col">
        <header className="p-4 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
          <h2 className="text-xl font-bold text-slate-800">Wellness Resources</h2>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600" aria-label="Close resources">
            <CloseIcon />
          </button>
        </header>
        <main className="p-6 overflow-y-auto">
          <p className="text-slate-600 mb-6">Here are some articles to help you learn more about mental wellness. This information is for educational purposes and is not a substitute for professional medical advice.</p>
          <div className="space-y-6">
            {resources.map((resource) => (
              <div key={resource.category} className="bg-white p-4 rounded-lg border border-slate-200">
                <h3 className="font-bold text-lg text-indigo-700 mb-2">{resource.category}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{resource.content}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResourceLibrary;