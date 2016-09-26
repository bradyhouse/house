
declare enum TKListViewScrollDirection {
    TKListViewScrollDirectionVertical,
    TKListViewScrollDirectionHorizontal
}

declare enum TKListViewItemAlignment {
    TKListViewItemAlignmentStretch,
    TKListViewItemAlignmentLeft,
    TKListViewItemAlignmentCenter,
    TKListViewItemAlignmentRight
}

declare enum TKListViewItemAnimation {
    TKListViewItemAnimationDefault,
    TKListViewItemAnimationFade,
    TKListViewItemAnimationScale,
    TKListViewItemAnimationSlide
}

declare enum TKListViewReorderMode {
    TKListViewReorderModeWithHandle,
    TKListViewReorderModeWithLongPress
}

declare enum TKListViewSelectionBehavior {
    TKListViewSelectionBehaviorNone,
    TKListViewSelectionBehaviorPress,
    TKListViewSelectionBehaviorLongPress
}

declare enum TKListViewLoadOnDemandMode {
    TKListViewLoadOnDemandModeNone,
    TKListViewLoadOnDemandModeManual,
    TKListViewLoadOnDemandModeAuto
}

interface CGSize {
	width: number;
	height: number;
}

declare class UICollectionViewLayout extends NSObject {

}

declare class TKListViewLinearLayout extends UICollectionViewLayout {

    public static new(): TKListViewLinearLayout;

    public scrollDirection: TKListViewScrollDirection;
    public itemInsertAnimation: TKListViewItemAnimation;
    public itemDeleteAnimation: TKListViewItemAnimation;
    public itemAppearAnimation: TKListViewItemAnimation;
    public animationDuration: number;
    public itemAlignment: TKListViewItemAlignment;
    public itemSpacing: number;
    public itemSize: CGSize;
}

declare class TKListViewGridLayout extends TKListViewLinearLayout {
    public static new(): TKListViewGridLayout;

    public spanCount: number;
    public lineSpacing: number;
}

declare class TKListViewStaggeredLayout extends TKListViewGridLayout {
    public static new(): TKListViewStaggeredLayout;

    public alignLastLine: boolean;
}

declare class TKListViewStaggeredLayoutDelegate {

}

export interface TKListViewDelegate {

}

declare class TKDataSourceFilterDescriptor {

}

declare class TKDataSourceSortDescriptor {

}

declare class TKDataSourceGroupDescriptor {

}

declare class NSString extends NSObject {

}

declare class NSArray extends NSObject {

}

interface NSObjectProtocol {

}

declare class NSObject implements NSObjectProtocol {

}

declare class NSFormatter extends NSObject {

}

declare class NSIndexPath extends NSObject {

}

declare class TKDataSource extends NSObject implements TKListViewDataSource {


    public itemSource: any;
    public items: NSArray;
    public currentItem: any;
    public displayKey: NSString;
    public valueKey: NSString;
    public groupItemSourceKey: NSString;

    public formatter: NSFormatter;
    public allowItemsReorder: boolean;
    public reloadData(): void;

    public static new();
    public static alloc();

    public initWithItemSource(itemSource: any): TKDataSource;
    public initWithArray(items: NSArray): TKDataSource;
    public initWithArrayDisplayKey(items: NSArray, displayKey: NSString): TKDataSource;
    public initWithArrayDisplayKeyValueKey(items: NSArray, displayKey: NSString, valueKey: NSString): TKDataSource;

    public initWithJSONString(str: NSString): TKDataSource;
    public loadDataFromJSONStringRootItemKeyPath(string: NSString, rootItemKeyPath: NSString): TKDataSource;

    public loadDataFromJSONStringOfTypeRootItemKeyPath(string: NSString, foType: NSString, rootItemKeyPath: NSString): TKDataSource;

    public filterDescriptors: NSArray;
    public addFilterDescriptor(filterDescriptor: TKDataSourceFilterDescriptor): void;
    public removeFilterDescriptor(filterDescriptor: TKDataSourceFilterDescriptor): void;
    public removeAllFilterDescriptors(): void;

    public sortDescriptors: NSArray;
    public addSortDescriptor(sortDescriptor: TKDataSourceSortDescriptor): void;
    public removeSortDescriptor(sortDescriptor: TKDataSourceSortDescriptor): void;
    public removeAllSortDescriptors(): void;

    public groupDescriptors: NSArray;
    public addGroupDescriptor(groupDescriptor: TKDataSourceGroupDescriptor): void;
    public removeGroupDescriptor(groupDescriptor: TKDataSourceGroupDescriptor): void;
    public removeAllGroupDescriptors(): void;

    //TKListViewDataSource
    listViewNumberOfItemsInSection(listView: TKListView, section: number): number;
    listViewCellForItemAtIndexPath(listView: TKListView, indexPath: NSIndexPath): TKListViewCell;
    numberOfSectionsInListView(listView: TKListView): number;
    listViewViewForSupplementaryElementOfKindAtIndexPath(listView: TKListView, kind: NSString, indexPath: NSIndexPath): TKListViewReusableCell;
}

declare class UIResponder extends NSObject {

}

declare class UIView extends UIResponder {

}

declare class UIActivityIndicatorView extends UIView {

}

declare class TKListViewLoadOnDemandView extends UIView {

}

declare class TKListViewPullToRefreshView extends UIView {
    public static new(): TKListViewPullToRefreshView;
    public activityIndicator: UIActivityIndicatorView;
    public startAnimating(): void;
    public stopAnimating(): void;
}

declare class UICollectionViewCell extends UICollectionReusableView {

}

declare class UICollectionReusableView extends UIView {

}

declare class UILabel extends UIView {

}

declare class UIImageView extends UIView {

}

interface UIEdgeInsets {
	top: number;
	left: number;
	bottom: number;
	right: number;
}

declare class TKListViewReusableCell extends UICollectionViewCell {
    public textLabel: UILabel;
}

declare class TKListViewCell extends TKListViewReusableCell {
    public static new(): TKListViewCell;
    public swipeBackgroundView: UIView;
    public imageView: UIImageView;
    public reorderHandle: UIView;
    public detailTextLabel: UILabel;
    public contentInsets: UIEdgeInsets;
}

declare class UIScrollView extends UIView {

}

declare class UICollectionView extends UIScrollView {

}

declare class UICollectionViewTransitionLayout extends UICollectionViewLayout {

}

interface UICollectionViewDelegate {
	collectionViewShouldHighlightItemAtIndexPath?(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;
	collectionViewDidHighlightItemAtIndexPath?(collectionView: UICollectionView, indexPath: NSIndexPath): void;
	collectionViewDidUnhighlightItemAtIndexPath?(collectionView: UICollectionView, indexPath: NSIndexPath): void;
	collectionViewShouldSelectItemAtIndexPath?(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;
	collectionViewShouldDeselectItemAtIndexPath?(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;
	collectionViewDidSelectItemAtIndexPath?(collectionView: UICollectionView, indexPath: NSIndexPath): void;
	collectionViewDidDeselectItemAtIndexPath?(collectionView: UICollectionView, indexPath: NSIndexPath): void;
	collectionViewWillDisplayCellForItemAtIndexPath?(collectionView: UICollectionView, cell: UICollectionViewCell, indexPath: NSIndexPath): void;
	collectionViewWillDisplaySupplementaryViewForElementKindAtIndexPath?(collectionView: UICollectionView, view: UICollectionReusableView, elementKind: string, indexPath: NSIndexPath): void;
	collectionViewDidEndDisplayingCellForItemAtIndexPath?(collectionView: UICollectionView, cell: UICollectionViewCell, indexPath: NSIndexPath): void;
	collectionViewDidEndDisplayingSupplementaryViewForElementOfKindAtIndexPath?(collectionView: UICollectionView, view: UICollectionReusableView, elementKind: string, indexPath: NSIndexPath): void;
	collectionViewShouldShowMenuForItemAtIndexPath?(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;
	collectionViewCanPerformActionForItemAtIndexPathWithSender?(collectionView: UICollectionView, action: any, indexPath: NSIndexPath, sender: any): boolean;
	collectionViewPerformActionForItemAtIndexPathWithSender?(collectionView: UICollectionView, action: any, indexPath: NSIndexPath, sender: any): void;
	collectionViewTransitionLayoutForOldLayoutNewLayout?(collectionView: UICollectionView, fromLayout: UICollectionViewLayout, toLayout: UICollectionViewLayout): UICollectionViewTransitionLayout;
}

interface UICollectionViewDataSource {
	collectionViewNumberOfItemsInSection(collectionView: UICollectionView, section: number): number;
	collectionViewCellForItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): UICollectionViewCell;
	numberOfSectionsInCollectionView?(collectionView: UICollectionView): number;
	collectionViewViewForSupplementaryElementOfKindAtIndexPath?(collectionView: UICollectionView, kind: string, indexPath: NSIndexPath): UICollectionReusableView;
}

interface CGPoint {
	x: number;
	y: number;
}

declare enum UICollectionViewScrollPosition {
	UICollectionViewScrollPositionNone,
	UICollectionViewScrollPositionTop,
	UICollectionViewScrollPositionCenteredVertically,
	UICollectionViewScrollPositionBottom,
	UICollectionViewScrollPositionLeft,
	UICollectionViewScrollPositionCenteredHorizontally,
	UICollectionViewScrollPositionRight
}

declare class TKListView extends UIView implements UICollectionViewDataSource, UICollectionViewDelegate {

    public static new(): TKListView;

    public layout: TKListViewLinearLayout;

    public dataSource: TKListViewDataSource;

    public delegate: TKListViewDelegate;

    public allowsMultipleSelection: boolean;
    public allowsCellReorder: boolean;
    public allowsCellSwipe: boolean;
    public allowsPullToRefresh: boolean;
    public cellSwipeLimits: UIEdgeInsets;
    public cellSwipeTreshold: number;//CGFloat;
    public cellSwipeAnimationDuration: number;//  CGFloat;
    public autoScrollTreshold: number; //CGFloat;
    public pullToRefreshTreshold: number; /// CGFloat
    public loadOnDemandMode: TKListViewLoadOnDemandMode;
    public loadOnDemandBufferSize: number;// NSInteger
    public contentInset: UIEdgeInsets;
    public contentOffset: CGPoint;
    public scrollDirection: TKListViewScrollDirection;
    public selectionBehavior: TKListViewSelectionBehavior;
    public pullToRefreshView: TKListViewPullToRefreshView;
    public loadOnDemandView: TKListViewLoadOnDemandView;


    public reloadData();

    public insertItemsAtIndexPaths(indexPaths: any);
    public deleteItemsAtIndexPaths(indexPaths: any);

    public selectItemAtIndexPath(indexPath: NSIndexPath);
    public deselectItemAtIndexPath(indexPath: NSIndexPath);

    //public api
    public registerClassForCellWithReuseIdentifier(classInfo: any, cellName: string);
    public dequeueReusableCellWithReuseIdentifierForIndexPath(identifier: NSString, indexPath: NSIndexPath): any;;

    public scrollToItemAtIndexPathAtScrollPositionAnimated(indexPath: NSIndexPath, scrollPosition: UICollectionViewScrollPosition, animated: boolean);
    public didRefreshOnPull();
    public didLoadDataOnDemand();

    //UICollectionViewDataSource protocol methods
    collectionViewNumberOfItemsInSection(collectionView: UICollectionView, section: number): number;
    collectionViewCellForItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): UICollectionViewCell;
    numberOfSectionsInCollectionView(collectionView: UICollectionView): number;
    collectionViewViewForSupplementaryElementOfKindAtIndexPath(collectionView: UICollectionView, kind: string, indexPath: NSIndexPath): UICollectionReusableView;

    //UICollectionViewDelegate protocol methods
    collectionViewShouldHighlightItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;
    collectionViewDidHighlightItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): void;
    collectionViewDidUnhighlightItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): void;
    collectionViewShouldSelectItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;
    collectionViewShouldDeselectItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;
    collectionViewDidSelectItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): void;
    collectionViewDidDeselectItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): void;
    collectionViewWillDisplayCellForItemAtIndexPath(collectionView: UICollectionView, cell: UICollectionViewCell, indexPath: NSIndexPath): void;
    collectionViewWillDisplaySupplementaryViewForElementKindAtIndexPath(collectionView: UICollectionView, view: UICollectionReusableView, elementKind: string, indexPath: NSIndexPath): void;
    collectionViewDidEndDisplayingCellForItemAtIndexPath(collectionView: UICollectionView, cell: UICollectionViewCell, indexPath: NSIndexPath): void;
    collectionViewDidEndDisplayingSupplementaryViewForElementOfKindAtIndexPath(collectionView: UICollectionView, view: UICollectionReusableView, elementKind: string, indexPath: NSIndexPath): void;
    collectionViewShouldShowMenuForItemAtIndexPath(collectionView: UICollectionView, indexPath: NSIndexPath): boolean;
    collectionViewCanPerformActionForItemAtIndexPathWithSender(collectionView: UICollectionView, action: any, indexPath: NSIndexPath, sender: any): boolean;
    collectionViewPerformActionForItemAtIndexPathWithSender(collectionView: UICollectionView, action: any, indexPath: NSIndexPath, sender: any): void;
    collectionViewTransitionLayoutForOldLayoutNewLayout(collectionView: UICollectionView, fromLayout: UICollectionViewLayout, toLayout: UICollectionViewLayout): UICollectionViewTransitionLayout;

}

interface UIScrollViewDelegate {
	scrollViewDidScroll?(scrollView: UIScrollView): void;
	scrollViewDidZoom?(scrollView: UIScrollView): void;
	scrollViewWillBeginDragging?(scrollView: UIScrollView): void;
	scrollViewWillEndDraggingWithVelocityTargetContentOffset?(scrollView: UIScrollView, velocity: CGPoint, targetContentOffset: any): void;
	scrollViewDidEndDraggingWillDecelerate?(scrollView: UIScrollView, decelerate: boolean): void;
	scrollViewWillBeginDecelerating?(scrollView: UIScrollView): void;
	scrollViewDidEndDecelerating?(scrollView: UIScrollView): void;
	scrollViewDidEndScrollingAnimation?(scrollView: UIScrollView): void;
	viewForZoomingInScrollView?(scrollView: UIScrollView): UIView;
	scrollViewWillBeginZoomingWithView?(scrollView: UIScrollView, view: UIView): void;
	scrollViewDidEndZoomingWithViewAtScale?(scrollView: UIScrollView, view: UIView, scale: number): void;
	scrollViewShouldScrollToTop?(scrollView: UIScrollView): boolean;
	scrollViewDidScrollToTop?(scrollView: UIScrollView): void;
}

interface TKListViewDelegate extends UIScrollViewDelegate {
    listViewShouldHighlightItemAtIndexPath(listView: TKListView, indexPath: NSIndexPath): boolean;
    listViewDidHighlightItemAtIndexPath(listView: TKListView, indexPath: NSIndexPath): void;
    listViewDidUnhighlightItemAtIndexPath(listView: TKListView, indexPath: NSIndexPath): void;
    listViewShouldSelectItemAtIndexPath(listView: TKListView, indexPath: NSIndexPath): boolean;
    listViewShouldDeselectItemAtIndexPath(listView: TKListView, indexPath: NSIndexPath): boolean;
    listViewDidSelectItemAtIndexPath(listView: TKListView, indexPath: NSIndexPath): void;
    listViewDidDeselectItemAtIndexPath(listView: TKListView, indexPath: NSIndexPath): void;
    listViewDidReorderItemFromIndexPathToIndexPath(listView: TKListView, originalIndexPath: NSIndexPath, targetIndexPath: NSIndexPath);
    listViewShouldSwipeCellAtIndexPath(listView: TKListView, cell: TKListViewCell, indexPath: NSIndexPath): boolean;
    listViewDidSwipeCellAtIndexPathWithOffset(listView: TKListView, cell: TKListViewCell, indexPath: NSIndexPath, offset: CGPoint): void;
    listViewDidFinishSwipeCellAtIndexPathWithOffset(listView: TKListView, cell: TKListViewCell, indexPath: NSIndexPath, offset: CGPoint): void;
    listViewDidPullWithOffset(listView: TKListView, offset: CGPoint): void;
    listViewDidLongPressCellAtIndexPath(listView: TKListView, cell: TKListViewCell, indexPath: NSIndexPath): void;
    listViewShouldLoadMoreDataAtIndexPath(listView: TKListView, indexPath: NSIndexPath): boolean;
    listViewShouldRefreshOnPull(listView: TKListView): boolean;

}

interface TKListViewDataSource extends NSObject {
    listViewNumberOfItemsInSection(listView: TKListView, section: number): number;
    listViewCellForItemAtIndexPath(listView: TKListView, indexPath: NSIndexPath): TKListViewCell;
    numberOfSectionsInListView(listView: TKListView): number;
    listViewViewForSupplementaryElementOfKindAtIndexPath(listView: TKListView, kind: NSString, indexPath: NSIndexPath): TKListViewReusableCell;
}


