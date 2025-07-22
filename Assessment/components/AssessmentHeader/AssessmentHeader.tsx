import React from 'react'
import { useAppSelector } from '@app/hooks'
import { selectCurrentQuestion } from '@features/Assessment/store/assessment.selector'

const AssessmentHeader = () => {
    const currentQuestion = useAppSelector(selectCurrentQuestion)
    console.log(currentQuestion)

    return (
        <div className="w-full bg-[#1095F1] text-white p-4 rounded-lg mb-4">
            <div className="flex justify-between items-start">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold font-mier">
                        Course Name : Introduction to Biology
                    </h1>

                    <p className="text-base mt-1  font-opensans">
                        Subtopic : {currentQuestion?.sub_topic}
                    </p>
                    <p className="text-sm  mt-1  font-opensans">
                        Objective : {currentQuestion?.learning_objective}
                    </p>
                </div>
                <span className="text-lg font-mier">Quiz 3 of 5</span>
            </div>
        </div>
    )
}

export default AssessmentHeader
