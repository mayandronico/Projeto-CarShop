import * as sinon from 'sinon';
import { expect } from 'chai';
import { CarMockTest, CarMockTestWhithId, CarMockTestWithIdMany } from '../../mocks/carMock';
import CarModel from '../../../models/CarModel';
import { Model } from 'mongoose';
// import { ErrorTypes } from '../../../errors/catalog';


describe('Camada Model - Car', () => {
    const carModel = new CarModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(CarMockTestWhithId);
    sinon.stub(Model, 'find').resolves(CarMockTestWithIdMany);
    sinon.stub(Model, 'findOne').resolves(CarMockTestWhithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Create', () => {
  it('Quando a criação é realizada com sucesso', async () => {
    const newCar = await carModel.create(CarMockTest);
    expect(newCar).to.be.deep.equal(CarMockTestWhithId)
  });
});

describe('ReadOne', () => {
  it('Quando a busca por id é ralizada com sucesso', async () => {
    const foundCar = await carModel.readOne('4edd40c86762e0fb12000003');
    expect(foundCar).to.be.deep.equal(CarMockTestWhithId);
  });

  it('_id não encontrado', async () => {
    try {
      await carModel.readOne('123ERRADO');
    } catch (error: any) {
      expect(error.message).to.be.equal('InvalidMongoId');
    }
  });
});

describe('Read', () => {
  it('Quando a busca é realizada com sucesso', async () => {
    const foundAllCars = await carModel.read();
    expect(foundAllCars).to.be.deep.equal(CarMockTestWithIdMany);
  });
});
});
