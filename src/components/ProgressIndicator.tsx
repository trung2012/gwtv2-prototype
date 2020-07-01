import React from 'react';
import { ProgressIndicator } from '@fluentui/react';

const intervalDelay = 100;
const intervalIncrement = 0.04;

interface IProgressIndicatorProps {
    label: string;
    description: string;
}

const ProgressIndicatorComponent: React.FC<IProgressIndicatorProps> = ({ label, description }) => {
    const [percentComplete, setPercentComplete] = React.useState(0);

    React.useEffect(() => {
        const id = setInterval(() => {
            setPercentComplete((intervalIncrement + percentComplete) % 1);
        }, intervalDelay);
        return () => {
            clearInterval(id);
        };
    });

    return (
        <ProgressIndicator
            label={label}
            description={description}
            percentComplete={percentComplete}
            barHeight={3}
        />
    );
};

export default ProgressIndicatorComponent;