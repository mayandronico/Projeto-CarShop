import { Router } from 'express';
import CarController from '../controllers/cars.controller';
import CarModel from '../models/CarModel';
import CarService from '../services/cars.service';

const carsRouter = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

carsRouter.post('/cars', (req, res) => carController.create(req, res));

export default carsRouter;