fiddle-0004-CSVToJsonEndpoint
======

![Screenshot](screenshot.png)


### Title

SpringFox Demo


### Creation Date

09-30-16


### Location

Chicago, IL


### Issue

[Issue #80](https://github.com/bradyhouse/house/issues/80)


### Description

POC exploring how to create an endpoint that returns a static CSV file in JSON format.


### Use Case

1.  Open a command prompt
2.  Navigate to the [springfox](springfox) directory
3.  Execute the command `gradlew idea`

        :boot-static-docs:ideaModule
        :boot-static-docs:idea
        :boot-swagger:ideaModule
        :boot-swagger:idea
        
        BUILD SUCCESSFUL
        
        Total time: 10.656 secs
        
        This build could be faster, please consider using the Gradle Daemon: http://gradle.org/docs/2.4-rc-1/userguide/gradle_daemon.html

5.  Execute the command `./gradlew spring-java-swagger:appRun`

        :spring-java-swagger:prepareInplaceWebAppFolder UP-TO-DATE
        :spring-java-swagger:createInplaceWebAppFolder
        :spring-java-swagger:compileJava
        warning: [options] bootstrap class path not set in conjunction with -source 1.7
        1 warning
        :spring-java-swagger:processResources
        :spring-java-swagger:classes
        :spring-java-swagger:prepareInplaceWebAppClasses
        :spring-java-swagger:prepareInplaceWebApp
        :spring-java-swagger:appRun
        18:14:26 INFO  1 Spring WebApplicationInitializers detected on classpath
        18:14:26 INFO  Initializing Spring FrameworkServlet 'dispatcher'
        Sep 30, 2016 6:14:26 PM org.springframework.web.servlet.DispatcherServlet initServletBean
        INFO: FrameworkServlet 'dispatcher': initialization started
        Sep 30, 2016 6:14:26 PM org.springframework.web.context.support.AnnotationConfigWebApplicationContext prepareRefresh
        INFO: Refreshing WebApplicationContext for namespace 'dispatcher-servlet': startup date [Fri Sep 30 18:14:26 EDT 2016]; root of context hierarchy
        Sep 30, 2016 6:14:26 PM org.springframework.web.context.support.AnnotationConfigWebApplicationContext loadBeanDefinitions
        INFO: Registering annotated classes: [class springfoxdemo.java.swagger.SpringConfig]
        Sep 30, 2016 6:14:27 PM org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping register
        INFO: Mapped "{[/api/pet],methods=[POST],produces=[application/json || application/xml]}" onto public org.springframework.http.ResponseEntity<java.lang.String> springfox.petstore.controller.PetController.addPet(springfox.petstore.model.Pet)
        Sep 30, 2016 6:14:27 PM org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping register
        INFO: Mapped "{[/api/pet/{petId}],methods=[GET],produces=[application/json || application/xml]}" onto public org.springframework.http.ResponseEntity<springfox.petstore.model.Pet> springfox.petstore.controller.PetController.getPetById(java.lang.String) throws springfox.petstore.controller.NotFoundException
        Sep 30, 2016 6:14:27 PM org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping register
        INFO: Mapped "{[/api/pet],methods=[PUT],produces=[application/json || application/xml]}" onto public org.springframework.http.ResponseEntity<java.lang.String> springfox.petstore.controller.PetController.updatePet(springfox.petstore.model.Pet)
        Sep 30, 2016 6:14:27 PM org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping register
        INFO: Mapped "{[/api/pet/findByStatus],methods=[GET],produces=[application/json || application/xml]}" onto public org.springframework.http.ResponseEntity<java.util.List<springfox.petstore.model.Pet>> springfox.petstore.controller.PetController.findPetsByStatus(java.lang.String)
        Sep 30, 2016 6:14:27 PM org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping register
        INFO: Mapped "{[/api/pet/findByTags],methods=[GET],produces=[application/json || application/xml]}" onto public org.springframework.http.ResponseEntity<java.util.List<springfox.petstore.model.Pet>> springfox.petstore.controller.PetController.findPetsByTags(java.lang.String)
        Sep 30, 2016 6:14:27 PM org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping register
        INFO: Mapped "{[/api/pet/findPetsHidden],methods=[GET],produces=[application/json || application/xml]}" onto public org.springframework.http.ResponseEntity<java.util.List<springfox.petstore.model.Pet>> springfox.petstore.controller.PetController.findPetsHidden(java.lang.String)
        Sep 30, 2016 6:14:27 PM org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping register
        INFO: Mapped "{[/api/store/order/{orderId}],methods=[GET],produces=[application/json]}" onto public org.springframework.http.ResponseEntity<springfox.petstore.model.Order> springfox.petstore.controller.PetStoreResource.getOrderById(java.lang.String) throws springfox.petstore.controller.NotFoundException
        Sep 30, 2016 6:14:27 PM org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping register
        INFO: Mapped "{[/api/store/order],methods=[POST],produces=[application/json]}" onto public org.springframework.http.ResponseEntity<java.lang.String> springfox.petstore.controller.PetStoreResource.placeOrder(springfox.petstore.model.Order)
        Sep 30, 2016 6:14:27 PM org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping register
        INFO: Mapped "{[/api/store/order/{orderId}],methods=[DELETE],produces=[application/json]}" onto public org.springframework.http.ResponseEntity<java.lang.String> springfox.petstore.controller.PetStoreResource.deleteOrder(java.lang.String)
        Sep 30, 2016 6:14:27 PM org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping register
        INFO: Mapped "{[/api/store/search],methods=[GET],params=[x=TX],produces=[application/json]}" onto public org.springframework.http.ResponseEntity<springfox.petstore.model.Pet> springfox.petstore.controller.PetStoreResource.getPetInTx()
        Sep 30, 2016 6:14:27 PM org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping register
        INFO: Mapped "{[/api/store/search],methods=[GET],params=[x=CA],produces=[application/json]}" onto public org.springframework.http.ResponseEntity<springfox.petstore.model.Pet> springfox.petstore.controller.PetStoreResource.getPetInCA()
        Sep 30, 2016 6:14:27 PM org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping register
        INFO: Mapped "{[/api/user],methods=[POST],produces=[application/json]}" onto public org.springframework.http.ResponseEntity<springfox.petstore.model.User> springfox.petstore.controller.UserController.createUser(springfox.petstore.model.User)
        Sep 30, 2016 6:14:27 PM org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping register
        INFO: Mapped "{[/api/user/createWithArray],methods=[POST],produces=[application/json]}" onto public org.springframework.http.ResponseEntity<springfox.petstore.model.User> springfox.petstore.controller.UserController.createUsersWithArrayInput(springfox.petstore.model.User[])
        Sep 30, 2016 6:14:27 PM org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping register
        INFO: Mapped "{[/api/user/createWithList],methods=[POST],produces=[application/json]}" onto public org.springframework.http.ResponseEntity<java.lang.String> springfox.petstore.controller.UserController.createUsersWithListInput(java.util.List<springfox.petstore.model.User>)
        Sep 30, 2016 6:14:27 PM org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping register
        INFO: Mapped "{[/api/user/{username}],methods=[PUT],produces=[application/json]}" onto public org.springframework.http.ResponseEntity<java.lang.String> springfox.petstore.controller.UserController.updateUser(java.lang.String,springfox.petstore.model.User)
        Sep 30, 2016 6:14:27 PM org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping register
        INFO: Mapped "{[/api/user/{username}],methods=[DELETE],produces=[application/json]}" onto public org.springframework.http.ResponseEntity<java.lang.String> springfox.petstore.controller.UserController.deleteUser(java.lang.String)
        Sep 30, 2016 6:14:27 PM org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping register
        INFO: Mapped "{[/api/user/{username}],methods=[GET],produces=[application/json]}" onto public org.springframework.http.ResponseEntity<springfox.petstore.model.User> springfox.petstore.controller.UserController.getUserByName(java.lang.String)
        Sep 30, 2016 6:14:27 PM org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping register
        INFO: Mapped "{[/api/user/login],methods=[GET],produces=[application/json]}" onto public org.springframework.http.ResponseEntity<java.lang.String> springfox.petstore.controller.UserController.loginUser(java.lang.String,java.lang.String)
        Sep 30, 2016 6:14:27 PM org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping register
        INFO: Mapped "{[/api/user/logout],methods=[GET],produces=[application/json]}" onto public org.springframework.http.ResponseEntity<java.lang.String> springfox.petstore.controller.UserController.logoutUser()
        Sep 30, 2016 6:14:27 PM org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping register
        INFO: Mapped "{[/v2/api-docs],methods=[GET],produces=[application/json || application/hal+json]}" onto public org.springframework.http.ResponseEntity<springfox.documentation.spring.web.json.Json> springfox.documentation.swagger2.web.Swagger2Controller.getDocumentation(java.lang.String,javax.servlet.http.HttpServletRequest)
        Sep 30, 2016 6:14:27 PM org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping register
        INFO: Mapped "{[/swagger-resources/configuration/security]}" onto org.springframework.http.ResponseEntity<springfox.documentation.swagger.web.SecurityConfiguration> springfox.documentation.swagger.web.ApiResourceController.securityConfiguration()
        Sep 30, 2016 6:14:27 PM org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping register
        INFO: Mapped "{[/swagger-resources/configuration/ui]}" onto org.springframework.http.ResponseEntity<springfox.documentation.swagger.web.UiConfiguration> springfox.documentation.swagger.web.ApiResourceController.uiConfiguration()
        Sep 30, 2016 6:14:27 PM org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping register
        INFO: Mapped "{[/swagger-resources]}" onto org.springframework.http.ResponseEntity<java.util.List<springfox.documentation.swagger.web.SwaggerResource>> springfox.documentation.swagger.web.ApiResourceController.swaggerResources()
        Sep 30, 2016 6:14:27 PM org.springframework.web.servlet.handler.SimpleUrlHandlerMapping registerHandler
        INFO: Mapped URL path [/swagger-ui.html] onto handler of type [class org.springframework.web.servlet.resource.ResourceHttpRequestHandler]
        Sep 30, 2016 6:14:27 PM org.springframework.web.servlet.handler.SimpleUrlHandlerMapping registerHandler
        INFO: Mapped URL path [/webjars/**] onto handler of type [class org.springframework.web.servlet.resource.ResourceHttpRequestHandler]
        Sep 30, 2016 6:14:27 PM org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter initControllerAdviceCache
        INFO: Looking for @ControllerAdvice: WebApplicationContext for namespace 'dispatcher-servlet': startup date [Fri Sep 30 18:14:26 EDT 2016]; root of context hierarchy
        Sep 30, 2016 6:14:27 PM org.springframework.context.support.DefaultLifecycleProcessor start
        INFO: Starting beans in phase 2147483647
        Sep 30, 2016 6:14:27 PM org.springframework.web.servlet.DispatcherServlet initServletBean
        INFO: FrameworkServlet 'dispatcher': initialization completed in 1525 ms
        18:14:27 INFO  Jetty 9.2.15.v20160210 started and listening on port 8080
        18:14:27 INFO  spring-java-swagger runs at:
        18:14:27 INFO    http://localhost:8080/spring-java-swagger
        Press any key to stop the server.
        > Building 87% > :spring-java-swagger:appRun
        
While the command is running, startup a web-browser and checkout `localhost:8080/spring-java-swagger/..` (See below).


#### Working Api Endpoint

[http://localhost:8080/spring-java-swagger/api/user/login?username=a&password=b](http://localhost:8080/spring-java-swagger/api/user/login?username=a&password=b)


#### Swagger 2 Default Documentation

[http://localhost:8080/spring-java-swagger/v2/api-docs](http://localhost:8080/spring-java-swagger/v2/api-docs)


#### Swagger UI

[http://localhost:8080/spring-java-swagger/swagger-ui.html](http://localhost:8080/spring-java-swagger/swagger-ui.html)


### Tags

java, gradle, springfox-demos


### Forked From

[fiddle-0004-CSVToJsonEndpoint](../fiddle-0003-SpringFox)
