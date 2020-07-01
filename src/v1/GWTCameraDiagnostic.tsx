import React, { useState, useEffect } from 'react';
import { DiagnosticServices } from '../utils/DiagnosticServices';
import GWTCameraCount1 from './GWTCameraCount1';
import GWTCameraCountNone from './GWTCameraCountNone';

interface IGWTCameraDiagnosticProps {
    initialNumberOfCameras: number | null;
    followUpNumberOfCameras: number | null;
    setNumberOfCameras: (type: string, cameraCount: number) => void;
    isDiagnosticRunning: boolean;
    setDiagnosticRunning: () => void;
    target: string | null;
    setTarget: (target: string) => void;
}

const GWTCameraDiagnostic: React.FC<IGWTCameraDiagnosticProps> = ({
    initialNumberOfCameras,
    followUpNumberOfCameras,
    setNumberOfCameras,
    isDiagnosticRunning,
    setDiagnosticRunning,
    target,
    setTarget
}) => {
    const [isRebootPending, setIsRebootingPending] = useState<boolean | null>(null);

    useEffect(() => {
        setIsRebootingPending(DiagnosticServices.rebootpending().isRebootPending);
    }, [])

    // if (isRebootPending) return <p>We have detected that a reboot is pending for your computer. Please reboot your computer now.</p>

    if (initialNumberOfCameras === 1)
        return <GWTCameraCount1 isRebootPending={isRebootPending} />

    return (
        <GWTCameraCountNone
            followUpNumberOfCameras={followUpNumberOfCameras}
            setNumberOfCameras={setNumberOfCameras}
            isDiagnosticRunning={isDiagnosticRunning}
            setDiagnosticRunning={setDiagnosticRunning}
            target={target}
            setTarget={setTarget}
        />
    );
}

export default GWTCameraDiagnostic;