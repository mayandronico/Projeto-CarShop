import { Router } from 'express';
import CarController from '../controllers/cars.controller';
import CarModel from '../models/CarModel';
import CarService from '../services/cars.service';

const carsRouter = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

carsRouter.post('/cars', (req, res) => carController.create(req, res));
carsRouter.get('/cars', (req, res) => carController.read(req, res));
carsRouter.get('/cars/:id', (req, res) => carController.readOne(req, res));
carsRouter.put('/cars/:id', (req, res) => carController.update(req, res));
carsRouter.delete('/cars/:id', (req, res) => carController.delete(req, res));

export default carsRouter;