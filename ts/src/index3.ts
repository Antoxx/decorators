const NO_AUTH_KEY_SYMBOL = Symbol('no_auth')

function NoAuth () {
  return (target: any, name: string, descriptor: PropertyDescriptor) => {
    console.log('[NoAuth]: INITIATING')
    console.log(target, name)
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

function JwtAuth () {
  return (target: any, name: string, descriptor: PropertyDescriptor) => {
    console.log('[JwtAuth]: INITIATING')
    console.log(target[name])
    if (target[name][NO_AUTH_KEY_SYMBOL]) {
      throw new Error('Not allowed to use no auth decorator')
    }

    if (target[name][ROLE_KEY_SYMBOL]) {
      throw new Error('Not allowed to use user role decorator')
    }

    target[name][JWT_AUTH_KEY_SYMBOL] = true
    target[name]['123'] = true
    console.log('=============== 11111111')
    console.log(target === User.prototype)
    console.log('=============== 222222222')

    console.log('----------------', target[name][JWT_AUTH_KEY_SYMBOL], JSON.stringify(target))
  }
}

class User {
  @NoAuth()
  noAuthMethod () {
    console.log('[noAuthMethod]: USING')
  }

  @NeedsRole('Admin')
  adminMethod () {
    console.log('[adminMethod]: USING')
  }

  // decorator composition
  @NoAuth()
  @JwtAuth()
  jwtMethod () {
    console.log('[jwtMethod]: USING')
  }
}

const user = new User()

user.noAuthMethod()
user.noAuthMethod()

user.adminMethod()

user.jwtMethod()
