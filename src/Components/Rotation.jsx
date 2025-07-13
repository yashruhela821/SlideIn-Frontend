"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

// Utility for classnames
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// RotatingText component
const RotatingText = forwardRef((props, ref) => {
  const {
    texts,
    transition = { type: "spring", damping: 25, stiffness: 300 },
    initial = { y: "100%", opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: "-120%", opacity: 0 },
    animatePresenceMode = "wait",
    animatePresenceInitial = false,
    rotationInterval = 2000,
    staggerDuration = 0,
    staggerFrom = "first",
    loop = true,
    auto = true,
    splitBy = "characters",
    onNext,
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    ...rest
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // Split text into characters (handles emojis, etc.)
  const splitIntoCharacters = (text) => {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), (segment) => segment.segment);
    }
    return Array.from(text);
  };

  // Memoized split elements
  const elements = useMemo(() => {
    const currentText = texts[currentTextIndex];
    if (splitBy === "characters") {
      const words = currentText.split(" ");
      return words.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== words.length - 1,
      }));
    }
    if (splitBy === "words") {
      return currentText.split(" ").map((word, i, arr) => ({
        characters: [word],
        needsSpace: i !== arr.length - 1,
      }));
    }
    if (splitBy === "lines") {
      return currentText.split("\n").map((line, i, arr) => ({
        characters: [line],
        needsSpace: i !== arr.length - 1,
      }));
    }
    return currentText.split(splitBy).map((part, i, arr) => ({
      characters: [part],
      needsSpace: i !== arr.length - 1,
    }));
  }, [texts, currentTextIndex, splitBy]);

  // Calculate stagger delay
  const getStaggerDelay = useCallback(
    (index, totalChars) => {
      const total = totalChars;
      if (staggerFrom === "first") return index * staggerDuration;
      if (staggerFrom === "last") return (total - 1 - index) * staggerDuration;
      if (staggerFrom === "center") {
        const center = Math.floor(total / 2);
        return Math.abs(center - index) * staggerDuration;
      }
      if (staggerFrom === "random") {
        const randomIndex = Math.floor(Math.random() * total);
        return Math.abs(randomIndex - index) * staggerDuration;
      }
      return Math.abs(staggerFrom - index) * staggerDuration;
    },
    [staggerFrom, staggerDuration]
  );

  // Index change handler
  const handleIndexChange = useCallback(
    (newIndex) => {
      setCurrentTextIndex(newIndex);
      if (onNext) onNext(newIndex);
    },
    [onNext]
  );

  // Next, previous, jumpTo, reset
  const next = useCallback(() => {
    const nextIndex =
      currentTextIndex === texts.length - 1
        ? loop
          ? 0
          : currentTextIndex
        : currentTextIndex + 1;
    if (nextIndex !== currentTextIndex) {
      handleIndexChange(nextIndex);
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  // Expose methods via ref (not used here, but kept for completeness)
  useImperativeHandle(
    ref,
    () => ({
      next,
    }),
    [next]
  );

  // Auto-rotation effect (always on)
  useEffect(() => {
    const intervalId = setInterval(next, rotationInterval);
    return () => clearInterval(intervalId);
  }, [next, rotationInterval]);

  return (
    <motion.span
      className={cn("text-rotate", mainClassName)}
      {...rest}
      layout
      transition={transition}
    >
      <span
        className="text-rotate-sr-only"
        style={{ position: "absolute", left: "-9999px" }}
      >
        {texts[currentTextIndex]}
      </span>
      <AnimatePresence
        mode={animatePresenceMode}
        initial={animatePresenceInitial}
      >
        <motion.div
          key={currentTextIndex}
          className={cn(
            splitBy === "lines" ? "text-rotate-lines" : "text-rotate"
          )}
          layout
          aria-hidden="true"
        >
          {elements.map((wordObj, wordIndex, array) => {
            const previousCharsCount = array
              .slice(0, wordIndex)
              .reduce((sum, word) => sum + word.characters.length, 0);
            return (
              <span
                key={wordIndex}
                className={cn("text-rotate-word", splitLevelClassName)}
              >
                {wordObj.characters.map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={{
                      ...transition,
                      delay: getStaggerDelay(
                        previousCharsCount + charIndex,
                        array.reduce(
                          (sum, word) => sum + word.characters.length,
                          0
                        )
                      ),
                    }}
                    className={cn("text-rotate-element", elementLevelClassName)}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordObj.needsSpace && (
                  <span className="text-rotate-space"> </span>
                )}
              </span>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </motion.span>
  );
});

RotatingText.displayName = "RotatingText";

// --- App Component ---
export default function App() {
  return (
    <>
      <div
        style={{
          padding: 40,
          fontFamily: "Cedarville Cursive",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        {/* Static Text: stays fixed, never moves or animates */}
        <span className="static-text-mono">FIND</span>

        {/* Rotating Text: only this part animates/changes, fixed width to prevent shifting */}
        <span
          style={{
            display: "inline-block",
            width: 220,
            minHeight: "1em",
            textAlign: "left",
          }}
        >
          <RotatingText
            texts={[
              "soulmate",
              "Match",
              "friends",
              "love",
              "Magic",
              "Joy",
              "Laughter",
              "Love",
              "Moments",
            ]}
            mainClassName="px-2 sm:px-2 md:px-3 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
            auto={true}
          />
        </span>

        <style>
          {`
/* Rotating text styles */
.text-rotate, .text-rotate-element {
  display: inline-flex;
  align-items: center;
  font-size: 6rem;
  font-weight: 900;
  position: relative;
 font-family: 'JetBrains Mono', 'Fira Code', 'IBM Plex Mono', 'Space Mono', 'Courier New', monospace;

  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #ffe600;
  /* Enhanced blue shadow for more prominent edges */
  text-shadow:
    1px 1px 1px #3b7be0,
    5px 5px 8px #3b7be0,
    3px 3px 0 #3b7be0,
    1px 1px 0 #3b7be0,
    5px 5px 0 #3b7be0;
}

/* Static text: blue mono style, never animates */
.static-text-mono {
  display: inline-block;
  font-family: 'Sacramento', cursive;
  text-transform: uppercase; 
  font-size: 4rem;
  font-weight: 700;
  color: #6c8cff;
  text-shadow:
    0 2px 8px #b3c6ff,
    0 1px 0 #4a5fc1,
    2px 2px 0 #b3c6ff;
  letter-spacing: 0.2em;
  text-transform: lowercase;
  position: relative;
}

.text-rotate-word {
  display: inline-flex;
}
.text-rotate-space {
  display: inline-block;
  width: 0.5em;
}
          `}
        </style>
      </div>
    </>
  );
}
