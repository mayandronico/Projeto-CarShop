import IService from '../interfaces/IService';
import { ICar, carZodSchema } from '../interfaces/ICar';
import { vehicleZodSchema } from '../interfaces/IVehicle';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class CarService implements IService<ICar> {
  private _car:IModel<ICar>;
  constructor(model:IModel<ICar>) {
    this._car = model;
  }

  public async create(obj:ICar): Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);
    const parsed2 = vehicleZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    if (!parsed2.success) {
      throw parsed2.error;
    }
    const newCar = await this._car.create(obj);
    return newCar as ICar;
  }

  public async read(): Promise<ICar[]> {
    const allCars = await this._car.read();
    return allCars as ICar[];
  }

  public async readOne(_id:string):Promise<ICar> {
    const car = await this._car.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }
}

export default CarService;