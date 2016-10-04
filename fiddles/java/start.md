Java (start)
======

Executing the command `./fiddle.sh "start" "java" "0000"` from the `scripts` directory produces the following output.

    H o u s e
    oooooooooooo  o8o        .o8        .o8  oooo
     888       8  `"'        888        888   888
     888         oooo   .oooo888   .oooo888   888   .ooooo.
     888oooo8     888  d88   888  d88   888   888  d88   88b
     888          888  888   888  888   888   888  888ooo888
     888          888  888   888  888   888   888  888    .o
    o888o        o888o  Y8bod88P   Y8bod88P  o888o  Y8bod8P
    
    FIDDLE.SH
    FIDDLE-START.SH
    ├────STARTSERVER
    ├────JAVASTART
    ├────GRADLEWRUN
    :compileJava UP-TO-DATE
    :processResources UP-TO-DATE
    :classes UP-TO-DATE
    :findMainClass
    :bootRun
    
      .   ____          _            __ _ _
     /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
    ( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
     \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
      '  |____| .__|_| |_|_| |_\__, | / / / /
     =========|_|==============|___/=/_/_/_/
     :: Spring Boot ::        (v1.4.1.RELEASE)
    
    2016-10-04 06:48:17.420  INFO 76372 --- [           main] hello.Application                        : Starting Application on LCHI091328 with PID 76372 (/Users/bradyhouse/github/house/fiddles/java/fiddle-0000-Template/template/build/classes/main started by bradyhouse in /Users/bradyhouse/github/house/fiddles/java/fiddle-0000-Template/template)
    2016-10-04 06:48:17.423  INFO 76372 --- [           main] hello.Application                        : No active profile set, falling back to default profiles: default
    2016-10-04 06:48:17.477  INFO 76372 --- [           main] ationConfigEmbeddedWebApplicationContext : Refreshing org.springframework.boot.context.embedded.AnnotationConfigEmbeddedWebApplicationContext@5a63f509: startup date [Tue Oct 04 06:48:17 CDT 2016]; root of context hierarchy
    2016-10-04 06:48:18.527  INFO 76372 --- [           main] s.b.c.e.t.TomcatEmbeddedServletContainer : Tomcat initialized with port(s): 8080 (http)
    2016-10-04 06:48:18.538  INFO 76372 --- [           main] o.apache.catalina.core.StandardService   : Starting service Tomcat
    2016-10-04 06:48:18.539  INFO 76372 --- [           main] org.apache.catalina.core.StandardEngine  : Starting Servlet Engine: Apache Tomcat/8.5.5
    2016-10-04 06:48:18.621  INFO 76372 --- [ost-startStop-1] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
    2016-10-04 06:48:18.621  INFO 76372 --- [ost-startStop-1] o.s.web.context.ContextLoader            : Root WebApplicationContext: initialization completed in 1147 ms
    2016-10-04 06:48:18.724  INFO 76372 --- [ost-startStop-1] o.s.b.w.servlet.ServletRegistrationBean  : Mapping servlet: 'dispatcherServlet' to [/]
    2016-10-04 06:48:18.727  INFO 76372 --- [ost-startStop-1] o.s.b.w.servlet.FilterRegistrationBean   : Mapping filter: 'characterEncodingFilter' to: [/*]
    2016-10-04 06:48:18.728  INFO 76372 --- [ost-startStop-1] o.s.b.w.servlet.FilterRegistrationBean   : Mapping filter: 'hiddenHttpMethodFilter' to: [/*]
    2016-10-04 06:48:18.728  INFO 76372 --- [ost-startStop-1] o.s.b.w.servlet.FilterRegistrationBean   : Mapping filter: 'httpPutFormContentFilter' to: [/*]
    2016-10-04 06:48:18.728  INFO 76372 --- [ost-startStop-1] o.s.b.w.servlet.FilterRegistrationBean   : Mapping filter: 'requestContextFilter' to: [/*]
    2016-10-04 06:48:18.951  INFO 76372 --- [           main] s.w.s.m.m.a.RequestMappingHandlerAdapter : Looking for @ControllerAdvice: org.springframework.boot.context.embedded.AnnotationConfigEmbeddedWebApplicationContext@5a63f509: startup date [Tue Oct 04 06:48:17 CDT 2016]; root of context hierarchy
    2016-10-04 06:48:19.022  INFO 76372 --- [           main] s.w.s.m.m.a.RequestMappingHandlerMapping : Mapped "{[/greeting]}" onto public hello.Greeting hello.GreetingController.greeting(java.lang.String)
    2016-10-04 06:48:19.025  INFO 76372 --- [           main] s.w.s.m.m.a.RequestMappingHandlerMapping : Mapped "{[/error]}" onto public org.springframework.http.ResponseEntity<java.util.Map<java.lang.String, java.lang.Object>> org.springframework.boot.autoconfigure.web.BasicErrorController.error(javax.servlet.http.HttpServletRequest)
    2016-10-04 06:48:19.026  INFO 76372 --- [           main] s.w.s.m.m.a.RequestMappingHandlerMapping : Mapped "{[/error],produces=[text/html]}" onto public org.springframework.web.servlet.ModelAndView org.springframework.boot.autoconfigure.web.BasicErrorController.errorHtml(javax.servlet.http.HttpServletRequest,javax.servlet.http.HttpServletResponse)
    2016-10-04 06:48:19.048  INFO 76372 --- [           main] o.s.w.s.handler.SimpleUrlHandlerMapping  : Mapped URL path [/webjars/**] onto handler of type [class org.springframework.web.servlet.resource.ResourceHttpRequestHandler]
    2016-10-04 06:48:19.049  INFO 76372 --- [           main] o.s.w.s.handler.SimpleUrlHandlerMapping  : Mapped URL path [/**] onto handler of type [class org.springframework.web.servlet.resource.ResourceHttpRequestHandler]
    2016-10-04 06:48:19.077  INFO 76372 --- [           main] o.s.w.s.handler.SimpleUrlHandlerMapping  : Mapped URL path [/**/favicon.ico] onto handler of type [class org.springframework.web.servlet.resource.ResourceHttpRequestHandler]
    2016-10-04 06:48:19.192  INFO 76372 --- [           main] o.s.j.e.a.AnnotationMBeanExporter        : Registering beans for JMX exposure on startup
    2016-10-04 06:48:19.275  INFO 76372 --- [           main] s.b.c.e.t.TomcatEmbeddedServletContainer : Tomcat started on port(s): 8080 (http)
    2016-10-04 06:48:19.281  INFO 76372 --- [           main] hello.Application                        : Started Application in 2.335 seconds (JVM running for 2.666)
    > Building 80% > :bootRun
 
While the command is running, startup a web-browser and checkout `localhost:8080/greeting`.  Should see the following output:

    {"id":1,"content":"Hello, World!"}






