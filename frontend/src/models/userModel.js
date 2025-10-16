// Simple user model representation
export function createUser({ name = '', email = '' } = {}) {
  return { name, email };
}
