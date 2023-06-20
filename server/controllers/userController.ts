import { Request, Response } from "express";
import { ResponseHandler } from "../util/ResponseHandler";
import { IUser } from "../database/models/IUser";
import UserTable from "../database/schemas/userSchema";
import bcryptjs from "bcryptjs";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import { TokenHandler } from "../util/TokenHandler";

/**
 * @usage : Register a User
 * @url : http://localhost:9000/api/users/register
 * @body : username , email , password
 * @method : POST
 * @access : PUBLIC
 */

export const registerUser = async (request: Request, response: Response) => {
  try {
    const { username, email, password } = request.body;

    //check for existing user in db
    const user: IUser | undefined | null = await UserTable.findOne({
      email: email,
    });
    if (user) {
      return ResponseHandler.sendErrors(
        response,
        401,
        null,
        "User is Already Exist"
      );
    }

    //hashed Password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //Gravatar
    const imageUrl = gravatar.url(email, {
      size: "200",
      rating: "pg",
      default: "mm",
    });

    const theUser: IUser = {
      username: username,
      email: email,
      password: hashedPassword,
      imageUrl: imageUrl,
    };

    const createdUser: IUser | undefined | null = await new UserTable(
      theUser
    ).save();
    if (createdUser) {
      return ResponseHandler.sendData(
        response,
        200,
        createdUser,
        "Registeration is Success"
      );
    }
  } catch (error) {
    ResponseHandler.sendErrors(response, 500, error);
  }
};

/**
 * @usage : Login a User
 * @url : http://localhost:9000/api/users/login
 * @body : email , password
 * @method : POST
 * @access : PUBLIC
 */
export const loginUser = async (request: Request, response: Response) => {
  try {
    const { password, email } = request.body;

    //check if existing email
    const user: IUser | undefined | null = await UserTable.findOne({
      email: email,
    });
    if (!user) {
      return ResponseHandler.sendErrors(
        response,
        401,
        null,
        "Invalid Credentials"
      );
    }

    //check Password
    const isMatch: boolean = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return ResponseHandler.sendErrors(
        response,
        401,
        null,
        "Invalid Credentials"
      );
    }

    // create a token
    const jwtSecretKey: string | undefined = process.env.EXPRESS_JWT_SECRET_KEY;
    const payload = {
      user: {
        id: user._id,
        email: user.email,
      },
    };

    if (jwtSecretKey) {
      jwt.sign(
        payload,
        jwtSecretKey,
        { expiresIn: "1d", algorithm: "HS256" },
        (error, encoded) => {
          if (error) {
            return ResponseHandler.sendErrors(
              response,
              400,
              null,
              "Token creation failed"
            );
          } else {
            return ResponseHandler.sendData(
              response,
              200,
              {
                user: user,
                token: encoded,
              },
              "Login is Success"
            );
          }
        }
      );
    }
  } catch (error) {
    ResponseHandler.sendErrors(response, 500, error);
  }
};

/**
 *  @usage : get users Info
 *  @url : http://localhost:9000/api/users/me
 *  @method : GET
 *  @body : no-params
 *  @access : PRIVATE
 */
export const getUserInfo = async (request: Request, response: Response) => {
  try {
    const user: IUser | undefined | null = await TokenHandler.getUserData(
      request
    );
    if (!user) {
      return ResponseHandler.sendErrors(
        response,
        401,
        null,
        "User is not found"
      );
    }
    return ResponseHandler.sendData(response, 200, user, "");
  } catch (error) {
    ResponseHandler.sendErrors(response, 500, error);
  }
};

/**
 * @usage : update profile Picture
 * @url : http://localhost:9000/api/users/profile
 * @body : imageUrl
 * @method : POST
 * @access : PRIVATE
 */
export const updateProfilePicture = async (
  request: Request,
  response: Response
) => {
  try {
    const { imageUrl } = request.body;
    const user: IUser | any = await TokenHandler.getUserData(request);
    if (user) {
      user.imageUrl = imageUrl;
      const updatedUser = await user.save(); //save to DB
      if (updatedUser) {
        return ResponseHandler.sendData(
          response,
          200,
          updatedUser,
          "Profile Picture Updated"
        );
      }
    }
    return response.status(201).json({
      msg: "update profile Picture",
      data: request.body,
    });
  } catch (error) {
    ResponseHandler.sendErrors(response, 500, error);
  }
};

/**
 * @usage : change the password
 * @url : http://localhost:9000/api/users/change-password
 * @body : password
 * @method : POST
 * @access : PRIVATE
 */
export const changePassword = async (request: Request, response: Response) => {
  try {
    const { password } = request.body;

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user: IUser | any = await TokenHandler.getUserData(request);
    if (user) {
      user.password = hashedPassword;
      const updatedUser = await user.save(); //save to DB
      if (updatedUser) {
        return ResponseHandler.sendData(
          response,
          200,
          updatedUser,
          "Password Updated"
        );
      }
    }
  } catch (error) {
    ResponseHandler.sendErrors(response, 500, error);
  }
};
