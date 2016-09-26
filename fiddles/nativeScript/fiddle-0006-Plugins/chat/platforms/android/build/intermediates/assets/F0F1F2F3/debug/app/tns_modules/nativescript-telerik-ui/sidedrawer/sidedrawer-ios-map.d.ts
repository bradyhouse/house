////////////////////////////////////////////////
//native api declarations
declare class NSObject {
    static new(); NSObject;
}

declare class TKSideDrawer {
    static new(): TKSideDrawer;

    initWithHostview(UIView): TKSideDrawer;

    transition: TKSideDrawerTransitionType;
    position: TKSideDrawerPosition;
    isVisible: boolean;
    width: number;
    style: any;
    delegate: TKSideDrawerDelegate;

    footerView: any;
    headerView: any;
    hostview: any;
    content: any;

    show(): void;
    showWithTransition(transition: TKSideDrawerTransitionType): void;
    dismiss(): void;
}

declare class TKSideDrawerView {
    static new(): TKSideDrawerView;
    static alloc(); any;
    mainView: UIView;
    defaultSideDrawer: TKSideDrawer;
    initWithFrameMainView(frame: CGRect, mainView: UIView): TKSideDrawerView;
}

declare class TKSideDrawerDelegate {
    static new(): TKSideDrawerDelegate;
}

declare class TKSideDrawerStyle { }; //todo: consider usage of this type for custom styling

declare enum TKSideDrawerTransitionType {
    TKSideDrawerTransitionTypeSlideInOnTop,
    TKSideDrawerTransitionTypeReveal,
    TKSideDrawerTransitionTypePush,
    TKSideDrawerTransitionTypeSlideAlong,
    TKSideDrawerTransitionTypeReverseSlideOut,
    TKSideDrawerTransitionTypeScaleUp,
    TKSideDrawerTransitionTypeFadeIn,
    TKSideDrawerTransitionTypeScaleDownPusher
    // TKSideDrawerTransitionTypeCustom //custom not allowed for now
}

declare enum TKSideDrawerPosition {
    TKSideDrawerPositionLeft,
    TKSideDrawerPositionRight,
    TKSideDrawerPositionTop,
    TKSideDrawerPositionBottom
}