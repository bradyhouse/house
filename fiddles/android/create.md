Android (create)
======

Executing the command `./fiddle.sh "create" "android" "fiddle-0000-Template"` produces the following output.

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
      
      FIDDLE-CREATE.SH
      ┌──FIDDLE-ANDROID.SH
      ├────APP NAME:
      "template"
      ├────ANDROIDCREATE
      ├────INITFIDDLEDIRECTORY
      ├────INITFIDDLECONFIGFILE
      Password:
      ├────INITANDROIDPROJECT
      Created project directory: template
      Created directory /Users/bradyhouse/github/house/fiddles/android/fiddle-0000-Template/template/src/main/java
      Created directory /Users/bradyhouse/github/house/fiddles/android/fiddle-0000-Template/template/src/main/java/fiddle/android
      Added file template/src/main/java/fiddle/android/Template.java
      Created directory /Users/bradyhouse/github/house/fiddles/android/fiddle-0000-Template/template/src/androidTest/java
      Created directory /Users/bradyhouse/github/house/fiddles/android/fiddle-0000-Template/template/src/androidTest/java/fiddle/android
      Added file template/src/androidTest/java/fiddle/android/TemplateTest.java
      Created directory /Users/bradyhouse/github/house/fiddles/android/fiddle-0000-Template/template/src/main/res
      Created directory /Users/bradyhouse/github/house/fiddles/android/fiddle-0000-Template/template/src/main/res/values
      Added file template/src/main/res/values/strings.xml
      Created directory /Users/bradyhouse/github/house/fiddles/android/fiddle-0000-Template/template/src/main/res/layout
      Added file template/src/main/res/layout/main.xml
      Created directory /Users/bradyhouse/github/house/fiddles/android/fiddle-0000-Template/template/src/main/res/drawable-xhdpi
      Created directory /Users/bradyhouse/github/house/fiddles/android/fiddle-0000-Template/template/src/main/res/drawable-hdpi
      Created directory /Users/bradyhouse/github/house/fiddles/android/fiddle-0000-Template/template/src/main/res/drawable-mdpi
      Created directory /Users/bradyhouse/github/house/fiddles/android/fiddle-0000-Template/template/src/main/res/drawable-ldpi
      Added file template/src/main/AndroidManifest.xml
      Added file template/build.gradle
      Created directory /Users/bradyhouse/github/house/fiddles/android/fiddle-0000-Template/template/gradle/wrapper
      ├────ANDROID PROJECT, "TEMPLATE", CREATED
      ├────INITGRADLECONFIG
      ├────GRADLEW CHECK - SUCCESSFUL.
      ├────INITGRADLE
      Observed package id '..;..;..;var;lib;android-sdk;samples;android-19' in inconsistent location '/usr/local/Cellar/android-sdk/24.1.2/samples/android-19' (Expected '/usr/local/Cellar/android-sdk/24.1.2/../../../var/lib/android-sdk/samples/android-19')
      Observed package id '..;..;..;var;lib;android-sdk;samples;android-23' in inconsistent location '/usr/local/Cellar/android-sdk/24.1.2/samples/android-23' (Expected '/usr/local/Cellar/android-sdk/24.1.2/../../../var/lib/android-sdk/samples/android-23')
      Incremental java compilation is an incubating feature.
      :preBuild UP-TO-DATE
      :preDebugBuild UP-TO-DATE
      :checkDebugManifest
      :prepareDebugDependencies
      :compileDebugAidl
      :compileDebugRenderscript
      :generateDebugBuildConfig
      :mergeDebugShaders
      :compileDebugShaders
      :generateDebugAssets
      :mergeDebugAssets
      :generateDebugResValues
      :generateDebugResources
      :mergeDebugResources
      :processDebugManifest
      :processDebugResources
      :generateDebugSources
      :incrementalDebugJavaCompilationSafeguard
      :compileDebugJavaWithJavac
      :compileDebugJavaWithJavac - is not incremental (e.g. outputs have changed, no previous execution, etc.).
      :compileLint
      :preReleaseBuild UP-TO-DATE
      :checkReleaseManifest
      :prepareReleaseDependencies
      :compileReleaseAidl
      :compileReleaseRenderscript
      :generateReleaseBuildConfig
      :mergeReleaseShaders
      :compileReleaseShaders
      :generateReleaseAssets
      :mergeReleaseAssets
      :generateReleaseResValues
      :generateReleaseResources
      :mergeReleaseResources
      :processReleaseManifest
      :processReleaseResources
      :generateReleaseSources
      :incrementalReleaseJavaCompilationSafeguard
      :compileReleaseJavaWithJavac
      :compileReleaseJavaWithJavac - is not incremental (e.g. outputs have changed, no previous execution, etc.).
      :lint
      Ran lint on variant release: 5 issues found
      Ran lint on variant debug: 5 issues found
      Wrote HTML report to file:///Users/bradyhouse/github/house/fiddles/android/fiddle-0000-Template/template/build/outputs/lint-results-debug.html
      Wrote XML report to file:///Users/bradyhouse/github/house/fiddles/android/fiddle-0000-Template/template/build/outputs/lint-results-debug.xml
      :incrementalDebugUnitTestJavaCompilationSafeguard UP-TO-DATE
      :preDebugUnitTestBuild UP-TO-DATE
      :prepareDebugUnitTestDependencies
      :compileDebugUnitTestJavaWithJavac UP-TO-DATE
      :processDebugJavaRes UP-TO-DATE
      :processDebugUnitTestJavaRes UP-TO-DATE
      :compileDebugUnitTestSources UP-TO-DATE
      :mockableAndroidJar
      :assembleDebugUnitTest
      :testDebugUnitTest
      :incrementalReleaseUnitTestJavaCompilationSafeguard UP-TO-DATE
      :preReleaseUnitTestBuild UP-TO-DATE
      :prepareReleaseUnitTestDependencies
      :compileReleaseUnitTestJavaWithJavac UP-TO-DATE
      :processReleaseJavaRes UP-TO-DATE
      :processReleaseUnitTestJavaRes UP-TO-DATE
      :compileReleaseUnitTestSources UP-TO-DATE
      :assembleReleaseUnitTest
      :testReleaseUnitTest
      :test
      :check
      
      BUILD SUCCESSFUL
      
      Total time: 14.987 secs
      
      This build could be faster, please consider using the Gradle Daemon: https://docs.gradle.org/2.10/userguide/gradle_daemon.html
      ├────GRADLEW CHECK - SUCCESSFUL.
      ├────"FIDDLE-0000-TEMPLATE" CREATED.
      └──FIDDLE-ANDROID.SH
