import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, ArrowLeft } from 'lucide-react';

const SiruvaniChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Siruvani AI, your educational tutor specialized in NCERT and Samacheer Kalvi curricula. I can help you with:\n\n📚 Subject explanations (Math, Science, Social Studies, etc.)\n🔬 Lab experiments and practical knowledge\n📖 Chapter summaries and key concepts\n💡 Problem-solving techniques\n📝 Exam preparation tips\n\nWhat would you like to learn today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const API_KEY = 'AIzaSyD-q7Ky0_NIz7x1mjp458yNRVZYVw0HEbk';
  const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

  // Educational system prompt for Siruvani AI
  const EDUCATIONAL_SYSTEM_PROMPT = `You are Siruvani AI, an expert educational tutor specializing in NCERT and Samacheer Kalvi curricula for Indian students from grades 6-12. 

Your core responsibilities:
- Provide accurate, curriculum-aligned explanations for all subjects
- Break down complex concepts into simple, understandable steps
- Use real-life examples and analogies to explain difficult topics
- Offer step-by-step problem-solving techniques
- Create engaging study plans and revision strategies
- Motivate students and build their confidence
- Clarify doubts with patience and encouraging tone

Subject Expertise:
📚 MATHEMATICS: Arithmetic, Algebra, Geometry, Trigonometry, Statistics, Calculus
🔬 SCIENCE: Physics (Motion, Light, Sound, Electricity), Chemistry (Atoms, Acids-Bases, Metals), Biology (Life Processes, Human Body, Plants)
🌍 SOCIAL STUDIES: History (Ancient, Medieval, Modern India), Geography (Physical, Climate, Resources), Civics (Constitution, Government), Economics
📝 LANGUAGES: English, Hindi, Tamil (Grammar, Literature, Writing Skills)

Teaching Style:
- Always ask for the student's class/grade level and specific topic
- Use simple language appropriate for the grade level
- Provide examples from Indian context and daily life
- Encourage questions and create a safe learning environment
- Focus on understanding concepts rather than memorization
- Offer exam tips and study strategies when relevant

Response Format:
- Use emojis to make learning fun and engaging
- Structure responses with clear headings and bullet points
- Provide step-by-step explanations for problems
- Always end with encouragement or a follow-up question

Remember: You are here to help Indian students excel in their NCERT and Samacheer Kalvi studies. Be patient, encouraging, and always curriculum-focused.`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      // Combine system prompt with user message
      const fullPrompt = `${EDUCATIONAL_SYSTEM_PROMPT}\n\nStudent Question: ${currentMessage}`;
      
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: fullPrompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH", 
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error Details:', errorData);
        throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();

      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const botResponse = data.candidates[0].content.parts[0]?.text || "I received your message but couldn't generate a response.";
        
        const botMessage = {
          id: Date.now() + 1,
          text: botResponse,
          sender: 'bot',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
      } else {
        // Fallback response
        const botMessage = {
          id: Date.now() + 1,
          text: "I'm here to help with your studies! Please tell me your class, subject, and specific topic you need help with. I specialize in NCERT and Samacheer Kalvi curricula for grades 6-12. 📚",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error calling AI API:', error);
      
      // Educational fallback response
      const botMessage = {
        id: Date.now() + 1,
        text: "I'm still here to help with your studies! Even offline, I can guide you with NCERT and Samacheer Kalvi topics. Please share your class, subject, and specific question. Let's continue learning together! 🎓",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Siruvani AI Tutor</h1>
                <p className="text-sm text-gray-600">NCERT & Samacheer Kalvi Educational Assistant</p>
              </div>
            </div>
            <button
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender === 'bot' && (
                <div className="flex-shrink-0 p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-2xl shadow-md ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>

              {message.sender === 'user' && (
                <div className="flex-shrink-0 p-2 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-start space-x-3 justify-start">
              <div className="flex-shrink-0 p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white text-gray-800 border border-gray-200 px-4 py-3 rounded-2xl shadow-md">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                  <p className="text-sm text-gray-600">Thinking...</p>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about NCERT or Samacheer Kalvi topics..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[44px] max-h-32"
                rows="1"
                disabled={isLoading}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send • Example: "Explain photosynthesis for class 10" or "Help with algebra class 8"
          </p>
        </div>
      </div>
    </div>
  );
};

export default SiruvaniChatbot;