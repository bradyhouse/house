fiddle-0004-IntFloatConversion
======

### Title

intfloatconversion


### Creation Date

12-05-16


### Location

Chicago, IL


### Issue

[Issue 93](https://github.com/bradyhouse/house/issues/93)


### Description

Create a fiddle based on Program 4.5 from Stephen Kochan's book [Programming in C (Developer's Library) 4th Edition](http://a.co/1QJ9MDN).  This program demonstrates how convert between integer and float.


### Use Case

Navigate to the scripts directory and execute the following command:

    ./fiddle.sh "start" "c" "0004"
    
This should produce the following output:

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
    ├────GCCSTART
    ├────INVOKING EXECUTABLE
    123.125000 assigned to an int produce 123
    -150 assigned to a float produces -150.000000
    -150 divided by 100 produces -1.000000
    -150 divided by 100.0 produces -1.500000
    (float) -150 divided by 100 produces -1.500000


### Tags

gcc, c
