import React, { useState } from 'react';
import { Spinner, SpinnerSize, PrimaryButton } from '@fluentui/react';

interface IGWTCameraCountNoneProps {
    isDiagnosticRunning: boolean;
    setDiagnosticRunning: () => void;
    target: string | null;
    setTarget: (target: string) => void;
    followUpNumberOfCameras: number | null;
    setNumberOfCameras: (type: string, cameraCount: number) => void;
}

const GWTCameraCountNone: React.FC<IGWTCameraCountNoneProps> = ({
    followUpNumberOfCameras,
    setNumberOfCameras,
    isDiagnosticRunning,
    setDiagnosticRunning,
    target,
    setTarget
}) => {
    const [isButtonVisible, setIsButtonVisible] = useState(true);

    return (
        <>
            <h4>Please disconnect all cameras but one and click the button below</h4>
            {
                isDiagnosticRunning && target === 'followUpNumberOfCameras'
                    ? <Spinner
                        style={{ display: 'inline-flex' }}
                        size={SpinnerSize.large}
                        label='Diagnostics running. Please wait...'
                    />
                    :
                    (
                        isButtonVisible ?
                            <PrimaryButton
                                name='followUpNumberOfCameras'
                                text='Run Diagnostic'
                                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                                    const { name } = event.currentTarget;
                                    setDiagnosticRunning();
                                    setTarget(name);
                                    setIsButtonVisible(false);
                                    setTimeout(() => {
                                        setNumberOfCameras(name, -1);
                                    }, 2500)
                                }} />
                            : (
                                followUpNumberOfCameras !== null &&
                                <p>Number of cameras detected: {followUpNumberOfCameras === -1 ? 'None' : followUpNumberOfCameras}</p>
                            )
                    )
            }
        </>
    )
}

export default GWTCameraCountNone;