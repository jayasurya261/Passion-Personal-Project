const downloadImage = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `${topic.replace(/[^a-z0-9]/gi, '_')}_diagram.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback if no history
      window.location.href = '/';
    }
  };import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Brain, Sparkles, Download, Image, ArrowLeft } from 'lucide-react';

const VisualDiagramGenerator = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [diagramData, setDiagramData] = useState(null);
  const canvasRef = useRef(null);

  const drawOhmsLaw = (canvas) => {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);
    
    // Draw title
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("Ohm's Law", width/2, 40);
    
    // Draw main formula circle
    ctx.beginPath();
    ctx.arc(width/2, height/2 - 20, 80, 0, 2 * Math.PI);
    ctx.fillStyle = '#3b82f6';
    ctx.fill();
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw V = I × R in circle
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px Arial';
    ctx.fillText('V = I × R', width/2, height/2 - 20);
    
    // Draw voltage (V)
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 18px Arial';
    ctx.fillText('V (Voltage)', width/2, height/2 - 120);
    ctx.font = '14px Arial';
    ctx.fillText('Measured in Volts', width/2, height/2 - 100);
    
    // Draw current (I)
    ctx.fillStyle = '#10b981';
    ctx.fillText('I (Current)', width/2 - 150, height/2 + 20);
    ctx.font = '12px Arial';
    ctx.fillText('Measured in Amperes', width/2 - 150, height/2 + 40);
    
    // Draw resistance (R)
    ctx.fillStyle = '#f59e0b';
    ctx.font = '14px Arial';
    ctx.fillText('R (Resistance)', width/2 + 150, height/2 + 20);
    ctx.font = '12px Arial';
    ctx.fillText('Measured in Ohms', width/2 + 150, height/2 + 40);
    
    // Draw arrows
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    
    // Arrow from V to formula
    ctx.beginPath();
    ctx.moveTo(width/2, height/2 - 85);
    ctx.lineTo(width/2, height/2 - 50);
    ctx.stroke();
    
    // Arrow from I to formula
    ctx.beginPath();
    ctx.moveTo(width/2 - 80, height/2);
    ctx.lineTo(width/2 - 50, height/2 - 10);
    ctx.stroke();
    
    // Arrow from R to formula
    ctx.beginPath();
    ctx.moveTo(width/2 + 80, height/2);
    ctx.lineTo(width/2 + 50, height/2 - 10);
    ctx.stroke();
    
    // Draw circuit diagram
    ctx.setLineDash([]);
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 3;
    
    // Simple circuit
    const circuitY = height - 120;
    const circuitCenterX = width/2;
    
    // Battery symbol
    ctx.beginPath();
    ctx.moveTo(circuitCenterX - 100, circuitY);
    ctx.lineTo(circuitCenterX - 80, circuitY);
    ctx.moveTo(circuitCenterX - 80, circuitY - 15);
    ctx.lineTo(circuitCenterX - 80, circuitY + 15);
    ctx.moveTo(circuitCenterX - 70, circuitY - 8);
    ctx.lineTo(circuitCenterX - 70, circuitY + 8);
    ctx.moveTo(circuitCenterX - 70, circuitY);
    ctx.lineTo(circuitCenterX - 50, circuitY);
    ctx.stroke();
    
    // Resistor symbol (zigzag)
    ctx.beginPath();
    ctx.moveTo(circuitCenterX - 50, circuitY);
    ctx.lineTo(circuitCenterX - 40, circuitY - 10);
    ctx.lineTo(circuitCenterX - 20, circuitY + 10);
    ctx.lineTo(circuitCenterX, circuitY - 10);
    ctx.lineTo(circuitCenterX + 20, circuitY + 10);
    ctx.lineTo(circuitCenterX + 40, circuitY - 10);
    ctx.lineTo(circuitCenterX + 50, circuitY);
    ctx.stroke();
    
    // Complete circuit
    ctx.beginPath();
    ctx.moveTo(circuitCenterX + 50, circuitY);
    ctx.lineTo(circuitCenterX + 100, circuitY);
    ctx.lineTo(circuitCenterX + 100, circuitY - 40);
    ctx.lineTo(circuitCenterX - 100, circuitY - 40);
    ctx.lineTo(circuitCenterX - 100, circuitY);
    ctx.stroke();
    
    // Labels
    ctx.fillStyle = '#374151';
    ctx.font = '12px Arial';
    ctx.fillText('Battery', circuitCenterX - 80, circuitY + 35);
    ctx.fillText('Resistor', circuitCenterX, circuitY + 35);
  };

  const drawCustomDiagram = (canvas, description) => {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);
    
    // Draw title
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(topic, width/2, 30);
    
    // Parse description and create visual elements
    const lines = description.split('\n').filter(line => line.trim());
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Draw main concept in center
    ctx.beginPath();
    ctx.arc(centerX, centerY, 60, 0, 2 * Math.PI);
    ctx.fillStyle = '#3b82f6';
    ctx.fill();
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('Main', centerX, centerY - 5);
    ctx.fillText('Concept', centerX, centerY + 10);
    
    // Draw connected concepts
    const angles = [0, Math.PI/3, 2*Math.PI/3, Math.PI, 4*Math.PI/3, 5*Math.PI/3];
    const colors = ['#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];
    
    lines.slice(0, 6).forEach((line, index) => {
      const angle = angles[index];
      const x = centerX + Math.cos(angle) * 150;
      const y = centerY + Math.sin(angle) * 150;
      
      // Draw connection line
      ctx.beginPath();
      ctx.moveTo(centerX + Math.cos(angle) * 60, centerY + Math.sin(angle) * 60);
      ctx.lineTo(x - Math.cos(angle) * 30, y - Math.sin(angle) * 30);
      ctx.strokeStyle = '#6b7280';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw concept circle
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, 2 * Math.PI);
      ctx.fillStyle = colors[index];
      ctx.fill();
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Add text
      ctx.fillStyle = 'white';
      ctx.font = 'bold 10px Arial';
      const words = line.substring(0, 20).split(' ');
      if (words.length > 2) {
        ctx.fillText(words.slice(0, 2).join(' '), x, y - 3);
        ctx.fillText(words.slice(2).join(' '), x, y + 8);
      } else {
        ctx.fillText(line.substring(0, 15), x, y);
      }
    });
  };

  const generateDiagram = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setLoading(true);
    setError('');
    setDiagramData(null);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD-q7Ky0_NIz7x1mjp458yNRVZYVw0HEbk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Create a detailed description for a visual diagram about: "${topic}". 
              
              Provide a structured description that includes:
              1. Main concept or central element
              2. Key components or parts (list 4-6 items)
              3. Relationships between components
              4. Important details or specifications
              
              Format as clear, concise bullet points that can be used to create a visual representation.
              Focus on visual elements, connections, and spatial relationships.`
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const description = data.candidates[0].content.parts[0].text;
        setDiagramData(description);
      } else {
        throw new Error('Invalid response format from Gemini API');
      }
    } catch (err) {
      setError(`Error generating diagram: ${err.message}`);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (diagramData && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 800;
      canvas.height = 600;
      
      if (topic.toLowerCase().includes('ohm') || topic.toLowerCase().includes('electrical')) {
        drawOhmsLaw(canvas);
      } else {
        drawCustomDiagram(canvas, diagramData);
      }
    }
  }, [diagramData, topic]);

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback if no history
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={goBack}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-200 hover:border-purple-300 transition-all duration-200 text-gray-700 hover:text-purple-600"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
              <Image className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Visual Diagram Generator
            </h1>
            <Sparkles className="w-6 h-6 text-purple-500" />
          </div>
          <p className="text-gray-600 text-lg">
            Generate actual visual diagrams and pictures using Gemini AI
          </p>
        </div>

        {/* Input Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="mb-4">
              <label htmlFor="topic" className="block text-sm font-semibold text-gray-700 mb-2">
                Enter your topic or concept
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && generateDiagram()}
                  placeholder="e.g., Ohm's Law, Solar System, Water Cycle, Photosynthesis..."
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  disabled={loading}
                />
                <button
                  onClick={generateDiagram}
                  disabled={loading || !topic.trim()}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex flex-col items-center justify-center">
                <div className="relative mb-4">
                  <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                  <Brain className="w-6 h-6 text-purple-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="text-gray-600 font-medium">Generating your visual diagram...</p>
                <p className="text-gray-400 text-sm mt-1">AI is creating a picture for your topic</p>
              </div>
            </div>
          </div>
        )}

        {/* Diagram Display */}
        {diagramData && !loading && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 flex justify-between items-center">
                <h2 className="text-white font-semibold text-lg flex items-center gap-2">
                  <Image className="w-5 h-5" />
                  Visual Diagram: {topic}
                </h2>
                <button
                  onClick={downloadImage}
                  className="flex items-center gap-2 px-3 py-1 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
              
              <div className="p-6">
                {/* Canvas for drawing the diagram */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4 flex justify-center">
                  <canvas
                    ref={canvasRef}
                    className="border border-gray-300 rounded-lg shadow-sm max-w-full"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </div>
                
                {/* Description */}
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
                    View AI Analysis
                  </summary>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                    <pre className="text-gray-700 text-sm whitespace-pre-wrap font-sans">
                      {diagramData}
                    </pre>
                  </div>
                </details>
              </div>
            </div>
          </div>
        )}

        {/* Example Topics */}
        <div className="max-w-4xl mx-auto mt-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Try these example topics:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "Ohm's Law",
              "Water Cycle", 
              "Solar System",
              "Photosynthesis",
              "DNA Structure",
              "Food Chain",
              "Electrical Circuit",
              "Plant Cell"
            ].map((example) => (
              <button
                key={example}
                onClick={() => setTopic(example)}
                className="p-3 bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-200 hover:border-purple-300 transition-all duration-200 text-sm font-medium text-gray-700 hover:text-purple-600"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Powered by Google Gemini AI • Visual diagrams generated with HTML5 Canvas</p>
        </div>
      </div>
    </div>
  );
};

export default VisualDiagramGenerator;