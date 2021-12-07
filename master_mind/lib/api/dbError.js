export const DbError = {
  create(resource, message, error) {
    console.log(error)

    return { resource, message: message ?? `Failed creating ${resource}` }
  },
  read(resource, message, error) {
    console.log(error)

    return { resource, message: message ?? `Failed finding ${resource}` }
  },
}
