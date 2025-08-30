import React, { useState, useEffect } from 'react';
import { Brain, Trophy, Play, RotateCcw, CheckCircle, XCircle, Sparkles, Target, Book } from 'lucide-react';

const MCQGame = () => {
  const [gameState, setGameState] = useState('setup'); // setup, playing, results
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [totalQuestions] = useState(10);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gameHistory, setGameHistory] = useState([]);
  const [error, setError] = useState('');

  const GEMINI_API_KEY = 'AIzaSyD-q7Ky0_NIz7x1mjp458yNRVZYVw0HEbk';

  // Test API connection
  const testConnection = async () => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: "Hello"
            }]
          }]
        })
      });
      
      if (response.ok) {
        setError('');
        return true;
      } else {
        setError(`API Error: ${response.status} - Please check your API key`);
        return false;
      }
    } catch (err) {
      setError('Connection failed. Please check your internet connection.');
      return false;
    }
  };

  const generateQuestion = async (topic, difficulty) => {
    setLoading(true);
    try {
      const prompt = `Create a ${difficulty} level multiple choice question about ${topic}. 
      Respond ONLY with valid JSON in this exact format:
      {
        "question": "Your question here?",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correct": 0
      }
      Where 'correct' is the index (0-3) of the correct answer. Make sure the question is educational and the options are plausible.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
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
            maxOutputTokens: 1024,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid API response structure');
      }
      
      const generatedText = data.candidates[0].content.parts[0].text;
      
      // Clean the response to extract JSON
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const questionData = JSON.parse(jsonMatch[0]);
        
        // Validate the question data
        if (questionData.question && questionData.options && Array.isArray(questionData.options) && 
            questionData.options.length === 4 && typeof questionData.correct === 'number') {
          setCurrentQuestion(questionData);
        } else {
          throw new Error('Invalid question format');
        }
      } else {
        throw new Error('No valid JSON found in response');
      }
    } catch (error) {
      console.error('Error generating question:', error);
      
      // Enhanced fallback questions based on topic
      const fallbackQuestions = {
        mitochondria: {
          question: "What is the primary function of mitochondria?",
          options: [
            "Protein synthesis",
            "Energy production (ATP)",
            "DNA storage",
            "Cell division"
          ],
          correct: 1
        },
        mathematics: {
          question: "What is the value of π (pi) approximately?",
          options: ["3.14159", "2.71828", "1.41421", "1.73205"],
          correct: 0
        },
        physics: {
          question: "What is the speed of light in vacuum?",
          options: [
            "3 × 10⁸ m/s",
            "9.8 m/s²",
            "6.67 × 10⁻¹¹ m³/kg·s²",
            "1.6 × 10⁻¹⁹ C"
          ],
          correct: 0
        },
        chemistry: {
          question: "What is the chemical symbol for gold?",
          options: ["Go", "Gd", "Au", "Ag"],
          correct: 2
        }
      };
      
      // Try to find a relevant fallback or use a generic one
      const topicKey = Object.keys(fallbackQuestions).find(key => 
        topic.toLowerCase().includes(key)
      );
      
      const fallbackQuestion = fallbackQuestions[topicKey] || {
        question: `Which of the following is most relevant to ${topic}?`,
        options: [
          `Basic concept of ${topic}`,
          `Advanced theory in ${topic}`,
          `Application of ${topic}`,
          `History of ${topic}`
        ],
        correct: 0
      };
      
      setCurrentQuestion(fallbackQuestion);
    }
    setLoading(false);
  };

  const startGame = async () => {
    if (!topic.trim()) return;
    
    setError('');
    setLoading(true);
    
    // Test connection first
    const isConnected = await testConnection();
    if (!isConnected) {
      setLoading(false);
      return;
    }
    
    setGameState('playing');
    setScore(0);
    setQuestionNumber(1);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameHistory([]);
    
    await generateQuestion(topic, difficulty);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null || showResult) return;
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === currentQuestion.correct;
    
    if (isCorrect) {
      setScore(prev => prev + 10);
    }
    
    const questionResult = {
      question: currentQuestion.question,
      selectedAnswer: answerIndex,
      correctAnswer: currentQuestion.correct,
      isCorrect: isCorrect
    };
    
    setGameHistory(prev => [...prev, questionResult]);
    setShowResult(true);
  };

  const nextQuestion = async () => {
    if (questionNumber >= totalQuestions) {
      setGameState('results');
      return;
    }
    
    setQuestionNumber(prev => prev + 1);
    setSelectedAnswer(null);
    setShowResult(false);
    await generateQuestion(topic, difficulty);
  };

  const resetGame = () => {
    setGameState('setup');
    setTopic('');
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setScore(0);
    setQuestionNumber(0);
    setShowResult(false);
    setGameHistory([]);
  };

  const getScoreColor = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreGrade = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
  };

  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">AI Quiz Master</h1>
            <p className="text-gray-300">Powered by Gemini AI</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">Quiz Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Mathematics, Science, History..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Difficulty Level</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50"
              >
                <option value="easy" className="bg-gray-800">Easy</option>
                <option value="medium" className="bg-gray-800">Medium</option>
                <option value="hard" className="bg-gray-800">Hard</option>
              </select>
            </div>

            <button
              onClick={startGame}
              disabled={!topic.trim() || loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>Start Quiz ({totalQuestions} Questions)</span>
                </>
              )}
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-400 rounded-xl text-red-200 text-sm">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'playing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Book className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-semibold">{topic}</span>
                </div>
                <div className="w-px h-6 bg-white/20"></div>
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-purple-400" />
                  <span className="text-white capitalize">{difficulty}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{score} pts</div>
                <div className="text-sm text-gray-300">Question {questionNumber} of {totalQuestions}</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4 bg-white/10 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          {loading ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
              <div className="animate-spin w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-white text-lg">Generating question...</p>
            </div>
          ) : currentQuestion && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-8 leading-relaxed">
                {currentQuestion.question}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {currentQuestion.options.map((option, index) => {
                  let buttonClass = "w-full p-4 rounded-xl border-2 transition-all duration-300 text-left font-medium ";
                  
                  if (showResult) {
                    if (index === currentQuestion.correct) {
                      buttonClass += "bg-green-500/20 border-green-400 text-green-100";
                    } else if (index === selectedAnswer && index !== currentQuestion.correct) {
                      buttonClass += "bg-red-500/20 border-red-400 text-red-100";
                    } else {
                      buttonClass += "bg-white/5 border-white/20 text-gray-400";
                    }
                  } else if (selectedAnswer === index) {
                    buttonClass += "bg-blue-500/20 border-blue-400 text-blue-100";
                  } else {
                    buttonClass += "bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/40 cursor-pointer";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={buttonClass}
                      disabled={selectedAnswer !== null || loading}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span>{option}</span>
                        {showResult && index === currentQuestion.correct && (
                          <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
                        )}
                        {showResult && index === selectedAnswer && index !== currentQuestion.correct && (
                          <XCircle className="w-5 h-5 text-red-400 ml-auto" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {showResult && (
                <div className="text-center">
                  <button
                    onClick={nextQuestion}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                  >
                    {questionNumber >= totalQuestions ? 'View Results' : 'Next Question'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (gameState === 'results') {
    const percentage = Math.round((score / (totalQuestions * 10)) * 100);
    const grade = getScoreGrade(score, totalQuestions * 10);

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Results Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl mb-6">
              <Trophy className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">Quiz Complete!</h1>
            <div className="text-6xl font-bold mb-2">
              <span className={getScoreColor(score, totalQuestions * 10)}>{score}</span>
              <span className="text-gray-400">/{totalQuestions * 10}</span>
            </div>
            <div className="text-2xl text-gray-300 mb-4">{percentage}% • Grade: {grade}</div>
            <div className="text-lg text-blue-300">Topic: {topic} ({difficulty})</div>
          </div>

          {/* Results Summary */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Performance Summary</h2>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-400">{gameHistory.filter(q => q.isCorrect).length}</div>
                <div className="text-gray-300">Correct</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-400">{gameHistory.filter(q => !q.isCorrect).length}</div>
                <div className="text-gray-300">Incorrect</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">{percentage}%</div>
                <div className="text-gray-300">Accuracy</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>New Quiz</span>
            </button>
            
            <button
              onClick={() => startGame()}
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 border border-white/20 flex items-center justify-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Same Topic Again</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default MCQGame;