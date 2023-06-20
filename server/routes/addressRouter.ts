import { Request, Response, Router } from "express";
import * as addressController from "../controllers/addressController";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { body } from "express-validator";
import { authMiddleware } from "../middlewares/authMiddleware";

const addressRouter: Router = Router();

/**
 * @usage : Create New Address
 * @url : http://localhost:9000/api/addresses/new
 * @body : mobile,address,landmark,street,city,state,country,pinCode
 * @method : POST
 * @access : PRIVATE
 */
addressRouter.post(
  "/new",
  [body("mobile").not().isEmpty().withMessage("Mobile No. is Required!")],
  [body("flat").not().isEmpty().withMessage("flat is Required!")],
  [body("landmark").not().isEmpty().withMessage("landmark is Required!")],
  [body("street").not().isEmpty().withMessage("street is Required!")],
  [body("city").not().isEmpty().withMessage("city is Required!")],
  [body("state").not().isEmpty().withMessage("state is Required!")],
  [body("country").not().isEmpty().withMessage("country is Required!")],
  [body("pinCode").not().isEmpty().withMessage("pinCode is Required!")],
  validationMiddleware,
  authMiddleware,
  async (request: Request, response: Response) => {
    await addressController.createNewAddress(request, response);
  }
);

/**
 * @usage : Update Address
 * @url : http://localhost:9000/api/addresses/:addressId
 * @body : mobile,address,landmark,street,city,state,country,pinCode
 * @method : PUT
 * @access : PRIVATE
 */
addressRouter.put(
  "/:addressId",
  [body("mobile").not().isEmpty().withMessage("Mobile No. is Required!")],
  [body("flat").not().isEmpty().withMessage("flat is Required!")],
  [body("landmark").not().isEmpty().withMessage("landmark is Required!")],
  [body("street").not().isEmpty().withMessage("street is Required!")],
  [body("city").not().isEmpty().withMessage("city is Required!")],
  [body("state").not().isEmpty().withMessage("state is Required!")],
  [body("country").not().isEmpty().withMessage("country is Required!")],
  [body("pinCode").not().isEmpty().withMessage("pinCode is Required!")],
  validationMiddleware,
  authMiddleware,
  async (request: Request, response: Response) => {
    await addressController.updateAddress(request, response);
  }
);

/**
 * @usage : Get Address
 * @url : http://localhost:9000/api/addresses/me
 * @body : no-params
 * @method : GET
 * @access : PRIVATE
 */
addressRouter.get(
  "/me",
  authMiddleware,
  async (request: Request, response: Response) => {
    await addressController.getAddress(request, response);
  }
);

/**
 * @usage : Delete Address
 * @url : http://localhost:9000/api/addresses/:addressId
 * @body : no-params
 * @method : DELETE
 * @access : PRIVATE
 */
addressRouter.delete(
  "/:addressId",
  authMiddleware,
  async (request: Request, response: Response) => {
    await addressController.deleteAddress(request, response);
  }
);

export default addressRouter;
