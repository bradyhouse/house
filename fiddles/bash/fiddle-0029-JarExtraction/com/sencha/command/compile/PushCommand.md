This command saves the current set of files on a "stack" to easily save and
restore state.

    sencha compile ... \
                and push \
                and ... \
                and pop
                and ...

Between the `push` and `pop` commands the current file set can be adjusted as
needed and then restored for subsequent commands.
