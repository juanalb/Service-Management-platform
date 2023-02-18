import {faker} from '@faker-js/faker';
import {IIncident} from "../modules/incident/model";
import IncidentService from "../modules/incident/service";
import {Schema} from "mongoose";

// Add script to app.ts constructor, running this function standalone with ts-node is too much hassle as it has dependencies
export function addRandomIncidentToDatabase(n: number){
    const incidentService = new IncidentService();

    for (let i = 0; i < n; i++) {
        const incident = createRandomIncident();
        incidentService.createIncident(incident, (err: any, incident: IIncident) => {
            console.log('created fake incident: ', incident)
            console.log('error: ', err)
        });

    }
}

function createRandomIncident(): IIncident {
    const existingUserIds = []; // add user ids that exist in db

    return {
        _id: undefined,
        reportDate: faker.date.past(),
        subject: faker.hacker.ingverb(),
        type: faker.helpers.arrayElement(["Software", "Hardware", "Service"]),
        reportedBy: faker.helpers.arrayElement(existingUserIds) as unknown as Schema.Types.ObjectId,
        priority: faker.helpers.arrayElement(["Low", "Normal", "High"]),
        deadline: faker.date.between('2022-08-01T00:00:00.000Z', '2023-08-16T00:00:00.000Z'),
        description: faker.hacker.phrase(),
        isResolved: faker.datatype.boolean(),
    };
}

