import { Application, Request, Response } from 'express';
import { IncidentController } from '../controllers/incidentController';

export class IncidentRoutes {

    private incidentController: IncidentController = new IncidentController();

    public route(app: Application) {

        app.post('/api/incident', (req: Request, res: Response) => {
            this.incidentController.create(req, res);
        });

        app.get('/api/incident/all', (req: Request, res: Response) => {
            this.incidentController.getAll(req, res);
        });

        app.get('/api/incident/:id', (req: Request, res: Response) => {
            this.incidentController.getById(req, res);
        });

        app.put('/api/incident/:id', (req: Request, res: Response) => {
            this.incidentController.update(req, res);
        });

        app.delete('/api/incident/:id', (req: Request, res: Response) => {
            this.incidentController.delete(req, res);
        });

    }
}