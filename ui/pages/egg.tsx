import { useEffect, useState } from "react";

interface Bubble {
  x: number;
  y: number;
  timestamp: number;
}

export default function Egg() {
  const [bubbles, setBubbles] = useState<Array<Bubble>>([]);
  const [count, setCount] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    const id = setInterval(() => {
      if (bubbles.some((bubble) => bubble.y < 0)) {
        setIsPlaying(false);
      } else {
        setBubbles((bubbles) => [
          ...bubbles.map((bubble) => {
            return {
              ...bubble,
              y: bubble.y - Math.random() * Math.sqrt(count ? count * 2 : 2),
            };
          }),
          ...(Math.sqrt(count ? count : 2) > Math.random() * 10
            ? [
                {
                  x: Math.random() * 100,
                  y: 100,
                  timestamp: Date.now(),
                },
              ]
            : []),
        ]);
      }
    }, 300);
    return () => clearInterval(id);
  });

  return (
    <main className="bg-neutral-900 flex min-h-screen min-w-screen overflow-hidden max-h-screen max-w-screen p-5">
      <div className="min-w-full min-h-full relative">
        <h1
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 duration-1000 text-5xl ${
            isPlaying ? "text-green-500" : "text-red-700"
          }`}
          style={{
            top: `2%`,
            left: `90%`,
          }}
        >
          {count}
        </h1>
        {isPlaying ? (
          bubbles?.map((bubble) => (
            <div
              key={bubble.timestamp}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-linear"
              style={{
                top: `${bubble.y}%`,
                left: `${bubble.x}%`,
              }}
              onClick={() => {
                setBubbles(
                  bubbles.filter((b) => {
                    return b.timestamp !== bubble.timestamp;
                  })
                );
                setCount(count + 1);
              }}
            >
              <div className="w-5 h-5 p-5 rounded-full bg-[#9ff] border border-blue-300"></div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center">
            <button
              className="px-5 py-2 mt-5 bg-green-600 rounded text-green-200 font-semibold hover:text-green-100 hover:ring-2 hover:ring-green-200"
              onClick={() => {
                setIsPlaying(true);
                setCount(0);
                setBubbles([]);
              }}
            >
              Play Again!
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
