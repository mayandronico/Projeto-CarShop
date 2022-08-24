// template para criação dos testes de cobertura da camada de controller
import * as sinon from 'sinon';
import { expect } from 'chai';
import { CarMockTest, CarMockTestWhithId, CarMockTestWithIdMany } from '../../mocks/carMock';
import { NextFunction, Request, Response } from 'express';
import CarController from '../../../controllers/cars.controller';
import CarService from '../../../services/cars.service';
import CarModel from '../../../models/CarModel';
// import { ErrorTypes } from '../../../errors/catalog';


describe('Camada Controller - Car', () => {
    const carModel = new CarModel();
    const carService = new CarService(carModel);
    const carController = new CarController(carService);

    const req = {} as Request;
    const res = {} as Response;
    const next = {} as NextFunction;

  before(() => {
    sinon.stub(carService, 'create').resolves(CarMockTest);
    sinon.stub(carService, 'read').onCall(0).resolves(CarMockTestWithIdMany);
    sinon.stub(carService, 'readOne').resolves(CarMockTestWhithId);
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Create', () => {
  it('Success', async () => {
    req.body = CarMockTest;
    await carController.create(req, res);

    expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith(CarMockTest)).to.be.true;
  });
});

describe('ReadOne', () => {
  it('Success', async () => {
    req.params = { id: CarMockTestWhithId._id };
    await carController.readOne(req, res);

    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith(CarMockTestWhithId)).to.be.true;
  });
});

describe('Read', () => {
  it('Success', async () => {
    req.params = { id: CarMockTestWhithId._id };
    await carController.read(req, res);

    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith(CarMockTestWithIdMany)).to.be.true;
  });
});
});
