#NativeScript

┌─────────┬─────────────────────────────────────────────────────────────────────┐
│ Usage   │ Synopsis                                                            │
│ General │ $ tns <Command> [Command Parameters] [--command <Options>]          │
│ Alias   │ $ nativescript <Command> [Command Parameters] [--command <Options>] │
└─────────┴─────────────────────────────────────────────────────────────────────┘

## General Commands

┌─────────────────┬───────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Command         │ Description                                                                                                   │
│ help <Command>  │ Shows additional information about the commands in this list in the browser.                                  │
│ autocomplete    │ Configures your current command-line completion settings.                                                     │
│ usage-reporting │ Configures anonymous usage reporting for the NativeScript CLI.                                                │
│ error-reporting │ Configures anonymous error reporting for the NativeScript CLI.                                                │
│ doctor          │ Checks your system for configuration problems which might prevent the NativeScript CLI from working properly. │
│ info            │ Displays version information about the NativeScript CLI, core modules, and runtimes.                          │
└─────────────────┴───────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

## Project Development Commands

┌──────────────────┬────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Command          │ Description                                                                                                        │
│ create           │ Creates a new project for native development with NativeScript.                                                    │
│ init             │ Initializes an existing project for native development with NativeScript.                                          │
│ platform add     │ Configures the current project to target the selected platform.                                                    │
│ <Platform>       │                                                                                                                    │
│ platform list    │ Lists all platforms that the project currently targets.                                                            │
│ platform remove  │ Removes the selected platform from the platforms that the project currently targets. This operation deletes all    │
│ <Platform>       │ platform-specific files and subdirectories from your project.                                                      │
│ platform update  │ Updates the NativeScript runtime for the specified platform.                                                       │
│ <Platform>       │                                                                                                                    │
│ prepare          │ Copies relevant content from the app directory to the subdirectory for the selected target platform to let you     │
│ <Platform>       │ build the project.                                                                                                 │
│ build <Platform> │ Builds the project for the selected target platform and produces an application package or an emulator package.    │
│ deploy <Platform │ Deploys the project to a connected physical or virtual device.                                                     │
│ >                │                                                                                                                    │
│ emulate          │ Deploys the project in the native emulator for the selected target platform.                                       │
│ <Platform>       │                                                                                                                    │
│ run <Platform>   │ Runs your project on a connected device or in the native emulator, if configured.                                  │
│ debug <Platform> │ Debugs your project on a connected physical or virtual device.                                                     │
│ test init        │ Configures your project for unit testing with a selected framework.                                                │
│ test <Platform>  │ Runs the unit tests in your project on a connected physical or virtual device.                                     │
│ install          │ Installs all platforms and dependencies described in the package.json file in the current directory.               │
│ plugin           │ Lets you manage the plugins for your project.                                                                      │
│ livesync         │ Synchronizes the latest changes in your project to devices.                                                        │
└──────────────────┴────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

## Publishing Commands

┌─────────────────┬──────────────────────────────────────────────────┐
│ Command         │ Description                                      │
│ appstore        │ Lists applications registered in iTunes Connect. │
│ appstore upload │ Uploads project to iTunes Connect.               │
└─────────────────┴──────────────────────────────────────────────────┘

## Device Commands

┌──────────────────────────┬─────────────────────────────────────────────────────────────┐
│ Command                  │ Description                                                 │
│ device                   │ Lists all recognized connected physical or virtual devices. │
│ device log               │ Opens the log stream for the selected device.               │
│ device run               │ Runs the selected application on a connected device.        │
│ device list-applications │ Lists the installed applications on all connected devices.  │
└──────────────────────────┴─────────────────────────────────────────────────────────────┘

## Global Options

┌────────────────┬──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Option         │ Description                                                                                                          │
│ --help, -h, /? │ Prints help about the selected command in the console.                                                               │
│ --path         │ Specifies the directory that contains the project. If not set, the project is searched for in the current directory  │
│ <Directory>    │ and all directories above it.                                                                                        │
│ --version      │ Prints the client version.                                                                                           │
│ --log trace    │ Prints a detailed diagnostic log for the execution of the current command.                                           │
└────────────────┴──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
