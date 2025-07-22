import React, { useState } from 'react'

const QuizPopups = () => {
    // States to control which popups are visible (for demo purposes)
    const [showHint, setShowHint] = useState(true)
    const [showIncorrect, setShowIncorrect] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    // Toggle functions for demo purposes
    const toggleHint = () => {
        setShowHint(!showHint)
        setShowIncorrect(false)
        setShowSuccess(false)
    }

    const toggleIncorrect = () => {
        setShowHint(false)
        setShowIncorrect(!showIncorrect)
        setShowSuccess(false)
    }

    const toggleSuccess = () => {
        setShowHint(false)
        setShowIncorrect(false)
        setShowSuccess(!showSuccess)
    }

    return (
        <div className="bg-gray-50 p-8 rounded-lg border-2 border-gray-200">
            <div className="mb-6">
                <h2 className="text-xl font-bold font-mier mb-4 text-gray-800">
                    Quiz Popup Components
                </h2>
                <p className="text-gray-700 mb-4 font-opensans">
                    Click the buttons below to preview each popup:
                </p>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={toggleHint}
                        className={`px-4 py-2 rounded-full font-opensans font-medium text-sm ${showHint ? 'bg-[#1095F1] text-white' : 'bg-white border border-gray-300 text-gray-700'}`}
                    >
                        Hint Popup
                    </button>
                    <button
                        onClick={toggleIncorrect}
                        className={`px-4 py-2 rounded-full font-opensans font-medium text-sm ${showIncorrect ? 'bg-[#1095F1] text-white' : 'bg-white border border-gray-300 text-gray-700'}`}
                    >
                        Incorrect Answer Popup
                    </button>
                    <button
                        onClick={toggleSuccess}
                        className={`px-4 py-2 rounded-full font-opensans font-medium text-sm ${showSuccess ? 'bg-[#1095F1] text-white' : 'bg-white border border-gray-300 text-gray-700'}`}
                    >
                        Success Popup
                    </button>
                </div>
            </div>

            {/* Mock Question for context */}
            <div className="w-full bg-white border border-gray-200 rounded-lg p-6 mb-4 relative">
                <h2 className="text-lg font-bold mb-6 text-gray-800 font-mier">
                    Question: What is the primary function of mitochondria in a
                    cell?
                </h2>

                {/* Multiple Choice Options */}
                <div className="space-y-4">
                    <div className="p-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center"></div>
                            <span className="font-opensans text-gray-700">
                                Cell division and replication
                            </span>
                        </div>
                    </div>
                    <div className="p-4 rounded-lg border border-gray-200 bg-[#e1f0fd] border-[#1095F1] cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-6 h-6 rounded-full border-2 border-[#1095F1] flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-[#1095F1]"></div>
                            </div>
                            <span className="font-opensans text-gray-700">
                                Energy production (ATP synthesis)
                            </span>
                        </div>
                    </div>
                </div>

                {/* 1. HINT POPUP */}
                {showHint && (
                    <div className="absolute top-2 right-2 w-64 bg-[#fff8e6] border-l-4 border-[#e3a008] shadow-lg rounded-lg p-4 animate-fade-in">
                        <div className="flex items-start">
                            <div className="mr-3 mt-1 text-[#e3a008]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-lightbulb"
                                >
                                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                                    <path d="M9 18h6" />
                                    <path d="M10 22h4" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-[#e3a008] font-bold text-sm mb-1 font-mier">
                                    Hint
                                </h3>
                                <p className="text-sm text-gray-700 font-opensans">
                                    Think about what process provides energy for
                                    cellular activities.
                                </p>
                                <div className="flex justify-between items-center mt-2">
                                    <button
                                        className="text-xs text-[#e3a008] font-medium font-opensans hover:text-[#c48a06]"
                                        onClick={toggleHint}
                                    >
                                        Got it
                                    </button>
                                    <button
                                        className="text-xs text-gray-500 font-opensans hover:text-gray-700"
                                        onClick={toggleHint}
                                    >
                                        Dismiss
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 2. INCORRECT ANSWER EXPLANATION POPUP */}
            {showIncorrect && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-xl w-full mx-4 animate-scale-in">
                        <div className="p-4 bg-red-50 rounded-t-lg border-b border-red-100 flex items-center">
                            <div className="bg-red-100 rounded-full p-2 mr-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-red-500"
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 font-mier">
                                Incorrect Answer
                            </h3>
                            <button
                                className="ml-auto text-gray-400 hover:text-gray-600"
                                onClick={toggleIncorrect}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="mb-4">
                                <h4 className="font-bold text-gray-800 mb-2 font-mier">
                                    Your answer:
                                </h4>
                                <div className="p-3 bg-red-50 border border-red-200 rounded-md font-opensans text-red-700">
                                    Cell division and replication
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="font-bold text-gray-800 mb-2 font-mier">
                                    Correct answer:
                                </h4>
                                <div className="p-3 bg-[#e6f7f3] border border-[#04543e] rounded-md font-opensans text-[#04543e]">
                                    Energy production (ATP synthesis)
                                </div>
                            </div>

                            <div className="mb-6">
                                <h4 className="font-bold text-gray-800 mb-2 font-mier">
                                    Explanation:
                                </h4>
                                <div className="bg-gray-50 rounded-md p-4 font-opensans text-gray-700">
                                    <p className="mb-2">
                                        Mitochondria are often referred to as
                                        the "powerhouse of the cell" because
                                        their primary function is to generate
                                        energy in the form of ATP (adenosine
                                        triphosphate) through cellular
                                        respiration.
                                    </p>
                                    <p className="mb-2">
                                        Key points to remember:
                                    </p>
                                    <ul className="list-disc ml-5 space-y-1 text-sm">
                                        <li>
                                            Mitochondria convert glucose and
                                            oxygen into ATP
                                        </li>
                                        <li>
                                            This process is called oxidative
                                            phosphorylation
                                        </li>
                                        <li>
                                            Cell division is primarily handled
                                            by other organelles
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <button
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-opensans font-medium text-sm border border-gray-300 hover:bg-gray-200"
                                    onClick={toggleIncorrect}
                                >
                                    Review Question
                                </button>
                                <button
                                    className="px-4 py-2 bg-[#1095F1] text-white rounded-full font-opensans font-medium text-sm hover:bg-[#0d7fd0]"
                                    onClick={() => {
                                        toggleIncorrect()
                                        toggleSuccess()
                                    }}
                                >
                                    Next Question
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 3. SUCCESS POPUP */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden animate-bounce-in">
                        <div className="bg-[#e6f7f3] p-8 flex flex-col items-center">
                            <div className="w-16 h-16 bg-[#04543e] rounded-full flex items-center justify-center mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-white"
                                >
                                    <path d="M20 6 9 17l-5-5" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-[#04543e] mb-2 font-mier">
                                Correct Answer!
                            </h3>
                            <p className="text-sm text-center text-[#04543e] font-opensans">
                                Great job! You've identified the primary
                                function of mitochondria correctly.
                            </p>
                        </div>

                        <div className="p-6">
                            <div className="bg-gray-50 rounded-md p-4 mb-4">
                                <h4 className="font-bold text-gray-800 mb-2 font-mier">
                                    Did you know?
                                </h4>
                                <p className="text-sm text-gray-700 font-opensans">
                                    Mitochondria have their own DNA, separate
                                    from the nucleus, and are believed to have
                                    originated from ancient bacteria through
                                    endosymbiosis!
                                </p>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    className="px-6 py-2 bg-[#1095F1] text-white rounded-full font-opensans font-medium text-sm hover:bg-[#0d7fd0]"
                                    onClick={toggleSuccess}
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-in-out;
                }
                .animate-scale-in {
                    animation: scaleIn 0.3s ease-in-out;
                }
                .animate-bounce-in {
                    animation: bounceIn 0.4s
                        cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                @keyframes bounceIn {
                    0% {
                        opacity: 0;
                        transform: scale(0.3);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.05);
                    }
                    70% {
                        transform: scale(0.9);
                    }
                    100% {
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    )
}

export default QuizPopups
