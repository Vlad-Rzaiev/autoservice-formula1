import type { CarDto } from '@autoservice/contracts';
import type { CarLeanDocument } from './car.model.js';

export function toCarDto(carLeanDocument: CarLeanDocument): CarDto {
  return {
    _id: carLeanDocument._id.toString(),
    ownerId: carLeanDocument.ownerId.toString(),

    brand: carLeanDocument.brand,
    model: carLeanDocument.model,
    year: carLeanDocument.year,

    licensePlate: carLeanDocument.licensePlate,
    vin: carLeanDocument.vin,

    mileage: carLeanDocument.mileage,
    photos: carLeanDocument.photos,

    generation: carLeanDocument.generation,
    bodyType: carLeanDocument.bodyType,
    fuelType: carLeanDocument.fuelType,
    transmission: carLeanDocument.transmission,

    engine: carLeanDocument.engine,
    color: carLeanDocument.color,

    registrationDate: carLeanDocument.registrationDate?.toISOString() ?? null,

    countryOfRegistration: carLeanDocument.countryOfRegistration,

    notes: carLeanDocument.notes,
    isActive: carLeanDocument.isActive,

    createdAt: carLeanDocument.createdAt.toISOString(),
    updatedAt: carLeanDocument.updatedAt.toISOString(),
  };
}
