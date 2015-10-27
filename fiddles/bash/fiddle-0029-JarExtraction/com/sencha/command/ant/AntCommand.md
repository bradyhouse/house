Invokes the embedded version of Apache Ant providing the `cmd.dir` property to
access Sencha Cmd using the following `taskdef`:

    <taskdef resource="com/sencha/ant/antlib.xml"
             classpath="${cmd.dir}/sencha.jar"
             loaderref="senchaloader"/>

This command recognizes the `-Dproperty=value` syntax for properties used by
Ant, even though this does not conform to normal Sencha Cmd parameter syntax.
Similar to directly invoking Ant, this command defaults to `"build.xml"` for
the script file basing its search on the current directory or the value of the
`-cwd` switch passed to `sencha`.

For example, the following command uses `"../build.xml"` as the script and
passes in the `foo` property as "42" when executing the default target (since
no target was specified).

    sencha -cwd=.. ant -Dfoo=42
