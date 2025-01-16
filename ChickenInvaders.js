import React, { useState, useEffect, useRef } from "react";

const ChickenInvaders = () => {
  // Game state variables
  const [spaceshipPosition, setSpaceshipPosition] = useState(50); // Horizontal position (percentage)
  const [bullets, setBullets] = useState([]); // Bullets [{ x, y }]
  const [chickens, setChickens] = useState([]); // Chickens [{ x, y }]
  const [score, setScore] = useState(0); // Player's score
  const [gameOver, setGameOver] = useState(false);

  const gameAreaRef = useRef(null);

  // Move spaceship left and right
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      setSpaceshipPosition((prev) => Math.max(0, prev - 5));
    } else if (event.key === "ArrowRight") {
      setSpaceshipPosition((prev) => Math.min(100, prev + 5));
    } else if (event.key === " ") {
      fireBullet();
    }
  };

  // Fire a bullet
  const fireBullet = () => {
    setBullets((prev) => [...prev, { x: spaceshipPosition, y: 90 }]);
  };

  // Move bullets and handle collision
  useEffect(() => {
    const interval = setInterval(() => {
      setBullets((prev) =>
        prev
          .map((bullet) => ({ ...bullet, y: bullet.y - 5 }))
          .filter((bullet) => bullet.y > 0)
      );

      // Check for collisions
      setBullets((prevBullets) => {
        const updatedBullets = [];
        const updatedChickens = chickens.map((chicken) => {
          let hit = false;
          prevBullets.forEach((bullet) => {
            if (
              bullet.x >= chicken.x - 5 &&
              bullet.x <= chicken.x + 5 &&
              bullet.y <= chicken.y + 5 &&
              bullet.y >= chicken.y
            ) {
              hit = true;
              setScore((prevScore) => prevScore + 1);
            } else {
              updatedBullets.push(bullet);
            }
          });
          return hit ? null : chicken;
        });

        setChickens(updatedChickens.filter((chicken) => chicken !== null));
        return updatedBullets;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [chickens]);

  // Generate chickens
  useEffect(() => {
    const interval = setInterval(() => {
      setChickens((prev) => [
        ...prev,
        { x: Math.random() * 100, y: 0 } // Random x position
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Move chickens and detect game over
  useEffect(() => {
    const interval = setInterval(() => {
      setChickens((prev) =>
        prev.map((chicken) => {
          if (chicken.y >= 95) {
            setGameOver(true); // End game if a chicken reaches the bottom
            return null;
          }
          return { ...chicken, y: chicken.y + 2 };
        }).filter((chicken) => chicken !== null)
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Add keyboard event listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (gameOver) {
    return (
      <div className="game-over">
        <h1>Game Over</h1>
        <p>Score: {score}</p>
      </div>
    );
  }

  return (
    <div
      className="game-area"
      ref={gameAreaRef}
      style={{
        position: "relative",
        width: "100%",
        height: "500px",
        backgroundColor: "black",
        overflow: "hidden",
      }}
    >
      {/* Score */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          color: "white",
        }}
      >
        Score: {score}
      </div>

      {/* Spaceship */}
      <div
        className="spaceship"
        style={{
          position: "absolute",
          bottom: "10px",
          left: `${spaceshipPosition}%`,
          transform: "translateX(-50%)",
          width: "40px",
          height: "40px",
          backgroundColor: "blue",
        }}
      />

      {/* Bullets */}
      {bullets.map((bullet, index) => (
        <div
          key={index}
          className="bullet"
          style={{
            position: "absolute",
            bottom: `${bullet.y}%`,
            left: `${bullet.x}%`,
            width: "5px",
            height: "10px",
            backgroundColor: "yellow",
          }}
        />
      ))}

      {/* Chickens */}
      {chickens.map((chicken, index) => (
        <div
          key={index}
          className="chicken"
          style={{
            position: "absolute",
            top: `${chicken.y}%`,
            left: `${chicken.x}%`,
            width: "30px",
            height: "30px",
            backgroundColor: "red",
            borderRadius: "50%",
          }}
        />
      ))}
    </div>
  );
};

export default ChickenInvaders;
