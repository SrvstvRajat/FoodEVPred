// src/middleware/validation.ts
import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateNutritionSearch = [
  body('energy').optional().isFloat({ min: 0 }).withMessage('Energy must be a positive number'),
  body('protein').optional().isFloat({ min: 0 }).withMessage('Protein must be a positive number'),
  body('totalFat').optional().isFloat({ min: 0 }).withMessage('Total fat must be a positive number'),
  body('carbohydrates').optional().isFloat({ min: 0 }).withMessage('Carbohydrates must be a positive number'),
  body('fiber').optional().isFloat({ min: 0 }).withMessage('Fiber must be a positive number'),
  body('sugar').optional().isFloat({ min: 0 }).withMessage('Sugar must be a positive number'),
  body('sodium').optional().isFloat({ min: 0 }).withMessage('Sodium must be a positive number'),
  body('calcium').optional().isFloat({ min: 0 }).withMessage('Calcium must be a positive number'),
  body('iron').optional().isFloat({ min: 0 }).withMessage('Iron must be a positive number'),
  body('vitaminC').optional().isFloat({ min: 0 }).withMessage('Vitamin C must be a positive number'),
  body('vitaminA').optional().isFloat({ min: 0 }).withMessage('Vitamin A must be a positive number'),
  
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array(),
      });
      return;
    }
    next();
  },
];