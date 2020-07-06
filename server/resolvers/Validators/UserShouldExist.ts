/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import User from '../../entities/User';
import { isValidObjectId } from 'mongoose';

@ValidatorConstraint({ async: true })
export class UserShouldExistConstraint implements ValidatorConstraintInterface {
  async validate(id: string): Promise<boolean> {
    if (!isValidObjectId(id)) return false;
    const user = await User.findById(id);
    if (user) return true;
    return false;
  }
}

export function UserShouldExist(
  validationOptions?: ValidationOptions
): (object: Object, propertyName: string) => void {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UserShouldExistConstraint,
    });
  };
}
