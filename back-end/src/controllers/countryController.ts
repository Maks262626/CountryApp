import { CountryService } from "../services/county.service";
import { BaseController } from "./baseController";
import { Request, Response, NextFunction } from "express";

export class CountryController extends BaseController {
  constructor(private countryService: CountryService) {
    super();
  }
  getCountries = async (req: Request, res: Response, next: NextFunction) => {
    await this.handleRequest(req, res, next, async () => {
      return await this.countryService.getCountries();
    })
  }
  getCountryDerails = async (req: Request, res: Response, next: NextFunction) => {
    await this.handleRequest(req,res,next,async () => {
      return await this.countryService.getCountryDetails(req.params.countryCode);
    })
  }
}