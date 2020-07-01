import React, { useState, useEffect } from 'react';
import { Stack, PrimaryButton, DefaultButton, IStackTokens, Spinner, SpinnerSize } from '@fluentui/react';
// import { DiagnosticServices } from '../GWT/DiagnosticServices';
import RealSenseNotDetected from './RealSenseNotDetected';
import ProgressIndicatorComponent from '../components/ProgressIndicator';

const numericalSpacingStackTokens: IStackTokens = {
    childrenGap: 10,
    padding: 10,
};

const USBCameraNotDetected = () => {
    const [isRealSenseResetting, setisrealsenseResetting] = useState(false);
    const [isRealSenseDetected, setisrealsenseDetected] = useState(false);
    const [detectingRealSense, setDetectingRealSense] = useState(true);
    const [allowRealSenseReset, setAllowRealSenseReset] = useState<boolean | null>(null);
    const [buttonsVisible, setButtonsVisible] = useState(true);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setisrealsenseDetected(DiagnosticServices.isRealSense().isRealSenseDetected);
    //         setDetectingRealSense(false);
    //     }, 1500);
    // }, [])

    if (detectingRealSense) return <Spinner label='Checking Real Sense Services' size={SpinnerSize.large} style={{ display: 'inline-flex' }} />

    if (isRealSenseDetected) {
        return (
            <>
                {
                    isRealSenseResetting &&
                    <ProgressIndicatorComponent
                        label='Resetting Real Sense Service'
                        description='Please wait...'
                    />
                }
                {
                    buttonsVisible &&
                    <>
                        <p>Real Sense Services detected. Would you like to reset Real Sense Services?</p>
                        <Stack horizontal tokens={numericalSpacingStackTokens}>
                            <PrimaryButton
                                text='Yes'
                                onClick={() => {
                                    setisrealsenseResetting(true);
                                    setButtonsVisible(false);
                                    setTimeout(() => {
                                        setAllowRealSenseReset(true);
                                        setisrealsenseResetting(false);
                                    }, 2000);
                                    // DiagnosticServices.resetrealsenseservices();
                                }}
                            />
                            <DefaultButton
                                text='No'
                                onClick={() => {
                                    setButtonsVisible(false);
                                    setisrealsenseResetting(false);
                                    setAllowRealSenseReset(false);
                                }}
                            />
                        </Stack>
                    </>
                }
                {
                    allowRealSenseReset &&
                    <p>Real Sense Service has been reset. Please try using the camera app again.</p>
                }
                {
                    allowRealSenseReset === false &&
                    <h4>No permission from user</h4>
                }
            </>
        )
    }

    return <RealSenseNotDetected />
}

export default USBCameraNotDetected;