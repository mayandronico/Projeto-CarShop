import { Router } from 'express';
import MotorController from '../controllers/motorcycles.controller';
import MotorcycleModel from '../models/Motorcycle.model';
import MotorcycleService from '../services/motorcycles.service';

const motosRouter = Router();

const motorcycle = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycle);
const motorController = new MotorController(motorcycleService);
const motoIdRoute = '/motorcycles/:id';

motosRouter
  .post('/motorcycles', (req, res) => motorController.create(req, res));
motosRouter.get('/motorcycles', (req, res) => motorController.read(req, res));
motosRouter.get(motoIdRoute, (req, res) => motorController.readOne(req, res));
motosRouter.put(motoIdRoute, (req, res) => motorController.update(req, res));
motosRouter.delete(motoIdRoute, (req, res) => motorController.delete(req, res));

export default motosRouter;