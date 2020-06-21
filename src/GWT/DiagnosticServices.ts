export const getNumberOfCameras = () => {
    // Return the number of cameras
    // return Math.floor(Math.random() * 3) - 1;
    return 1;
}

export const returnBoolean = () => {
    return Math.random() < 0.5;
}

export const DiagnosticServices = {
    numberofcameras: () => getNumberOfCameras(),
    rebootpending: () => ({
        isRebootPending: false
    }),
    legacycamera: () => ({
        isStreamSysDetected: false
    }),
    isUsbcamera: () => ({
        isUsbCameraDetected: returnBoolean()
    }),
    isRealSense: () => ({
        isRealSenseDetected: returnBoolean()
    }),
    kinectsensorpresence: () => returnBoolean(),
    resetrealsenseservices: () => console.log('Reset real sense services'),
    stopkinectservices: () => console.log('Stop Kinect services'),
    rollbacktousb: () => ({
        detected: returnBoolean()
    })
}

export const RunDiagnosticFor1Camera = () => {
    const legacyCameraResults = DiagnosticServices.legacycamera();
    const usbCameraResults = DiagnosticServices.isUsbcamera();

    return {
        ...legacyCameraResults,
        ...usbCameraResults
    }
}