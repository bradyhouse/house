This command restores the current set of files from the "stack". This state was
previously put on the "stack" using the `push` command.

    sencha compile ... \
                and push \
                and ... \
                and pop
                and ...

Between the `push` and `pop` commands the current file set can be adjusted as
needed and then restored for subsequent commands.
