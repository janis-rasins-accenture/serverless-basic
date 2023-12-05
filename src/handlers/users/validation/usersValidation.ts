import * as Yup from 'yup';
import { CreateUserInputIF } from '../../../types/users';

const MIN_NAME_LETTERS = 2;
const MAX_NAME_LETTERS = 20;

export const userCreateSchema: Yup.ObjectSchema<CreateUserInputIF> = Yup.object(
  {
    firstName: Yup.string()
      .required('First name is required!')
      .min(
        MIN_NAME_LETTERS,
        `Name must be at least ${MIN_NAME_LETTERS} letters`
      )
      .max(
        MAX_NAME_LETTERS,
        `Name must not exceed ${MAX_NAME_LETTERS} letters`
      ),
    lastName: Yup.string()
      .required('Surname is required!')
      .min(
        MIN_NAME_LETTERS,
        `Surname must be at least ${MIN_NAME_LETTERS} letters`
      )
      .max(
        MAX_NAME_LETTERS,
        `Surname must not exceed ${MAX_NAME_LETTERS} letters`
      ),
    email: Yup.string()
      .required('Email is required')
      .email('Please input valid email'),
    avatarUrl: Yup.string(),
    userName: Yup.string()
      .required('Username is required!')
      .min(
        MIN_NAME_LETTERS,
        `Username must be at least ${MIN_NAME_LETTERS} letters`
      )
      .max(
        MAX_NAME_LETTERS,
        `Username must not exceed ${MAX_NAME_LETTERS} letters`
      ),
  }
);
