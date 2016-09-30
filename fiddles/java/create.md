Java (sample create)
======

Executing the command `./fiddle.sh "create" "java" "fiddle-0000-Template"` produces the following output.

    H o u s e
    oooooooooooo  o8o        .o8        .o8  oooo
     888       8  `"'        888        888   888
     888         oooo   .oooo888   .oooo888   888   .ooooo.
     888oooo8     888  d88   888  d88   888   888  d88   88b
     888          888  888   888  888   888   888  888ooo888
     888          888  888   888  888   888   888  888    .o
    o888o        o888o  Y8bod88P   Y8bod88P  o888o  Y8bod8P
    
    FIDDLE.SH
    FIDDLE-DELETE.SH
    
    fiddle type:	java
    fiddle name:	fiddle-0000-Template
    
    Are you sure you want to delete this fiddle? [Y/n] Y
    The "fiddle-0000-Template" java fiddle has been deleted successfully.
    FIDDLE-CREATE.SH
    ┌──FIDDLE-JAVA.SH
    ├────APP NAME: "TEMPLATE"
    ├────JAVACREATE
    ├────INITJAVAPROJECT
    ├────INITFIDDLECONFIGFILE
    Password:
    ├────GITCLONESEEDER
    Cloning into 'tmp'...
    remote: Counting objects: 1498, done.
    remote: Total 1498 (delta 0), reused 0 (delta 0), pack-reused 1498
    Receiving objects: 100% (1498/1498), 812.94 KiB | 1.25 MiB/s, done.
    Resolving deltas: 100% (786/786), done.
    Checking connectivity... done.
    ├────HTTPS://GITHUB.COM/SPRING-GUIDES/GS-REST-SERVICE CLONED TO TMP.
    ├────MVNINSTALL
    [INFO] Scanning for projects...
    [INFO]
    [INFO] Using the builder org.apache.maven.lifecycle.internal.builder.singlethreaded.SingleThreadedBuilder with a thread count of 1
    [INFO]
    [INFO] ------------------------------------------------------------------------
    [INFO] Building gs-rest-service 0.1.0
    [INFO] ------------------------------------------------------------------------
    [INFO]
    [INFO] --- maven-resources-plugin:2.6:resources (default-resources) @ gs-rest-service ---
    [INFO] Using 'UTF-8' encoding to copy filtered resources.
    [INFO] skip non existing resourceDirectory /Users/e13542/github/house/fiddles/java/fiddle-0000-Template/template/src/main/resources
    [INFO] skip non existing resourceDirectory /Users/e13542/github/house/fiddles/java/fiddle-0000-Template/template/src/main/resources
    [INFO]
    [INFO] --- maven-compiler-plugin:3.1:compile (default-compile) @ gs-rest-service ---
    [INFO] Changes detected - recompiling the module!
    [INFO] Compiling 3 source files to /Users/e13542/github/house/fiddles/java/fiddle-0000-Template/template/target/classes
    [INFO]
    [INFO] --- maven-resources-plugin:2.6:testResources (default-testResources) @ gs-rest-service ---
    [INFO] Using 'UTF-8' encoding to copy filtered resources.
    [INFO] skip non existing resourceDirectory /Users/e13542/github/house/fiddles/java/fiddle-0000-Template/template/src/test/resources
    [INFO]
    [INFO] --- maven-compiler-plugin:3.1:testCompile (default-testCompile) @ gs-rest-service ---
    [INFO] Changes detected - recompiling the module!
    [INFO] Compiling 1 source file to /Users/e13542/github/house/fiddles/java/fiddle-0000-Template/template/target/test-classes
    [INFO]
    [INFO] --- maven-surefire-plugin:2.18.1:test (default-test) @ gs-rest-service ---
    [INFO] Surefire report directory: /Users/e13542/github/house/fiddles/java/fiddle-0000-Template/template/target/surefire-reports
    
    -------------------------------------------------------
     T E S T S
    -------------------------------------------------------
    05:32:10.916 [main] DEBUG org.springframework.test.context.junit4.SpringJUnit4ClassRunner - SpringJUnit4ClassRunner constructor called with [class hello.GreetingControllerTests]
    05:32:10.924 [main] DEBUG org.springframework.test.context.BootstrapUtils - Instantiating CacheAwareContextLoaderDelegate from class [org.springframework.test.context.cache.DefaultCacheAwareContextLoaderDelegate]
    05:32:10.932 [main] DEBUG org.springframework.test.context.BootstrapUtils - Instantiating BootstrapContext using constructor [public org.springframework.test.context.support.DefaultBootstrapContext(java.lang.Class,org.springframework.test.context.CacheAwareContextLoaderDelegate)]
    05:32:10.956 [main] DEBUG org.springframework.test.context.BootstrapUtils - Instantiating TestContextBootstrapper for test class [hello.GreetingControllerTests] from class [org.springframework.boot.test.context.SpringBootTestContextBootstrapper]
    05:32:10.970 [main] INFO org.springframework.boot.test.context.SpringBootTestContextBootstrapper - Neither @ContextConfiguration nor @ContextHierarchy found for test class [hello.GreetingControllerTests], using SpringBootContextLoader
    05:32:10.974 [main] DEBUG org.springframework.test.context.support.AbstractContextLoader - Did not detect default resource location for test class [hello.GreetingControllerTests]: class path resource [hello/GreetingControllerTests-context.xml] does not exist
    05:32:10.974 [main] DEBUG org.springframework.test.context.support.AbstractContextLoader - Did not detect default resource location for test class [hello.GreetingControllerTests]: class path resource [hello/GreetingControllerTestsContext.groovy] does not exist
    05:32:10.975 [main] INFO org.springframework.test.context.support.AbstractContextLoader - Could not detect default resource locations for test class [hello.GreetingControllerTests]: no resource found for suffixes {-context.xml, Context.groovy}.
    05:32:10.975 [main] INFO org.springframework.test.context.support.AnnotationConfigContextLoaderUtils - Could not detect default configuration classes for test class [hello.GreetingControllerTests]: GreetingControllerTests does not declare any static, non-private, non-final, nested classes annotated with @Configuration.
    05:32:11.018 [main] DEBUG org.springframework.test.context.support.ActiveProfilesUtils - Could not find an 'annotation declaring class' for annotation type [org.springframework.test.context.ActiveProfiles] and class [hello.GreetingControllerTests]
    05:32:11.067 [main] DEBUG org.springframework.core.env.StandardEnvironment - Adding [systemProperties] PropertySource with lowest search precedence
    05:32:11.068 [main] DEBUG org.springframework.core.env.StandardEnvironment - Adding [systemEnvironment] PropertySource with lowest search precedence
    05:32:11.069 [main] DEBUG org.springframework.core.env.StandardEnvironment - Initialized StandardEnvironment with PropertySources [systemProperties,systemEnvironment]
    05:32:11.079 [main] DEBUG org.springframework.core.io.support.PathMatchingResourcePatternResolver - Resolved classpath location [hello/] to resources [URL [file:/Users/e13542/github/house/fiddles/java/fiddle-0000-Template/template/target/test-classes/hello/], URL [file:/Users/e13542/github/house/fiddles/java/fiddle-0000-Template/template/target/classes/hello/]]
    05:32:11.079 [main] DEBUG org.springframework.core.io.support.PathMatchingResourcePatternResolver - Looking for matching resources in directory tree [/Users/e13542/github/house/fiddles/java/fiddle-0000-Template/template/target/test-classes/hello]
    05:32:11.080 [main] DEBUG org.springframework.core.io.support.PathMatchingResourcePatternResolver - Searching directory [/Users/e13542/github/house/fiddles/java/fiddle-0000-Template/template/target/test-classes/hello] for files matching pattern [/Users/e13542/github/house/fiddles/java/fiddle-0000-Template/template/target/test-classes/hello/*.class]
    05:32:11.083 [main] DEBUG org.springframework.core.io.support.PathMatchingResourcePatternResolver - Looking for matching resources in directory tree [/Users/e13542/github/house/fiddles/java/fiddle-0000-Template/template/target/classes/hello]
    05:32:11.083 [main] DEBUG org.springframework.core.io.support.PathMatchingResourcePatternResolver - Searching directory [/Users/e13542/github/house/fiddles/java/fiddle-0000-Template/template/target/classes/hello] for files matching pattern [/Users/e13542/github/house/fiddles/java/fiddle-0000-Template/template/target/classes/hello/*.class]
    05:32:11.084 [main] DEBUG org.springframework.core.io.support.PathMatchingResourcePatternResolver - Resolved location pattern [classpath*:hello/*.class] to resources [file [/Users/e13542/github/house/fiddles/java/fiddle-0000-Template/template/target/test-classes/hello/GreetingControllerTests.class], file [/Users/e13542/github/house/fiddles/java/fiddle-0000-Template/template/target/classes/hello/Application.class], file [/Users/e13542/github/house/fiddles/java/fiddle-0000-Template/template/target/classes/hello/Greeting.class], file [/Users/e13542/github/house/fiddles/java/fiddle-0000-Template/template/target/classes/hello/GreetingController.class]]
    05:32:11.123 [main] DEBUG org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider - Identified candidate component class: file [/Users/e13542/github/house/fiddles/java/fiddle-0000-Template/template/target/classes/hello/Application.class]
    05:32:11.129 [main] INFO org.springframework.boot.test.context.SpringBootTestContextBootstrapper - Found @SpringBootConfiguration hello.Application for test class hello.GreetingControllerTests
    05:32:11.132 [main] DEBUG org.springframework.boot.test.context.SpringBootTestContextBootstrapper - @TestExecutionListeners is not present for class [hello.GreetingControllerTests]: using defaults.
    05:32:11.134 [main] INFO org.springframework.boot.test.context.SpringBootTestContextBootstrapper - Loaded default TestExecutionListener class names from location [META-INF/spring.factories]: [org.springframework.boot.test.mock.mockito.MockitoTestExecutionListener, org.springframework.boot.test.mock.mockito.ResetMocksTestExecutionListener, org.springframework.boot.test.autoconfigure.restdocs.RestDocsTestExecutionListener, org.springframework.boot.test.autoconfigure.web.client.MockRestServiceServerResetTestExecutionListener, org.springframework.boot.test.autoconfigure.web.servlet.MockMvcPrintOnlyOnFailureTestExecutionListener, org.springframework.boot.test.autoconfigure.web.servlet.WebDriverTestExecutionListener, org.springframework.test.context.web.ServletTestExecutionListener, org.springframework.test.context.support.DirtiesContextBeforeModesTestExecutionListener, org.springframework.test.context.support.DependencyInjectionTestExecutionListener, org.springframework.test.context.support.DirtiesContextTestExecutionListener, org.springframework.test.context.transaction.TransactionalTestExecutionListener, org.springframework.test.context.jdbc.SqlScriptsTestExecutionListener]
    05:32:11.144 [main] INFO org.springframework.boot.test.context.SpringBootTestContextBootstrapper - Could not instantiate TestExecutionListener [org.springframework.test.context.jdbc.SqlScriptsTestExecutionListener]. Specify custom listener classes or make the default listener classes (and their required dependencies) available. Offending class: [org/springframework/transaction/interceptor/TransactionAttribute]
    05:32:11.148 [main] INFO org.springframework.boot.test.context.SpringBootTestContextBootstrapper - Could not instantiate TestExecutionListener [org.springframework.test.context.transaction.TransactionalTestExecutionListener]. Specify custom listener classes or make the default listener classes (and their required dependencies) available. Offending class: [org/springframework/transaction/interceptor/TransactionAttributeSource]
    05:32:11.149 [main] INFO org.springframework.boot.test.context.SpringBootTestContextBootstrapper - Using TestExecutionListeners: [org.springframework.test.context.web.ServletTestExecutionListener@c540f5a, org.springframework.test.context.support.DirtiesContextBeforeModesTestExecutionListener@770c2e6b, org.springframework.boot.test.autoconfigure.SpringBootDependencyInjectionTestExecutionListener@1a052a00, org.springframework.test.context.support.DirtiesContextTestExecutionListener@4d826d77, org.springframework.boot.test.mock.mockito.MockitoTestExecutionListener@61009542, org.springframework.boot.test.autoconfigure.web.client.MockRestServiceServerResetTestExecutionListener@77e9807f, org.springframework.boot.test.autoconfigure.web.servlet.MockMvcPrintOnlyOnFailureTestExecutionListener@448ff1a8, org.springframework.boot.test.autoconfigure.restdocs.RestDocsTestExecutionListener@1a38c59b, org.springframework.boot.test.autoconfigure.web.servlet.WebDriverTestExecutionListener@7f77e91b, org.springframework.boot.test.mock.mockito.ResetMocksTestExecutionListener@44a664f2]
    05:32:11.152 [main] DEBUG org.springframework.test.annotation.ProfileValueUtils - Retrieved @ProfileValueSourceConfiguration [null] for test class [hello.GreetingControllerTests]
    05:32:11.152 [main] DEBUG org.springframework.test.annotation.ProfileValueUtils - Retrieved ProfileValueSource type [class org.springframework.test.annotation.SystemProfileValueSource] for class [hello.GreetingControllerTests]
    Running hello.GreetingControllerTests
    05:32:11.153 [main] DEBUG org.springframework.test.context.junit4.SpringJUnit4ClassRunner - SpringJUnit4ClassRunner constructor called with [class hello.GreetingControllerTests]
    05:32:11.154 [main] DEBUG org.springframework.test.context.BootstrapUtils - Instantiating CacheAwareContextLoaderDelegate from class [org.springframework.test.context.cache.DefaultCacheAwareContextLoaderDelegate]
    05:32:11.154 [main] DEBUG org.springframework.test.context.BootstrapUtils - Instantiating BootstrapContext using constructor [public org.springframework.test.context.support.DefaultBootstrapContext(java.lang.Class,org.springframework.test.context.CacheAwareContextLoaderDelegate)]
    05:32:11.154 [main] DEBUG org.springframework.test.context.BootstrapUtils - Instantiating TestContextBootstrapper for test class [hello.GreetingControllerTests] from class [org.springframework.boot.test.context.SpringBootTestContextBootstrapper]
    05:32:11.154 [main] INFO org.springframework.boot.test.context.SpringBootTestContextBootstrapper - Neither @ContextConfiguration nor @ContextHierarchy found for test class [hello.GreetingControllerTests], using SpringBootContextLoader
    05:32:11.155 [main] DEBUG org.springframework.test.context.support.AbstractContextLoader - Did not detect default resource location for test class [hello.GreetingControllerTests]: class path resource [hello/GreetingControllerTests-context.xml] does not exist
    05:32:11.155 [main] DEBUG org.springframework.test.context.support.AbstractContextLoader - Did not detect default resource location for test class [hello.GreetingControllerTests]: class path resource [hello/GreetingControllerTestsContext.groovy] does not exist
    05:32:11.155 [main] INFO org.springframework.test.context.support.AbstractContextLoader - Could not detect default resource locations for test class [hello.GreetingControllerTests]: no resource found for suffixes {-context.xml, Context.groovy}.
    05:32:11.155 [main] INFO org.springframework.test.context.support.AnnotationConfigContextLoaderUtils - Could not detect default configuration classes for test class [hello.GreetingControllerTests]: GreetingControllerTests does not declare any static, non-private, non-final, nested classes annotated with @Configuration.
    05:32:11.161 [main] DEBUG org.springframework.test.context.support.ActiveProfilesUtils - Could not find an 'annotation declaring class' for annotation type [org.springframework.test.context.ActiveProfiles] and class [hello.GreetingControllerTests]
    05:32:11.162 [main] DEBUG org.springframework.core.env.StandardEnvironment - Adding [systemProperties] PropertySource with lowest search precedence
    05:32:11.162 [main] DEBUG org.springframework.core.env.StandardEnvironment - Adding [systemEnvironment] PropertySource with lowest search precedence
    05:32:11.162 [main] DEBUG org.springframework.core.env.StandardEnvironment - Initialized StandardEnvironment with PropertySources [systemProperties,systemEnvironment]
    05:32:11.162 [main] INFO org.springframework.boot.test.context.SpringBootTestContextBootstrapper - Found @SpringBootConfiguration hello.Application for test class hello.GreetingControllerTests
    05:32:11.164 [main] DEBUG org.springframework.boot.test.context.SpringBootTestContextBootstrapper - @TestExecutionListeners is not present for class [hello.GreetingControllerTests]: using defaults.
    05:32:11.165 [main] INFO org.springframework.boot.test.context.SpringBootTestContextBootstrapper - Loaded default TestExecutionListener class names from location [META-INF/spring.factories]: [org.springframework.boot.test.mock.mockito.MockitoTestExecutionListener, org.springframework.boot.test.mock.mockito.ResetMocksTestExecutionListener, org.springframework.boot.test.autoconfigure.restdocs.RestDocsTestExecutionListener, org.springframework.boot.test.autoconfigure.web.client.MockRestServiceServerResetTestExecutionListener, org.springframework.boot.test.autoconfigure.web.servlet.MockMvcPrintOnlyOnFailureTestExecutionListener, org.springframework.boot.test.autoconfigure.web.servlet.WebDriverTestExecutionListener, org.springframework.test.context.web.ServletTestExecutionListener, org.springframework.test.context.support.DirtiesContextBeforeModesTestExecutionListener, org.springframework.test.context.support.DependencyInjectionTestExecutionListener, org.springframework.test.context.support.DirtiesContextTestExecutionListener, org.springframework.test.context.transaction.TransactionalTestExecutionListener, org.springframework.test.context.jdbc.SqlScriptsTestExecutionListener]
    05:32:11.167 [main] INFO org.springframework.boot.test.context.SpringBootTestContextBootstrapper - Could not instantiate TestExecutionListener [org.springframework.test.context.jdbc.SqlScriptsTestExecutionListener]. Specify custom listener classes or make the default listener classes (and their required dependencies) available. Offending class: [org/springframework/transaction/interceptor/TransactionAttribute]
    05:32:11.167 [main] INFO org.springframework.boot.test.context.SpringBootTestContextBootstrapper - Could not instantiate TestExecutionListener [org.springframework.test.context.transaction.TransactionalTestExecutionListener]. Specify custom listener classes or make the default listener classes (and their required dependencies) available. Offending class: [org/springframework/transaction/interceptor/TransactionAttributeSource]
    05:32:11.168 [main] INFO org.springframework.boot.test.context.SpringBootTestContextBootstrapper - Using TestExecutionListeners: [org.springframework.test.context.web.ServletTestExecutionListener@161b062a, org.springframework.test.context.support.DirtiesContextBeforeModesTestExecutionListener@17c1bced, org.springframework.boot.test.autoconfigure.SpringBootDependencyInjectionTestExecutionListener@2d9d4f9d, org.springframework.test.context.support.DirtiesContextTestExecutionListener@4034c28c, org.springframework.boot.test.mock.mockito.MockitoTestExecutionListener@e50a6f6, org.springframework.boot.test.autoconfigure.web.client.MockRestServiceServerResetTestExecutionListener@14ec4505, org.springframework.boot.test.autoconfigure.web.servlet.MockMvcPrintOnlyOnFailureTestExecutionListener@53ca01a2, org.springframework.boot.test.autoconfigure.restdocs.RestDocsTestExecutionListener@358c99f5, org.springframework.boot.test.autoconfigure.web.servlet.WebDriverTestExecutionListener@3ee0fea4, org.springframework.boot.test.mock.mockito.ResetMocksTestExecutionListener@48524010]
    05:32:11.168 [main] DEBUG org.springframework.test.annotation.ProfileValueUtils - Retrieved @ProfileValueSourceConfiguration [null] for test class [hello.GreetingControllerTests]
    05:32:11.168 [main] DEBUG org.springframework.test.annotation.ProfileValueUtils - Retrieved ProfileValueSource type [class org.springframework.test.annotation.SystemProfileValueSource] for class [hello.GreetingControllerTests]
    05:32:11.169 [main] DEBUG org.springframework.test.annotation.ProfileValueUtils - Retrieved @ProfileValueSourceConfiguration [null] for test class [hello.GreetingControllerTests]
    05:32:11.169 [main] DEBUG org.springframework.test.annotation.ProfileValueUtils - Retrieved ProfileValueSource type [class org.springframework.test.annotation.SystemProfileValueSource] for class [hello.GreetingControllerTests]
    05:32:11.173 [main] DEBUG org.springframework.test.context.support.AbstractDirtiesContextTestExecutionListener - Before test class: context [DefaultTestContext@f2f2cc1 testClass = GreetingControllerTests, testInstance = [null], testMethod = [null], testException = [null], mergedContextConfiguration = [WebMergedContextConfiguration@3a079870 testClass = GreetingControllerTests, locations = '{}', classes = '{class hello.Application}', contextInitializerClasses = '[]', activeProfiles = '{}', propertySourceLocations = '{}', propertySourceProperties = '{org.springframework.boot.test.context.SpringBootTestContextBootstrapper=true}', contextCustomizers = set[org.springframework.boot.test.context.ImportsContextCustomizer@225cdcf, org.springframework.boot.test.context.SpringBootTestContextCustomizer@57536d79, org.springframework.boot.test.context.filter.ExcludeFilterContextCustomizer@4b4523f8, org.springframework.boot.test.mock.mockito.MockitoContextCustomizer@0, org.springframework.boot.test.autoconfigure.properties.PropertyMappingContextCustomizer@e7e8512, org.springframework.boot.test.autoconfigure.web.servlet.WebDriverContextCustomizerFactory$Customizer@22a67b4], resourceBasePath = 'src/main/webapp', contextLoader = 'org.springframework.boot.test.context.SpringBootContextLoader', parent = [null]]], class annotated with @DirtiesContext [false] with mode [null].
    05:32:11.173 [main] DEBUG org.springframework.test.annotation.ProfileValueUtils - Retrieved @ProfileValueSourceConfiguration [null] for test class [hello.GreetingControllerTests]
    05:32:11.173 [main] DEBUG org.springframework.test.annotation.ProfileValueUtils - Retrieved ProfileValueSource type [class org.springframework.test.annotation.SystemProfileValueSource] for class [hello.GreetingControllerTests]
    05:32:11.201 [main] DEBUG org.springframework.core.env.StandardEnvironment - Adding [systemProperties] PropertySource with lowest search precedence
    05:32:11.201 [main] DEBUG org.springframework.core.env.StandardEnvironment - Adding [systemEnvironment] PropertySource with lowest search precedence
    05:32:11.201 [main] DEBUG org.springframework.core.env.StandardEnvironment - Initialized StandardEnvironment with PropertySources [systemProperties,systemEnvironment]
    05:32:11.203 [main] DEBUG org.springframework.test.context.support.TestPropertySourceUtils - Adding inlined properties to environment: {spring.jmx.enabled=false, org.springframework.boot.test.context.SpringBootTestContextBootstrapper=true, server.port=-1}
    05:32:11.203 [main] DEBUG org.springframework.core.env.StandardEnvironment - Adding [Inlined Test Properties] PropertySource with highest search precedence
    
      .   ____          _            __ _ _
     /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
    ( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
     \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
      '  |____| .__|_| |_|_| |_\__, | / / / /
     =========|_|==============|___/=/_/_/_/
     :: Spring Boot ::        (v1.4.1.RELEASE)
    
    2016-09-30 05:32:11.899  INFO 13645 --- [           main] hello.GreetingControllerTests            : Starting GreetingControllerTests on LCHI091328 with PID 13645 (started by e13542 in /Users/e13542/github/house/fiddles/java/fiddle-0000-Template/template)
    2016-09-30 05:32:11.900  INFO 13645 --- [           main] hello.GreetingControllerTests            : No active profile set, falling back to default profiles: default
    2016-09-30 05:32:11.921  INFO 13645 --- [           main] o.s.w.c.s.GenericWebApplicationContext   : Refreshing org.springframework.web.context.support.GenericWebApplicationContext@1a75e76a: startup date [Fri Sep 30 05:32:11 EDT 2016]; root of context hierarchy
    2016-09-30 05:32:12.939  INFO 13645 --- [           main] o.s.b.t.m.w.SpringBootMockServletContext : Initializing Spring FrameworkServlet ''
    2016-09-30 05:32:12.939  INFO 13645 --- [           main] o.s.t.web.servlet.TestDispatcherServlet  : FrameworkServlet '': initialization started
    2016-09-30 05:32:13.101  INFO 13645 --- [           main] s.w.s.m.m.a.RequestMappingHandlerMapping : Mapped "{[/greeting]}" onto public hello.Greeting hello.GreetingController.greeting(java.lang.String)
    2016-09-30 05:32:13.104  INFO 13645 --- [           main] s.w.s.m.m.a.RequestMappingHandlerMapping : Mapped "{[/error]}" onto public org.springframework.http.ResponseEntity<java.util.Map<java.lang.String, java.lang.Object>> org.springframework.boot.autoconfigure.web.BasicErrorController.error(javax.servlet.http.HttpServletRequest)
    2016-09-30 05:32:13.104  INFO 13645 --- [           main] s.w.s.m.m.a.RequestMappingHandlerMapping : Mapped "{[/error],produces=[text/html]}" onto public org.springframework.web.servlet.ModelAndView org.springframework.boot.autoconfigure.web.BasicErrorController.errorHtml(javax.servlet.http.HttpServletRequest,javax.servlet.http.HttpServletResponse)
    2016-09-30 05:32:13.126  INFO 13645 --- [           main] o.s.w.s.handler.SimpleUrlHandlerMapping  : Mapped URL path [/webjars/**] onto handler of type [class org.springframework.web.servlet.resource.ResourceHttpRequestHandler]
    2016-09-30 05:32:13.126  INFO 13645 --- [           main] o.s.w.s.handler.SimpleUrlHandlerMapping  : Mapped URL path [/**] onto handler of type [class org.springframework.web.servlet.resource.ResourceHttpRequestHandler]
    2016-09-30 05:32:13.137  INFO 13645 --- [           main] o.s.w.s.handler.SimpleUrlHandlerMapping  : Mapped URL path [/**/favicon.ico] onto handler of type [class org.springframework.web.servlet.resource.ResourceHttpRequestHandler]
    2016-09-30 05:32:13.180  INFO 13645 --- [           main] s.w.s.m.m.a.RequestMappingHandlerAdapter : Looking for @ControllerAdvice: org.springframework.web.context.support.GenericWebApplicationContext@1a75e76a: startup date [Fri Sep 30 05:32:11 EDT 2016]; root of context hierarchy
    2016-09-30 05:32:13.259  INFO 13645 --- [           main] o.s.t.web.servlet.TestDispatcherServlet  : FrameworkServlet '': initialization completed in 320 ms
    2016-09-30 05:32:13.371  INFO 13645 --- [           main] hello.GreetingControllerTests            : Started GreetingControllerTests in 2.156 seconds (JVM running for 2.787)
    
    MockHttpServletRequest:
          HTTP Method = GET
          Request URI = /greeting
           Parameters = {}
              Headers = {}
    
    Handler:
                 Type = hello.GreetingController
               Method = public hello.Greeting hello.GreetingController.greeting(java.lang.String)
    
    Async:
        Async started = false
         Async result = null
    
    Resolved Exception:
                 Type = null
    
    ModelAndView:
            View name = null
                 View = null
                Model = null
    
    FlashMap:
           Attributes = null
    
    MockHttpServletResponse:
               Status = 200
        Error message = null
              Headers = {Content-Type=[application/json;charset=UTF-8]}
         Content type = application/json;charset=UTF-8
                 Body = {"id":1,"content":"Hello, World!"}
        Forwarded URL = null
       Redirected URL = null
              Cookies = []
    
    MockHttpServletRequest:
          HTTP Method = GET
          Request URI = /greeting
           Parameters = {name=[Spring Community]}
              Headers = {}
    
    Handler:
                 Type = hello.GreetingController
               Method = public hello.Greeting hello.GreetingController.greeting(java.lang.String)
    
    Async:
        Async started = false
         Async result = null
    
    Resolved Exception:
                 Type = null
    
    ModelAndView:
            View name = null
                 View = null
                Model = null
    
    FlashMap:
           Attributes = null
    
    MockHttpServletResponse:
               Status = 200
        Error message = null
              Headers = {Content-Type=[application/json;charset=UTF-8]}
         Content type = application/json;charset=UTF-8
                 Body = {"id":2,"content":"Hello, Spring Community!"}
        Forwarded URL = null
       Redirected URL = null
              Cookies = []
    Tests run: 2, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 2.385 sec - in hello.GreetingControllerTests
    2016-09-30 05:32:13.540  INFO 13645 --- [       Thread-1] o.s.w.c.s.GenericWebApplicationContext   : Closing org.springframework.web.context.support.GenericWebApplicationContext@1a75e76a: startup date [Fri Sep 30 05:32:11 EDT 2016]; root of context hierarchy
    
    Results :
    
    Tests run: 2, Failures: 0, Errors: 0, Skipped: 0
    
    [INFO]
    [INFO] --- maven-jar-plugin:2.6:jar (default-jar) @ gs-rest-service ---
    [INFO] Building jar: /Users/e13542/github/house/fiddles/java/fiddle-0000-Template/template/target/gs-rest-service-0.1.0.jar
    [INFO]
    [INFO] --- spring-boot-maven-plugin:1.4.1.RELEASE:repackage (default) @ gs-rest-service ---
    [INFO]
    [INFO] --- maven-install-plugin:2.5.2:install (default-install) @ gs-rest-service ---
    [INFO] Installing /Users/e13542/github/house/fiddles/java/fiddle-0000-Template/template/target/gs-rest-service-0.1.0.jar to /Users/e13542/.m2/repository/org/springframework/gs-rest-service/0.1.0/gs-rest-service-0.1.0.jar
    [INFO] Installing /Users/e13542/github/house/fiddles/java/fiddle-0000-Template/template/pom.xml to /Users/e13542/.m2/repository/org/springframework/gs-rest-service/0.1.0/gs-rest-service-0.1.0.pom
    [INFO] ------------------------------------------------------------------------
    [INFO] BUILD SUCCESS
    [INFO] ------------------------------------------------------------------------
    [INFO] Total time: 5.718 s
    [INFO] Finished at: 2016-09-30T05:32:14-05:00
    [INFO] Final Memory: 28M/339M
    [INFO] ------------------------------------------------------------------------
    ├────MAVEN INSTALL - SUCCESSFUL.
    ├────GRADLEWCHECK
    Download https://repo1.maven.org/maven2/org/springframework/boot/spring-boot-gradle-plugin/1.4.1.RELEASE/spring-boot-gradle-plugin-1.4.1.RELEASE.pom
    Download https://repo1.maven.org/maven2/io/spring/gradle/dependency-management-plugin/0.6.1.RELEASE/dependency-management-plugin-0.6.1.RELEASE.pom
    Download https://repo1.maven.org/maven2/org/springframework/boot/spring-boot-gradle-plugin/1.4.1.RELEASE/spring-boot-gradle-plugin-1.4.1.RELEASE.jar
    Download https://repo1.maven.org/maven2/io/spring/gradle/dependency-management-plugin/0.6.1.RELEASE/dependency-management-plugin-0.6.1.RELEASE.jar
    :compileJava
    :processResources UP-TO-DATE
    :classes
    :compileTestJava
    :processTestResources UP-TO-DATE
    :testClasses
    :test
    2016-09-30 05:32:27.687  INFO 13668 --- [       Thread-4] o.s.w.c.s.GenericWebApplicationContext   : Closing org.springframework.web.context.support.GenericWebApplicationContext@61ff5035: startup date [Fri Sep 30 05:32:26 EDT 2016]; root of context hierarchy
    :check
    
    BUILD SUCCESSFUL
    
    Total time: 13.161 secs
    
    This build could be faster, please consider using the Gradle Daemon: https://docs.gradle.org/2.13/userguide/gradle_daemon.html
    ├────GRADLEW CHECK - SUCCESSFUL.
    ├────"TEMPLATE" CREATED.
    └──FIDDLE-JAVA.SH

