import {faker} from '@faker-js/faker';
import {IUser} from "../modules/user/model";
import {Building, Role} from "../modules/user/enums";
import UserService from "../modules/user/service";

// Add script to app.ts constructor, running this function standalone with ts-node is too much hassle as it has dependencies
export function addRandomUsersToDatabase(n: number){
    const userService = new UserService();

    for (let i = 0; i < n; i++) {
        const user = createRandomUser();
        userService.createUser(user, (err: any, user: IUser) => {
            console.log('created fake user: ', user)
            console.log('error: ', err)
        });

    }
}

function createRandomUser(): IUser {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    return {
        _id: undefined,
        role: faker.helpers.arrayElement([Role.SERVICE_DESK, Role.REGULAR]),
        firstName: firstName,
        lastName: lastName,
        fullName: firstName + ' ' + lastName,
        phoneNumber: faker.phone.number('06########'),
        email: faker.helpers.unique(faker.internet.email, [
            firstName,
            lastName,
        ]),
        password: faker.internet.password(20),
        building: faker.helpers.arrayElement([Building.KNUPPELDAM, Building.HAARLEM, Building.AMSTERDAM, Building.HQ]),
    };
}

