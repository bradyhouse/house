Chef (delete)
======

Executing the command `fiddle.sh "delete" "chef" "0000"` produces the following output.

    {{ ʕ・ɭ・ʔ }}
    
    FIDDLE-DELETE.SH
    
    fiddle type:	chef
    fiddle name:	fiddle-0000-Template
    
    Are you sure you want to delete this fiddle? [Y/n] y


Enter `Y` and press [Enter].  This will produce the following output:

    ├────DELETEFIDDLE
    -----> Starting Kitchen (v1.23.2)
    -----> Destroying <default-centos65>...
           ==> default: Forcing shutdown of VM...
           ==> default: Destroying VM and associated drives...
           Vagrant instance <default-centos65> destroyed.
           Finished destroying <default-centos65> (0m6.53s).
    -----> Kitchen is finished. (0m11.59s)
    └──"" DELETE.
    
    The "fiddle-0000-Template" chef fiddle has been deleted successfully.
    FIDDLE-INDEX.SH
    11-25-18
      
      
      



