import { SafeParseError } from 'zod';

export function convertErrorIntoString<T>(error: SafeParseError<T>) {
   const aux: any = {};
   error.error.errors.forEach(error => (aux[`${error.path}`] = error.message));

   return JSON.stringify(aux);
}
