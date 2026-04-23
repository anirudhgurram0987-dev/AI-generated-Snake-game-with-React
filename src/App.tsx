import React from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-[#0ff] selection:bg-[#ff00ff] selection:text-black overflow-hidden relative uppercase group text-xl lg:text-3xl">
      <div className="crt-overlay" />
      <div className="noise-overlay" />
      
      <div className="w-full h-full max-w-7xl mx-auto px-4 py-8 relative z-10 flex flex-col min-h-screen screen-tear">
        
        <header className="flex flex-col items-start gap-1 mb-8 mt-4 shrink-0 border-b-8 border-[#ff00ff] pb-4">
          <h1 className="text-6xl md:text-8xl font-bold tracking-widest text-[#0ff] bg-black inline-block mix-blend-screen glitch-layer" style={{textShadow: '4px 0px 0px #ff00ff, -4px 0px 0px #0ff'}}>
            SYS.CORE//OVERRIDE
          </h1>
          <p className="text-[#ff00ff] text-2xl md:text-4xl tracking-widest animate-pulse mt-2">
            &gt; SUB-ROUTINE: GLITCH_PROTO_0X9A
          </p>
        </header>

        <main className="flex-1 flex flex-col lg:flex-row items-stretch justify-center gap-8 w-full border-8 border-[#0ff] p-4 lg:p-8 bg-[#050505]">
          
          {/* Game Terminal */}
          <div className="flex-[3] border-b-8 lg:border-b-0 lg:border-r-8 border-dashed border-[#ff00ff] pb-8 lg:pb-0 lg:pr-8 flex flex-col relative w-full overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 bg-[#ff00ff] text-black px-4 py-2 text-xl md:text-2xl z-10 font-bold glitch-layer">
              TERM:01 // SNAKE.EXE
            </div>
            <div className="pt-12 h-full flex items-center justify-center">
              <SnakeGame />
            </div>
          </div>

          {/* Audio Terminal */}
          <div className="flex-[2] lg:pl-8 flex flex-col relative w-full shrink-0">
            <div className="absolute top-0 right-0 bg-[#0ff] text-black px-4 py-2 text-xl md:text-2xl z-10 font-bold glitch-layer">
              TERM:02 // AUDIO_MATRIX.DLL
            </div>
            <div className="pt-12 h-full flex items-center justify-center">
              <MusicPlayer />
            </div>
          </div>

        </main>

        <footer className="shrink-0 flex justify-between py-6 text-[#ff00ff] font-bold text-2xl md:text-3xl mt-4 border-t-4 border-dashed border-[#0ff]">
          <span className="glitch-layer">[ STATUS: DEGRADED ]</span>
          <span className="animate-pulse">[ INPUT_REQUIRED ]</span>
        </footer>
      </div>
    </div>
  );
}
