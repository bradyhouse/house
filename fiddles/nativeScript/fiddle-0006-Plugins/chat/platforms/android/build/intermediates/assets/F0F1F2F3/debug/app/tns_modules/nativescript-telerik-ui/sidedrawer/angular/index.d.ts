import {
    TemplateRef,
    ElementRef,
    EventEmitter
} from "@angular/core";
import {View} from "ui/core/view";
import * as SideDrawerModule from './../';

export type SideDrawerType = SideDrawerModule.RadSideDrawer & View & {toggleDrawerState: () => void}

/**
* This is the SideDrawer component. It separates your mobile app's screen
* into a main part and a menu part whereby the menu part is shown upon a swipe
* gesture using a transition effect.
*/
export class RadSideDrawerComponent {
    
    /**
     * The presented RadSideDrawer.
     */
     sideDrawer: SideDrawerType;
     
     /**
      * Gets or sets the main screen content for the current SideDrawer instance.
      */
     mainTemplate: TemplateRef<ElementRef>;
     
     /**
      * Gets or sets the menu screen content for the current SideDrawer instance.
      */
     drawerTemplate: TemplateRef<ElementRef>;
     
     /**
      * The transition used to animate the process of showing or hiding
      * the menu pane. Depending on the transition set, the main content can also be part of
      * the animation.
      */
     transition: SideDrawerModule.DrawerTransitionBase;
     
     /**
      * Defines either the width or the height
      * of the menu pane depending on the location of the SideDrawer. 
      * Top or Bottom - height, Right or Left - width. 
      */
     drawerContentSize: number;
     
     /**
      * Indicates whether the RadSideDrawer is shown over the navigation bar.
      */
     showOverNavigation: boolean;
     
     /**
      * Gets or sets a boolean value that determines if drawer can be opened or closed with gestures.
      */
     gesturesEnabled: boolean;
     
     /**
      * Identifies the {@link drawerTransition} property.
      */
     drawerTransition: string;
     
     /**
      * Identifies the {@link drawerLocation} property.
      */
     drawerLocation: string;  
}

/**
 * Directive identifying the main content.
 */
export class TKMainContentDirective {
    
}

/**
 * Directive identifying the drawer content.
 */
export class TKDrawerContentDirective {
    
}

/**
 * Directives identifying the RadSideDrawer.
 */
export const SIDEDRAWER_DIRECTIVES;