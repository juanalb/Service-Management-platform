export interface IUser {
    _id?: String;
    role: "Service Desk employee" | "Regular employee";
    firstName: String;
    lastName: String;
    phoneNumber: String;
    email: String;
    password: String;
    location: "Amsterdam" | "Haarlem" | "Knuppeldam" | "HQ";
}

