import user from "../modules/user/schema";
import { response_status_codes } from "../modules/common/model";

export const auth = (req, res, next) => {
  const token = req.cookies.token;
  //@ts-ignore
  user.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        error: err,
        data: user,
        message: "unauthorized",
        status: response_status_codes.unauthorized
      });
    }
    req.token = token;
    req.user = user;
    next();
  });
};