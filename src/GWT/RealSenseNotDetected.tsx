import React, { useState, useEffect } from 'react';
import { DiagnosticServices } from './DiagnosticServices';
import { Spinner, SpinnerSize, PrimaryButton } from '@fluentui/react';

const RealSenseNotDetected = () => {
    const [isKinectSensorDetected, setIsKinectSensorDetected] = useState(false);
    const [detectingKinectSensor, setDetectingKinectSensor] = useState(true);
    const [isKinectServiceStopping, setIsKinectServiceStopping] = useState(false);
    const [wasKinectServicesStopped, setWasKinectServicesStopped] = useState(false);
    const [buttonsVisible, setButtonsVisible] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsKinectSensorDetected(DiagnosticServices.isRealSense().isRealSenseDetected);
            setDetectingKinectSensor(false);
        }, 1500);
    }, [])

    if (detectingKinectSensor) return <Spinner label='Looking for Kinect Sensor' size={SpinnerSize.large} style={{ display: 'inline-flex' }} />

    if (isKinectSensorDetected) {
        return (
            <>
                {

                    buttonsVisible &&
                    <>
                        <p>Please disconnect your Kinect and click the button below</p>
                        <PrimaryButton
                            text='Stop Kinect Services'
                            onClick={() => {
                                setButtonsVisible(false);
                                setIsKinectServiceStopping(true);
                                setTimeout(() => {
                                    setIsKinectServiceStopping(false);
                                    setWasKinectServicesStopped(true);
                                }, 1500);
                                DiagnosticServices.stopkinectservices();
                            }}
                        />
                    </>
                }
                {
                    isKinectServiceStopping &&
                    <Spinner size={SpinnerSize.large} style={{ display: 'inline-flex' }} />
                }
                {
                    wasKinectServicesStopped &&
                    <p>Please reconnect your Kinect and try again.</p>
                }
            </>
        )
    }

    return <h3>We could not troubleshoot the issue</h3>;
}

export default RealSenseNotDetected;