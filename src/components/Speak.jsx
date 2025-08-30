import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, BookOpen, Users, Loader, Brain, Lightbulb, Sparkles, ArrowLeft } from 'lucide-react';

const AIConversationGenerator = () => {
  const [topic, setTopic] = useState('');
  const [conversations, setConversations] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentUtterance, setCurrentUtterance] = useState(null);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [error, setError] = useState('');

  const API_KEY = 'AIzaSyD-q7Ky0_NIz7x1mjp458yNRVZYVw0HEbk';

  // Load voices when component mounts
  useEffect(() => {
    if ('speechSynthesis' in window) {
      speechSynthesis.getVoices();
    }
  }, []);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback if no history
      window.location.href = '/';
    }
  };

  const generateConversation = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    setConversations([]);
    setAudioUrl('');
    setCurrentTime(0);
    setDuration(0);
    setError('');
    
    try {
      const educationalConversation = await generateWithGemini(topic);
      setConversations(educationalConversation);
    } catch (err) {
      setError('Failed to generate conversation. Please try again.');
      console.error('Error:', err);
      // Fallback to a comprehensive default conversation
      const fallbackConversation = generateFallbackScript(topic);
      setConversations(fallbackConversation);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateWithGemini = async (subject) => {
    const prompt = `Create a comprehensive educational conversation between a curious Student and an expert Teacher about "${subject}". 

The conversation should be 18-25 exchanges long and cover these topics in detail:

1. **Introduction & Definition** - What is ${subject}? Basic concepts and terminology
2. **Historical Background** - How did ${subject} develop? Key milestones and discoveries
3. **Core Principles** - Fundamental laws, theories, or concepts that govern ${subject}
4. **Real-World Examples** - Specific, concrete examples that students can relate to
5. **Applications & Benefits** - How ${subject} is used today and why it matters
6. **Challenges & Limitations** - Current problems or difficulties in the field
7. **Future Trends** - Emerging developments and future possibilities
8. **How to Learn More** - Resources and next steps for deeper study

IMPORTANT REQUIREMENTS:
- The Student should ask follow-up questions that show growing understanding
- The Teacher should give detailed, educational explanations with specific facts
- Include real examples, numbers, dates, and concrete details when relevant
- Make the conversation flow naturally from basic to advanced concepts
- The Student should sound increasingly knowledgeable as the conversation progresses
- End with the Student feeling confident and excited about the topic

FORMAT: Return ONLY a JSON array with this exact structure:
[
  {
    "id": 1,
    "speaker": "Student",
    "text": "detailed student question or comment",
    "voice": "student"
  },
  {
    "id": 2,
    "speaker": "Teacher", 
    "text": "comprehensive teacher explanation",
    "voice": "teacher"
  }
]

Make each exchange substantial and educational. The Teacher's responses should be 2-4 sentences long with specific details.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8000,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;
    
    // Parse the JSON response from Gemini
    try {
      // Clean the response and extract JSON
      let jsonText = generatedText;
      
      // Remove markdown code blocks if present
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      
      // Extract JSON array from the response
      const jsonMatch = jsonText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return Array.isArray(parsed) ? parsed : [parsed];
      } else {
        // Try parsing the entire cleaned response
        const parsed = JSON.parse(jsonText);
        return Array.isArray(parsed) ? parsed : [parsed];
      }
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', parseError);
      console.log('Raw response:', generatedText);
      throw new Error('Failed to parse AI response');
    }
  };

  const generateFallbackScript = (subject) => {
    return [
      {
        id: 1,
        speaker: 'Student',
        text: `Hi! I'm really interested in learning about ${subject}. I've heard about it before, but I want to understand it properly from the ground up. Can you help me learn everything about it?`,
        voice: 'student'
      },
      {
        id: 2,
        speaker: 'Teacher',
        text: `Absolutely! I'm excited to teach you about ${subject}. It's a fascinating topic that has profound implications for our understanding of the world. Let me start by giving you a clear definition and then we'll explore it systematically together.`,
        voice: 'teacher'
      },
      {
        id: 3,
        speaker: 'Teacher',
        text: `${subject} is a field that involves the systematic study and application of fundamental principles governing natural phenomena and human-made systems. It encompasses both theoretical understanding and practical applications that directly impact our daily lives and society.`,
        voice: 'teacher'
      },
      {
        id: 4,
        speaker: 'Student',
        text: `That sounds really comprehensive! I'm curious about the history - how did our understanding of ${subject} develop over time? Were there key moments or discoveries that changed everything?`,
        voice: 'student'
      },
      {
        id: 5,
        speaker: 'Teacher',
        text: `Excellent question! The history of ${subject} spans centuries of human curiosity and discovery. Early pioneers laid the groundwork through careful observation and experimentation. Major breakthroughs occurred when scientists and thinkers began to understand the underlying principles and could make accurate predictions about natural phenomena.`,
        voice: 'teacher'
      },
      {
        id: 6,
        speaker: 'Student',
        text: `That's fascinating! I love learning about how knowledge developed over time. Now, can you give me some concrete, real-world examples of ${subject} that I might encounter in my everyday life?`,
        voice: 'student'
      },
      {
        id: 7,
        speaker: 'Teacher',
        text: `Of course! Real-world applications of ${subject} are everywhere around us. From the technology in your smartphone to the natural processes that sustain life on Earth, ${subject} plays a crucial role in understanding and improving our world. These applications demonstrate the practical importance of studying this field.`,
        voice: 'teacher'
      },
      {
        id: 8,
        speaker: 'Student',
        text: `I'm starting to see how important and relevant this is! What are the key principles or core concepts I should focus on to really understand ${subject}? I want to make sure I grasp the fundamentals properly.`,
        voice: 'student'
      },
      {
        id: 9,
        speaker: 'Teacher',
        text: `Great approach to learning! There are several fundamental principles that form the core of ${subject}. These include understanding cause-and-effect relationships, recognizing patterns and systems, and appreciating the interconnectedness of different components. Mastering these concepts will give you a solid foundation to build upon.`,
        voice: 'teacher'
      },
      {
        id: 10,
        speaker: 'Student',
        text: `This is really helping me build a framework for understanding! I can see how these principles would apply broadly. What are the main benefits of studying ${subject}? Why is it considered so important?`,
        voice: 'student'
      },
      {
        id: 11,
        speaker: 'Teacher',
        text: `The benefits of understanding ${subject} are immense and multifaceted. It enhances critical thinking skills, provides practical knowledge for solving real-world problems, and opens up exciting career opportunities in growing fields. Additionally, it satisfies our natural curiosity about how things work and helps us make informed decisions.`,
        voice: 'teacher'
      },
      {
        id: 12,
        speaker: 'Student',
        text: `That's really motivating! But I imagine there are also challenges or limitations in this field. What difficulties do researchers face, and what should I be aware of as I continue learning?`,
        voice: 'student'
      },
      {
        id: 13,
        speaker: 'Teacher',
        text: `You're absolutely right to consider the challenges! ${subject} can be complex and sometimes requires advanced mathematical or analytical thinking. There are also ongoing debates and unanswered questions in the field. However, these challenges make it even more exciting to study and contribute to!`,
        voice: 'teacher'
      },
      {
        id: 14,
        speaker: 'Student',
        text: `I appreciate getting a balanced perspective! Looking toward the future, what new developments or trends should I keep an eye on in ${subject}? What's on the cutting edge right now?`,
        voice: 'student'
      },
      {
        id: 15,
        speaker: 'Teacher',
        text: `The future of ${subject} is incredibly exciting! New technologies and research methods are constantly expanding our understanding. Interdisciplinary approaches are creating innovative solutions to complex problems, and there are many opportunities for the next generation of learners like yourself to make meaningful contributions.`,
        voice: 'teacher'
      },
      {
        id: 16,
        speaker: 'Student',
        text: `This conversation has been absolutely amazing! I feel like I have a much deeper understanding of ${subject} now. What would you recommend as my next steps if I want to dive deeper and maybe even pursue this academically or professionally?`,
        voice: 'student'
      },
      {
        id: 17,
        speaker: 'Teacher',
        text: `I'm thrilled about your enthusiasm! Here's my roadmap for you: Start with foundational textbooks or high-quality online courses. Join communities of learners and practitioners in the field. Look for hands-on opportunities to apply what you learn through projects or internships. Most importantly, stay curious and keep asking questions - that's how real learning and discovery happen!`,
        voice: 'teacher'
      },
      {
        id: 18,
        speaker: 'Student',
        text: `Thank you so much for this incredible learning journey! I feel much more confident about ${subject} now and excited to explore it further. You've really helped me understand not just what it is, but why it matters and how I can continue growing in this area.`,
        voice: 'student'
      }
    ];
  };

  const generateAudio = () => {
    if (conversations.length === 0) return;
    
    setIsGenerating(true);
    
    // Use Web Speech API for immediate functionality
    if ('speechSynthesis' in window) {
      // Estimate total duration based on conversation length
      const totalText = conversations.map(c => c.text).join(' ');
      const wordCount = totalText.split(' ').length;
      const estimatedDuration = Math.ceil((wordCount / 150) * 60); // 150 words per minute for natural speech
      setDuration(estimatedDuration);
      
      setAudioUrl('ready');
      setIsGenerating(false);
    } else {
      alert('Speech synthesis not supported. Please use Chrome, Firefox, or Safari.');
      setIsGenerating(false);
    }
  };

  const speakDialogue = (dialogue, index) => {
    const utterance = new SpeechSynthesisUtterance(dialogue.text);
    
    // Configure voice based on speaker
    const voices = speechSynthesis.getVoices();
    if (dialogue.speaker === 'Student') {
      utterance.rate = 1.0;
      utterance.pitch = 1.3;
      utterance.volume = 0.9;
      const youngVoice = voices.find(voice => 
        voice.name.includes('Female') || 
        voice.name.includes('Samantha') ||
        voice.name.includes('Karen') ||
        voice.name.includes('Zira') ||
        voice.voiceURI.includes('female')
      );
      if (youngVoice) utterance.voice = youngVoice;
    } else {
      utterance.rate = 0.85;
      utterance.pitch = 0.9;
      utterance.volume = 1.0;
      const teacherVoice = voices.find(voice => 
        voice.name.includes('Male') ||
        voice.name.includes('Alex') ||
        voice.name.includes('Daniel') ||
        voice.name.includes('David') ||
        voice.voiceURI.includes('male')
      );
      if (teacherVoice) utterance.voice = teacherVoice;
    }

    utterance.onstart = () => {
      setCurrentDialogueIndex(index);
    };

    utterance.onend = () => {
      if (index < conversations.length - 1) {
        // Continue with next dialogue after a short pause
        setTimeout(() => {
          speakDialogue(conversations[index + 1], index + 1);
        }, 1200);
      } else {
        // End of conversation
        setIsPlaying(false);
        setCurrentTime(0);
        setCurrentDialogueIndex(0);
      }
    };

    speechSynthesis.speak(utterance);
    return utterance;
  };

  const togglePlayback = () => {
    if (!audioUrl) return;

    if (isPlaying) {
      // Stop playback
      speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentUtterance(null);
    } else {
      // Start playback
      setIsPlaying(true);
      setCurrentTime(0);
      setCurrentDialogueIndex(0);
      
      // Start speaking from first dialogue
      const firstUtterance = speakDialogue(conversations[0], 0);
      setCurrentUtterance(firstUtterance);
      
      // Track time progress
      const startTime = Date.now();
      const interval = setInterval(() => {
        if (speechSynthesis.speaking) {
          const elapsed = Math.floor((Date.now() - startTime) / 1000);
          setCurrentTime(elapsed);
        } else {
          clearInterval(interval);
        }
      }, 1000);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto p-4 sm:p-6">
        {/* Back Button */}
        <div className="mb-6 pt-4">
          <button
            onClick={handleGoBack}
            className="group flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl transition-all duration-300 border border-white/20 hover:border-white/30"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8 pt-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl mb-6 shadow-2xl">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Study Assistant
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Powered by Google Gemini • Transform any topic into deep learning conversations
          </p>
          <div className="inline-flex items-center space-x-2 mt-4 bg-green-900/30 px-4 py-2 rounded-full border border-green-500/30">
            <Sparkles className="w-4 h-4 text-green-400" />
            <span className="text-green-300 font-medium">AI-Generated Content</span>
          </div>
        </div>

        {/* Main Input Card */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 mb-8 border border-white/10 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">What do you want to master today?</h2>
            <p className="text-gray-300 text-lg">Enter any topic for a comprehensive learning experience</p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="e.g., Quantum Physics, Machine Learning, Ancient Rome, Climate Change..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && generateConversation()}
                className="flex-1 p-5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 text-lg backdrop-blur-sm transition-all duration-300"
              />
              <button
                onClick={generateConversation}
                disabled={isGenerating || !topic.trim()}
                className="px-8 py-5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-2xl text-white font-bold transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:transform-none text-lg min-w-fit"
              >
                {isGenerating ? (
                  <>
                    <Loader className="w-6 h-6 animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Brain className="w-6 h-6" />
                    <span>Generate</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-900/30 border border-red-500/30 rounded-2xl text-red-300 text-center">
              {error}
            </div>
          )}
        </div>

        {/* Generated Conversation */}
        {conversations.length > 0 && (
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 mb-8 border border-white/10 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">📚 Deep Learning Conversation</h3>
                <p className="text-gray-300">Topic: <span className="text-blue-300 font-semibold">{topic}</span></p>
                <p className="text-sm text-gray-400 mt-1">{conversations.length} educational exchanges</p>
              </div>
              <button
                onClick={generateAudio}
                disabled={isGenerating}
                className="px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-2xl text-white font-bold transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:transform-none min-w-fit"
              >
                {isGenerating ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Preparing Audio...</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-5 h-5" />
                    <span>Make it Speak!</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
              {conversations.map((conv, index) => (
                <div key={conv.id} className={`flex items-start space-x-4 transition-all duration-500 ${
                  isPlaying && currentDialogueIndex === index ? 'scale-105 bg-white/10 p-4 rounded-2xl shadow-xl' : ''
                }`}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold flex-shrink-0 shadow-lg ${
                    conv.speaker === 'Student' 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-500'
                  } ${isPlaying && currentDialogueIndex === index ? 'animate-pulse' : ''}`}>
                    {conv.speaker === 'Student' ? '🎓' : '👨‍🏫'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className={`font-bold text-lg ${
                        conv.speaker === 'Student' ? 'text-cyan-300' : 'text-pink-300'
                      }`}>
                        {conv.speaker}
                      </span>
                      <span className="text-xs text-gray-400 bg-white/20 px-3 py-1 rounded-full font-medium">
                        {conv.speaker === 'Student' ? 'Curious Learner' : 'Expert Teacher'}
                      </span>
                      {isPlaying && currentDialogueIndex === index && (
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-300 text-xs font-medium">Speaking</span>
                        </div>
                      )}
                    </div>
                    <div className={`text-gray-100 text-base leading-relaxed bg-white/10 p-5 rounded-2xl border transition-all duration-300 ${
                      isPlaying && currentDialogueIndex === index 
                        ? 'border-green-400/50 bg-green-900/20 shadow-lg' 
                        : 'border-white/10'
                    }`}>
                      {conv.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Audio Player */}
        {audioUrl && (
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">🎧 Immersive Audio Learning</h3>
              <p className="text-gray-300">Listen to your personalized educational conversation</p>
            </div>
            
            <div className="bg-black/30 rounded-3xl p-8 border border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div>
                  <h4 className="text-white font-bold text-xl mb-1">📖 Learning: {topic}</h4>
                  <p className="text-gray-400">Comprehensive Educational Dialogue</p>
                  <p className="text-sm text-gray-500 mt-1">{conversations.length} conversation exchanges</p>
                </div>
                <div className="text-gray-300 font-mono text-lg">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
              
              <div className="flex items-center space-x-6 mb-6">
                <button
                  onClick={togglePlayback}
                  disabled={!audioUrl}
                  className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-2xl"
                >
                  {isPlaying ? (
                    <Pause className="w-10 h-10 text-white" />
                  ) : (
                    <Play className="w-10 h-10 text-white ml-1" />
                  )}
                </button>
                
                <div className="flex-1">
                  <div className="bg-white/20 rounded-full h-4 overflow-hidden shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-full h-4 transition-all duration-1000 shadow-lg"
                      style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-400">
                    <span>Introduction</span>
                    <span>{conversations.length} exchanges</span>
                    <span>Mastery</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 bg-green-900/30 px-4 py-2 rounded-full border border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-300 font-medium">
                    {isPlaying ? `Now Speaking: ${conversations[currentDialogueIndex]?.speaker}` : 'Ready to begin learning journey'}
                  </span>
                </div>
                {isPlaying && (
                  <div className="mt-3 text-sm text-gray-400">
                    Current topic: {conversations[currentDialogueIndex]?.text.substring(0, 80)}...
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        {conversations.length === 0 && !isGenerating && (
          <div className="text-center py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">AI-Powered Learning</h3>
                <p className="text-gray-300">Google Gemini generates comprehensive, accurate educational content</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Interactive Dialogue</h3>
                <p className="text-gray-300">Engaging student-teacher conversations that build understanding</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Volume2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Audio Learning</h3>
                <p className="text-gray-300">Listen to conversations with distinct voices for each speaker</p>
              </div>
            </div>
            
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Lightbulb className="w-16 h-16 text-yellow-400" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Transform Learning?</h3>
            <p className="text-gray-400 text-xl max-w-lg mx-auto leading-relaxed">
              Enter any topic and watch AI create a comprehensive educational conversation that covers everything you need to know
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIConversationGenerator;