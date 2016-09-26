import viewModule = require("ui/core/view");
import bindableModule = require("ui/core/bindable");
import dependencyObservable = require("ui/core/dependency-observable");
import observableModule = require("data/observable");
import observableArrayModule = require("data/observable-array");
import stackLayoutModule = require("ui/layouts/stack-layout");

/**
* Defines the possible values for the {@link scrollDirection} property
* of the layout applied to the {@link RadListView}.
*/
export enum ListViewScrollDirection {
    /**
    * Items will be scrolled in vertically.
    */
    Vertical,
    /**
    * Items will be scrolled in horizontally.
    */
    Horizontal
}

/**
 * Defines the different view types that {@link RadListView} can display in various scenarios.
 */
export enum ListViewViewTypes {
    /**
     * Identifies a view created using the {@link headerItemTemplate} value.
     */
    HeaderView,
    
    /**
     * Identifies a view created using the {@link itemTemplate} value.
     */
    ItemView,
    
    /**
     * Identifies a view created using the {@link footerItemTemplate} value.
     */
    FooterView,
    
    /**
     * Identifies a view created using the {@link loadOnDemandItemTemplate} value.
     */
    LoadOnDemandView,
    
    /**
     * Identifies a view created using the {@link itemSwipeTemplate} value.
     */
    ItemSwipeView,
}

/**
 * Defines the possible values for the {@link reorderMode} property
 * of {@link RadListView}.
 */
export enum ListViewReorderMode {
    /**
     * Items are reordered by holding and dragging them.
     */
    HoldAndDrag,

    /**
     * Items are reordered by simply dragging them.
     */
    Drag
}

/**
 * Defines the animation applied to an item being added or deleted from the
 * source collection. Values are applied on the {@link itemInsertAnimation} or
 * {@link itemDeleteAnimation} properties exposed by the item layout.
 */
export enum ListViewItemAnimation {
    /**
    * Default animation will be used.
    */
    Default,
    /**
    * A fade in/fade out animation.
    */
    Fade,
    /**
    * A scale in/scale out animation.
    */
    Scale,
    /**
    * A slide in/slide out animation.
    */
    Slide
}

/**
 * Defines the possible types of load-on-demand behavior that can be used with
 * {@link RadListView}. Values are applied to the {@link loadOnDemandMode} property.
 */
export enum ListViewLoadOnDemandMode {
    /**
     * Load on demand is disabled.
     */
    None,
    /**
     * A special load-on-demand item is appended at the end of the scrollable list which,
     * when clicked initiates a request for more items.
     */
    Manual,
    /**
     * A request for more items will automatically be initiated after the user
     * approaches the end of the scrollable list.
     */
    Auto
}

/**
 * Defines the possible types of item selection behavior that can be
 * initialized with {@link RadListView}.
 */
export enum ListViewSelectionBehavior {
    /**
     * Selection is disabled.
     */

    None,
    /**
     * Selection on press.
     */
    Press,

    /**
     * Selection on long press.
     */
    LongPress
}

/**
* Instances of this class are exposed by the data property of the
* {@link ListViewEventData} coming when the {@link itemReorderedEvent} is
* fired.
*/
export class ListViewItemReorderData {
    /**
    * The target index of the reordered item.
    */
    targetIndex: number;

    /**
    * The target group index of the reordered item.
    */
    targetGroupIndex: number;
}

/**
* Instances of this class are exposed by all swipe-to-execute related
* events fired by {@link RadListView}.
*/
export class SwipeOffsets {
    /**
    * Returns an instance of the {@link SwipeLimits} class
    * containing information about how far an item can be swiped.
    */
    swipeLimits: SwipeLimits;

    /**
    * The current X offset of the swipe gesture.
    */
    x: number;


    /**
    * The current Y offset of the swipe gesture.
    */
    y: number;
}

/**
* Contains information about the swipe limits.
*/
export class SwipeLimits {
    /**
    * Depicts the top swipe limit for an item. On iOS this value additionally determines
    * how far from the top edge can the user swipe the item's main content.
    * Once the {@link threshold} is exceeded, the 'top' value determines the
    * distance from the top edge at which the item is positioned once released.
    */
    top: number;

    /**
    * Depicts the right swipe limit for an item. On iOS this value additionally determines
    * how far from the right edge can the user swipe the item's main content.
    * Once the {@link threshold} is exceeded, the 'right' value determines the
    * distance from the top edge at which the item is positioned once released.
    */
    right: number;

    /**
    * Depicts the top swipe limit for an item. On iOS this value additionally determines
    * how far from the top edge can the user swipe the item's main content.
    * Once the {@link threshold} is exceeded, the 'left' value determines the
    * distance from the top edge at which the item is positioned once released.
    */
    left: number;

    /**
    * Depicts the top swipe limit for an item. On iOS this value additionally determines
    * how far from the bottom edge can the user swipe the item's main content.
    * Once the {@link threshold} is exceeded, the 'bottom' value determines the
    * distance from the top edge at which the item is positioned once released.
    */
    bottom: number;

    /**
    * Depicts the threshold which needs to be exceeded in order for the item being
    * swiped to stick to one of the end positions determine by the top, left, right and
    * bottom properties depending on the swipe direction.
    */
    threshold: number;
}

/**
 * Generic scheme for event arguments provided to handlers of events exposed
 * by a {@link RadListView}.
 */
declare class ListViewEventData implements observableModule.EventData {

    /**
    *Returns the name of the event that has been fired.
    */
    eventName: string;

    /**
    * The object that fires the event.
    */
    object: any;

    /**
    * Gets the index of the item in the source to which the event relates.
    */
    itemIndex: number;

    /**
    * Gets the index of the data group (if present) to which the event relates.
    * Returns -1 if there is no group.
    */
    groupIndex: number;

    /**
    * Might point to an object related to a specific event.
    */
    data: any;

    /**
    * Returns a boolean value which is interpreted in the context with the event.
    */
    returnValue: any;
}

declare class ListViewLayoutBase extends bindableModule.Bindable {

}

/**
* A base layout used to render items in ListView.
*/
export class ListViewLinearLayout extends ListViewLayoutBase {
    android: any;
    ios: any;
    /**
    * Identifies the {@link scrollDirection} dependency property.
    */
    static scrollDirectionProperty: dependencyObservable.Property;
    /**
    * The scroll direction.
    */
    scrollDirection: string;
    /**
    * Identifies the {@link itemInsertAnimation} dependency property.
    */
    static itemInsertAnimationProperty: dependencyObservable.Property;
    /**
    * The item animation for insert operation.
    */
    itemInsertAnimation: string;
    /**
    * Identifies the {@link itemDeleteAnimation} dependency property.
    */
    static itemDeleteAnimationProperty: dependencyObservable.Property;
    /**
    * The item animation for delete operation.
    */
    itemDeleteAnimation: string;
    /**
    * Identifies the {@link itemWidth} dependency property.
    */
    static itemWidthProperty: dependencyObservable.Property;
    /**
    * The width of item.
    */
    itemWidth: number;
    /**
    * Identifies the {@link itemHeight} dependency property.
    */
    static itemHeightProperty: dependencyObservable.Property;
    /**
    * The height of item.
    */
    itemHeight: number;
}

/**
* A layout that renders items in ListView by distributing them in a fixed columns count.
*/
export class ListViewGridLayout extends ListViewLinearLayout {
    /**
    * Identifies the {@link spanCount} dependency property.
    */
    static spanCountProperty: dependencyObservable.Property;

    /**
    * The number of columns/rows to be rendered.
    */
    spanCount: number;
}

/**
* The staggered layout lays out items in a staggered grid formation. It supports horizontal & vertical layout.
*/
export class ListViewStaggeredLayout extends ListViewGridLayout {
}

/**
 * This class represents a marker for the reorder handle used to reorder items in {@link RadListView}.
 * This class is used when the {@link reorderMode} property of {@link RadListView} is set to be {@link Drag}.
 */
export class ReorderHandle extends stackLayoutModule.StackLayout {
    constructor();
}

/**
* This class represents the RadListView component. RadListView is based on the
* already familiar native Android and iOS components from Telerik UI for Android
* and Telerik UI for iOS. The component exposes all major features supported
* by the native controls through a unified API suitable for NativeScript developers.
*/
export class RadListView extends viewModule.View {

    /**
     * This event is fired each time an item is about to be visualized by {@link RadListView}.
     * The event provides an instance of the {@link ListViewEventData} class and exposes the a View instance
     * that represents container to be visualized. It allows for customizations of the appearance of a particular item
     * depending on the data object assigned to it.
     */
    static itemLoadingEvent: string;

    /**
     * This event is fired before an item to be selected. Return value indicates
     * whether the specified item should be selected.
     * The event exposes an instance of the {@link ListViewEventData} class.
     */
    static itemSelectingEvent: string;

    /**
     * This event is fired before item to be deselected. Return value indicates whether the specified item should be deselected.
     * The event exposes an instance of the {@link ListViewEventData} class.
     */
    static itemDeselectingEvent: string;
    /**
     * This event is fired after selecting an item.
     * The event exposes an instance of the {@link ListViewEventData} class.
     */
    static itemSelectedEvent: string;
    /**
     * This event is fired after deselecting an item.
     * The event exposes an instance of the {@link ListViewEventData} class.
     */
    static itemDeselectedEvent: string;

    /**
     * This event is fired when an item is about to be reordered.
     * The event exposes an instance of the {@link ListViewEventData} class which contains
     * the items of the item that is about to be reordered.
     */
    static itemReorderStartedEvent: string;

    /**
     * This event is fired after reordering an item in list view.
     * The event exposes an instance of the {@link ListViewEventData} class which
     * data property which returns an object containing a targetIndex and targetGroupIndex
     * properties depicting the destination of the reordered item.
     */
    static itemReorderedEvent: string;

    /**
     * This event is fired when the user starts swiping a item.
     * The handler of the event receives an instance of the {@link ListViewEventData}.
     * The returnValue property of the arguments can be used to cancel the
     * swipe gesture.
     */
    static itemSwipingEvent: string;

    /**
     * This event is fired when the user starts swiping a item. The event
     * arguments expose an instance of the {@link ListViewEventData}. An
     * additional 'data' property exposes an instance of the {@link SwipeOffsets}
     * class containing information about the swipe progress.
     */
    static itemSwipeProgressStartedEvent: string;

    /**
     * This event is continuously fired while the user is swiping an item. The event
     * arguments expose an instance of the {@link ListViewEventData}. An
     * additional 'data' property of the arguments exposes an instance of the {@link SwipeOffsets}
     * class containing information about the swipe progress.
     */
    static itemSwipeProgressChangedEvent: string;


    /**
     * This event is fired when the user has finished swiping an item. The event
     * arguments expose an instance of the {@link ListViewEventData}. An
     * additional 'data' property of the arguments exposes an instance of the {@link SwipeOffsets}
     * class containing information about the swipe progress.
     */
    static itemSwipeProgressEndedEvent: string;

    /**
     * This event is fired when the user presses and holds an item.
     * The event exposes an instance of the {@link ListViewEventData} class.
     */
    static itemHoldEvent: string;

    /**
     * Called after the user requested loading more data on demand by scrolling over the item buffer limit size.
     * The event exposes an instance of the {@link ListViewEventData} class which returnValue
     * property determines whether more data will be loaded.
     */
    static loadMoreDataRequestedEvent: string;

    /**
     * Called after the user requested loading more data by pulling down the list.
     * The event exposes an instance of the {@link ListViewEventData} class which returnValue
     * property determines whether more data will be loaded.
     */
    static pullToRefreshInitiatedEvent: string;

    /**
    * Identifies the {@link listViewLayout} dependency property.
    */
    static listViewLayoutProperty: dependencyObservable.Property;
    /**
    * Identifies the {@link itemTemplate} dependency property.
    */
    static itemTemplateProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link headerItemTemplate} dependency property.
     */
    static headerItemTemplateProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link footerItemTemplate} dependency property.
     */
    static footerItemTemplateProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link itemSwipeTemplate} dependency property.
    */
    static itemSwipeTemplateProperty: dependencyObservable.Property;
    /**
    * Identifies the {@link multipleSelection} dependency property.
    */
    static multipleSelectionProperty: dependencyObservable.Property;
    /**
    * Identifies the {@link itemReorder} dependency property.
    */
    static itemReorderProperty: dependencyObservable.Property;

    /**
     * Identifies the {@link reorderMode} dependency property.
     */
    static reorderModeProperty: dependencyObservable.Property;
    /**
    * Identifies the {@link itemSwipe} dependency property.
    */
    static itemSwipeProperty: dependencyObservable.Property;
    /**
    * Identifies the {@link pullToRefresh} dependency property.
    */
    static pullToRefreshProperty: dependencyObservable.Property;
    /**
    * Identifies the {@link loadOnDemandMode} dependency property.
    */
    static loadOnDemandModeProperty: dependencyObservable.Property;
    /**
    * Identifies the {@link loadOnDemandBufferSize} dependency property.
    */
    static loadOnDemandBufferSizeProperty: dependencyObservable.Property;
    /**
    * Identifies the {@link selectionBehavior} dependency property.
    */
    static selectionBehaviorProperty: dependencyObservable.Property;
    /**
    * Identifies the {@link items} dependency property.
    */
    static itemsProperty: dependencyObservable.Property;

    /**
    * The native 'android.widget.FrameLayout' object.
    */
    android: any;

    /**
    * The native 'com.telerik.widget.list.RadListView' object.
    */
    _android: any;

    /**
    * The native 'TKListView' object.
    */
    ios: any;

    /**
    * The layout object used to arrange items.
    */
    listViewLayout: ListViewLayoutBase;

    /**
     * Gets or sets the UI template for list view items.
     */
    itemTemplate: string;

    /**
     * Gets or sets the template used to visualize a header in the list.
     */
    headerItemTemplate: string;

    /**
     * Gets or sets the template used to visualize a footer in the list.
     */
    footerItemTemplate: string;

    /**
     * Gets or sets the UI template for the background view of an item shown on during swipe.
     */
    itemSwipeTemplate: string;

    /**
     * Gets or sets a boolean value determining whether multiple selection
     * is enabled or not.
     */
    multipleSelection: boolean;
    
    /**
     * Gets or sets a boolean value determining whether reordering items is enabled or not.
     */
    itemReorder: boolean;

    /**
     * Gets or sets a value from the {@link ListViewReorderMode} enum determining whether item reorder will happen
     * on hold and drag or simply drag.
     */
    reorderMode: ListViewReorderMode;
    
    /**
     * Gets or sets the item view loaded used by the @link RadListView} when creating its item views.
     */
    itemViewLoader: (viewType) => viewModule.View;

    /**
     * Gets or sets a boolean value determining whether the user is able to swipe items or not.
     */
    itemSwipe: boolean;


    /**
     * Gets or sets a boolean value determining whether the user is able to perform the pull-to-refresh gesture.
     */
    pullToRefresh: boolean;

    /**
     *  Gets or sets a value from the {@link ListViewLoadOnDemandMode} list determining
     * the currently active load-on-demand mode.
     */
    loadOnDemandMode: string;

    /**
     * Gets or sets a number determining the amount of items reamining
     * between the current scrolling position and the end which, when exceeded,
     * will trigger a {@link loadMoreDataRequestedEvent}.
     */
    loadOnDemandBufferSize: number;

    /**
     * Gets or sets a value from the {@link ListViewSelectionBehavior} list
     * determining whether items are selected on press, long press,
     * or can't be selected at all.
     */
    selectionBehavior: string;

    /**
     * Gets or sets the source collection used to populate the {@link RadListView}.
     */
    items: Array<any>;

    /**
     * When called, prevents {@link RadListView} from refreshing its UI when changes in the source collection occur.
     * This call is reversed via a call of the {@link resumeUpdates} method.
     */
    suspendUpdates();

    /**
     * When called, resumes the UI updates performed by {@link RadListView} when changes in the source collection occur.
     * @param refresh When true {@link RadListView} will perform a complete UI refresh.
     */
    resumeUpdates(refresh: boolean);

    /**
     * Returns a boolean value that determines whether the UI updates are currently suspended.
     */
    updatesSuspended(): boolean;

    /**
    * Returns an ObservableArray that contains the items currently selected in
    * {@link RadListView}.
    */
    getSelectedItems(): Array<any>;

    /**
     * Returns the {N} View that is used to visualize the provided item from the currently assigned source.
     * In case the item is not in the current viewport the method returns `undefined`.
     * @param item The item from the current source for which to find the View.
     * @returns The {N} View used to visualize the provided item.
     */
    getViewForItem(item: any): viewModule.View;

    /**
     * Returns the data item at the specified index.
     */
    getItemAtIndex(index: number): any;

    /**
    * Selects all items currently available in {@link RadListView}.
    */
    selectAll(): void;

    /**
    * Deselects all items currently available in {@link RadListView}.
    */
    deselectAll(): void;

    /**
    * Selects the item from the data source at the provided index.
    * @param index the index of the item within the data source.
    */
    selectItemAt(index: number);

    /**
    * Deselects the item at the provided index if it is selected.
    * @param index the index of the item within the data source.
    */
    deselectItemAt(index: number);

    /**
    * Checks whether the provided item is selected or not. Returns true if the item is selected, otherwise false.
    * @param item an arbitrary item part of the data source the current {@link RadListView} instance is populated with.
    */
    isItemSelected(item: any): boolean;

    /**
     * Refreshes the {@link RadListView} by rebinding it to the source.
     */
    refresh(): void;

    /**
     * Scrolls the list to a position where the item with the provided index
     * is visible.
     * @param index the index of the item from the source which needs to be shown.
     */
    scrollToIndex(index: number): void;

    /**
     * Must be called when data is delivered after a pull-to-refresh gesture initiated by the user.
     */
    notifyPullToRefreshFinished(): void;

    /**
     * Must be called when data is delivered after a load-on-demand request has been made.
     */
    notifyLoadOnDemandFinished(): void;

    /**
     * Must be called when a swipe-to-execute action has been requested. Calling this method will close the revealed swipe actions.
     */
    notifySwipeToExecuteFinished(): void;
}
