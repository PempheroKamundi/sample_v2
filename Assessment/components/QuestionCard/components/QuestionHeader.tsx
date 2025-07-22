import React from 'react';
import {QuestionResult} from "@core/models";

interface QuestionHeaderProps {
    questionNumber: number;
    questionText: string;
    result: QuestionResult | null;
}

export const QuestionHeader: React.FC<QuestionHeaderProps> = ({
                                                                  questionNumber,
                                                                  questionText,
                                                                  result
                                                              }) => {
    const getStatusIcon = () => {
        if (!result?.attempt) return null;

        if (result.passed) {
            return (
                <span className="ml-2 inline-flex items-center text-green-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </span>
            );
        }

        return (
            <span className="ml-2 inline-flex items-center text-red-600">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
        );
    };

    return (
        <div className={`mb-6 ${result?.attempt ? (result.passed ? 'border-l-4 border-l-green-500 pl-4' : 'border-l-4 border-l-red-500 pl-4') : ''}`}>
            <h2 className="text-lg font-bold text-gray-800 font-mier flex items-center">
                Question {questionNumber}: {questionText}
                {getStatusIcon()}
            </h2>
        </div>
    );
};