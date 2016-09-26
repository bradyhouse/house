var dependencyObservable = require('ui/core/dependency-observable');
var observableArray = require("data/observable-array");
var listViewCommonModule = require('./listview-common');
var proxyModule = require('ui/core/proxy');
var layoutsModule = require('ui/layouts/stack-layout');
var applicationModule = require('application');
var lastFiredEvent;
var lastSelectedIndex;
require("utils/module-merge").merge(listViewCommonModule, exports);
var knownTemplates;
(function (knownTemplates) {
    knownTemplates.itemTemplate = "itemTemplate";
    knownTemplates.itemSwipeTemplate = "itemSwipeTemplate";
    knownTemplates.loadOnDemandItemTemplate = "loadOnDemandItemTemplate";
    knownTemplates.headerItemTemplate = "headerItemTemplate";
    knownTemplates.footerItemTemplate = "footerItemTemplate";
})(knownTemplates = exports.knownTemplates || (exports.knownTemplates = {}));
var ReorderHandle = (function (_super) {
    __extends(ReorderHandle, _super);
    function ReorderHandle() {
        _super.call(this);
    }
    return ReorderHandle;
})(listViewCommonModule.ReorderHandle);
exports.ReorderHandle = ReorderHandle;
var ExtendedReorderWithHandlesBehavior = (function (_super) {
    __extends(ExtendedReorderWithHandlesBehavior, _super);
    function ExtendedReorderWithHandlesBehavior(viewId) {
        _super.call(this, viewId);
        return global.__native(this);
    }
    ExtendedReorderWithHandlesBehavior.prototype.getReorderHandleOverride = function (itemView) {
        var itemIndex = this.owner.getChildAdapterPosition(itemView);
        var nsViewForItem = this.nsOwner._listViewAdapter.getViewForItem(this.nsOwner.getItemAtIndex(itemIndex));
        var reorderHandle = undefined;
        nsViewForItem._eachChildView(function (view) {
            if (view instanceof ReorderHandle) {
                reorderHandle = view;
                return false;
            }
            return true;
        });
        return reorderHandle === undefined ? itemView : reorderHandle.android;
    };
    ExtendedReorderWithHandlesBehavior.prototype.onAttached = function (owner) {
        _super.prototype.onAttached.call(this, owner);
        this.owner = owner;
    };
    return ExtendedReorderWithHandlesBehavior;
})(com.telerik.widget.list.ReorderWithHandlesBehavior);
exports.ExtendedReorderWithHandlesBehavior = ExtendedReorderWithHandlesBehavior;
// We need this class because it is the point where we plug-in into the listView
// and use the defined itemTemplate to create the native Android item views and
// pass it to the control.
var ListViewAdapter = (function (_super) {
    __extends(ListViewAdapter, _super);
    function ListViewAdapter(items, listView) {
        _super.call(this, items);
        this._currentId = 0;
        this._selectionViewId = applicationModule.android.context.getResources().getIdentifier("selectable_item_background", "drawable", applicationModule.android.context.getPackageName());
        this.ownerLv = listView;
        this._viewHolders = new Array();
        this._swipeHolders = new Array();
        return global.__native(this);
    }
    ListViewAdapter.prototype.onCreateViewHolder = function (parent, viewType) {
        //var view = builder.parse(this.ownerLv.itemTemplate);
        var view = this.ownerLv.getViewForViewType(listViewCommonModule.ListViewViewTypes.ItemView);
        var parentView = new layoutsModule.StackLayout();
        var layoutParams = this.ownerLv._getViewLayoutParams();
        parentView.orientation = "vertical";
        parentView.addChild(view);
        this.ownerLv._addView(parentView);
        parentView.android.setLayoutParams(layoutParams);
        parentView.android.setBackgroundResource(this._selectionViewId);
        var holder = new com.telerik.widget.list.ListViewHolder(parentView.android);
        holder.nsView = parentView;
        this._viewHolders.push(holder);
        return holder;
    };
    ListViewAdapter.prototype.onBindViewHolder = function (holder, position) {
        holder.nsView.bindingContext = this.ownerLv.getItemAtIndex(position);
        var args = {
            eventName: listViewCommonModule.RadListView.itemLoadingEvent,
            itemIndex: position,
            view: holder.nsView._subViews[0],
            android: holder
        };
        this.ownerLv.notify(args);
    };
    ListViewAdapter.prototype.onCreateSwipeContentHolder = function (parent) {
        //var swipeView = builder.parse(this.ownerLv.itemSwipeTemplate);
        var swipeView = this.ownerLv.getViewForViewType(listViewCommonModule.ListViewViewTypes.ItemSwipeView);
        this.ownerLv._addView(swipeView);
        var holder = new com.telerik.widget.list.ListViewHolder(swipeView.android);
        holder.nsView = swipeView;
        this._swipeHolders.push(holder);
        return holder;
    };
    ListViewAdapter.prototype.onBindSwipeContentHolder = function (holder, position) {
        holder.nsView.bindingContext = this.ownerLv.getItemAtIndex(position);
    };
    ListViewAdapter.prototype.reorderItem = function (oldPosition, newPosition) {
        var result = _super.prototype.reorderItem.call(this, oldPosition, newPosition);
        if (result === true) {
            this.ownerLv._reorderItemInSource(oldPosition, newPosition);
        }
        return result;
    };
    ListViewAdapter.prototype.setItems = function (items) {
        this._viewHolders.splice(0, this._viewHolders.length);
        this._swipeHolders.splice(0, this._swipeHolders.length);
        this._currentId = 0;
        _super.prototype.setItems.call(this, items);
    };
    ListViewAdapter.prototype.canSwipe = function (position) {
        var args = {
            eventName: listViewCommonModule.RadListView.itemSwipingEvent,
            object: this.ownerLv,
            itemIndex: position,
            groupIndex: -1,
            returnValue: true
        };
        this.ownerLv.notify(args);
        return args.returnValue;
    };
    ListViewAdapter.prototype.canSelect = function (position) {
        var isSelected = this.ownerLv.isItemSelected(this.ownerLv.getItemAtIndex(position));
        var currentEventName = isSelected === true ? listViewCommonModule.RadListView.itemDeselectingEvent : listViewCommonModule.RadListView.itemSelectingEvent;
        var args = {
            eventName: currentEventName,
            object: this.ownerLv,
            itemIndex: position,
            groupIndex: -1,
            returnValue: true
        };
        if ((lastSelectedIndex != position) || (lastSelectedIndex == position && lastFiredEvent != currentEventName)) {
            lastSelectedIndex = position;
            this.ownerLv.notify(args);
            lastFiredEvent = currentEventName;
        }
        return true;
    };
    ListViewAdapter.prototype.getViewForItem = function (item) {
        for (var i = 0; i < this._viewHolders.length; i++) {
            if (this._viewHolders[i].nsView && this._viewHolders[i].nsView.bindingContext === item) {
                return this._viewHolders[i].nsView.getChildAt(0);
            }
        }
        return undefined;
    };
    ListViewAdapter.prototype.getSwipeViewForItem = function (item) {
        for (var i = 0; i < this._swipeHolders.length; i++) {
            if (this._swipeHolders[i].nsView && this._swipeHolders[i].nsView.bindingContext === item) {
                return this._swipeHolders[i].nsView;
            }
        }
        return undefined;
    };
    ListViewAdapter.prototype.getUniqueItemId = function () {
        return this._currentId++;
    };
    return ListViewAdapter;
})(com.telerik.widget.list.ListViewAdapter);
exports.ListViewAdapter = ListViewAdapter;
var RadListView = (function (_super) {
    __extends(RadListView, _super);
    function RadListView() {
        _super.call(this);
    }
    RadListView.prototype._createUI = function () {
        this._android = new com.telerik.widget.list.RadListView(this._context);
        this._rootLayout = new android.widget.FrameLayout(this._context);
        this._rootLayout.addView(this._android);
        if (this.listViewLayout) {
            this.listViewLayout._onOwnerUICreated();
        }
        this.loadData();
        this.updateSelectionBehavior();
        this.updateReorderBehavior();
        this.updateLoadOnDemandBehavior();
        this.updatePullToRefreshBehavior();
        this.updateSwipeToExecuteBehavior();
        this._updateHeaderFooter();
        var that = new WeakRef(this);
        this._android.addItemClickListener(new com.telerik.widget.list.RadListView.ItemClickListener({
            onItemClick: function (itemPosition, motionEvent) {
                var listView = that.get();
                var tappedView = listView._listViewAdapter.getViewForItem(listView.getItemAtIndex(itemPosition));
                var args = {
                    eventName: listViewCommonModule.RadListView.itemTapEvent,
                    object: tappedView,
                    itemIndex: itemPosition,
                    groupIndex: -1
                };
                that.get().notify(args);
            },
            onItemLongClick: function (itemPosition, motionEvent) {
                var listView = that.get();
                var tappedView = listView._listViewAdapter.getViewForItem(listView.getItemAtIndex(itemPosition));
                var args = {
                    eventName: listViewCommonModule.RadListView.itemHoldEvent,
                    object: tappedView,
                    itemIndex: itemPosition,
                    groupIndex: -1
                };
                that.get().notify(args);
            }
        }));
    };
    Object.defineProperty(RadListView.prototype, "_childrenCount", {
        get: function () {
            var templatesCount = 0;
            if (this._headerView) {
                templatesCount++;
            }
            if (this._footerView) {
                templatesCount++;
            }
            if (this._listViewAdapter === undefined) {
                return 0;
            }
            if (!this._listViewAdapter._viewHolders) {
                return 0;
            }
            return this._listViewAdapter._viewHolders.length + this._listViewAdapter._swipeHolders.length + templatesCount;
            ;
        },
        enumerable: true,
        configurable: true
    });
    RadListView.prototype._eachChildView = function (callback) {
        if (this._headerView) {
            callback(this._headerView);
        }
        if (this._footerView) {
            callback(this._footerView);
        }
        if (this._listViewAdapter === undefined) {
            return;
        }
        if (this._listViewAdapter._viewHolders) {
            this._listViewAdapter._viewHolders.forEach(function (value, key) {
                callback(value.nsView);
            }, this);
        }
        if (this._listViewAdapter._swipeHolders) {
            this._listViewAdapter._swipeHolders.forEach(function (value, key) {
                callback(value.nsView);
            }, this);
        }
    };
    RadListView.prototype._clearAndroidReference = function () {
        if (this._selectionBehavior) {
            this._android.removeBehavior(this._selectionBehavior);
            this._selectionBehavior = undefined;
        }
        if (this._reorderBehavior) {
            this._android.removeBehavior(this._reorderBehavior);
            this._reorderBehavior = undefined;
        }
        if (this._loadOnDemandBehavior) {
            this._android.removeBehavior(this._loadOnDemandBehavior);
            this._loadOnDemandBehavior = undefined;
        }
        if (this._swipeExecuteBehavior) {
            this._android.removeBehavior(this._swipeExecuteBehavior);
            this._swipeExecuteBehavior = undefined;
        }
        if (this._pullToRefreshBehavior) {
            this._android.removeBehavior(this._pullToRefreshBehavior);
            this._pullToRefreshBehavior = undefined;
        }
        if (this._android) {
            this._android.setAdapter(null);
        }
        _super.prototype._clearAndroidReference.call(this);
    };
    Object.defineProperty(RadListView.prototype, "android", {
        get: function () {
            return this._rootLayout;
        },
        enumerable: true,
        configurable: true
    });
    RadListView.prototype._getViewLayoutParams = function () {
        var layoutParams = new org.nativescript.widgets.CommonLayoutParams();
        if (this.listViewLayout instanceof ListViewLinearLayout) {
            if (this.listViewLayout.scrollDirection.toLowerCase() === listViewCommonModule.ListViewScrollDirection.Vertical.toLowerCase()) {
                layoutParams.width = org.nativescript.widgets.CommonLayoutParams.MATCH_PARENT;
                layoutParams.height = org.nativescript.widgets.CommonLayoutParams.WRAP_CONTENT;
            }
            else if (this.listViewLayout.scrollDirection.toLowerCase() === listViewCommonModule.ListViewScrollDirection.Horizontal.toLowerCase()) {
                layoutParams.width = org.nativescript.widgets.CommonLayoutParams.WRAP_CONTENT;
                layoutParams.height = org.nativescript.widgets.CommonLayoutParams.MATCH_PARENT;
            }
        }
        return layoutParams;
    };
    RadListView.prototype.isItemSelected = function (item) {
        if (this._selectionBehavior) {
            var nativeSelectedItems = this._selectionBehavior.selectedItems();
            for (var i = 0; i < nativeSelectedItems.size(); i++) {
                var currentItem = nativeSelectedItems.get(i);
                currentItem = this.getItemAtIndex(currentItem);
                if (currentItem === item) {
                    return true;
                }
            }
        }
        return false;
    };
    RadListView.prototype.selectAll = function () {
        if (!this.items) {
            return;
        }
        if (this._selectionBehavior) {
            for (var i = 0; i < this.items.length; i++) {
                this._selectionBehavior.changeIsSelected(i, true);
            }
        }
    };
    RadListView.prototype.deselectAll = function () {
        if (!this.items) {
            return;
        }
        if (this._selectionBehavior) {
            for (var i = 0; i < this.items.length; i++) {
                this._selectionBehavior.changeIsSelected(i, false);
            }
        }
    };
    RadListView.prototype.selectItemAt = function (index) {
        if (this._selectionBehavior) {
            this._selectionBehavior.changeIsSelected(index, true);
        }
    };
    RadListView.prototype.deselectItemAt = function (index) {
        if (this._selectionBehavior) {
            this._selectionBehavior.changeIsSelected(index, false);
        }
    };
    RadListView.prototype.getViewForItem = function (item) {
        if (item === undefined) {
            throw new Error("Item must be an object from the currently assigned source.");
        }
        if (this._listViewAdapter === undefined) {
            return undefined;
        }
        return this._listViewAdapter.getViewForItem(item);
    };
    RadListView.prototype.getSelectedItems = function () {
        if (this._selectionBehavior) {
            var selectedItems = new Array();
            var nativeSelectedItems = this._selectionBehavior.selectedItems();
            for (var i = 0; i < nativeSelectedItems.size(); i++) {
                selectedItems.push(this.getItemAtIndex(this._android.getAdapter().getItems().indexOf(nativeSelectedItems.get(i))));
            }
            return selectedItems;
        }
        return _super.prototype.getSelectedItems.call(this);
    };
    RadListView.prototype.onItemViewLoaderChanged = function () {
        if (this.itemViewLoader) {
            this.updateSelectionBehavior();
            this.updateReorderBehavior();
            this.updateLoadOnDemandBehavior();
            this.updatePullToRefreshBehavior();
            this.updateSwipeToExecuteBehavior();
            this.loadData();
        }
    };
    RadListView.prototype.onHeaderItemTemplateChanged = function (data) {
        _super.prototype.onHeaderItemTemplateChanged.call(this, data);
        if (this._android) {
            this._updateHeaderFooter();
        }
    };
    RadListView.prototype.onFooterItemTemplateChanged = function (data) {
        _super.prototype.onFooterItemTemplateChanged.call(this, data);
        if (this._android) {
            this._updateHeaderFooter();
        }
    };
    RadListView.prototype.onListViewLayoutChanged = function (data) {
        _super.prototype.onListViewLayoutChanged.call(this, data);
        if (data.oldValue) {
            var newLayout = data.oldValue;
            newLayout._reset();
        }
        if (data.newValue) {
            var newLayout = data.newValue;
            newLayout._init(this);
        }
    };
    RadListView.prototype.onItemTemplateChanged = function (data) {
        _super.prototype.onItemTemplateChanged.call(this, data); //todo: update current template with the new one
        this.loadData();
    };
    RadListView.prototype.itemSwipeTemplateChanged = function (data) {
        _super.prototype.onItemSwipeTemplateChanged.call(this, data);
        this.updateSwipeToExecuteBehavior();
        this.loadData();
    };
    RadListView.prototype.onMultipleSelectionChanged = function (data) {
        _super.prototype.onMultipleSelectionChanged.call(this, data);
        this.updateSelectionBehavior();
    };
    RadListView.prototype.onItemReorderChanged = function (data) {
        _super.prototype.onItemReorderChanged.call(this, data);
        this.updateReorderBehavior();
    };
    RadListView.prototype.onItemSwipeChanged = function (data) {
        _super.prototype.onItemSwipeChanged.call(this, data);
        this.updateSwipeToExecuteBehavior();
    };
    RadListView.prototype.onPullToRefreshChanged = function (data) {
        _super.prototype.onPullToRefreshChanged.call(this, data);
        this.updatePullToRefreshBehavior();
    };
    RadListView.prototype.onLoadOnDemandModeChanged = function (data) {
        _super.prototype.onLoadOnDemandModeChanged.call(this, data);
        this.updateLoadOnDemandBehavior();
    };
    RadListView.prototype.onLoadOnDemandBufferSizeChanged = function (data) {
        _super.prototype.onLoadOnDemandBufferSizeChanged.call(this, data);
        this.updateLoadOnDemandBehavior();
    };
    RadListView.prototype.onSelectionBehaviorChanged = function (data) {
        _super.prototype.onSelectionBehaviorChanged.call(this, data);
        this.updateSelectionBehavior();
    };
    RadListView.prototype.onLoadOnDemandItemTemplateChanged = function (data) {
        _super.prototype.onLoadOnDemandItemTemplateChanged.call(this, data);
        this.updateLoadOnDemandBehavior();
    };
    RadListView.prototype.onSourceCollectionChanged = function (data) {
        if (this._android === undefined) {
            return;
        }
        if (data.action === observableArray.ChangeType.Update) {
            var itemValue = this._listViewAdapter.getItem(data.index);
            this._listViewAdapter.remove(data.index);
            this._listViewAdapter.add(data.index, itemValue);
        }
        else if (data.action === observableArray.ChangeType.Delete) {
            this._listViewAdapter.remove(data.index);
        }
        else if (data.action === observableArray.ChangeType.Add) {
            for (var i = 0; i < data.addedCount; i++) {
                if (isNaN(data.index)) {
                    this._listViewAdapter.add(new java.lang.Integer(this._listViewAdapter.getUniqueItemId()));
                }
                else {
                    this._listViewAdapter.add(data.index, new java.lang.Integer(this._listViewAdapter.getUniqueItemId()));
                }
            }
        }
        else if (data.action === observableArray.ChangeType.Splice) {
            if (data.removed && (data.removed.length > 0)) {
                for (var i = 0; i < data.removed.length; i++) {
                    this._listViewAdapter.remove(data.index + (data.removed.length - 1) - i);
                }
            }
            else {
                for (var i = 0; i < data.addedCount; i++) {
                    this._listViewAdapter.add(data.index + i, new java.lang.Integer(this._listViewAdapter.getUniqueItemId()));
                }
            }
        }
    };
    RadListView.prototype._onBindingContextChanged = function (oldValue, newValue) {
        _super.prototype._onBindingContextChanged.call(this, oldValue, newValue);
        if (this._headerView) {
            this._headerView.bindingContext = newValue;
        }
        if (this._footerView) {
            this._footerView.bindingContext = newValue;
        }
    };
    RadListView.prototype.refresh = function () {
        this.loadData();
    };
    RadListView.prototype.notifyPullToRefreshFinished = function () {
        if (!this._pullToRefreshBehavior) {
            return;
        }
        if (!this._android) {
            return;
        }
        this._android.getAdapter().notifyRefreshFinished();
    };
    RadListView.prototype.notifyLoadOnDemandFinished = function () {
        if (!this._loadOnDemandBehavior) {
            return;
        }
        if (!this._android) {
            return;
        }
        this._android.getAdapter().notifyLoadingFinished();
    };
    RadListView.prototype.notifySwipeToExecuteFinished = function () {
        if (!this._swipeExecuteBehavior) {
            return;
        }
        if (!this._android) {
            return;
        }
        if (this._android.getAdapter()) {
            this._android.getAdapter().notifySwipeExecuteFinished();
        }
    };
    RadListView.prototype.scrollToIndex = function (index) {
        if (this._android) {
            this._android.scrollToPosition(index);
        }
    };
    RadListView.prototype._updateHeaderFooter = function () {
        var headerView = this.getViewForViewType(listViewCommonModule.ListViewViewTypes.HeaderView);
        this._android.setHeaderView(null);
        var layoutParams = this._getViewLayoutParams();
        if (headerView) {
            //var headerView = builder.parse(this.headerItemTemplate, this);
            headerView.bindingContext = this.bindingContext;
            this._addView(headerView);
            headerView.android.setLayoutParams(layoutParams);
            this._android.setHeaderView(headerView.android);
            this._headerView = headerView;
        }
        var footerView = this.getViewForViewType(listViewCommonModule.ListViewViewTypes.FooterView);
        this._android.setFooterView(null);
        if (footerView) {
            //var footerView = builder.parse(this.footerItemTemplate, this);
            footerView.bindingContext = this.bindingContext;
            this._addView(footerView);
            footerView.android.setLayoutParams(layoutParams);
            this._android.setFooterView(footerView.android);
            this._footerView = footerView;
        }
    };
    RadListView.prototype.updateSwipeToExecuteBehavior = function () {
        if (!this._android || !(this.itemSwipeTemplate || this.itemViewLoader)) {
            return;
        }
        if (this.itemSwipe === true) {
            if (!this._swipeExecuteBehavior) {
                this._swipeExecuteBehavior = new com.telerik.widget.list.SwipeExecuteBehavior();
                this._swipeExecuteBehavior.setAutoDissolve(false);
                this._android.addBehavior(this._swipeExecuteBehavior);
                var that = new WeakRef(this);
                this._swipeExecuteListener = new com.telerik.widget.list.SwipeExecuteBehavior.SwipeExecuteListener({
                    swipeLimits: (that.get().listViewLayout.scrollDirection === "Vertical") ?
                        { left: 150, top: 0, right: 150, bottom: 0, threshold: 75 } :
                        { left: 0, top: 150, right: 0, bottom: 150, threshold: 75 },
                    onSwipeStarted: function (position) {
                        var args = {
                            eventName: listViewCommonModule.RadListView.itemSwipeProgressStartedEvent,
                            object: that.get()._listViewAdapter.getSwipeViewForItem(that.get().getItemAtIndex(position)),
                            itemIndex: position,
                            groupIndex: -1,
                            data: { swipeLimits: this.swipeLimits }
                        };
                        that.get().notify(args);
                        var listView = that.get();
                        if (listView.listViewLayout.scrollDirection === listViewCommonModule.ListViewScrollDirection.Horizontal) {
                            that.get()._swipeExecuteBehavior.setSwipeLimitStart(-this.swipeLimits.top);
                            that.get()._swipeExecuteBehavior.setSwipeLimitEnd(this.swipeLimits.bottom);
                        }
                        else {
                            that.get()._swipeExecuteBehavior.setSwipeLimitStart(-this.swipeLimits.right);
                            that.get()._swipeExecuteBehavior.setSwipeLimitEnd(this.swipeLimits.left);
                        }
                    },
                    onSwipeProgressChanged: function (position, currentOffset, swipeContent) {
                        var args = {
                            eventName: listViewCommonModule.RadListView.itemSwipeProgressChangedEvent,
                            object: that.get()._listViewAdapter.getSwipeViewForItem(that.get().getItemAtIndex(position)),
                            itemIndex: position,
                            data: { x: currentOffset, y: 0, swipeLimits: this.swipeLimits },
                            returnValue: undefined
                        };
                        that.get().notify(args);
                    },
                    onSwipeEnded: function (position, finalOffset) {
                        var args = {
                            eventName: listViewCommonModule.RadListView.itemSwipeProgressEndedEvent,
                            object: that.get()._listViewAdapter.getSwipeViewForItem(that.get().getItemAtIndex(position)),
                            itemIndex: position,
                            data: { x: finalOffset, y: 0, swipeLimits: this.swipeLimits },
                            returnValue: undefined
                        };
                        that.get().notify(args);
                        if (args.data.swipeLimits) {
                            if (Math.abs(finalOffset) > args.data.swipeLimits.threshold) {
                                if (finalOffset < 0) {
                                    if (that.get().listViewLayout.scrollDirection === "Horizontal") {
                                        that.get()._swipeExecuteBehavior.setSwipeOffset(-args.data.swipeLimits.bottom);
                                    }
                                    else if (that.get().listViewLayout.scrollDirection === "Vertical") {
                                        that.get()._swipeExecuteBehavior.setSwipeOffset(-args.data.swipeLimits.right);
                                    }
                                }
                                else if (finalOffset > 0) {
                                    if (that.get().listViewLayout.scrollDirection === "Horizontal") {
                                        that.get()._swipeExecuteBehavior.setSwipeOffset(args.data.swipeLimits.top);
                                    }
                                    else if (that.get().listViewLayout.scrollDirection === "Vertical") {
                                        that.get()._swipeExecuteBehavior.setSwipeOffset(args.data.swipeLimits.left);
                                    }
                                }
                            }
                            else {
                                that.get()._swipeExecuteBehavior.setSwipeOffset(0);
                            }
                        }
                    },
                    onExecuteFinished: function (position) {
                    }
                });
                this._swipeExecuteBehavior.addListener(this._swipeExecuteListener);
            }
            else {
            }
        }
        else {
            if (this._swipeExecuteBehavior) {
                this._android.removeBehavior(this._swipeExecuteBehavior);
                this._swipeExecuteBehavior.removeListener(this._swipeExecuteListener);
                this._swipeExecuteBehavior = null;
                this._swipeExecuteListener = null;
            }
        }
    };
    RadListView.prototype.updatePullToRefreshBehavior = function () {
        if (!this._android) {
            return;
        }
        if (this.pullToRefresh === true) {
            if (!this._pullToRefreshBehavior) {
                this._pullToRefreshBehavior = new com.telerik.widget.list.SwipeRefreshBehavior();
                this._android.addBehavior(this._pullToRefreshBehavior);
                var that = new WeakRef(this);
                this._pullToRefreshBehavior.addListener(new com.telerik.widget.list.SwipeRefreshBehavior.SwipeRefreshListener({
                    onRefreshRequested: function () {
                        var args = {
                            eventName: listViewCommonModule.RadListView.pullToRefreshInitiatedEvent,
                            object: that.get(),
                            returnValue: true
                        };
                        that.get().notify(args);
                    }
                }));
            }
            else {
            }
        }
        else {
            if (this._pullToRefreshBehavior) {
                this._android.removeBehavior(this._pullToRefreshBehavior);
                this._pullToRefreshBehavior = null;
            }
        }
    };
    RadListView.prototype.updateLoadOnDemandBehavior = function () {
        if (!this._android) {
            return;
        }
        if (!this._loadOnDemandBehavior) {
            this._loadOnDemandBehavior = undefined;
            var loadOnDemandView = this.getViewForViewType(listViewCommonModule.ListViewViewTypes.LoadOnDemandView);
            if (loadOnDemandView) {
                this._addView(loadOnDemandView);
                switch (this.loadOnDemandMode) {
                    case listViewCommonModule.ListViewLoadOnDemandMode.Manual:
                        this._loadOnDemandBehavior = new com.telerik.widget.list.LoadOnDemandBehavior(loadOnDemandView.android, new android.widget.LinearLayout(this._context));
                        break;
                    case listViewCommonModule.ListViewLoadOnDemandMode.Auto:
                    default: {
                        this._loadOnDemandBehavior = new com.telerik.widget.list.LoadOnDemandBehavior(new android.widget.LinearLayout(this._context), loadOnDemandView.android);
                        break;
                    }
                }
            }
            else {
                this._loadOnDemandBehavior = new com.telerik.widget.list.LoadOnDemandBehavior();
            }
            this._android.addBehavior(this._loadOnDemandBehavior);
            var that = new WeakRef(this);
            this._loadOnDemandBehavior.addListener(new com.telerik.widget.list.LoadOnDemandBehavior.LoadOnDemandListener({
                onLoadStarted: function () {
                    var args = {
                        eventName: listViewCommonModule.RadListView.loadMoreDataRequestedEvent,
                        object: that.get(),
                        returnValue: true
                    };
                    that.get().notify(args);
                    if (!args.returnValue) {
                        that.get()._loadOnDemandBehavior.setEnabled(false);
                    }
                },
                onLoadFinished: function () {
                }
            }));
        }
        else {
        }
        if (!isNaN(this.loadOnDemandBufferSize)) {
            this._loadOnDemandBehavior.setMaxRemainingItems(this.loadOnDemandBufferSize);
        }
        switch (this.loadOnDemandMode) {
            case listViewCommonModule.ListViewLoadOnDemandMode.Manual:
                this._loadOnDemandBehavior.setMode(com.telerik.widget.list.LoadOnDemandBehavior.LoadOnDemandMode.MANUAL);
                break;
            case listViewCommonModule.ListViewLoadOnDemandMode.Auto:
                this._loadOnDemandBehavior.setMode(com.telerik.widget.list.LoadOnDemandBehavior.LoadOnDemandMode.AUTOMATIC);
                break;
            default: {
                this._android.removeBehavior(this._loadOnDemandBehavior);
                this._loadOnDemandBehavior = undefined;
                break;
            }
        }
    };
    RadListView.prototype.updateReorderBehavior = function () {
        if (!this._android) {
            return;
        }
        if (this.itemReorder) {
            if (!this._reorderBehavior) {
                this._reorderBehavior = (this.reorderMode.toLowerCase() === listViewCommonModule.ListViewReorderMode.HoldAndDrag) ? new com.telerik.widget.list.ItemReorderBehavior() : new ExtendedReorderWithHandlesBehavior(-1);
                this._reorderBehavior.nsOwner = this;
                this._android.addBehavior(this._reorderBehavior);
                var that = new WeakRef(this);
                this._reorderBehavior.addListener(new com.telerik.widget.list.ItemReorderBehavior.ItemReorderListener({
                    newIndex: -1,
                    oldIndex: -1,
                    onReorderStarted: function (position) {
                        this.oldIndex = position;
                        var args = {
                            eventName: listViewCommonModule.RadListView.itemReorderStartedEvent,
                            object: that.get(),
                            itemIndex: this.oldIndex,
                            groupIndex: -1,
                            data: undefined
                        };
                        that.get().notify(args);
                    },
                    onReorderItem: function (fromIndex, toIndex) {
                        this.newIndex = toIndex;
                    },
                    onReorderFinished: function () {
                        var args = {
                            eventName: listViewCommonModule.RadListView.itemReorderedEvent,
                            object: that.get(),
                            itemIndex: this.oldIndex,
                            groupIndex: -1,
                            data: { targetIndex: this.newIndex, targetGroupIndex: -1 }
                        };
                        that.get().notify(args);
                    }
                }));
            }
            else {
            }
        }
        else {
            if (this._reorderBehavior) {
                this._android.removeBehavior(this._reorderBehavior);
                this._reorderBehavior = undefined;
            }
        }
    };
    RadListView.prototype.updateSelectionBehavior = function () {
        if (!this._android) {
            return;
        }
        if (!this._selectionBehavior) {
            this._selectionBehavior = new com.telerik.widget.list.SelectionBehavior();
            this._android.addBehavior(this._selectionBehavior);
            var that = new WeakRef(this);
            this._selectionBehavior.addListener(new com.telerik.widget.list.SelectionBehavior.SelectionChangedListener({
                onSelectionStarted: function () {
                },
                onItemIsSelectedChanged: function (position, newValue) {
                    var currentEventName = newValue === true ? listViewCommonModule.RadListView.itemSelectedEvent : listViewCommonModule.RadListView.itemDeselectedEvent;
                    var args = {
                        eventName: currentEventName,
                        object: that.get(),
                        itemIndex: position,
                        groupIndex: -1
                    };
                    that.get().notify(args);
                },
                onSelectionEnded: function () {
                }
            }));
        }
        else {
        }
        if (this.multipleSelection === true) {
            this._selectionBehavior.setSelectionMode(com.telerik.widget.list.SelectionBehavior.SelectionMode.MULTIPLE);
        }
        else {
            this._selectionBehavior.setSelectionMode(com.telerik.widget.list.SelectionBehavior.SelectionMode.SINGLE);
        }
        switch (this.selectionBehavior) {
            case listViewCommonModule.ListViewSelectionBehavior.None:
                this._android.removeBehavior(this._selectionBehavior);
                this._selectionBehavior = undefined;
                break;
            case listViewCommonModule.ListViewSelectionBehavior.LongPress:
                this._selectionBehavior.setSelectionOnTouch(com.telerik.widget.list.SelectionBehavior.SelectionOnTouch.NEVER);
                break;
            default: {
                this._selectionBehavior.setSelectionOnTouch(com.telerik.widget.list.SelectionBehavior.SelectionOnTouch.ALWAYS);
            }
        }
    };
    RadListView.prototype.loadData = function () {
        if (!this.items || !this._android || !(this.itemTemplate || this.itemViewLoader)) {
            return;
        }
        var nativeSource = new java.util.ArrayList();
        this._listViewAdapter = new ListViewAdapter(nativeSource, this);
        var dsLength = this.items.length;
        for (var i = 0; i < dsLength; i++) {
            var javaObject = new java.lang.Integer(this._listViewAdapter.getUniqueItemId());
            nativeSource.add(javaObject);
        }
        this._android.setAdapter(this._listViewAdapter);
    };
    return RadListView;
})(listViewCommonModule.RadListView);
exports.RadListView = RadListView;
var AndroidLVLayoutBase = (function (_super) {
    __extends(AndroidLVLayoutBase, _super);
    function AndroidLVLayoutBase() {
        _super.apply(this, arguments);
    }
    AndroidLVLayoutBase.prototype._init = function (owner) {
        this._owner = owner;
        if (this._owner._android) {
            this._onOwnerUICreated();
        }
    };
    AndroidLVLayoutBase.prototype._reset = function () {
    };
    AndroidLVLayoutBase.prototype._onOwnerUICreated = function () {
        this._android = this.getLayoutManager();
        this._owner._android.setLayoutManager(this._android);
        if (this.scrollDirection) {
            this.setLayoutOrientation(this.scrollDirection);
        }
        if (this.itemInsertAnimation) {
            this.updateItemAnimator(this.itemInsertAnimation);
        }
        if (this.itemDeleteAnimation) {
            this.updateItemAnimator(this.itemDeleteAnimation);
        }
    };
    AndroidLVLayoutBase.prototype.reset = function () {
        this._owner._android.setLayoutManager(null);
        this._owner = null;
    };
    AndroidLVLayoutBase.prototype.getLayoutManager = function () {
        return undefined;
    };
    AndroidLVLayoutBase.prototype.onScrollDirectionChanged = function (data) {
        if (data.newValue && this._android) {
            this.setLayoutOrientation(data.newValue);
        }
    };
    AndroidLVLayoutBase.prototype.onItemInsertAnimationChanged = function (data) {
        if (this._owner) {
            this.updateItemAnimator(data.newValue);
        }
    };
    AndroidLVLayoutBase.prototype.onItemDeleteAnimationChanged = function (data) {
        if (this._owner) {
            this.updateItemAnimator(data.newValue);
        }
    };
    AndroidLVLayoutBase.prototype.setLayoutOrientation = function (orientation) {
        this._android.setOrientation((orientation === listViewCommonModule.ListViewScrollDirection.Horizontal) ?
            android.support.v7.widget.LinearLayoutManager.HORIZONTAL :
            android.support.v7.widget.LinearLayoutManager.VERTICAL);
    };
    AndroidLVLayoutBase.prototype.updateItemAnimator = function (newAnimator) {
        if (!newAnimator) {
            this._owner._android.setItemAnimator(null);
            return;
        }
        switch (listViewCommonModule.ListViewItemAnimation[newAnimator]) {
            case listViewCommonModule.ListViewItemAnimation.Fade: {
                this._owner._android.setItemAnimator(new com.telerik.widget.list.FadeItemAnimator());
                break;
            }
            case listViewCommonModule.ListViewItemAnimation.Scale: {
                this._owner._android.setItemAnimator(new com.telerik.widget.list.ScaleItemAnimator());
                break;
            }
            case listViewCommonModule.ListViewItemAnimation.Slide: {
                this._owner._android.setItemAnimator(new com.telerik.widget.list.SlideItemAnimator());
                break;
            }
            default:
                this._owner._android.setItemAnimator(null);
        }
    };
    return AndroidLVLayoutBase;
})(listViewCommonModule.ListViewLayoutBase);
var ListViewLinearLayout = (function (_super) {
    __extends(ListViewLinearLayout, _super);
    function ListViewLinearLayout() {
        _super.call(this);
    }
    ListViewLinearLayout.prototype.getLayoutManager = function () {
        return new android.support.v7.widget.LinearLayoutManager(this._owner._context);
    };
    return ListViewLinearLayout;
})(AndroidLVLayoutBase);
exports.ListViewLinearLayout = ListViewLinearLayout;
var ListViewGridLayout = (function (_super) {
    __extends(ListViewGridLayout, _super);
    function ListViewGridLayout() {
        _super.call(this);
    }
    Object.defineProperty(ListViewGridLayout.prototype, "spanCount", {
        get: function () {
            return this._getValue(ListViewGridLayout.spanCountProperty);
        },
        set: function (value) {
            this._setValue(ListViewGridLayout.spanCountProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    ListViewGridLayout.onSpanCountPropertyChanged = function (data) {
        var lvLayout = data.object;
        lvLayout.onSpanCountChanged(data);
    };
    ListViewGridLayout.prototype.onSpanCountChanged = function (data) {
        if (!isNaN(+data.newValue) && this.android) {
            this.android.setSpanCount(data.newValue);
        }
    };
    ListViewGridLayout.prototype.getLayoutManager = function () {
        this.spanCount = (this.spanCount ? this.spanCount : 2);
        return new android.support.v7.widget.GridLayoutManager(this._owner._context, this.spanCount);
    };
    //note: this property should be defined in common module, but inheritence will not be possible then
    ListViewGridLayout.spanCountProperty = new dependencyObservable.Property("spanCount", "ListViewGridLayout", new proxyModule.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, ListViewGridLayout.onSpanCountPropertyChanged));
    return ListViewGridLayout;
})(ListViewLinearLayout);
exports.ListViewGridLayout = ListViewGridLayout;
var ListViewStaggeredLayout = (function (_super) {
    __extends(ListViewStaggeredLayout, _super);
    function ListViewStaggeredLayout() {
        _super.apply(this, arguments);
    }
    ListViewStaggeredLayout.prototype.getLayoutManager = function () {
        var orientation = this.scrollDirection === listViewCommonModule.ListViewScrollDirection.Vertical ?
            android.support.v7.widget.StaggeredGridLayoutManager.VERTICAL : android.support.v7.widget.StaggeredGridLayoutManager.HORIZONTAL;
        this.spanCount = (this.spanCount ? this.spanCount : 2);
        return new android.support.v7.widget.StaggeredGridLayoutManager(this.spanCount, orientation);
    };
    return ListViewStaggeredLayout;
})(ListViewGridLayout);
exports.ListViewStaggeredLayout = ListViewStaggeredLayout;
