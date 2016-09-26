declare module android {
    module support {
        module v7 {
            module widget {
                module RecyclerView {
                    class LayoutManager {
                        constructor(context: any);
                        setOrientation(orientation: any);
                        static VERTICAL;
                        static HORIZONTAL;
                    }
                }
                class LinearLayoutManager extends RecyclerView.LayoutManager {

                }
                class GridLayoutManager extends RecyclerView.LayoutManager {
                    constructor(context: any, spanCount: number);
                }
                class StaggeredGridLayoutManager extends RecyclerView.LayoutManager {
                    constructor(spanCount: number, orientation: any);
                }
            }
        }
    }
    module widget {
        class FrameLayout {
            constructor(context: any);
            addView(view: any);
        }
    }
}

declare module java {
    module lang {
        class Integer {
        }
    }
}

declare module org {
    module nativescript {
        module widgets {
            class CommonLayoutParams {
                static MATCH_PARENT;
                static WRAP_CONTENT;
                width: any;
                height: any;
            }
        }
    }
}

declare module com {
    module telerik {
        module widget {
            module list {
                module SelectionBehavior {
                    enum SelectionMode {
                        MULTIPLE, SINGLE
                    }
                    enum SelectionOnTouch {
                        ALWAYS, NEVER
                    }
                    interface SelectionChangedListener {
                        onSelectionStarted();
                        onItemIsSelectedChanged(position: number, newValue: boolean);
                        onSelectionEnded();
                    }
                    class SelectionChangedListener {
                        constructor(impl: any);
                    }

                }
                module LoadOnDemandBehavior {
                    enum LoadOnDemandMode {
                        MANUAL,
                        AUTOMATIC
                    }
                    interface LoadOnDemandListener {
                        onLoadStarted();
                        onLoadFinished();
                    }
                    class LoadOnDemandListener {
                        constructor(impl: LoadOnDemandListener);
                    }
                }
                module SwipeRefreshBehavior {
                    interface SwipeRefreshListener {
                        onRefreshRequested();
                    }

                    class SwipeRefreshListener {
                        constructor(impl: SwipeRefreshListener);
                    }
                }
                module SwipeExecuteBehavior {
                    interface SwipeExecuteListener {
                        onSwipeStarted(position: number);
                        onSwipeProgressChanged(position: number, currentOffset: number, swipeContent: any);
                        onSwipeEnded(position: number, finalOffset: number);
                        onExecuteFinished(position: number);
                        swipeLimits: any;
                    }

                    class SwipeExecuteListener {
                        constructor(impl: SwipeExecuteListener);
                    }
                }

                module RadListView {
                    interface ItemClickListener {
                        onItemClick(itemPosition: number, motionEvent: any);
                        onItemLongClick(itemPosition: number, motionEvent: any);
                    }

                    class ItemClickListener {
                        constructor(impl: ItemClickListener);
                    }
                }

                module ItemReorderBehavior {
                    interface ItemReorderListener {
                        onReorderStarted(position: number);
                        onReorderItem(fromIndex: number, toIndex: number);
                        onReorderFinished();
                        newIndex: number;
                        oldIndex: number;
                    }

                    class ItemReorderListener {
                        constructor(impl: ItemReorderListener);
                    }

                }

                class ListViewDataSourceAdapter extends ListViewAdapter {
                }
                class ListViewAdapter {
                    constructor(items);
                    notifySwipeExecuteFinished();
                    remove(item: any): boolean;
                    add(item: any);
                    add(index: number, item: any);
                    notifyRefreshFinished();
                    notifyLoadingFinished();
                    getItem(position: number);
                    getItems(): any;
                    reorderItem(oldPosition: number, newPosition: number): boolean;
                    setItems(items: any);
                    getItemCount(): number;
                }
                class ListViewBehavior {
                    nsOwner;
                }
                class RadListView {
                    constructor(context: any);
                    setHeaderView(view: any);
                    setFooterView(view: any);
                    setAdapter(adapter: ListViewDataSourceAdapter);
                    setLayoutManager(layout: any); //LayoutManager
                    setItemAnimator(animator: any);
                    addBehavior(behavour: ListViewBehavior);
                    removeBehavior(behavour: ListViewBehavior);
                    getAdapter(): ListViewDataSourceAdapter;
                    addItemClickListener(listener: any);
                    ItemClickListener();
                    scrollToPosition(position: number);
                }

                class SelectionBehavior extends ListViewBehavior {
                    constructur();
                    setSelectionMode(mode: telerik.widget.list.SelectionBehavior.SelectionMode);
                    setSelectionOnTouch(mode: telerik.widget.list.SelectionBehavior.SelectionOnTouch);
                    addListener(listener: telerik.widget.list.SelectionBehavior.SelectionChangedListener);
                    removeListener(listener: telerik.widget.list.SelectionBehavior.SelectionChangedListener);
                    selectedItems(): any;
                    changeIsSelected(index: number, value: boolean);
                }
                class ItemReorderBehavior extends ListViewBehavior {
                    constructor();
                    addListener(listener: com.telerik.widget.list.ItemReorderBehavior.ItemReorderListener);
                    removeListener(listener: com.telerik.widget.list.ItemReorderBehavior.ItemReorderListener);
                }
                class SwipeExecuteBehavior extends ListViewBehavior {
                    constructor();
                    addListener(listener: com.telerik.widget.list.SwipeExecuteBehavior.SwipeExecuteListener);
                    setSwipeLimitStart(value: number);
                    setSwipeLimitEnd(value: number);
                    removeListener(listener: com.telerik.widget.list.SwipeExecuteBehavior.SwipeExecuteListener);
                    setSwipeOffset(swipeOffset: number);
                    setAutoDissolve(autoDissolve: boolean);
                }
                class SwipeRefreshBehavior extends ListViewBehavior {
                    cosntructor();
                    addListener(listener: com.telerik.widget.list.SwipeRefreshBehavior.SwipeRefreshListener);
                    removeListener(listener: com.telerik.widget.list.SwipeRefreshBehavior.SwipeRefreshListener);
                }
                class LoadOnDemandBehavior extends ListViewBehavior {
                    constructor();
                    constructor(view1: any, view2: any);
                    setMaxRemainingItems(count: number);
                    setMode(mode: com.telerik.widget.list.LoadOnDemandBehavior.LoadOnDemandMode);
                    addListener(listener: com.telerik.widget.list.LoadOnDemandBehavior.LoadOnDemandListener);
                    removeListener(listener: com.telerik.widget.list.LoadOnDemandBehavior.LoadOnDemandListener);
                    setEnabled(enabled: boolean);
                }
                class FadeItemAnimator {
                    constructor();
                }
                class ScaleItemAnimator {
                    constructor();
                }
                class SlideItemAnimator {
                    constructor();
                }

                class ListViewHolder {
                    constructor(view: any); //android.view.View
                    getItem(index: number);
                    nsView: any;
                }

                class ReorderWithHandlesBehavior extends com.telerik.widget.list.ItemReorderBehavior {
                    constructor(viewId: number);
                }
            }
        }
    }
}
