export function isEmpty<T extends {}>(obj: T): boolean {
  return Object.keys(obj).length === 0;
}
