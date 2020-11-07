import { Request, Response } from "express";
import {
  insufficientParameters,
  mongoError,
  successResponse,
  failureResponse
} from "../modules/common/service";
import { IIncident } from "../modules/incident/model";
import IncidentService from "../modules/incident/service";

export class IncidentController {
  private incidentService: IncidentService = new IncidentService();

  public create(req: Request, res: Response) {
    if (
      req.body.reportDate &&
      req.body.subject &&
      req.body.type &&
      req.body.reportedBy &&
      req.body.priority &&
      req.body.deadline &&
      req.body.description &&
      req.body.isResolved
    ) {
      const incident_params: IIncident = {
        reportDate: req.body.reportDate,
        subject: req.body.subject,
        type: req.body.type,
        reportedBy: req.body.reportedBy,
        priority: req.body.priority,
        deadline: req.body.deadline,
        description: req.body.description,
        isResolved: req.body.isResolved
      };

      this.incidentService.createIncident(
        incident_params,
        (err: any, incident_data: IIncident) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse("create incident successfull", incident_data, res);
          }
        }
      );
    } else {
      // error response if some fields are missing in request body
      insufficientParameters(res);
    }
  }

  public getAll(req: Request, res: Response) {
    if(req.query.beforeDate){
      req.query.deadline = { $lt: req.query.beforeDate}
      delete req.query.beforeDate
    }
    if (req) {
      this.incidentService.getAllIncidents(
        req.query,
        (err: any, incidents: IIncident[]) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse("get incidents successfull", incidents, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }

  public getById(req: Request, res: Response) {
    if (req.params.id) {
      const incident_filter = { _id: req.params.id };
      this.incidentService.getIncident(
        incident_filter,
        (err: any, incident_data: IIncident) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse("get incident successfull", incident_data, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }

  public update(req: Request, res: Response) {
    if (
      (req.params.id && req.body.reportDate) ||
      req.body.reportDate ||
      req.body.subject ||
      req.body.type ||
      req.body.reportedBy ||
      req.body.priority ||
      req.body.deadline ||
      req.body.description ||
      req.body.isResolved
    ) {
      const incident_filter = { _id: req.params.id };
      this.incidentService.getIncident(
        incident_filter,
        (err: any, incident_data: IIncident) => {
          if (err) {
            mongoError(err, res);
          } else if (incident_data) {
            const incident_params: IIncident = {
              _id: incident_filter._id,
              deadline: req.body.deadline
                ? req.body.deadline
                : incident_data.deadline,
              description: req.body.description
                ? req.body.description
                : incident_data.description,
              isResolved: req.body.isResolved
                ? req.body.isResolved
                : incident_data.isResolved,
              priority: req.body.priority
                ? req.body.priority
                : incident_data.priority,
              reportDate: req.body.reportDate
                ? req.body.reportDate
                : incident_data.reportDate,
              reportedBy: req.body.reportedBy
                ? req.body.reportedBy
                : incident_data.reportedBy,
              subject: req.body.subject
                ? req.body.subject
                : incident_data.subject,
              type: req.body.type ? req.body.type : incident_data.type
            };

            this.incidentService.updateIncident(incident_params, (err: any) => {
              if (err) {
                mongoError(err, res);
              } else {
                successResponse(
                  "update incident successfull",
                  incident_params,
                  res
                );
              }
            });
          } else {
            failureResponse("invalid incident", null, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }

  public delete(req: Request, res: Response) {
    if (req.params.id) {
      this.incidentService.deleteIncident(
        req.params.id,
        (err: any, delete_details) => {
          if (err) {
            mongoError(err, res);
          } else if (delete_details.deletedCount !== 0) {
            successResponse("delete incident successful", null, res);
          } else {
            failureResponse("invalid incident", null, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }
}
