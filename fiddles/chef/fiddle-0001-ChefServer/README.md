fiddle-0001-ChefServer
======

### Title

Chef Server


### Creation Date

11-27-18


### Location

Chicago, IL


### Issue

[Issue 270](https://github.com/bradyhouse/house/issues/270)


### Description

Mischa Taylor and Seth Vargo in chapter 9 of their book, [Learning Chef A Guide To Configuration Management and Automation](http://www.learningchef.com/), 
outline how to use Chef to install and configure Chef Server.  This fiddle is an adaptation of this material. Finally, 
this fiddle provides examples of the following chef recipe `ingredients`.

[remote_file](https://docs.chef.io/resource_remote_file.html)
[package](https://docs.chef.io/resource_package.html)
[execute](https://docs.chef.io/resource_execute.html)
[cookbook_file](https://docs.chef.io/resource_cookbook_file.html)
[File.basename()](https://apidock.com/ruby/File/basename/class)


### Use Case (Mac OS)

1.  Complete the Mac OS [fiddle bash setup procedure](https://github.com/bradyhouse/house/wiki/Setup-(Mac-OS))
2.  Open a terminal window and enter the command. _Note - this process can take up to 15 minutes to complete 
    depending on your internet bandwidth._

    `fiddle start chef 0001`

    The output should looks like this:
    
        {{ ʕ・ɭ・ʔ }}
        
        FIDDLE-START.SH
        ├────STARTSERVER
        ├────KITCHENINIT
        ├────UPDATEKITCHENYML
        ├────CHEFSTART
        ├────KITCHENCONVERGE
        -----> Starting Kitchen (v1.23.2)
        -----> Creating <default-centos65>...
               Bringing machine 'default' up with 'virtualbox' provider...
               ==> default: Importing base box 'learningchef/centos65'...
        ==> default: Matching MAC address for NAT networking...
               ==> default: Checking if box 'learningchef/centos65' is up to date...
               ==> default: Setting the name of the VM: kitchen-fiddle-0001-ChefServer-default-centos65
               ==> default: Clearing any previously set network interfaces...
               ==> default: Preparing network interfaces based on configuration...
                   default: Adapter 1: nat
                   default: Adapter 2: hostonly
               ==> default: Forwarding ports...
                   default: 22 (guest) => 2222 (host) (adapter 1)
               ==> default: Running 'pre-boot' VM customizations...
               ==> default: Booting VM...
               ==> default: Waiting for machine to boot. This may take a few minutes...
                   default: SSH address: 127.0.0.1:2222
                   default: SSH username: vagrant
                   default: SSH auth method: private key
                   default:
                   default: Vagrant insecure key detected. Vagrant will automatically replace
                   default: this with a newly generated keypair for better security.
                   default:
                   default: Inserting generated public key within guest...
                   default: Removing insecure key from the guest if it's present...
                   default: Key inserted! Disconnecting and reconnecting using new SSH key...
               ==> default: Machine booted and ready!
               ==> default: Checking for guest additions in VM...
                   default: The guest additions on this VM do not match the installed version of
                   default: VirtualBox! In most cases this is fine, but in rare cases it can
                   default: prevent things such as shared folders from working properly. If you see
                   default: shared folder errors, please make sure the guest additions within the
                   default: virtual machine match the version of VirtualBox you have installed on
                   default: your host and reload your VM.
                   default:
                   default: Guest Additions Version: 4.3.20
                   default: VirtualBox Version: 5.2
               ==> default: Setting hostname...
               ==> default: Configuring and enabling network interfaces...
               ==> default: Machine not provisioned because `--no-provision` is specified.
               [SSH] Established
               Vagrant instance <default-centos65> created.
               Finished creating <default-centos65> (0m43.78s).
        -----> Converging <default-centos65>...
               Preparing files for transfer
               Preparing dna.json
               Resolving cookbook dependencies with Berkshelf 7.0.6...
               Removing non-cookbook files before transfer
               Preparing validation.pem
               Preparing client.rb
        -----> Installing Chef Omnibus (install only if missing)
               Downloading https://omnitruck.chef.io/install.sh to file /tmp/install.sh
               Trying wget...
               Trying curl...
               Download complete.
               el 6 x86_64
               Getting information for chef stable  for el...
               downloading https://omnitruck.chef.io/stable/chef/metadata?v=&p=el&pv=6&m=x86_64
                 to file /tmp/install.sh.2854/metadata.txt
               trying wget...
               trying curl...
               sha1	50a2cd31f7b8c90923082414ccbf8d2315f03ce5
               sha256	1b92139df818e4857e61542f6ad032b5479f4114ab40feaf4ef16656aa5bd837
               url	https://packages.chef.io/files/stable/chef/14.7.17/el/6/chef-14.7.17-1.el6.x86_64.rpm
               version	14.7.17
               downloaded metadata file looks valid...
               downloading https://packages.chef.io/files/stable/chef/14.7.17/el/6/chef-14.7.17-1.el6.x86_64.rpm
                 to file /tmp/install.sh.2854/chef-14.7.17-1.el6.x86_64.rpm
               trying wget...
               trying curl...
               Comparing checksum with sha256sum...
        
               WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING
        
               You are installing an omnibus package without a version pin.  If you are installing
               on production servers via an automated process this is DANGEROUS and you will
               be upgraded without warning on new releases, even to new major releases.
               Letting the version float is only appropriate in desktop, test, development or
               CI/CD environments.
        
               WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING
        
               Installing chef
               installing with rpm...
               warning: /tmp/install.sh.2854/chef-14.7.17-1.el6.x86_64.rpm: Header V4 DSA/SHA1 Signature, key ID 83ef826a: NOKEY
               Preparing...                ########################################### [100%]
                  1:chef                   ########################################### [100%]
               Thank you for installing Chef!
               Transferring files to <default-centos65>
               Starting Chef Client, version 14.7.17
               Creating a new client identity for default-centos65 using the validator key.
               resolving cookbooks for run list: ["fiddle-0001-ChefServer::default"]
               Synchronizing Cookbooks:
                 - fiddle-0001-ChefServer (0.1.0)
               Installing Cookbook Gems:
               Compiling Cookbooks...
               Converging 4 resources
               Recipe: fiddle-0001-ChefServer::default
                 * remote_file[/tmp/kitchen/cache/chef-server-11.1.6-1.el6.x86_64.rpm] action create
                   - create new file /tmp/kitchen/cache/chef-server-11.1.6-1.el6.x86_64.rpm
                   - update content in file /tmp/kitchen/cache/chef-server-11.1.6-1.el6.x86_64.rpm from none to d4f9c9
                   (file sizes exceed 10000000 bytes, diff output suppressed)
                 * yum_package[chef-server-11.1.6-1.el6.x86_64.rpm] action install
                   - install version 11.1.6-1.el6 of package chef-server-11.1.6-1.el6.x86_64.rpm
                 * execute[reconfigure-chef-server] action nothing (skipped due to action :nothing)
                 * cookbook_file[/etc/motd] action create
                   - update content in file /etc/motd from a7620c to 9a4b91
                   --- /etc/motd	2014-12-04 21:51:54.363631846 +0000
                   +++ /etc/.chef-motd20181128-2960-iehh5x	2018-11-28 14:24:54.694911347 +0000
                   @@ -1,2 +1,11 @@
                   -Welcome to your Packer-built virtual machine.
                   +oooooooooooo  o8o        .o8        .o8  oooo
                   + 888       8  `"'        888        888   888
                   + 888         oooo   .oooo888   .oooo888   888   .ooooo.
                   + 888oooo8     888  d88   888  d88   888   888  d88   88b
                   + 888          888  888   888  888   888   888  888ooo888
                   + 888          888  888   888  888   888   888  888    .o
                   +o888o        o888o  Y8bod88P   Y8bod88P  o888o  Y8bod8P
                   +
                   +fiddle-0001-ChefServer
                   +
                 * execute[reconfigure-chef-server] action run
                   - execute chef-server-ctl reconfigure
        
               Running handlers:
               Running handlers complete
               Chef Client finished, 4/5 resources updated in 14 minutes 37 seconds
               Downloading files from <default-centos65>
               Finished converging <default-centos65> (16m9.96s).
        -----> Kitchen is finished. (16m57.18s)
        ├────KITCHENLOGIN
        Last login: Wed Nov 28 14:11:16 2018 from 10.0.2.2
        oooooooooooo  o8o        .o8        .o8  oooo
         888       8  `"'        888        888   888
         888         oooo   .oooo888   .oooo888   888   .ooooo.
         888oooo8     888  d88   888  d88   888   888  d88   88b
         888          888  888   888  888   888   888  888ooo888
         888          888  888   888  888   888   888  888    .o
        o888o        o888o  Y8bod88P   Y8bod88P  o888o  Y8bod8P
        
        fiddle-0001-ChefServer
        
        [vagrant@default-centos65 ~]$

3.  Open a web browser, and navigate to `192.168.33.34` to access the Chef Server Admin Console
4.  Once you are done, return to the terminal exit the ssh session 
    
      `exit`
      
5.  Destroy the virtual machine --

      `fiddle stop chef 0001`

    The output should looks like this:
    
      {{ ʕ・ɭ・ʔ }}
      
      FIDDLE-STOP.SH
      ├────STOPFIDDLE
      ├────KITCHENINIT
      ├────UPDATEKITCHENYML
      ├────CHEFSTOP
      ├────KITCHENDESTROY
      -----> Starting Kitchen (v1.23.2)
      -----> Destroying <default-centos65>...
             Finished destroying <default-centos65> (0m0.00s).
      -----> Kitchen is finished. (0m3.24s)
      ├────VAGRANTDELETE



### Tags

chef, kitchen, vagrant, centos65, remote_file, package, execute, cookbook_file
