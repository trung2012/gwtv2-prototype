import React from 'react';

interface IGWTCameraCountNoneProps {
    isRebootPending: boolean | null;
}

const GWTCameraCountNone: React.FC<IGWTCameraCountNoneProps> = ({ isRebootPending }) => {
    return (
        <div>
            GWTCameraCountNone
        </div>
    )
}

export default GWTCameraCountNone;