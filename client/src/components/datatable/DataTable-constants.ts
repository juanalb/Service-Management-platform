import {ColDef, ValueGetterParams} from "@material-ui/data-grid";

export const incidentColumns: ColDef[] = [
    { field: "_id", hide: true },
    { field: "subject", headerName: "Subject", width: 500},
    { field: "type", headerName: "Incident Type", width: 130},
    { field: "reportDate", headerName: "Report Date", width: 180},
    { field: "deadline", headerName: "Due Date"},
    { field: "priority", headerName: "Priority"},
    { field: "isResolved", headerName: "Resolved"}
];

export const userColumns: ColDef[] = [
    { field: "_id", hide: true },
    { field: "firstName", hide: true },
    { field: "lastName", hide: true },
    { field: "name", headerName: "Full Name", width: 180, valueGetter: (params: ValueGetterParams) =>
            `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,},
    { field: "building", headerName: "Building", width: 180},
    { field: "email", headerName: "Email", width: 180},
    { field: "phoneNumber", headerName: "Phone Number", width: 180},
    { field: "role", headerName: "Role", width: 250},
];
