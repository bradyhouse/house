<html>
    <head>
        <title> <?php bloginfo('name'); ?> <?php wp_title(); ?> </title>
        <script type="text/javascript" src="https://extjs.cachefly.net/ext/gpl/5.1.0/build/ext-all-debug.js"></script>
        <link rel="stylesheet" href="https://extjs.cachefly.net/ext/gpl/5.1.0/packages/ext-theme-classic/build/resources/ext-theme-classic-all-debug.css" />
        <script type="text/javascript" src="https://extjs.cachefly.net/ext/gpl/5.1.0/packages/sencha-charts/build/sencha-charts-debug.js"></script>
        <link rel="stylesheet" href="https://extjs.cachefly.net/ext/gpl/5.1.0/packages/sencha-charts/build/classic/resources/sencha-charts-all-debug.css" />
        <script src="<?php bloginfo('stylesheet_directory'); ?>/app.js"></script>
        <link rel="stylesheet" href="<?php bloginfo('stylesheet_directory'); ?>/tweaks.css"/>
    </head>
    <body>
        <div id="headerCont" style="display:none;">
            <div id="top-bar-tile">
                <div id="top-bar-content">
                    <h1><a href="<?php bloginfo('url'); ?>"><?php bloginfo('name'); ?></a>&nbsp;&nbsp;<span class="slogan"><?php bloginfo('description'); ?></span></h1>
                    <div id="search-box">
                        <form method="get" id="searchform" action="">
                            <input type="text" value="Search..." onfocus="if(this.value == this.defaultValue) this.value=''" name="s" id="s" />
                        </form>
                    </div><!-- search-box -->
                </div><!--top-bar-content -->
            </div><!top-bar-tile -->
        </div> <!-- headerCont -->
        <div id="links" style="display:none;">
            <?php wp_nav_menu(array(
            'menu' => 'mainnav',
            'menu_class' => 'nav-bar-content',
            'menu_id' => 'navigation',
            'container' => false,
            'theme_location' => 'primary-menu',
            'show_home' => '1')); ?>
        </div><!-- links -->
