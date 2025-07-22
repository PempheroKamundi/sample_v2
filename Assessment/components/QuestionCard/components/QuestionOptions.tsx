import React from 'react';
import {Option, QuestionResult} from "@core/models";

interface QuestionOptionsProps {
    options: Option[];
    selectedOption: string | null;
    onOptionSelect: (optionId: string) => void;
    result: QuestionResult | null;
    isInteractive: boolean;
}

export const QuestionOptions: React.FC<QuestionOptionsProps> = ({
                                                                    options,
                                                                    selectedOption,
                                                                    onOptionSelect,
                                                                    result,
                                                                    isInteractive
                                                                }) => {
    const getOptionClassName = (option: Option) => {
        const baseClasses = 'p-4 rounded-lg border transition-all duration-200';
        const interactiveClasses = isInteractive ? 'cursor-pointer hover:bg-gray-100' : 'cursor-default';

        const isSelected = selectedOption === option.id;
        const isCorrect = result?.attempt && result.correct === option.id;
        const isIncorrect = result?.attempt && isSelected && !result.passed;

        if (isCorrect) {
            return `${baseClasses} bg-green-50 border-green-500 ${interactiveClasses}`;
        }

        if (isIncorrect) {
            return `${baseClasses} bg-red-50 border-red-500 ${interactiveClasses}`;
        }

        if (isSelected) {
            return `${baseClasses} bg-blue-50 border-blue-500 ${interactiveClasses}`;
        }

        return `${baseClasses} bg-gray-50 border-gray-200 ${interactiveClasses}`;
    };

    const getRadioClassName = (option: Option) => {
        const isSelected = selectedOption === option.id;
        return `w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            isSelected ? 'border-blue-500' : 'border-gray-400'
        }`;
    };

    return (
        <div className="space-y-4">
            {options.map((option) => (
                <div
                    key={option.id}
                    className={getOptionClassName(option)}
                    onClick={() => isInteractive && onOptionSelect(option.id)}
                    role="radio"
                    aria-checked={selectedOption === option.id}
                    tabIndex={isInteractive ? 0 : -1}
                >
                    <div className="flex items-center gap-4">
                        <div className={getRadioClassName(option)}>
                            {selectedOption === option.id && (
                                <div className="w-3 h-3 rounded-full bg-blue-500" />
                            )}
                        </div>
                        <span className="font-opensans text-gray-700 flex-1">
              {option.text}
            </span>
                    </div>
                </div>
            ))}
        </div>
    );
};