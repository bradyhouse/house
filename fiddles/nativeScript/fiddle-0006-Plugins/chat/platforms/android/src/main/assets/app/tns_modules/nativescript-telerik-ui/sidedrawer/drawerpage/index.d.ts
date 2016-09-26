import page = require("ui/page");
import drawer = require('../../sidedrawer');

/**
 * DrawerPage allows developers to place RadSideDrawer over the navigation bar/action bar.
 */
export class DrawerPage extends page.Page {
    /**
     * The side drawer of DrawerPage.
     */
    sideDrawer: drawer.RadSideDrawer;
}