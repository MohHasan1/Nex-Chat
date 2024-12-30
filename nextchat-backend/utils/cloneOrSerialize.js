// utils/cloneOrSerialize.ts

/**
 * Clones and serializes an object using JSON methods.
 * This creates a deep copy of the object and removes non-serializable properties.
 *
 * @param obj - The object to be cloned and serialized.
 * @returns A new cloned object.
 */

export function cloneOrSerialize(obj) {
  return JSON.parse(JSON.stringify(obj));
}
