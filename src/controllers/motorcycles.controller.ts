// import { Request, Response } from 'express';
// import IService from '../interfaces/IService';
// import { IMotorcycle } from '../interfaces/IMotorcycle';

// export default class CarController {
//   constructor(private _service: IService<IMotorcycle>) { }

//   public async create(req: Request & 
//   { body:IMotorcycle }, res: Response<IMotorcycle>) {
//     const car = await this._service.create(req.body);
//     return res.status(201).json(car);
//   }

//   public async read(req: Request &
//   { body:IMotorcycle }, res: Response<IMotorcycle[]>) {
//     const result = await this._service.read();
//     return res.status(200).json(result);
//   }

//   public async readOne(req: Request, res: Response<IMotorcycle>) {
//     const result = await this._service.readOne(req.params.id);
//     return res.status(200).json(result);
//   }
// }