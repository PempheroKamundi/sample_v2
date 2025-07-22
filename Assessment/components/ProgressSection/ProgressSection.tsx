import React from 'react';
import {ProgressBar} from "@features/Assessment/components/ProgressBar/ProgressBar";
import {Timer} from "@features/Assessment/components/Timer/Timer";



export const ProgressSection: React.FC = () => {
    return (
        <div className="w-full flex justify-between mb-4 gap-4 flex-wrap">
            <ProgressBar />
            <Timer />
        </div>
    );
};
