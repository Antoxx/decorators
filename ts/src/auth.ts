const NO_AUTH_KEY_SYMBOL = Symbol('no_auth')

function NoAuth () {
  return (target: any, name: string, descriptor: PropertyDescriptor) => {
    console.log('[NoAuth]: INITIATING')
    target[name][NO_AUTH_KEY_SYMBOL] = true
  }
}

const ROLE_KEY_SYMBOL = Symbol('role_auth')

function NeedsRole (role: string) {
  return (target: any, name: string, descriptor: PropertyDescriptor) => {
    console.log('[NeedsRole]: INITIATING')
    target[name][ROLE_KEY_SYMBOL] = role
  }
}

const JWT_AUTH_KEY_SYMBOL = Symbol('jwt_auth')

enum ROLES {
  ADMIN = 'Admin'
}

function JwtAuth () {
  return (target: any, name: string, descriptor: PropertyDescriptor) => {
    console.log('[JwtAuth]: INITIATING')

    // NOTE: this code doesn't work due to different decorators initializing order
    /*
    if (target[name][NO_AUTH_KEY_SYMBOL]) {
      throw new Error('Not allowed to use no auth decorator')
    }

    if (target[name][ROLE_KEY_SYMBOL]) {
      throw new Error('Not allowed to use user role decorator')
    }
    */

    target[name][JWT_AUTH_KEY_SYMBOL] = true
  }
}

class User {
  @NoAuth()
  noAuthMethod () {
    console.log('[noAuthMethod]: USING')
  }

  @NeedsRole(ROLES.ADMIN)
  adminMethod () {
    console.log('[adminMethod]: USING')
  }

  @NoAuth()
  @JwtAuth()
  jwtMethod () {
    console.log('[jwtMethod]: USING')
  }
}

function checkAccess (func: any, role: string, jwtAccess: boolean): void {
  const hasPolicy = func.hasOwnProperty(NO_AUTH_KEY_SYMBOL) || func.hasOwnProperty(ROLE_KEY_SYMBOL) || func.hasOwnProperty(JWT_AUTH_KEY_SYMBOL)
  if (!hasPolicy) {
    throw new Error('Для данного метода не установлена политика доступа')
  }

  if (role && role !== func[ROLE_KEY_SYMBOL]) {
    throw new Error('Нет прав для вызова метода')
  } else if (jwtAccess && !func[JWT_AUTH_KEY_SYMBOL]) {
    throw new Error('Нет прав для вызова метода с использованием JWT авторизации')
  } else if (!role && !func[NO_AUTH_KEY_SYMBOL]) {
    throw new Error('Доступ закрыт')
  }
}

console.log('============= INITIALIZING ==========')

const user = new User()

checkAccess(user.noAuthMethod, '', false)
checkAccess(user.adminMethod, ROLES.ADMIN, false)
checkAccess(user.jwtMethod, '', true)

try {
  checkAccess(user.adminMethod, '', true)
} catch (e: unknown) {
  console.log((e as Error).message)
}


