bin
=====

In Unix land, "bin" stands for "binaries".  Such directories usually contain certain fundamental utilities, such as ls or cp 
([Wikipedia](https://en.wikipedia.org/wiki/Unix_filesystem#Conventional_directory_layout)). In this case, it contains "fundamental" utilities referenced (or consumed) by scripts 
residing in the parent scripts directory.  If a particular script requires input parameters, these parameters
can be determined by running the script without any parameters.  By convention, all scripts requiring input parameters
display usage details when no parameters are passed.

    
    
