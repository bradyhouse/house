This command allows you to switch between Sencha Cmd versions present in the parent 
directory of the last installed Sencha Cmd.
    
To see a list of locally available versions use the "list" switch, this command will
also show the path where versions are expected to be present:

    sencha switch --list

To switch to the latest locally available version, run the command with no arguments:

    sencha switch
    
To switch to a specific version, pass it as an argument:

    sencha switch {version}