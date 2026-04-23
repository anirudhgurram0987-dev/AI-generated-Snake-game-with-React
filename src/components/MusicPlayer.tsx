import React, { useState, useRef, useEffect } from 'react';

const TRACKS = [
  {
    id: 1,
    title: 'GLITCH_PROTOCOL',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: 2,
    title: 'CYBER_WASTELAND',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: 3,
    title: 'MACHINE_PULSE',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.log('Audio error:', err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const handleNext = () => setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  const handlePrev = () => setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  const toggleMute = () => setIsMuted(!isMuted);

  const handleEnded = () => {
    handleNext();
  };

  return (
    <div className="bg-black border-8 border-[#0ff] w-full max-w-lg flex flex-col relative text-[#0ff]">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onEnded={handleEnded}
      />
      
      <div className="p-4 md:p-6 border-b-8 border-[#ff00ff] bg-[#111]">
        <div className="flex justify-between items-start mb-4">
          <span className="text-lg md:text-xl bg-[#ff00ff] text-black px-2 glitch-layer font-bold">STREAM_ACTIVE</span>
          <span className="text-lg md:text-xl">RATE: 128KBPS</span>
        </div>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold uppercase truncate mt-4 tracking-widest" style={{textShadow: '3px 3px 0px #ff00ff'}}>
          $&gt; {currentTrack.title}.WAV
        </h2>
      </div>

      <div className="p-4 md:p-6 flex flex-col gap-6">
        <div className="flex justify-between items-center text-[#ff00ff] border-4 border-[#0ff] p-4 bg-[#0ff]/10">
          <span className="text-lg md:text-xl lg:text-2xl font-bold">ADDR: 0x4A{currentTrackIndex}</span>
          <button 
            onClick={toggleMute} 
            className="hover:bg-[#ff00ff] hover:text-black uppercase text-lg md:text-xl font-bold border-4 border-[#ff00ff] px-4 py-2 cursor-pointer"
          >
            {isMuted ? 'UNMUTE_CMD' : 'MUTE_CMD'}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-2 md:mt-6">
          <button
            onClick={handlePrev}
            className="flex-1 bg-black border-4 border-[#0ff] text-[#0ff] py-3 md:py-4 hover:bg-[#0ff] hover:text-black uppercase font-bold text-2xl md:text-3xl lg:text-5xl cursor-pointer"
          >
            &lt;&lt;
          </button>
          <button
            onClick={togglePlay}
            className={`flex-[2] border-4 py-3 md:py-4 uppercase font-bold text-2xl md:text-3xl lg:text-5xl cursor-pointer ${
              isPlaying 
                ? 'bg-[#ff00ff] text-black border-[#ff00ff] hover:bg-black hover:text-[#ff00ff] glitch-layer' 
                : 'bg-black text-[#ff00ff] border-[#ff00ff] hover:bg-[#ff00ff] hover:text-black'
            }`}
          >
            {isPlaying ? 'PAUSE_EXE' : 'PLAY_EXE'}
          </button>
          <button
            onClick={handleNext}
            className="flex-1 bg-black border-4 border-[#0ff] text-[#0ff] py-3 md:py-4 hover:bg-[#0ff] hover:text-black uppercase font-bold text-2xl md:text-3xl lg:text-5xl cursor-pointer"
          >
            &gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
}
