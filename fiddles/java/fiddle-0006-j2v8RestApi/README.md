fiddle-0006-j2v8RestApi
======

### Title<a name="title"></a>

j2v8 hello world


### Creation Date<a name="creation-date"></a>

09-27-19


### Location<a name="location"></a>

Chicago, IL


### Issue<a name="issue"></a>

[315](https://github.com/bradyhouse/house/issues/315)


### Description<a name="description"></a>

Meanwhile in Java land, got a weird one: `Can node be run inside the JVM?`  Of course. pick your framework.  As a starting point, test out [j2v8](https://eclipsesource.com/blogs/tutorials/getting-started-with-j2v8/).  


### Pre-Requisites<a name="pre-req">

In order to run this fiddle, your mac should be configured with java 1.8+ and maven 3.3+.  To verify this configuration, from a command prompt run the following 
commands:

*   `java -version`
*   `mvn -version`

### Use Case<a name="use-case"></a>

1.  Open a command prompt and navigate to the project root directory
2.  Using maven install all dependencies -- `mvn install`

        ```
        [INFO] Scanning for projects...
        [WARNING]
        [WARNING] Some problems were encountered while building the effective model for org.springframework:fiddle:jar:0.1.0
        [WARNING] 'build.plugins.plugin.version' for org.apache.maven.plugins:maven-jar-plugin is missing. @ line 23, column 14
        [WARNING] 'build.plugins.plugin.version' for org.apache.maven.plugins:maven-shade-plugin is missing. @ line 34, column 14
        [WARNING]
        [WARNING] It is highly recommended to fix these problems because they threaten the stability of your build.
        [WARNING]
        [WARNING] For this reason, future Maven versions might no longer support building such malformed projects.
        [WARNING]
        [INFO]
        [INFO] ------------------------------------------------------------------------
        [INFO] Building fiddle 0.1.0
        [INFO] ------------------------------------------------------------------------
        [INFO]
        [INFO] --- maven-resources-plugin:2.6:resources (default-resources) @ fiddle ---
        [INFO] Using 'UTF-8' encoding to copy filtered resources.
        [INFO] Copying 1 resource
        [INFO]
        [INFO] --- maven-compiler-plugin:3.1:compile (default-compile) @ fiddle ---
        [INFO] Nothing to compile - all classes are up to date
        [INFO]
        [INFO] --- maven-resources-plugin:2.6:testResources (default-testResources) @ fiddle ---
        [INFO] Using 'UTF-8' encoding to copy filtered resources.
        [INFO] skip non existing resourceDirectory /Users/bradyhouse/github/house_315/fiddles/java/fiddle-0006-j2v8RestApi/j2v8hello/src/test/resources
        [INFO]
        [INFO] --- maven-compiler-plugin:3.1:testCompile (default-testCompile) @ fiddle ---
        [INFO] No sources to compile
        [INFO]
        [INFO] --- maven-surefire-plugin:2.12.4:test (default-test) @ fiddle ---
        [INFO]
        [INFO] --- maven-jar-plugin:2.4:jar (default-jar) @ fiddle ---
        [INFO] Building jar: /Users/bradyhouse/github/house_315/fiddles/java/fiddle-0006-j2v8RestApi/j2v8hello/target/fiddle-0.1.0.jar
        [INFO]
        [INFO] --- maven-shade-plugin:3.2.1:shade (default) @ fiddle ---
        [INFO] Including com.eclipsesource.j2v8:j2v8_macosx_x86_64:jar:4.6.0 in the shaded jar.
        [INFO] Replacing original artifact with shaded artifact.
        [INFO] Replacing /Users/bradyhouse/github/house_315/fiddles/java/fiddle-0006-j2v8RestApi/j2v8hello/target/fiddle-0.1.0.jar with /Users/bradyhouse/github/house_315/fiddles/java/fiddle-0006-j2v8RestApi/j2v8hello/target/fiddle-0.1.0-shaded.jar
        [INFO]
        [INFO] --- maven-install-plugin:2.4:install (default-install) @ fiddle ---
        [INFO] Installing /Users/bradyhouse/github/house_315/fiddles/java/fiddle-0006-j2v8RestApi/j2v8hello/target/fiddle-0.1.0.jar to /Users/bradyhouse/.m2/repository/org/springframework/fiddle/0.1.0/fiddle-0.1.0.jar
        [INFO] Installing /Users/bradyhouse/github/house_315/fiddles/java/fiddle-0006-j2v8RestApi/j2v8hello/pom.xml to /Users/bradyhouse/.m2/repository/org/springframework/fiddle/0.1.0/fiddle-0.1.0.pom
        [INFO] ------------------------------------------------------------------------
        [INFO] BUILD SUCCESS
        [INFO] ------------------------------------------------------------------------
        [INFO] Total time: 3.639 s
        [INFO] Finished at: 2019-09-28T08:50:55-05:00
        [INFO] Final Memory: 12M/226M
        [INFO] ------------------------------------------------------------------------
        ```

3.  Navigate to the target directory
4.  Execute the resulting jar -- `java -jar fiddle-0.1.0.jar`
    
        Server running at https://127.0.0.1:8000/

5.  Open a web browser and navigate to "localhost:8000"

    ![Screenshot](screenshot.png)


### Tags<a name="tags"></a>

java, maven, maven-jar-plugin, maven-shade-plugin, j2v8_macosx_x86_64


### Forked From

[fiddle-0006-j2v8RestApi](../fiddle-0005-j2v8Hello)
