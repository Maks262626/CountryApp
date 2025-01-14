import { Response } from 'express';

export class ApiResponse {
  static success(res: Response, data: any = null, message: string = 'Success'): void {
    res.status(200).json({
      success: true,
      message,
      data
    })
  }
  static error(res: Response, message: string, statusCode: number = 400, code?: string): void {
    res.status(200).json({
      success: false,
      message,
      statusCode,
      code,
    })
  }
}