import { computerInfo } from "./computerInfo";

const sleep = (response: any) => {
    return new Promise<any>(resolve => {
        setTimeout(() => {
            resolve(response);
        }, 2000);
    });
}

interface IDiagnosticServices {
    [key: string]: () => ({
        [key: string]: any;
    });
}

export const DiagnosticServices: IDiagnosticServices = {
    "sigma.scon.diagaction.camera.resetcameraservices": () => ({
        "isCameraReset": true
    }),
    "css.dcs.diagaction.camera.numberofcameras": () => ({
        "numberofcameras": computerInfo.numberOfCameras
    }),
    "sigma.scon.diagaction.camera.numberofcameras": () => ({
        "numberofcameras": 1
    }),
    "sigma.scon.diagaction.camera.rebootpending": () => ({
        "isRebootPending": computerInfo.isRebootPending
    }),
    "sigma.scon.diagaction.camera.legacycamera": () => ({
        "isStreamSysDetected": computerInfo.isStreamSysDetected
    }),
    "sigma.scon.diagaction.camera.isusbcamera": () => ({
        "isUsbCameraDetected": computerInfo.isUsbCameraDetected
    }),
    "sigma.scon.diagaction.camera.isrealsense": () => ({
        "isRealSenseDetected": computerInfo.isRealSenseDetected
    }),
    "sigma.scon.diagaction.camera.kinectsensorpresence": () => ({
        "isKinectSensorPresent": computerInfo.isKinectSensorPresent
    }),
    "sigma.scon.diagaction.camera.resetrealsenseservices": () => ({
        "detected": true
    }),
    "sigma.scon.diagaction.camera.stopkinectservices": () => ({
        "detected": true
    }),
    "sigma.scon.diagaction.camera.rollbacktousb": () => ({
        "detected": true
    })
}

export const getHelpService = {
    getDiagnosticSessionAsync: (problemKey: string = 'IssueType', problemValue: string) => {
        return sleep(DiagnosticServices[problemValue]());
    }
}