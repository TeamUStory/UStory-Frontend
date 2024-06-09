import { useEffect, useRef, useState } from 'react';

const useSetInterval = (callback, delay) => {
  const savedCallback = useRef()

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval
  useEffect(() => {
    if(delay !== null) {
      const intervalId = setInterval(() => savedCallback.current(), delay)
      return () => clearInterval(intervalId)
    }
  }, [delay])
}

const useTimer = (initialTime = 180) => {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)

  // Timer Logic
  const startTimer = () => {
    setIsRunning(true)
  }

  const stopTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setTimeLeft(initialTime)
    setIsRunning(false)
  }

  // Custom Hook
  useSetInterval(
    () => {
      if(isRunning && timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1)
      } else if(timeLeft === 0) {
        setIsRunning(false)
      }
    },
    isRunning ? 1000 : null
  )

  // Return values
  return { timeLeft, isRunning, startTimer, stopTimer, resetTimer }
}

export default useTimer;