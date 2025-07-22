import React, { useEffect, useState, useCallback, useRef } from 'react'

interface TimerProps {
    // Initial time settings
    initialMinutes?: number
    initialSeconds?: number

    // Appearance options
    showHours?: boolean
    className?: string

    // Callback functions
    onTimeUp?: () => void
    onTimeUpdate?: (minutes: number, seconds: number) => void

    // Timer controls
    isPaused?: boolean
    autoStart?: boolean
}

/**
 * Timer component that displays and manages a countdown timer
 * Supports hours, minutes, seconds display with configurable callbacks
 */
const Timer: React.FC<TimerProps> = ({
    initialMinutes = 15,
    initialSeconds = 0,
    showHours = false,
    className = '',
    onTimeUp,
    onTimeUpdate,
    isPaused = false,
    autoStart = true,
}) => {
    // Calculated total seconds for the timer
    const totalInitialSeconds = initialMinutes * 60 + initialSeconds

    // State for the timer
    const [timeRemaining, setTimeRemaining] =
        useState<number>(totalInitialSeconds)
    const [isActive, setIsActive] = useState<boolean>(autoStart)

    // Use ref to maintain latest callback across rerenders
    const onTimeUpRef = useRef(onTimeUp)
    const onTimeUpdateRef = useRef(onTimeUpdate)

    // Update refs when callback props change
    useEffect(() => {
        onTimeUpRef.current = onTimeUp
        onTimeUpdateRef.current = onTimeUpdate
    }, [onTimeUp, onTimeUpdate])

    // Pause/resume effect
    useEffect(() => {
        setIsActive(!isPaused && timeRemaining > 0)
    }, [isPaused, timeRemaining])

    // Calculate hours, minutes, seconds for display
    const hours = showHours ? Math.floor(timeRemaining / 3600) : 0
    const minutes = Math.floor((timeRemaining - hours * 3600) / 60)
    const seconds = timeRemaining % 60

    // Format time parts with leading zeros
    const formatTimePart = useCallback((value: number): string => {
        return value.toString().padStart(2, '0')
    }, [])

    // Main timer effect
    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null

        if (isActive) {
            intervalId = setInterval(() => {
                setTimeRemaining((prevTime) => {
                    if (prevTime <= 1) {
                        // Time is up
                        clearInterval(intervalId as NodeJS.Timeout)
                        setIsActive(false)

                        // Call onTimeUp callback if provided
                        if (onTimeUpRef.current) {
                            onTimeUpRef.current()
                        }
                        return 0
                    }

                    const newTime = prevTime - 1

                    // Call onTimeUpdate callback if provided
                    if (onTimeUpdateRef.current) {
                        const mins = Math.floor(newTime / 60)
                        const secs = newTime % 60
                        onTimeUpdateRef.current(mins, secs)
                    }

                    return newTime
                })
            }, 1000)
        }

        // Cleanup interval on unmount or when timer state changes
        return () => {
            if (intervalId) {
                clearInterval(intervalId)
            }
        }
    }, [isActive])

    // Functions to control the timer externally if needed
    const start = useCallback(() => setIsActive(true), [])
    const pause = useCallback(() => setIsActive(false), [])
    const reset = useCallback(() => {
        setTimeRemaining(totalInitialSeconds)
        setIsActive(autoStart)
    }, [totalInitialSeconds, autoStart])

    // Time display with warning colors for low time
    const getColorClass = () => {
        if (timeRemaining <= 60) return 'text-red-600' // Last minute
        if (timeRemaining <= 300) return 'text-amber-500' // Last 5 minutes
        return 'text-blue-600'
    }

    return (
        <div
            className={`bg-white border border-gray-200 rounded-md p-2 flex items-center gap-2 ${className}`}
            data-testid="timer"
        >
            {/* Timer icon */}
            <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                className={getColorClass()}
                aria-hidden="true"
            >
                <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                />
                <line
                    x1="12"
                    y1="12"
                    x2="12"
                    y2="8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <line
                    x1="12"
                    y1="12"
                    x2="14"
                    y2="14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>

            {/* Timer display */}
            <span
                className={`font-opensans ${getColorClass()}`}
                aria-live="polite"
                aria-atomic="true"
            >
                {showHours && (
                    <>
                        <span className="font-semibold">
                            {formatTimePart(hours)}
                        </span>
                        <span className="mx-0.5">:</span>
                    </>
                )}
                <span className="font-semibold">{formatTimePart(minutes)}</span>
                <span className="mx-0.5">:</span>
                <span className="font-semibold">{formatTimePart(seconds)}</span>
                <span className="ml-1 text-gray-700">left</span>
            </span>
        </div>
    )
}

export default Timer
