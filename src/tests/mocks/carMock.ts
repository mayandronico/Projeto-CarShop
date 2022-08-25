import { ICar } from '../../interfaces/ICar';

const CarMockTest: ICar = {
  model: 'Ferrari Maranello 1000',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2,
}

const CarMockTestWhithId: ICar & {_id: string} = {
  _id: '4edd40c86762e0fb12000003',
  model: 'Ferrari Maranello 1000',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2,
}

const CarMockTestWithIdMany: ICar[] = [
  CarMockTestWhithId,
  CarMockTestWhithId,
  CarMockTestWhithId
]

export { CarMockTest, CarMockTestWhithId, CarMockTestWithIdMany };
