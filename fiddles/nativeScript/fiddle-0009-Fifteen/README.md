fiddle-0009-Fifteen
======

![Screenshot](http://i.imgur.com/JPlDpIh.gif)


### Title

{15} Puzzle


### Creation Date

10-04-16


### Location

Chicago, IL


### Issue

[Issue 84](https://github.com/bradyhouse/house/issues/84)


### Published Version Link

* [Google Play](https://play.google.com/store/apps/details?id=org.nativescript.puzzle)
* [App Store](https://itunes.apple.com/us/app/15-puzzle/id1180443503?mt=8)


### Description

Explore how to integrate SqliteDb into a nativeScript app.  Use the [nativescript-sqlite](https://www.npmjs.com/package/nativescript-sqlite) lib.  As a starting point, extend  (fork) [NativeScript Fiddle #8](https://github.com/bradyhouse/house/tree/master/fiddles/nativeScript/fiddle-0008-FifteenPuzzle).  Enhance the game with a classic (old school arcade) high score feature that makes use of the database. When the user wins a given level, the game should: 

1.  Query the database for the existing highest score for that level
2.  If the user's score is higher, then prompt the user to record a high score
3.  After the user enter's their name (or 30 character string), write the value and their score to the database

Finally, once this fiddle is complete, it should be ready to publish to both app store and google play.


### Use Case

1.  Using your terminal app of choice navigate to the `scripts` directory
2.  Startup the POC `fiddle.sh "start" "nativeScript" 0009`


### Tags

{N}, nativescript, nativescript-sqlite, nativescript-vibrator


### Forked From

[fiddle-0008-FifteenPuzzle](../fiddle-0008-FifteenPuzzle)
