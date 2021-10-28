import { IUser } from './model';
import users from './schema';

export default class UserService {

    public createUser(user_params: IUser, callback: any) {
        const _session = new users(user_params);
        _session.save(callback);
    }

    public getAllUsers(query: any, callback: any){
        users.find({}, callback);
    }

    public getUser(query: any, callback: any) {
        users.findOne(query, callback);
    }

    public findByToken(token: string, callback: any){
        //TODO: add to interface
        //@ts-ignore
        users.findByToken(token, callback)
    }

    public findByEmail(email: string, callback: any){
        const query = { email };
        users.findOne(query, callback)
    }

    public updateUser(user_params: IUser, callback: any) {
        const query = { _id: user_params._id };
        users.findOneAndUpdate(query, user_params, {}, callback);
    }

    // According to documentation, update(), findOneAndUpdate() etc. do not call save(),
    // therefore or pre() function is not called
    public updateUserWithPreSave(user_params: IUser, callback: any) {
        const _session = new users(user_params);
        _session.save(callback);
    }

    public findByIdAndUpdate(user_params: IUser, callback: any) {
        const query = { _id: user_params._id };
        users.findByIdAndUpdate(query, user_params, {}, callback)
    }

    public deleteUser(_id: String, callback: any) {
        const query = { _id: _id };
        users.deleteOne(query, callback);
    }

}