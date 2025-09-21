import React, { useState, useEffect } from 'react';
import { Message } from './types';
import { initializeChat, sendMessageToGemini } from './services/geminiService';
import Header from './components/Header';
import WelcomeScreen from './components/WelcomeScreen';
import ChatWindow from './components/ChatWindow';
import ResourceLibrary from './components/ResourceLibrary';
import { useTextToSpeech } from './hooks/useTextToSpeech';
import { Content } from '@google/genai';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [isTtsEnabled, setIsTtsEnabled] = useState(false);

  const { speak, cancel } = useTextToSpeech();

  useEffect(() => {
    // When TTS is disabled, cancel any ongoing speech.
    if (!isTtsEnabled) {
      cancel();
    }
  }, [isTtsEnabled, cancel]);

  const handleStartChat = (mood: string, topic: string) => {
    const systemInstruction = `You are Aura, a supportive and empathetic AI companion designed for mental wellness. Your goal is to provide a safe, non-judgmental space for users to explore their feelings. You are not a therapist, but a caring friend. Your tone should be warm, gentle, and encouraging. You should ask thoughtful follow-up questions to help the user reflect. Keep responses concise and easy to understand. Do not give medical advice. If the user seems to be in crisis, gently guide them to seek professional help. The user has started the conversation feeling "${mood}" and wants to talk about "${topic}". Start the conversation by acknowledging their feelings and opening the topic gently.`;

    const initialHistory: Content[] = [];
    initializeChat(systemInstruction, initialHistory);
    
    // This message will be sent to the model to generate the first response, but not shown to the user.
    const initialPrompt = `I'm feeling ${mood} and I want to talk about: ${topic}.`;
    
    setChatStarted(true);
    setIsLoading(true);

    sendMessageToGemini(initialPrompt).then(response => {
      const botMessage: Message = { role: 'model', content: response };
      setMessages([botMessage]);
      if (isTtsEnabled) {
        speak(response);
      }
    }).catch(error => {
       console.error(error);
       const errorMessage: Message = { role: 'model', content: "I'm sorry, something went wrong. Please try starting a new chat.", isError: true };
       setMessages([errorMessage]);
    }).finally(() => {
       setIsLoading(false);
    });
  };

  const handleSendMessage = async (userInput: string) => {
    if (!userInput.trim()) return;

    cancel(); // Stop any currently speaking TTS
    const userMessage: Message = { role: 'user', content: userInput };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendMessageToGemini(userInput);
      const botMessage: Message = { role: 'model', content: response };
      setMessages(prevMessages => [...prevMessages, botMessage]);
      if (isTtsEnabled) {
        speak(response);
      }
    } catch (error) {
      console.error(error);
      const errorMessage: Message = { role: 'model', content: "I'm having trouble connecting. Please check your connection and try again.", isError: true };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    cancel();
    setMessages([]);
    setChatStarted(false);
    setIsLoading(false);
  };
  
  const handleToggleTts = () => {
    if (isTtsEnabled) {
      cancel();
    }
    setIsTtsEnabled(!isTtsEnabled);
  }

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans">
      <Header 
        chatStarted={chatStarted} 
        onNewChat={handleNewChat}
        onShowResources={() => setShowResources(true)}
        isTtsEnabled={isTtsEnabled}
        onToggleTts={handleToggleTts}
      />
      <main className="flex-grow flex flex-col overflow-y-auto">
        {!chatStarted ? (
          <WelcomeScreen onStartChat={handleStartChat} />
        ) : (
          <ChatWindow
            messages={messages}
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
          />
        )}
      </main>
      {showResources && <ResourceLibrary onClose={() => setShowResources(false)} />}
    </div>
  );
};

export default App;
