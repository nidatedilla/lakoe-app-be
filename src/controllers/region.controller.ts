import axios from 'axios';
import { Request, Response } from 'express';

export const getProvinces = ( async (req: Request, res: Response) => {
    try {
      const response = await axios.get(`
  https://wilayah.id/api/provinces.json`);
      res.json(response.data);
    } catch (error) {
      console.error(`Error fetching regencies for province `, error);
      res.status(500).json({ error: 'Failed to fetch regencies' });
    }
  });
  
  export const getRegencies = async (req: Request, res: Response) => {
    const provinceCode = req.params.provinceCode
    try {
      const response = await axios.get(`
  https://wilayah.id/api/regencies/${provinceCode}.json`);
      res.json(response.data);
    } catch (error: any) {
      console.error('Error fetching Regencies:', error);
      res.status(500).json({
        error: 'Failed to fetch Regencies',
        message: error.message || 'Internal server error',
      });
    }
  };
  export const getDistricts = async (req: Request, res: Response) => {
    const regencieCode = req.params.regencieCode;
  
    try {
      const response = await axios.get(`
  https://wilayah.id/api/districts/${regencieCode}.json`);
      res.json(response.data);
    } catch (error: any) {
      console.error('Error fetching provinces:', error);
      res.status(500).json({
        error: 'Failed to fetch provinces',
        message: error.message || 'Internal server error',
      });
    }
  };
  export const getVillages = async (req: Request, res: Response) => {
    const districtsCode = req.params.districtsCode;
    try {
      const response = await axios.get(`
  https://wilayah.id/api/villages/${districtsCode}.json`);
      res.json(response.data);
    } catch (error: any) {
      console.error('Error fetching provinces:', error);
      res.status(500).json({
        error: 'Failed to fetch provinces',
        message: error.message || 'Internal server error',
      });
    }
  };
  