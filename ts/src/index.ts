// Class Decorator
function classDecorator (target: any) {
  console.log(`[classDecorator]: called`)
  console.log(`[classDecorator]: target === Class // ${target === Class}`)
}
// Class Decorator factory
function classDecoratorFactory (flag: string) {
  console.log(`[classDecoratorFactory]: evaluated`)
  return (target: any) => {
    console.log(`[classDecoratorFactory]: called`)
    console.log(`[classDecoratorFactory]: target === Class // ${target === Class}`)
    target.flag = flag
  }
}

// Method Decorator
function methodDecorator (target: any, methodName: string, descriptor: PropertyDescriptor) {
  console.log(`[methodDecorator]: target === Class.prototype // ${target === Class.prototype}`)
  target[methodName].flag = 'METHOD'
  console.log(`[methodDecorator]: `, target[methodName])
}
// Method Decorator factory
function methodDecoratorFactory () {
  console.log(`[methodDecoratorFactory]: evaluated`)
  return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
    console.log(`[methodDecoratorFactory]: called`)
    console.log(`[methodDecoratorFactory]: target === Class.prototype // ${target === Class.prototype}`)
    target[methodName].flag2 = 'METHOD 2'
    console.log(`[methodDecoratorFactory]: `, target[methodName])
  }
}

// Property Decorator
function propertyDecorator (target: any, propertyKey: string) {
  console.log(`[propertyDecorator]: called with "${propertyKey}"`)
  console.log(`[propertyDecorator]: target === Class.prototype // ${target === Class.prototype}`)
}
// Property Decorator factory
function propertyDecoratorFactory () {
  console.log(`[propertyDecoratorFactory]: evaluated`)
  return (target: any, propertyKey: string) => {
    console.log(`[propertyDecoratorFactory]: called with "${propertyKey}"`)
    console.log(`[propertyDecoratorFactory]: target === Class.prototype // ${target === Class.prototype}`)
  }
}

// Static Property Decorator
function staticPropertyDecorator (target: any, propertyKey: string) {
  console.log(`[staticPropertyDecorator]: called with "${propertyKey}"`)
  console.log(`[staticPropertyDecorator]: target === Class // ${target === Class}`)
}
// Static Property Decorator factory
function staticPropertyDecoratorFactory () {
  console.log(`[staticPropertyDecoratorFactory]: evaluated`)
  return (target: any, propertyKey: string) => {
    console.log(`[staticPropertyDecoratorFactory]: called with "${propertyKey}"`)
    console.log(`[staticPropertyDecoratorFactory]: target === Class // ${target === Class}`)
  }
}

// Constructor Parameter Decorator
function constructorParameterDecorator (target: any, _: undefined, parameterIndex: number) {
  console.log(`[constructorParameterDecorator]: called with "${parameterIndex}"`)
  console.log(`[constructorParameterDecorator]: target === Class // ${target === Class}`)
}
// Constructor Parameter Decorator factory
function constructorParameterDecoratorFactory () {
  console.log(`[constructorParameterDecoratorFactory]: evaluated`)
  return (target: any, _: undefined, parameterIndex: number) => {
    console.log(`[constructorParameterDecoratorFactory]: called with "${parameterIndex}"`)
    console.log(`[constructorParameterDecoratorFactory]: target === Class // ${target === Class}`)
  }
}

// Method Parameter Decorator
function methodParameterDecorator (target: any, methodName: string, parameterIndex: number) {
  console.log(`[methodParameterDecorator]: called with "${methodName}" and "${parameterIndex}"`)
  console.log(`[methodParameterDecorator]: target === Class // ${target === Class}`)
}
// Method Parameter Decorator factory
function methodParameterDecoratorFactory () {
  console.log(`[methodParameterDecoratorFactory]: evaluated`)
  return (target: any, methodName: string, parameterIndex: number) => {
    console.log(`[methodParameterDecoratorFactory]: called with "${methodName}" and "${parameterIndex}"`)
    console.log(`[methodParameterDecoratorFactory]: target === Class // ${target === Class}`)
  }
}

console.log('============== BEFORE CLASS ===============')

// decorator composition
@classDecorator
@classDecoratorFactory('CLASS')
class Class {
  @propertyDecorator
  @propertyDecoratorFactory()
  property = 123

  property2: string

  @staticPropertyDecorator
  @staticPropertyDecoratorFactory()
  static method() {}

  constructor (
    property: number,
    @constructorParameterDecorator @constructorParameterDecoratorFactory() property2: string
  ) {
    this.property = property
    this.property2 = property2
  }

  @methodDecorator
  @methodDecoratorFactory()
  method (@methodParameterDecorator @methodParameterDecoratorFactory() parameter: string) {
    console.log(parameter)
  }
}

console.log('============== AFTER CLASS ===============')

const c = new Class(456, 'string')

console.log(c)
