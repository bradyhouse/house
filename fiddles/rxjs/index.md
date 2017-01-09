RxJS (index)
======

Executing the command `./fiddle.sh "index" "rxjs"` from the `scripts` directory produces the following output.

    {{ ʕ・ɭ・ʔ }}
    FIDDLE.SH
    FIDDLE-INDEX.SH
    09-29-16
    Done. All "rxjs" fiddles have been re-indexed.


This command rebuilds the root [index.html](index.html) page based on `fiddle-*` sub-directories (aka fiddles). Provided 
the directory is not listed in the [.gitignore](../../.gitignore) file and includes a `index.html` file, then a link fiddle's
index page is injected into the root collection index page.

