import { createUser, loginService, userAuthorizer } from './service'
import { ok, badRequest, created, serverError } from '../../utils/responses'

const AUTHORIZATION_KEY = 'authorization'

export const createAccount = async (event) => {
  try {
    const body = JSON.parse(event.body)
    const token = await createUser(body)
    return created ({[AUTHORIZATION_KEY]: token})
  } catch (err) {
    if (err.code === 11000) return badRequest('E-mail exists')
    return serverError(err)
  }
}

export const login = async (event) => {
  try{
    const body = JSON.parse(event.body)
    const token = await loginService(body) 
    return ok({ [AUTHORIZATION_KEY] : token})
  } catch (err){
    if(err.message === 'password_incorrect') return badRequest('password_incorrect')
    return serverError(err)
  }
}

export const authorizer = async ({ authorizationToken, methodArn }) => {
  try {
    const policy = await userAuthorizer(authorizationToken, methodArn)
    return policy
  }catch (err) {
    return serverError(err)
  }
}

