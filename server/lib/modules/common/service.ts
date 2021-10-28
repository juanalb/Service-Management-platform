import {Response} from 'express';
import {response_status_codes} from "./model";

//TODO: review function parameters

//TODO: refactor, cause client now needs to retrieve trough data.data.foo
export function successResponse(message: string, data: any, res: Response) {
    console.log(`Succes response hit :) - message: ${message}`);
    res.status(response_status_codes.success).json({
        STATUS: "SUCCESS",
        MESSAGE: message,
        data
    });
}

export function failureResponse(message: string, data: any, res: Response) {
    console.log(res);
    res.status(response_status_codes.success).json({
        STATUS: "FAILURE",
        MESSAGE: message,
        data
    });
}

export function insufficientParameters(res: Response, message: string = "Insufficient parameters") {
    console.log(res);
    res.status(response_status_codes.bad_request).json({
        STATUS: "FAILURE",
        MESSAGE: message,
        data: {}
    });
}

export function resourceNotFound(res: Response, message: string = "Resource not found") {
    console.log(res);
    res.status(response_status_codes.not_found).json({
        STATUS: "FAILURE",
        MESSAGE: message,
        data: {}
    });
}


export function mongoError(err: any, res: Response, message: string = "Internal server error") {
    console.log(res);
    res.status(response_status_codes.internal_server_error).json({
        STATUS: "FAILURE",
        MESSAGE: "MongoDB error",
        data: err
    });
}
