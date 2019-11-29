/**
 * undefinedとnullにならない関数と定義する
 * @param argument
 * @param message
 */
export const ensure = <T>(
  argument: T | undefined | null,
  message = 'This value was promised to be there.'
): T => {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
};
