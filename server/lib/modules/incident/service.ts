import { IIncident } from "./model";
import incident from "./schema";

export default class IncidentService {
  public createIncident(incident_params: IIncident, callback: any) {
    const _session = new incident(incident_params);
    _session.save(callback);
  }

  public getAllIncidents(query: any, callback: any) {
    incident.find(query, callback).populate('reportedBy');
  }

  public getIncident(query: any, callback: any) {
    incident.findOne(query, callback);
  }

  public updateIncident(incident_params: IIncident, callback: any) {
    const query = { _id: incident_params._id };
    incident.findOneAndUpdate(query, incident_params, callback);
  }

  public deleteIncident(_id: String, callback: any) {
    const query = { _id: _id };
    incident.deleteOne(query, callback);
  }
}
