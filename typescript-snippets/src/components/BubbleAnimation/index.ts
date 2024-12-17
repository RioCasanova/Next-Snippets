"use client";
import styles from "../../styles/styles.module.css";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

// Words to display in the bubbles
const words: string[] = [
  "Generate QR Codes",
  "Visualize Funds",
  "Receive 100% Refund",
  "Manage Volunteers",
];

interface Bubble {
  word: string;
  index: number;
  top: number; // Top position in percentage (0-100%)
  left: number; // Left position in percentage (0-100%)
  speedX: number; // Speed in the horizontal direction
  speedY: number; // Speed in the vertical direction
  size: number; // Size of the bubble in pixels
  color: string; // Color of the bubble
}
const colors = ["#FF6347", "#4682B4", "#32CD32", "#FFD700", "#8A2BE2"];
const BubbleSection = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    // 1. Initialize bubbles with random positions and movement speeds
    const initialBubbles = words.map((word, index) => {
      const speedX = (Math.random() - 0.5) * 0.5; // Random speed in X direction (between -1 and 1)
      const speedY = (Math.random() - 0.5) * 0.5; // Random speed in Y direction (between -1 and 1)
      const nsize = Math.floor(Math.random() * (130 - 95 + 1)) + 90;
      const color = colors[index % colors.length]; // Get a color from the list

      return {
        word,
        index,
        top: Math.random() * 100, // Random starting top (0-100%)
        left: Math.random() * 100, // Random starting left (0-100%)
        speedX,
        speedY,
        size: nsize, // Set an appropriate size for the bubble
        color: color,
      };
    });

    setBubbles(initialBubbles);

    const moveBubbles = () => {
      setBubbles((prevBubbles) => {
        return prevBubbles.map((bubble) => {
          // Calculate new positions based on speed
          let newTop = bubble.top + bubble.speedY; // Keep as number for calculations
          let newLeft = bubble.left + bubble.speedX; // Keep as number for calculations

          // 3. Check boundaries: If the bubble hits the container's edges, reverse the speed direction
          let updatedSpeedX = bubble.speedX;
          let updatedSpeedY = bubble.speedY;

          const maxX = 87; // Maximum left (100% width of container minus bubble size)
          const maxY = 88; // Maximum top (100% height of container minus bubble size)

          // 4. Bounce off top and bottom (if bubble goes out of bounds, reverse Y speed)
          if (newTop < 11) {
            updatedSpeedY *= -1;
            // Add an offset to prevent it from getting stuck at the top
            newTop = 12; // Push it slightly below the top boundary
          } else if (newTop > maxY) {
            updatedSpeedY *= -1;
            // Add an offset to prevent it from getting stuck at the bottom
            newTop = maxY - 1; // Push it slightly above the bottom boundary
          }

          // 4. Bounce off top and bottom (if bubble goes out of bounds, reverse Y speed)
          if (newLeft < 13) {
            updatedSpeedX *= -1;
            // Add an offset to prevent it from getting stuck at the top
            newLeft = 14; // Push it slightly below the top boundary
          } else if (newLeft > maxY) {
            updatedSpeedX *= -1;
            // Add an offset to prevent it from getting stuck at the bottom
            newLeft = maxX - 1; // Push it slightly above the bottom boundary
          }

          // 6. Update position to ensure bubble stays within container bounds
          return {
            ...bubble,
            top: newTop, // Set as number
            left: newLeft, // Set as number
            speedX: updatedSpeedX,
            speedY: updatedSpeedY,
          };
        });
      });
    };

    // 7. Start moving the bubbles at a consistent frame rate (60fps)
    const interval = setInterval(moveBubbles, 16);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <Box className={styles.bubbleContainer}>
      {/* 8. Map over the bubbles to render them */}
      {bubbles.map((bubble, index) => (
        <Box
          key={index}
          className={styles.bubble}
          style={{
            top: `${bubble.top}%`, // Convert to percentage for display
            left: `${bubble.left}%`, // Convert to percentage for display
            position: "absolute",
            transform: "translate(-50%, -50%)",
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            lineHeight: `${bubble.size}px`, // Vertically center the text
            transition: "top 0.016s, left 0.016s", // Smooth transition for movement
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: bubble.color,
          }}
        >
          <Typography
            variant="body1"
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              textAlign: "center",
              whiteSpace: "normal", // Allow text to wrap
              wordBreak: "break-word", // Prevent text overflow
            }}
          >
            {bubble.word}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default BubbleSection;
