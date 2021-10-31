import React, { useEffect, useRef, useState, useCallback } from 'react';
import './custom-header.css';

const CustomHeader = (props) => {

  const [ascSort, setAscSort] = useState('inactive');
  const [descSort, setDescSort] = useState('inactive');
  const [noSort, setNoSort] = useState('inactive');
  const [isFilter, setIsFilter] = useState('inactiveFilter');
  const refButton = useRef(null);

  //#region EVENT HANDLERS

  const onMenuClicked = () => {
    props.showColumnMenu(refButton.current);
  };

  const onSortChanged = useCallback( () => {
    setAscSort(props.column.isSortAscending() ? 'active' : 'inactive');
    setDescSort(props.column.isSortDescending() ? 'active' : 'inactive');
    setNoSort(
      !props.column.isSortAscending() && !props.column.isSortDescending()
        ? 'inactive'
        : 'active'
    );
  },[props.column]);

  const onFilterActiveChanged = useCallback(() => {
    setIsFilter(props.column.isFilterActive() ? 'activeFilter' : 'inactiveFilter');
  }, [props.column]);

  const onSortRequested = (order, event) => {
    props.setSort(order, event.shiftKey);
  };

  //#endregion

  useEffect(() => {
    props.column.addEventListener('sortChanged', onSortChanged);
    props.column.addEventListener('filterActiveChanged', onFilterActiveChanged);
    onSortChanged();
    onFilterActiveChanged();

  }, [onSortChanged, props.column]);

  let menu = null;

  if (props.enableMenu) {
    menu = (
      <div style={{ float: 'right' }}
        ref={refButton}
        className="customHeaderMenuButton"
        onClick={() => onMenuClicked()}
      >
      <i className={`fa ${props.menuIcon}`}></i>
      <i className={`fa fa-filter ${isFilter}`}></i>
      </div>
    );
  }

  let sort = null;
  if (props.enableSorting) {
    sort = (
      <div style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
        <div
          onClick={(event) => onSortRequested('asc', event)}
          onTouchEnd={(event) => onSortRequested('asc', event)}
          className={`customSortDownLabel ${ascSort}`}
        >
          <i className="fa fa-long-arrow-alt-down"></i>
        </div>
        <div
          onClick={(event) => onSortRequested('desc', event)}
          onTouchEnd={(event) => onSortRequested('desc', event)}
          className={`customSortUpLabel ${descSort}`}
        >
          <i className="fa fa-long-arrow-alt-up"></i>
        </div>
        <div
          onClick={(event) => onSortRequested('', event)}
          onTouchEnd={(event) => onSortRequested('', event)}
          className={`customSortRemoveLabel ${noSort}`}
        >
          <i className="fa fa-times"></i>
        </div>
      </div>
    );
  }

  return (
    <div className="customHeaderLabel">
        {props.displayName}
          {sort}
          {menu}
       </div>
  );
};

export default CustomHeader;
