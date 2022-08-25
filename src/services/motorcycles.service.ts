import IService from '../interfaces/IService';
import { IMotorcycle, motoZodSchema } from '../interfaces/IMotorcycle';
import { vehicleZodSchema } from '../interfaces/IVehicle';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class MotorcycleService implements IService<IMotorcycle> {
  private _motorcycle:IModel<IMotorcycle>;
  constructor(model:IModel<IMotorcycle>) {
    this._motorcycle = model;
  }

  public async create(obj:IMotorcycle): Promise<IMotorcycle> {
    const parsed = motoZodSchema.safeParse(obj);
    const parsed2 = vehicleZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    if (!parsed2.success) {
      throw parsed2.error;
    }
    const newMoto = await this._motorcycle.create(obj);
    return newMoto as IMotorcycle;
  }

  public async read(): Promise<IMotorcycle[]> {
    const allMotos = await this._motorcycle.read();
    return allMotos as IMotorcycle[];
  }

  public async readOne(_id:string):Promise<IMotorcycle | null > {
    const moto = await this._motorcycle.readOne(_id);
    if (!moto) throw new Error(ErrorTypes.EntityNotFound);
    return moto;
  }

  public async update(_id:string, obj:IMotorcycle):Promise<IMotorcycle | null> {
    const parsed = motoZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    await this.readOne(_id);
    return this._motorcycle.update(_id, obj);
  }

  public async delete(_id:string):Promise<IMotorcycle> {
    const deleteMoto = await this._motorcycle.delete(_id);
    if (!deleteMoto) throw new Error(ErrorTypes.EntityNotFound);
    return deleteMoto;
  }
}

export default MotorcycleService;