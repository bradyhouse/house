Chef (create)
======

Executing the command `fiddle "create" "chef" "fiddle-0000-Template"` produces the following output.

    {{ ʕ・ɭ・ʔ }}
    
    FIDDLE-DELETE.SH
    
    FIDDLE-CREATE.SH
    bin/chef/_create.sh: line 18: _install.sh: No such file or directory
    FIDDLE-CREATE.SH
    Bash version 3.2.57(1)-release...
    11-25-18
    ├────KITCHENINIT
    ├────UPDATEKITCHENYML
    ├────CHEFCREATE
    Hyphens are discouraged in cookbook names as they may cause problems with custom resources. See https://docs.chef.io/ctl_chef.html#chef-generate-cookbook for more information.
    Generating cookbook fiddle-0000-Template
    - Ensuring correct cookbook file content
    - Ensuring delivery configuration
    - Ensuring correct delivery build cookbook content
    
    Your cookbook is ready. Type `cd fiddle-0000-Template` to enter it.
    
    There are several commands you can run to get started locally developing and testing your cookbook.
    Type `delivery local --help` to see a full list.
    
    Why not start by writing a test? Tests for the default recipe are stored at:
    
    test/integration/default/default_test.rb
    
    If you'd prefer to dive right in, the default recipe can be found at:
    
    recipes/default.rb
    
    Recipe: code_generator::cookbook_file
      * directory[/Users/bradyhouse/github/house_262/fiddles/chef/fiddle-0000-Template/files/default] action create
        - create new directory /Users/bradyhouse/github/house_262/fiddles/chef/fiddle-0000-Template/files/default
      * template[/Users/bradyhouse/github/house_262/fiddles/chef/fiddle-0000-Template/files/default/motd] action create
        - create new file /Users/bradyhouse/github/house_262/fiddles/chef/fiddle-0000-Template/files/default/motd
        - update content in file /Users/bradyhouse/github/house_262/fiddles/chef/fiddle-0000-Template/files/default/motd from none to e3b0c4
        (diff output suppressed by config)
    └──
    
    └──".FIDDLES/CHEF/FIDDLE-0000-TEMPLATE" CREATED.
    
    
    FIDDLE-INDEX.SH
    11-25-18
