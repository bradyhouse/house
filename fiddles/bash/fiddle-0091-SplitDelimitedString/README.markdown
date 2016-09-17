fiddle-0091-SplitDelimitedString
======

### Title

Splitting a Delimited String


### Creation Date

09-16-16


### Location

Chicago, IL


### Issue

[Issue #62](https://github.com/bradyhouse/house/issues/62)


### Description

I awoke this morning with a recurring question: _How do you split a delimited string in bash shell???_. This
POC answers this question. It adds a `parseName` and `split` function to the existing [_util.sh](/Users/e13542/github/house/scripts/bin/_utils.sh) script.
The `parseName` function accepts a single input string of the form `fiddle-####-<name>`. For example, "fiddle-0010-CrossCom".
The `split` function accepts two input parameters the target string and the string delimiter and returns an array. The `parseName` function
invokes the `split` function passing `-` as the delimiter.  It then returns the second element of result. For example, `parseName fiddle-0010-CrossCom` returns `CrossCom`. To see this in action, execute the
`run.sh` script in the root directory.  Finally for additional reference, see [Stack Overflow > Question 918886](http://stackoverflow.com/questions/918886/how-do-i-split-a-string-on-a-delimiter-in-bash#918931).


### Tags

bash, array
