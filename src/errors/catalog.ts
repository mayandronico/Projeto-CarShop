export enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
}
    
    type ErrorResponseObject = { 
      error: string;
      httpStatus: number
    };
    
export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
    
};
    
export const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    error: 'Entity not found',
    httpStatus: 400,
  },
  InvalidMongoId: {
    error: 'Id must be a 24 characters hexadecimal',
    httpStatus: 400,
  },
};