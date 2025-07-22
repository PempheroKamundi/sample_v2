import React, { ReactNode, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@app/hooks'
import {
    selectProgressPercent,
    selectScoreInfo,
} from '@features/Assessment/store/assessment.selector'
import { toggleResults } from '@features/Assessment/store/assessment.slice'

interface ProgressBarProps {
    children: ReactNode
}

const ProgressBar: React.FC<ProgressBarProps> = ({ children }) => {
    const dispatch = useAppDispatch()

    const { answeredCount, passedCount, totalQuestions } =
        useAppSelector(selectScoreInfo)

    const progressPercent = useAppSelector(selectProgressPercent)

    const currentQuestionNumber = useMemo(() => {
        return Math.ceil((progressPercent / 100) * totalQuestions)
    }, [progressPercent, totalQuestions])

    const handleToggleResults = () => {
        dispatch(toggleResults())
    }

    return (
        <div className="w-full flex justify-between mb-4 gap-4 flex-wrap">
            <div className="flex-grow bg-white border border-gray-200 rounded-md p-2 relative">
                <div
                    className="bg-[#1095F1] opacity-40 absolute left-0 top-0 h-full rounded-md"
                    style={{ width: `${progressPercent}%`, margin: '2px' }}
                ></div>
                <div className="text-center relative z-10 font-opensans text-gray-700">
                    Question {currentQuestionNumber} of {totalQuestions}
                </div>
            </div>

            <button
                onClick={handleToggleResults}
                className="bg-amber-50 hover:bg-amber-100 border-2 border-[#e3a008] rounded-md px-4 py-2 flex items-center gap-2 shadow-sm transition-colors duration-200"
                title="View your quiz progress and results"
            >
                <div className="flex items-end h-5 gap-1">
                    <div className="w-1.5 h-3 bg-[#e3a008] rounded-sm"></div>
                    <div className="w-1.5 h-2 bg-[#e3a008] rounded-sm"></div>
                    <div className="w-1.5 h-4 bg-[#e3a008] rounded-sm"></div>
                </div>
                <span className="font-bold text-gray-800 font-opensans">
                    View Progress ({passedCount}/{totalQuestions})
                </span>
                <svg
                    className="w-4 h-4 text-[#e3a008]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {children}
        </div>
    )
}

export default ProgressBar
