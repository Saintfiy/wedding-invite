import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Heart, Star, Sparkles, Zap } from 'lucide-react';

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [showGallery, setShowGallery] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const fullText = "Happy Birthday, Sayanggg";
  const message = "Selamat ulang tahun, sayang. Terima kasih sudah hadir dan selalu bikin aku bahagia. Semoga semua harapanmu terkabul. ❤️";

  // Smooth typing animation
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypingText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setShowGallery(true);
          setTimeout(() => setShowMessage(true), 1500);
        }, 800);
      }
    }, 120);

    return () => clearInterval(timer);
  }, []);

  // Advanced particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      type: 'star' | 'dot' | 'glow';
      rotation: number;
      rotationSpeed: number;
      pulse: number;
      pulseSpeed: number;
    }> = [];

    // Create elegant particles
    for (let i = 0; i < 120; i++) {
      const types = ['star', 'dot', 'glow'] as const;
      const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];
      
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: types[Math.floor(Math.random() * types.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.015 + 0.005
      });
    }

    function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5;
        const x1 = Math.cos(angle) * size;
        const y1 = Math.sin(angle) * size;
        const x2 = Math.cos(angle + Math.PI / 5) * size * 0.4;
        const y2 = Math.sin(angle + Math.PI / 5) * size * 0.4;
        
        if (i === 0) ctx.moveTo(x1, y1);
        else ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);


      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;
        particle.pulse += particle.pulseSpeed;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        const pulseSize = particle.size + Math.sin(particle.pulse) * 1;

        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color;

        if (particle.type === 'star') {
          drawStar(ctx, particle.x, particle.y, pulseSize, particle.rotation);
        } else if (particle.type === 'glow') {
          ctx.shadowBlur = 20;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, pulseSize * 1.2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const replaySurprise = () => {
    setTypingText('');
    setShowGallery(false);
    setShowMessage(false);
    
    setTimeout(() => {
      let index = 0;
      const timer = setInterval(() => {
        if (index <= fullText.length) {
          setTypingText(fullText.slice(0, index));
          index++;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            setShowGallery(true);
            setTimeout(() => setShowMessage(true), 1500);
          }, 800);
        }
      }, 120);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden relative">


      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          {/* Decorative Frame */}
          <div className="absolute -inset-6 border border-blue-500/20 rounded-2xl"></div>
          
          {/* Floating Icons */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-4">
              <Sparkles className="w-8 h-8 text-blue-400 animate-float" />
              <Star className="w-10 h-10 text-purple-400 animate-bounce-gentle" />
              <Sparkles className="w-8 h-8 text-cyan-400 animate-float" style={{ animationDelay: '1s' }} />
            </div>
          </div>

          {/* Main Title */}
          <div className="relative">
            <h1 className="text-5xl md:text-8xl font-bold text-black mb-6"
  style={{
    fontFamily: 'Poppins, sans-serif',
    color: 'black',
    textShadow: `
      0 0 2px rgba(0,0,0,0.2),
      0 0 5px rgba(0,0,0,0.15),
      0 0 8px rgba(0,0,0,0.1)
    `
  }}>


              {typingText}
              {typingText.length < fullText.length && (
                <span className="text-blue-400 opacity-75">|</span>
              )}
            </h1>

            {/* Subtitle */}


            <div className="text-lg md:text-2xl text-gray-300 font-light tracking-wide opacity-90"
                 style={{ fontFamily: 'Poppins, sans-serif' }}>
              <span className="inline-block">✨</span>
              <span className="mx-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                A Special Day for Someone Special
              </span>
              <span className="inline-block">✨</span>
            </div>
          </div>

          {/* Bottom Decorations */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-6">
            <Heart className="w-6 h-6 text-purple-400 animate-float" />
            <Star className="w-6 h-6 text-blue-400 animate-spin-slow" />
            <Heart className="w-6 h-6 text-cyan-400 animate-float" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

        {/* Modern 3D Gallery */}
        {showGallery && (
          <div className="mb-16 w-full max-w-7xl mx-auto transform transition-all duration-1000 ease-out">
            
            {/* Gallery Title */}
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4"
                  style={{ fontFamily: 'Poppins, sans-serif' }}>
                Memory Gallery
              </h2>
              <div className="flex justify-center items-center space-x-3">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
                <Star className="w-5 h-5 text-purple-400 animate-spin-slow" />
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
              </div>
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              
              {/* Photo 1 */}
              <div className="group relative transform hover:scale-110 transition-all duration-700 hover:z-20">
                <div className="relative overflow-hidden rounded-2xl border border-blue-500/30 shadow-2xl backdrop-blur-sm">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/40 to-cyan-500/40 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  <div className="relative bg-gray-900/50 backdrop-blur-sm">
                    <img
                      src="/lili1.jpeg"
                      alt="Lili Memory 1"
                      className="w-full h-72 md:h-80 object-cover transform group-hover:scale-105 transition-transform duration-700"
                      style={{ filter: 'brightness(1.1) contrast(1.2)' }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent group-hover:from-blue-900/40 transition-all duration-700"></div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="bg-black/80 backdrop-blur-sm rounded-xl p-3 border border-blue-500/30">
                      <p className="text-blue-400 text-sm font-medium">Cantikkkk</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Photo 2 - Featured */}
              <div className="group relative transform hover:scale-115 transition-all duration-700 hover:z-30 md:scale-105">
                <div className="relative overflow-hidden rounded-2xl border border-purple-500/40 shadow-2xl backdrop-blur-sm">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-cyan-500/50 rounded-2xl blur opacity-60 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  <div className="relative bg-gray-900/50 backdrop-blur-sm">
                    <img
                      src="//lili2.jpeg"
                      alt="Lili Memory 2"
                      className="w-full h-72 md:h-80 object-cover transform group-hover:scale-105 transition-transform duration-700"
                      style={{ filter: 'brightness(1.1) contrast(1.2)' }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent group-hover:from-purple-900/40 transition-all duration-700"></div>
                  </div>

                  <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    ⭐ FEATURED
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="bg-black/80 backdrop-blur-sm rounded-xl p-3 border border-purple-500/30">
                      <p className="text-purple-400 text-sm font-medium">Lucuuu</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Photo 3 */}
              <div className="group relative transform hover:scale-110 transition-all duration-700 hover:z-20">
                <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 shadow-2xl backdrop-blur-sm">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/40 to-blue-500/40 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  <div className="relative bg-gray-900/50 backdrop-blur-sm">
                    <img
                      src="/lili3.jpeg"
                      alt="Lili Memory 3"
                      className="w-full h-72 md:h-80 object-cover transform group-hover:scale-105 transition-transform duration-700"
                      style={{ filter: 'brightness(1.1) contrast(1.2)' }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent group-hover:from-cyan-900/40 transition-all duration-700"></div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="bg-black/80 backdrop-blur-sm rounded-xl p-3 border border-cyan-500/30">
                      <p className="text-cyan-400 text-sm font-medium">Imuttt</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Message Card */}
        {showMessage && (
          <div className="max-w-4xl mx-auto transform transition-all duration-1000 ease-out">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-70"></div>
              
              <div className="relative bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 md:p-12">
                <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 bg-clip-border opacity-50"></div>
                
                <div className="relative z-10 text-center">
                  <div className="mb-8 flex justify-center">
                    <Heart className="w-16 h-16 text-purple-400" />
                  </div>
                  
                  <p className="text-xl md:text-2xl text-gray-100 leading-relaxed mb-8 font-light"
                     style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {message}
                  </p>
                  
                  <div className="flex justify-center items-center space-x-4 mb-6">
                    <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
                    <Star className="w-6 h-6 text-purple-400 animate-spin-slow" />
                    <Sparkles className="w-6 h-6 text-blue-400 animate-float" />
                    <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
                  </div>
                  
                  <div className="text-gray-300 text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-medium">
                      With Love ❤️
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Replay Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <div className="group relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/50 to-blue-500/50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <button
              onClick={replaySurprise}
              className="relative bg-gray-900/90 backdrop-blur-xl border border-purple-500/40 text-purple-400 p-4 rounded-2xl shadow-xl transform hover:scale-110 transition-all duration-300 group-hover:text-white group-hover:border-purple-400/60"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>
        </div>

      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(80px, 80px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 4s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default App;