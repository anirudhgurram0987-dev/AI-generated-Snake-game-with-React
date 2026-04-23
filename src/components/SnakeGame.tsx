import React, { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };

type Point = { x: number; y: number };

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const directionRef = useRef(direction);
  
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // eslint-disable-next-line no-loop-func
      if (!currentSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    setFood(generateFood(INITIAL_SNAKE));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;
      
      const currentDir = directionRef.current;
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          if (currentDir.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'w':
        case 'W':
          if (currentDir.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (currentDir.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 's':
        case 'S':
          if (currentDir.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (currentDir.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'a':
        case 'A':
          if (currentDir.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (currentDir.x === 0) setDirection({ x: 1, y: 0 });
          break;
        case 'd':
        case 'D':
          if (currentDir.x === 0) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
          e.preventDefault();
          setIsPaused((prev) => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + directionRef.current.x,
          y: head.y + directionRef.current.y,
        };

        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }

        if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 10);
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const intervalId = setInterval(moveSnake, 120);
    return () => clearInterval(intervalId);
  }, [food, gameOver, isPaused, generateFood]);

  return (
    <div className="flex flex-col items-center w-full max-w-[500px]">
      <div className="flex justify-between w-full mb-4 items-end border-b-4 border-[#0ff] pb-2">
        <div className="text-[#ff00ff] text-2xl md:text-3xl lg:text-4xl font-bold tracking-widest" style={{textShadow: '2px 2px 0px #0ff'}}>
          MEM_YIELD: 0x{score.toString(16).toUpperCase().padStart(4, '0')}
        </div>
        <div className="text-[#0ff] text-lg md:text-xl animate-pulse">AWAITING_INPUT</div>
      </div>
      
      <div className="w-full aspect-square relative bg-[#0a0a0a] border-8 border-[#ff00ff] shrink-0 overflow-hidden box-border">
        {/* Grid Pattern Background */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#0ff 1px, transparent 1px), linear-gradient(90deg, #0ff 1px, transparent 1px)',
            backgroundSize: `${100 / GRID_SIZE}% ${100 / GRID_SIZE}%`,
          }}
        />

        {snake.map((segment, index) => (
          <div
            key={`${segment.x}-${segment.y}-${index}`}
            className="absolute bg-[#0ff] border border-black"
            style={{
              left: `${(segment.x / GRID_SIZE) * 100}%`,
              top: `${(segment.y / GRID_SIZE) * 100}%`,
              width: `${100 / GRID_SIZE}%`,
              height: `${100 / GRID_SIZE}%`,
              zIndex: 10,
            }}
          />
        ))}

        <div
          className="absolute bg-[#ff00ff] glitch-layer"
          style={{
            left: `${(food.x / GRID_SIZE) * 100}%`,
            top: `${(food.y / GRID_SIZE) * 100}%`,
            width: `${100 / GRID_SIZE}%`,
            height: `${100 / GRID_SIZE}%`,
            zIndex: 5,
          }}
        />

        {gameOver && (
          <div className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center z-20 border-[8px] md:border-[16px] border-red-600">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-red-600 mb-2 glitch-layer text-center p-2 md:p-4" style={{textShadow: '3px 0px 0px #0ff, -3px 0px 0px #ff00ff'}}>
              FATAL_EXCEPTION
            </h2>
            <p className="text-[#0ff] mb-8 text-xl md:text-2xl lg:text-3xl">DUMP: 0x{score.toString(16).toUpperCase().padStart(4, '0')}</p>
            <button
              onClick={resetGame}
              className="px-6 py-3 md:px-8 md:py-4 bg-[#ff00ff] text-black text-xl md:text-2xl lg:text-3xl font-bold uppercase hover:bg-[#000] hover:text-[#ff00ff] border-4 border-[#ff00ff] transition-none cursor-pointer"
            >
              REBOOT_SYS
            </button>
          </div>
        )}

        {isPaused && !gameOver && (
          <div className="absolute inset-0 border-[8px] md:border-[16px] border-[#0ff] bg-black/70 flex items-center justify-center z-20">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-[#0ff] bg-black px-4 py-2 md:px-6 md:py-4 glitch-layer border-4 border-[#0ff]" style={{textShadow: '4px 4px 0px #ff00ff'}}>
              SYS_HALTED
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
