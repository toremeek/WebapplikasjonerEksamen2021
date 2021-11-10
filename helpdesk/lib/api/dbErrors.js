export const DbError = {
  // TODO: Håndtere error logging
  create(resource, message, error) {
    console.log(error)

    return { resource, message: message ?? `Failed creating ${resource}` }
  },

  read(resource, message, error) {
    console.log(error)

    return { resource, message: message ?? `Failed finding ${resource}` }
  },

  update(resource, message, error) {
    console.log(error)

    return { resource, message: message ?? `Failed updating ${resource}` }
  },

  delete(resource, message, error) {
    console.log(error)

    return { resource, message: message ?? `Failed deleting ${resource}` }
  },
}
