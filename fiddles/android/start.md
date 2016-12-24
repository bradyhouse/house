Android (start)
======

Executing the command `./fiddle.sh "start" "android" "0000"` from the `scripts` directory produces the following output.

    {{ ʕ・ɭ・ʔ }}
    FIDDLE.SH
    FIDDLE-START.SH
    ├────STARTSERVER
    ├────ANDROIDSTART
    ├────STARTEMULATOR
    appending output to nohup.out
    ├────GRADLEWINSTALLDEBUG
    Observed package id '..;..;..;var;lib;android-sdk;samples;android-19' in inconsistent location '/usr/local/Cellar/android-sdk/24.1.2/samples/android-19' (Expected '/usr/local/Cellar/android-sdk/24.1.2/../../../var/lib/android-sdk/samples/android-19')
    Observed package id '..;..;..;var;lib;android-sdk;samples;android-23' in inconsistent location '/usr/local/Cellar/android-sdk/24.1.2/samples/android-23' (Expected '/usr/local/Cellar/android-sdk/24.1.2/../../../var/lib/android-sdk/samples/android-23')
    Incremental java compilation is an incubating feature.
    :preBuild UP-TO-DATE
    :preDebugBuild UP-TO-DATE
    :checkDebugManifest
    :prepareDebugDependencies
    :compileDebugAidl UP-TO-DATE
    :compileDebugRenderscript UP-TO-DATE
    :generateDebugBuildConfig UP-TO-DATE
    :mergeDebugShaders UP-TO-DATE
    :compileDebugShaders UP-TO-DATE
    :generateDebugAssets UP-TO-DATE
    :mergeDebugAssets UP-TO-DATE
    :generateDebugResValues UP-TO-DATE
    :generateDebugResources UP-TO-DATE
    :mergeDebugResources UP-TO-DATE
    :processDebugManifest UP-TO-DATE
    :processDebugResources UP-TO-DATE
    :generateDebugSources UP-TO-DATE
    :incrementalDebugJavaCompilationSafeguard UP-TO-DATE
    :compileDebugJavaWithJavac UP-TO-DATE
    :compileDebugNdk UP-TO-DATE
    :compileDebugSources UP-TO-DATE
    :prePackageMarkerForDebug
    :transformClassesWithDexForDebug UP-TO-DATE
    :mergeDebugJniLibFolders UP-TO-DATE
    :transformNative_libsWithMergeJniLibsForDebug UP-TO-DATE
    :processDebugJavaRes UP-TO-DATE
    :transformResourcesWithMergeJavaResForDebug UP-TO-DATE
    :validateDebugSigning
    :packageDebug UP-TO-DATE
    :zipalignDebug UP-TO-DATE
    :assembleDebug UP-TO-DATE
    :installDebug
    Installing APK 'template-debug.apk' on '320480QVGA(AVD) - 6.0' for template:debug
    Installed on 1 device.
    
    BUILD SUCCESSFUL
    
    Total time: 13.585 secs
    
    This build could be faster, please consider using the Gradle Daemon: https://docs.gradle.org/2.10/userguide/gradle_daemon.html
    ├────GRADLEW RUN - SUCCESSFUL.
    

Once the process completes, the configured emulator should be started and the `Template` app installed.

![Emulator Screenshot](resources/emulator-template-app.png)






