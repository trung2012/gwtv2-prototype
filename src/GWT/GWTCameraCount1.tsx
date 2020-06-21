import React, { useState, useEffect } from 'react';
import { RunDiagnosticFor1Camera, DiagnosticServices } from './DiagnosticServices';
import USBCameraNotDetected from './USBCameraNotDetected';
import { Stack, PrimaryButton, DefaultButton, IStackTokens } from '@fluentui/react';
import ProgressIndicatorComponent from './ProgressIndicator';

interface IGWTCameraCount1Props {
    isRebootPending: boolean | null;
}

const numericalSpacingStackTokens: IStackTokens = {
    childrenGap: 10,
    padding: 10,
};

const GWTCameraCount1: React.FC<IGWTCameraCount1Props> = ({ isRebootPending }) => {
    const [isStreamSysDetected, setIsStreamSysDetected] = useState<boolean | null>(null);
    const [isUsbCameraDetected, setIsUsbCameraDetected] = useState<boolean | null>(null);
    const [allowUsbRollback, setAllowUsbRollback] = useState<boolean | null>(null);
    const [isUsbRollingBack, setIsUsbRollingBack] = useState(false);
    const [isCameraDetectedAfterRollback, setIsCameraDetectedAfterRollback] = useState<{} | null>(null);
    const [buttonsVisible, setButtonsVisible] = useState(true);

    useEffect(() => {
        const diagnosticResults = RunDiagnosticFor1Camera();
        setIsStreamSysDetected(diagnosticResults.isStreamSysDetected);
        setIsUsbCameraDetected(diagnosticResults.isStreamSysDetected);
    }, [])

    const rollbackUsbCamera = () => {
        setIsUsbRollingBack(true);
        setAllowUsbRollback(true);
        setButtonsVisible(false);
        setTimeout(() => {
            setIsUsbRollingBack(false);
            setIsCameraDetectedAfterRollback(DiagnosticServices.rollbacktousb());
        }, 2500);
    }

    if (isStreamSysDetected) return <p>Your camera is not compatible with Windows 10. Please buy another one.</p>

    if (!isRebootPending && !isStreamSysDetected) return <p>Your camera driver is out of date. Please update it.</p>

    if (isUsbCameraDetected) {
        return (
            <Stack>
                {
                    buttonsVisible &&
                    <>
                        <p>USB Camera detected. Would you like us to roll back to the default USB driver?</p>
                        <Stack horizontal tokens={numericalSpacingStackTokens} style={{ marginBottom: 20 }}>
                            <PrimaryButton
                                text='Yes'
                                onClick={rollbackUsbCamera}
                            />
                            <DefaultButton
                                text='No'
                                onClick={() => {
                                    setAllowUsbRollback(false);
                                    setIsCameraDetectedAfterRollback(false);
                                    setButtonsVisible(false);
                                }}
                            />
                        </Stack>
                    </>
                }
                {
                    isUsbRollingBack &&
                    <ProgressIndicatorComponent
                        label='Rolling back USB driver'
                        description='Please wait...'
                    />
                }
                {
                    allowUsbRollback && !isUsbRollingBack
                        ? isCameraDetectedAfterRollback
                            ? <p>Driver rollback complete. Please restart your PC</p>
                            : <p>Driver rollback complete. Please try the camera app again</p>
                        : null
                }
                {
                    allowUsbRollback === false &&
                    <h3>No permission from user</h3>
                }
            </Stack>
        );
    }

    return (
        <USBCameraNotDetected />
    )
}

export default GWTCameraCount1;