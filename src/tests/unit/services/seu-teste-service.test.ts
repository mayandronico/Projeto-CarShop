// template para criação dos testes de cobertura da camada de service
import * as sinon from 'sinon';
import { expect } from 'chai';
import { CarMockTest, CarMockTestWhithId, CarMockTestWithIdMany } from '../../mocks/carMock';
import CarService from '../../../services/cars.service';
import CarModel from '../../../models/CarModel';
import { ZodError } from 'zod';

describe('Camada Service - Car', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);
 
	before(() => {
		sinon.stub(carModel, 'create').resolves(CarMockTest);
		sinon.stub(carModel, 'read').resolves(CarMockTestWithIdMany);
		sinon.stub(carModel, 'readOne').resolves(CarMockTestWhithId)
			.onCall(0).resolves(CarMockTest) 
			.onCall(1).resolves(null)
			.onCall(2).resolves(CarMockTestWhithId); 
	})
	after(() => {
		sinon.restore()
	})
	describe('Create', () => {
		it('Success', async () => {
			const frameCreated = await carService.create(CarMockTest);

			expect(frameCreated).to.be.deep.equal(CarMockTest);
		});

		it('Failure', async () => {
			try {
				await carService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf( ZodError );
			}
		});
	});

});