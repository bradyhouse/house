scripts
=====

Collection of shell scripts developed to automate (or simplify) certain aspects of life.  The organization (or purpose) of each
script is implied by its name.  In particular --

*   **fiddle*** prefixed scripts can be used to "create" (or "fork") ../fiddles.  The "base" script
    of this collection is fiddle.sh.  In other words, if you want to create (or fork) a
    fiddle begin by running the [fiddle.sh](fiddle.sh) script.  This script requires certain command line parameters.
    Running it without these parameters will result in the usage details being displayed (below).


        H o u s e
        oooooooooooo  o8o        .o8        .o8  oooo
         888       8  `"'        888        888   888
         888         oooo   .oooo888   .oooo888   888   .ooooo.
         888oooo8     888  d88   888  d88   888   888  d88   88b
         888          888  888   888  888   888   888  888ooo888
         888          888  888   888  888   888   888  888    .o
        o888o        o888o  Y8bod88P   Y8bod88P  o888o  Y8bod8P

        FIDDLE.SH

        Nope ~ Incorrect number of arguments

        Usage:

        ./fiddle.sh "[c]" "[a1]" "[a2]" "[a3]"

        [c]	command. Valid types include:

            "create"	Create a new fiddle
            "combine"	Combine src files into an app.js file
            "fork"		Fork an existing fiddle
            "index"		Re-index a specific fiddle type
            "list"		List the fiddles defined for a specific type
            "start"		Start the fiddle web service process
            "stop"		Stop the web service process
            "delete"	Delete an existing fiddle
            "refactor"	Rename ("refactor") an existing fiddle
            "test"		Invoke JsTestDriver for a given fiddle

        [a1-3]	arguments. The arguments required by the
            specified command. There can be up to 3 arguments.
            To understand the arguments required by a specific
            command execute the command with no additional
            parameters.



*   **mysql-(start/stop).sh** scripts can (as the names imply) be used to start or stop the mysql services
    on a Mac (or linux) machine that has mysql installed.


