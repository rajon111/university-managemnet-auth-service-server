import httpStatus from 'http-status';

import { AcademicSemisterService } from './academicSemister.service';
import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicSemister } from './academicSemister.interface';
import pick from '../../../shared/pick';
import { pagenationFields } from '../../../constants/pagenation';
import { academicSemisterFilterableFields } from './academicSemister.constant';

const createSemister = catchAsync(
  async (
    req: Request,
    res: Response
    // next: NextFunction
  ) => {
    const { ...AcademicSemisterData } = req.body;

    const result = await AcademicSemisterService.createSemister(
      AcademicSemisterData
    );

    sendResponse<IAcademicSemister>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' Academic semister Create Successfully',
      data: result,
    });
    // next();
  }
);

const getAllSemisters = catchAsync(
  async (
    req: Request,
    res: Response
    // next: NextFunction
  ) => {
    // const pagenationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy,
    //   sortOrder: req.query.sortOrder,
    // };
    const filters = pick(req.query, academicSemisterFilterableFields);
    const pagenationOptions = pick(req.query, pagenationFields);

    const result = await AcademicSemisterService.getAllSemisters(
      filters,
      pagenationOptions
    );

    sendResponse<IAcademicSemister[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semister Retrived Successfully',
      meta: result.meta,
      data: result.data,
    });
    // next();
  }
);

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicSemisterService.getSingleSemester(id);

  sendResponse<IAcademicSemister>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semister Retrived Successfully',
    data: result,
  });
  // next();
});

export const AcademicSemisterController = {
  createSemister,
  getAllSemisters,
  getSingleSemester,
};
