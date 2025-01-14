import { Router } from "express";
import { CountryService } from "../services/county.service";
import { CountryController } from "../controllers/countryController";

const countryRouter = Router();
const countryService = new CountryService();
const countryController = new CountryController(countryService);

countryRouter.get('/',countryController.getCountries);
countryRouter.get('/:countryCode',countryController.getCountryDerails);

export default countryRouter;