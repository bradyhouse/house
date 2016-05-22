fiddle-0084-NativeScript
======

### Title

Install / Create / Start NativeScript Project


### Creation Date

05-22-16


### Location

Chicago, IL


### Description

This POC explores how to use the [angular2 advanced seeder](https://github.com/NathanWalker/angular2-seed-advanced)
as starting point for a new [nativeScript](https://www.nativescript.org/) project.  

**NOTE - Using this seeder is bit painful in that Node ver 5.0 is required to install all of the project dependencies. 
However, Node ver 4.* is required to actually run the nativeScript pieces.  For this reason, this script incorporates
nvm calls to swap between versions.**


### Prerequisites

In order to execute the [run.sh](run.sh) successfully, your machine should be configured with:

*   [node version manager](https://github.com/creationix/nvm)
*   node version 5
*   node version 4.2.6
*   [Android Debug Bridge](https://developer.android.com/studio/index.html)

If any of these pre-requisites are not met, then the `run.sh` script throws an error and will not complete.  


### Tags

bash, angular2, npm, nvm, navescript, typescript, node 4.2.6, node 5.0, adb
