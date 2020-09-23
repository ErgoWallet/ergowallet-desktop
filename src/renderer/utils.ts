/**
 * Remove item from array, returns new array
 * Keep order of items
 */
export function remove<T>(fromArray: Array<T>, item: T): Array<T> {
  const index: number = fromArray.indexOf(item);
  let newArray: Array<T> = [];
  if (index === 0) {
    newArray = newArray.concat(fromArray.slice(1));
  } else if (index === fromArray.length - 1) {
    newArray = newArray.concat(fromArray.slice(0, -1));
  } else if (index > 0) {
    newArray = newArray.concat(
      fromArray.slice(0, index),
      fromArray.slice(index + 1),
    );
  }
  return newArray;
}
