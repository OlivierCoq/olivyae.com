

export default async function (session) {
  await import(/* webpackChunkName: 'firebase-functions' */'firebase/compat/functions')

  const functionsService = session.functions('us-central1')

  functionsService.useFunctionsEmulator('http://10.10.10.3:12345')

  return functionsService
}
