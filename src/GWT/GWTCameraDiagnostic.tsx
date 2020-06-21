import React, { useState, useEffect } from 'react';
import { DiagnosticServices } from './DiagnosticServices';
import GWTCameraCount1 from './GWTCameraCount1';
import GWTCameraCountNone from './GWTCameraCountNone';

interface IGWTCameraDiagnosticProps {
    numberOfCameras: number | null;
}

const GWTCameraDiagnostic: React.FC<IGWTCameraDiagnosticProps> = ({ numberOfCameras }) => {
    const [isRebootPending, setIsRebootingPending] = useState<boolean | null>(null);

    useEffect(() => {
        setIsRebootingPending(DiagnosticServices.rebootpending().isRebootPending);
    }, [])

    if (isRebootPending) return <p>We have detected that a reboot is pending for your computer. Please reboot your computer now.</p>

    if (numberOfCameras === 1)
        return <GWTCameraCount1 isRebootPending={isRebootPending} />

    return (
        <GWTCameraCountNone isRebootPending={isRebootPending} />
    );
}

export default GWTCameraDiagnostic;