import { Request, Response } from 'express';
import { searchAreas } from '../services/area.service';

export const searchAreasByInput = async (req: Request, res: Response) => {
  try {
    const { input, type = 'single' } = req.query;

    if (!input || typeof input !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Search input is required',
      });
      return;
    }

    const areas = await searchAreas(input, type as string);

    res.status(200).json({
      success: true,
      data: areas,
    });
  } catch (error: any) {
    console.error('Error in searchAreasByInput:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to search areas',
    });
  }
};
