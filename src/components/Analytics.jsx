import React, { useState, useMemo, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, MessageCircle, Clock, BookOpen, Brain, 
  Target, Award, BarChart3, Circle,
  Activity, Zap, Star, ArrowLeft, Download
} from 'lucide-react';

const ChatAnalytics = () => {
  // Load chat sessions from localStorage (same as the chat component)
  const [chatSessions, setChatSessions] = useState(() => {
    try {
      const savedSessions = window.localStorage?.getItem('siruvani-chat-sessions');
      if (savedSessions) {
        const parsed = JSON.parse(savedSessions);
        return parsed.map(session => ({
          ...session,
          timestamp: new Date(session.timestamp),
          messages: session.messages.map(msg => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
      }
      // Fallback demo data if no localStorage data exists
      return [
        {
          id: 'demo-1',
          title: 'Demo: Math - Quadratic Equations',
          timestamp: new Date(Date.now() - 5 * 86400000),
          messages: [
            { id: 1, text: "Hello! I'm Siruvani AI...", sender: 'bot', timestamp: new Date(Date.now() - 5 * 86400000) },
            { id: 2, text: "I need help with quadratic equations for class 10", sender: 'user', timestamp: new Date(Date.now() - 5 * 86400000) },
            { id: 3, text: "Great! Let me explain quadratic equations step by step...", sender: 'bot', timestamp: new Date(Date.now() - 5 * 86400000) }
          ]
        }
      ];
    } catch (error) {
      console.error('Error loading chat sessions:', error);
      return [
        {
          id: 'demo-1',
          title: 'Demo: Math - Quadratic Equations',
          timestamp: new Date(Date.now() - 5 * 86400000),
          messages: [
            { id: 1, text: "Hello! I'm Siruvani AI...", sender: 'bot', timestamp: new Date(Date.now() - 5 * 86400000) },
            { id: 2, text: "I need help with quadratic equations for class 10", sender: 'user', timestamp: new Date(Date.now() - 5 * 86400000) }
          ]
        }
      ];
    }
  });

  // Listen for changes in localStorage to update analytics in real-time
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const savedSessions = window.localStorage?.getItem('siruvani-chat-sessions');
        if (savedSessions) {
          const parsed = JSON.parse(savedSessions);
          const formattedSessions = parsed.map(session => ({
            ...session,
            timestamp: new Date(session.timestamp),
            messages: session.messages.map(msg => ({
              ...msg,
              timestamp: new Date(msg.timestamp)
            }))
          }));
          setChatSessions(formattedSessions);
        }
      } catch (error) {
        console.error('Error updating chat sessions:', error);
      }
    };

    // Listen for localStorage changes
    window.addEventListener('storage', handleStorageChange);
    
    // Also check for updates periodically (in case localStorage changes within same tab)
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const [timeRange, setTimeRange] = useState('7days');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  const analytics = useMemo(() => {
    const now = new Date();
    const timeRanges = {
      '7days': 7 * 24 * 60 * 60 * 1000,
      '30days': 30 * 24 * 60 * 60 * 1000,
      '90days': 90 * 24 * 60 * 60 * 1000,
      'all': Infinity
    };

    const cutoffTime = now.getTime() - timeRanges[timeRange];
    const filteredSessions = chatSessions.filter(session => 
      session.timestamp.getTime() >= cutoffTime
    );

    const totalSessions = filteredSessions.length;
    const totalMessages = filteredSessions.reduce((sum, session) => sum + session.messages.length, 0);
    const userMessages = filteredSessions.reduce((sum, session) => 
      sum + session.messages.filter(msg => msg.sender === 'user').length, 0
    );
    const botMessages = totalMessages - userMessages;

    const subjects = {};
    const grades = {};

    filteredSessions.forEach(session => {
      const title = session.title.toLowerCase();
      if (title.includes('math') || title.includes('algebra') || title.includes('geometry') || title.includes('equation')) {
        subjects['Mathematics'] = (subjects['Mathematics'] || 0) + 1;
      } else if (title.includes('physics') || title.includes('light') || title.includes('motion') || title.includes('electricity')) {
        subjects['Physics'] = (subjects['Physics'] || 0) + 1;
      } else if (title.includes('chemistry') || title.includes('acid') || title.includes('base') || title.includes('ph')) {
        subjects['Chemistry'] = (subjects['Chemistry'] || 0) + 1;
      } else if (title.includes('biology') || title.includes('plant') || title.includes('human')) {
        subjects['Biology'] = (subjects['Biology'] || 0) + 1;
      } else if (title.includes('history') || title.includes('empire') || title.includes('akbar')) {
        subjects['History'] = (subjects['History'] || 0) + 1;
      } else if (title.includes('geography') || title.includes('climate')) {
        subjects['Geography'] = (subjects['Geography'] || 0) + 1;
      } else {
        subjects['Other'] = (subjects['Other'] || 0) + 1;
      }

      const gradeMatch = title.match(/class (\d+)|grade (\d+)/i);
      if (gradeMatch) {
        const grade = gradeMatch[1] || gradeMatch[2];
        grades[`Class ${grade}`] = (grades[`Class ${grade}`] || 0) + 1;
      } else {
        grades['Unspecified'] = (grades['Unspecified'] || 0) + 1;
      }
    });

    const dailyActivity = {};
    filteredSessions.forEach(session => {
      const date = session.timestamp.toDateString();
      dailyActivity[date] = (dailyActivity[date] || 0) + session.messages.filter(m => m.sender === 'user').length;
    });

    const hourlyActivity = Array.from({length: 24}, (_, i) => ({
      hour: `${i.toString().padStart(2, '0')}:00`,
      messages: 0
    }));

    filteredSessions.forEach(session => {
      session.messages.forEach(message => {
        if (message.sender === 'user') {
          const hour = message.timestamp.getHours();
          hourlyActivity[hour].messages++;
        }
      });
    });

    const avgMessagesPerSession = totalSessions > 0 ? (totalMessages / totalSessions).toFixed(1) : 0;
    const avgUserMessagesPerSession = totalSessions > 0 ? (userMessages / totalSessions).toFixed(1) : 0;

    const sessionDurations = filteredSessions.map(session => {
      if (session.messages.length <= 1) return 0;
      const firstMsg = session.messages[0].timestamp;
      const lastMsg = session.messages[session.messages.length - 1].timestamp;
      return (lastMsg.getTime() - firstMsg.getTime()) / (1000 * 60);
    }).filter(duration => duration > 0);

    const avgSessionDuration = sessionDurations.length > 0 
      ? (sessionDurations.reduce((sum, duration) => sum + duration, 0) / sessionDurations.length).toFixed(1)
      : 0;

    const engagementScore = Math.min(100, Math.round(
      (userMessages * 2) + 
      (totalSessions * 5) + 
      (Object.keys(subjects).length * 10) +
      (parseFloat(avgSessionDuration) * 0.5)
    ));

    return {
      totalSessions,
      totalMessages,
      userMessages,
      botMessages,
      subjects,
      grades,
      dailyActivity,
      hourlyActivity,
      avgMessagesPerSession,
      avgUserMessagesPerSession,
      avgSessionDuration,
      engagementScore,
      filteredSessions
    };
  }, [chatSessions, timeRange]);

  const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#6B7280', '#EC4899', '#14B8A6'];

  const subjectData = Object.entries(analytics.subjects).map(([subject, count], index) => ({
    subject,
    count,
    color: COLORS[index % COLORS.length]
  }));

  const gradeData = Object.entries(analytics.grades).map(([grade, count], index) => ({
    grade,
    count,
    color: COLORS[index % COLORS.length]
  }));

  const dailyData = Object.entries(analytics.dailyActivity)
    .map(([date, messages]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      messages,
      fullDate: date
    }))
    .sort((a, b) => new Date(a.fullDate) - new Date(b.fullDate))
    .slice(-14);

  const MetricCard = ({ icon: Icon, title, value, subtitle, color = "blue" }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${
          color === 'blue' ? 'bg-blue-100' :
          color === 'green' ? 'bg-green-100' :
          color === 'purple' ? 'bg-purple-100' :
          color === 'yellow' ? 'bg-yellow-100' :
          'bg-gray-100'
        }`}>
          <Icon className={`w-6 h-6 ${
            color === 'blue' ? 'text-blue-600' :
            color === 'green' ? 'text-green-600' :
            color === 'purple' ? 'text-purple-600' :
            color === 'yellow' ? 'text-yellow-600' :
            'text-gray-600'
          }`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Chat</span>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Learning Analytics</h1>
                <p className="text-gray-600">Insights into your educational journey with Siruvani AI</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="all">All Time</option>
              </select>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={MessageCircle}
            title="Total Conversations"
            value={analytics.totalSessions}
            subtitle={`${analytics.userMessages} questions asked`}
            color="blue"
          />
          <MetricCard
            icon={Clock}
            title="Study Time"
            value={`${analytics.avgSessionDuration}m`}
            subtitle="Average session duration"
            color="green"
          />
          <MetricCard
            icon={BookOpen}
            title="Subjects Explored"
            value={Object.keys(analytics.subjects).length}
            subtitle="Different topics covered"
            color="purple"
          />
          <MetricCard
            icon={Zap}
            title="Engagement Score"
            value={`${analytics.engagementScore}%`}
            subtitle="Learning activity level"
            color="yellow"
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="flex space-x-1 p-2">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'subjects', label: 'Subjects', icon: BookOpen },
              { id: 'activity', label: 'Activity', icon: Activity },
              { id: 'progress', label: 'Progress', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedMetric(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors duration-200 ${
                  selectedMetric === tab.id
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {selectedMetric === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Circle className="w-5 h-5 text-blue-600" />
                <span>Message Distribution</span>
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Your Questions', value: analytics.userMessages, color: '#3B82F6' },
                      { name: 'AI Responses', value: analytics.botMessages, color: '#8B5CF6' }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {[
                      { name: 'Your Questions', value: analytics.userMessages, color: '#3B82F6' },
                      { name: 'AI Responses', value: analytics.botMessages, color: '#8B5CF6' }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Your Questions ({analytics.userMessages})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">AI Responses ({analytics.botMessages})</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>Learning Activity Trend</span>
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="messages" 
                    stroke="#10B981" 
                    fill="#10B981" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {selectedMetric === 'subjects' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span>Subject Distribution</span>
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subjectData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Target className="w-5 h-5 text-purple-600" />
                <span>Grade Level Focus</span>
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={gradeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="count"
                  >
                    {gradeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {gradeData.map((entry, index) => (
                  <div key={entry.grade} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm text-gray-600">{entry.grade} ({entry.count})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedMetric === 'activity' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>Study Time Patterns</span>
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.hourlyActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="messages" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-sm text-gray-600 mt-4">
                This shows when you're most active in asking questions. Peak learning hours help identify your optimal study time.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Activity className="w-5 h-5 text-green-600" />
                <span>Recent Learning Sessions</span>
              </h3>
              <div className="space-y-4">
                {analytics.filteredSessions.slice(-5).reverse().map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{session.title}</h4>
                        <p className="text-sm text-gray-600">
                          {session.messages.length} messages • {session.timestamp.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {session.messages.filter(m => m.sender === 'user').length} questions
                      </p>
                      <p className="text-xs text-gray-500">
                        {session.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedMetric === 'progress' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Learning Streak</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {Math.max(1, analytics.filteredSessions.length)} days
                </p>
                <p className="text-sm text-gray-600 mt-1">Keep it up!</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="p-4 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Brain className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Knowledge Areas</h3>
                <p className="text-3xl font-bold text-purple-600 mt-2">
                  {Object.keys(analytics.subjects).length}
                </p>
                <p className="text-sm text-gray-600 mt-1">Subjects explored</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="p-4 bg-yellow-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Star className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Engagement Level</h3>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{analytics.engagementScore}%</p>
                <p className="text-sm text-gray-600 mt-1">
                  {analytics.engagementScore >= 80 ? 'Excellent!' : 
                   analytics.engagementScore >= 60 ? 'Good progress' : 
                   'Keep learning!'}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span>Learning Insights & Recommendations</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">📊 Your Learning Patterns</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Most Active Subject:</strong> {Object.entries(analytics.subjects).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None'}
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-800">
                        <strong>Average Session Length:</strong> {analytics.avgSessionDuration} minutes
                      </p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-purple-800">
                        <strong>Questions per Session:</strong> {analytics.avgUserMessagesPerSession}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">💡 Recommendations</h4>
                  <div className="space-y-3">
                    {analytics.engagementScore < 50 && (
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          Try asking more detailed questions to increase engagement
                        </p>
                      </div>
                    )}
                    {parseFloat(analytics.avgSessionDuration) < 5 && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          Consider longer study sessions for deeper understanding
                        </p>
                      </div>
                    )}
                    {Object.keys(analytics.subjects).length < 3 && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-800">
                          Explore more subjects to broaden your knowledge base
                        </p>
                      </div>
                    )}
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <p className="text-sm text-purple-800">
                        Great job on your learning journey! Keep up the consistent study habits.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatAnalytics;