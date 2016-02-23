fiddle-0010-PhoneCatStep6
======


### Title

Angular PhoneCat (Step 6)


### Creation Date

02-21-16


### Location

Chicago, IL


### Description

Fiddle based on step 6 of the [Angular PhoneCat Tutorial App](https://docs.angularjs.org/tutorial/step_06).


### Dependencies

In order to run this fiddle, your machine needs to be configured with the apps and/or libraries:

 *  [Node.js v0.10.27+](http://nodejs.org/)


### Setup / Startup

1.  execute [setup.sh](setup.sh)
    * This will:
        1.  clone the angular-phonecat repo @ step 14
        2.  checkout step 4
        3.  install the repo's dependencies
        4.  update the web driver

2.  execute [run.sh](run.sh)
    * This will:
        1.  startup an instance of the project on port 8000
3.  startup chrome (or firefox) and navigate to [http://localhost:8000/app/](http://localhost:8000/app/)


### End 2 End Test

* To kickoff protractor, execute the following command:

        test.sh "e2e"


### Unit Test

* To kickoff karma, execute the following command:

        test.sh "unit"


### Tags

angular 1.5.1, phonecat, step 0, node.js-v0.10.27+, karma, protractor, ngsrc, http


### Forked From

[fiddle-0009-PhoneCatStep5](../fiddle-0009-PhoneCatStep5)
