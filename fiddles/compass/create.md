Compass (create)
======

Executing the command `./fiddle.sh "create" "compass" "fiddle-0000-Template"` produces the following output.

    H o u s e
    oooooooooooo  o8o        .o8        .o8  oooo
     888       8  `"'        888        888   888
     888         oooo   .oooo888   .oooo888   888   .ooooo.
     888oooo8     888  d88   888  d88   888   888  d88   88b
     888          888  888   888  888   888   888  888ooo888
     888          888  888   888  888   888   888  888    .o
    o888o        o888o  Y8bod88P   Y8bod88P  o888o  Y8bod8P
    
    FIDDLE.SH
    FIDDLE-DELETE.SH
    
    FIDDLE-CREATE.SH
    09-29-16
    directory css/
    directory sass/
       create config.rb
       create sass/screen.scss
       create sass/print.scss
       create sass/ie.scss
        write css/ie.css
        write css/print.css
        write css/screen.css
    
    *********************************************************************
    Congratulations! Your compass project has been created.
    
    You may now add and edit sass stylesheets in the sass subdirectory of your project.
    
    Sass files beginning with an underscore are called partials and won't be
    compiled to CSS, but they can be imported into other sass stylesheets.
    
    You can configure your project by editing the config.rb configuration file.
    
    You must compile your sass stylesheets into CSS when they change.
    This can be done in one of the following ways:
      1. To compile on demand:
         compass compile [path/to/project]
      2. To monitor your project for changes and automatically recompile:
         compass watch [path/to/project]
    
    More Resources:
      * Website: http://compass-style.org/
      * Sass: http://sass-lang.com
      * Community: http://groups.google.com/group/compass-users/
    
    
    To import your new stylesheets add the following lines of HTML (or equivalent) to your webpage:
    <head>
      <link href="/css/screen.css" media="screen, projection" rel="stylesheet" type="text/css" />
      <link href="/css/print.css" media="print" rel="stylesheet" type="text/css" />
      <!--[if IE]>
          <link href="/css/ie.css" media="screen, projection" rel="stylesheet" type="text/css" />
      <![endif]-->
    </head>
    Done. The "../fiddles/compass/fiddle-0000-Template" directory has been initialized.
    FIDDLE-INDEX.SH
    09-29-16
    Done. All "compass" fiddles have been re-indexed.

Note, when a `compass` fiddle is created, the `fiddle.sh index compass` command is automatically initiated.  This 
command will add a reference to the fiddle to the root compass [index.html](index.html) page.

### Additional Info

[Compass](../compass) fiddles are created to run in the browser.  This means, the resulting sandbox can
be hosted using [live-server](https://www.npmjs.com/package/live-server) or any type of vanilla web server
package. The contents of the sandbox is based entirely on the contents of the [template](template) directory.
