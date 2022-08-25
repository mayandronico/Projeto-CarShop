import * as sinon from 'sinon';
import { expect } from 'chai';
import { CarMockTest, CarMockTestWhithId, CarMockTestWithIdMany } from '../../mocks/carMock';
import CarService from '../../../services/cars.service';
import CarModel from '../../../models/CarModel';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';

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
		it('Quando a criação é realizada com sucesso', async () => {
			const carCreated = await carService.create(CarMockTest);

			expect(carCreated).to.be.deep.equal(CarMockTest);
		});

		it('Quando a criação falha', async () => {
			try {
				await carService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf( ZodError );
			}
		});
	});

	describe('Read', () => {
		it('Quando a busca é realizada com sucesso', async () => {
			const cars = await carService.read();

			expect(cars).to.be.deep.equal(CarMockTestWithIdMany);
		});

		it('Quando a busca por id falha', async () => {
			try {
				await carService.read();
			} catch (error:any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

	describe('ReadOne', () => {
		it('Quando a busca por id é realizada com sucesso', async () => {
			const carById = await carService.readOne(CarMockTestWhithId._id);

			expect(carById).to.be.deep.equal(CarMockTest);
		});

		it('Quando a busca por id falha', async () => {
			try {
				await carService.readOne(CarMockTestWhithId._id);
			} catch (error:any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});
});