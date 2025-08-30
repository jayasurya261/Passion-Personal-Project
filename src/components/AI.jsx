import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, ArrowLeft, History, Trash2, MessageCircle, Plus } from 'lucide-react';

const SiruvaniChatbot = () => {
  // Default session for when localStorage is empty
  const defaultSession = {
    id: 'session-1',
    title: 'Getting Started',
    timestamp: new Date(Date.now() - 86400000),
    messages: [
      {
        id: 1,
        text: "Hello! I'm Siruvani AI, your educational tutor specialized in NCERT and Samacheer Kalvi curricula. I can help you with:\n\n📚 Subject explanations (Math, Science, Social Studies, etc.)\n🔬 Lab experiments and practical knowledge\n📖 Chapter summaries and key concepts\n💡 Problem-solving techniques\n📝 Exam preparation tips\n\nWhat would you like to learn today?",
        sender: 'bot',
        timestamp: new Date(Date.now() - 86400000)
      }
    ]
  };

  // Initialize state from localStorage or default
  const [chatSessions, setChatSessions] = useState(() => {
    try {
      const savedSessions = localStorage.getItem('siruvani-chat-sessions');
      if (savedSessions) {
        const parsed = JSON.parse(savedSessions);
        // Convert timestamp strings back to Date objects
        return parsed.map(session => ({
          ...session,
          timestamp: new Date(session.timestamp),
          messages: session.messages.map(msg => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
      }
      return [defaultSession];
    } catch (error) {
      console.error('Error loading chat sessions from localStorage:', error);
      return [defaultSession];
    }
  });

  const [currentSessionId, setCurrentSessionId] = useState(() => {
    try {
      const savedCurrentId = localStorage.getItem('siruvani-current-session-id');
      if (savedCurrentId) {
        return savedCurrentId;
      }
      return 'session-1';
    } catch (error) {
      return 'session-1';
    }
  });

  const [showHistory, setShowHistory] = useState(false);
  const [messages, setMessages] = useState(() => {
    const currentSession = chatSessions.find(s => s.id === currentSessionId);
    return currentSession ? currentSession.messages : defaultSession.messages;
  });
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const API_KEY = 'AIzaSyD-q7Ky0_NIz7x1mjp458yNRVZYVw0HEbk';
  const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

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

  // Save chat sessions to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('siruvani-chat-sessions', JSON.stringify(chatSessions));
    } catch (error) {
      console.error('Error saving chat sessions to localStorage:', error);
    }
  }, [chatSessions]);

  // Save current session ID to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('siruvani-current-session-id', currentSessionId);
    } catch (error) {
      console.error('Error saving current session ID to localStorage:', error);
    }
  }, [currentSessionId]);

  // Update messages when currentSessionId changes
  useEffect(() => {
    const currentSession = chatSessions.find(s => s.id === currentSessionId);
    if (currentSession) {
      setMessages(currentSession.messages);
    }
  }, [currentSessionId, chatSessions]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Create a new chat session
  const createNewSession = () => {
    const newSessionId = `session-${Date.now()}`;
    const newSession = {
      id: newSessionId,
      title: 'New Chat',
      timestamp: new Date(),
      messages: [
        {
          id: 1,
          text: "Hello! I'm Siruvani AI, your educational tutor specialized in NCERT and Samacheer Kalvi curricula. I can help you with:\n\n📚 Subject explanations (Math, Science, Social Studies, etc.)\n🔬 Lab experiments and practical knowledge\n📖 Chapter summaries and key concepts\n💡 Problem-solving techniques\n📝 Exam preparation tips\n\nWhat would you like to learn today?",
          sender: 'bot',
          timestamp: new Date()
        }
      ]
    };
    
    setChatSessions(prev => [...prev, newSession]);
    setCurrentSessionId(newSessionId);
    setShowHistory(false);
  };

  // Load a specific chat session
  const loadSession = (sessionId) => {
    const session = chatSessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSessionId(sessionId);
      setShowHistory(false);
    }
  };

  // Delete a chat session
  const deleteSession = (sessionId) => {
    if (chatSessions.length <= 1) return; // Keep at least one session
    
    const updatedSessions = chatSessions.filter(s => s.id !== sessionId);
    setChatSessions(updatedSessions);
    
    if (currentSessionId === sessionId) {
      const newCurrentSession = updatedSessions[updatedSessions.length - 1];
      setCurrentSessionId(newCurrentSession.id);
    }
  };

  // Update session title based on first user message
  const updateSessionTitle = (sessionId, title) => {
    setChatSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, title: title.substring(0, 30) + (title.length > 30 ? '...' : '') }
        : session
    ));
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    
    // Update the current session with new messages
    setChatSessions(prev => prev.map(session => 
      session.id === currentSessionId 
        ? { ...session, messages: newMessages, timestamp: new Date() }
        : session
    ));

    // Update session title if it's the first user message
    const currentSession = chatSessions.find(s => s.id === currentSessionId);
    if (currentSession && currentSession.title === 'New Chat' && newMessages.filter(m => m.sender === 'user').length === 1) {
      updateSessionTitle(currentSessionId, inputMessage);
    }

    const currentMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
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

        const updatedMessages = [...newMessages, botMessage];
        setMessages(updatedMessages);
        
        // Update the current session with bot response
        setChatSessions(prev => prev.map(session => 
          session.id === currentSessionId 
            ? { ...session, messages: updatedMessages, timestamp: new Date() }
            : session
        ));
      } else {
        const botMessage = {
          id: Date.now() + 1,
          text: "I'm here to help with your studies! Please tell me your class, subject, and specific topic you need help with. I specialize in NCERT and Samacheer Kalvi curricula for grades 6-12. 📚",
          sender: 'bot',
          timestamp: new Date()
        };
        
        const updatedMessages = [...newMessages, botMessage];
        setMessages(updatedMessages);
        
        setChatSessions(prev => prev.map(session => 
          session.id === currentSessionId 
            ? { ...session, messages: updatedMessages, timestamp: new Date() }
            : session
        ));
      }
    } catch (error) {
      console.error('Error calling AI API:', error);
      
      const botMessage = {
        id: Date.now() + 1,
        text: "I'm still here to help with your studies! Even offline, I can guide you with NCERT and Samacheer Kalvi topics. Please share your class, subject, and specific question. Let's continue learning together! 🎓",
        sender: 'bot',
        timestamp: new Date()
      };
      
      const updatedMessages = [...newMessages, botMessage];
      setMessages(updatedMessages);
      
      setChatSessions(prev => prev.map(session => 
        session.id === currentSessionId 
          ? { ...session, messages: updatedMessages, timestamp: new Date() }
          : session
      ));
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

  const formatDate = (timestamp) => {
    const today = new Date();
    const date = new Date(timestamp);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === new Date(today.getTime() - 86400000).toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
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
                <p className="text-xs text-green-600">💾 Data persists across reloads</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200"
              >
                <History className="w-4 h-4" />
                <span>History</span>
              </button>
              <button
                onClick={createNewSession}
                className="flex items-center space-x-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>New Chat</span>
              </button>
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
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Chat History Sidebar */}
        {showHistory && (
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                <History className="w-5 h-5" />
                <span>Chat History</span>
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {chatSessions.slice().reverse().map((session) => (
                <div
                  key={session.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 group ${
                    currentSessionId === session.id
                      ? 'bg-blue-100 border border-blue-200'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => loadSession(session.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <h3 className="text-sm font-medium text-gray-800 truncate">
                          {session.title}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(session.timestamp)} • {session.messages.length} messages
                      </p>
                    </div>
                    {chatSessions.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSession(session.id);
                        }}
                        className="p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 flex flex-col">
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
      </div>
    </div>
  );
};

export default SiruvaniChatbot;