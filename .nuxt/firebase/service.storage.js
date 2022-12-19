

export default async function (session) {
  await import('firebase/compat/storage')

  const storageService = session.storage()

  return storageService
}
