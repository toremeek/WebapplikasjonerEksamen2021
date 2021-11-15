export const DbError = {
  // TODO: Håndtere error logging
  create(resource, error, message) {
    console.log(error)

    return { resource, message: message ?? `Failed creating ${resource}` }
  },

  read(resource, error, message) {
    console.log(error)

    return { resource, message: message ?? `Failed finding ${resource}` }
  },

  update(resource, error, message) {
    console.log(error)

    return { resource, message: message ?? `Failed updating ${resource}` }
  },

  delete(resource, error, message) {
    console.log(error)

    return { resource, message: message ?? `Failed deleting ${resource}` }
  },
}
