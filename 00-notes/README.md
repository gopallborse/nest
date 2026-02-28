# nest

Need minimum one Module and one Controller for a nest app to get started. We can add them later as needed.

Data Transfer Object DTO are created and used for data validation by Validation Pipes.

class transformer turns the plain json body into an instance of the DTO class and the class validator validates the instance.
https://github.com/typestack/class-transformer
https://github.com/typestack/class-validator

How types are preserved in nest?
In tsconfig.json, the two properties namely, emitDecoratorMetadata:true and experimentalDecorators:true allow a very small amount of type information to make it from the TS world over to the JS world.

Dependency Injection is all about making use of "Inversion of control" but not having to create a ton of different classes or instances every single time we want a controller. If we don't use DI and want to use IOC, we need to write a lot of code. E.g. a controller might be using many services and those services might be using many repositories.

# nest cli commands

nest generate module messages / nest g module messages
nest generate controller messages/messages --flat