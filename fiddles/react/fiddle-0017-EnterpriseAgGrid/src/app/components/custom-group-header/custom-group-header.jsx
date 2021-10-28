import React, { useEffect, useState } from 'react';
import './custom-group-header.css';

const CustomGroupHeader = (props) => {
  const [expandState, setExpandState] = useState('collapsed');

  const expandOrCollapse = () => {
    let currentState = props.columnGroup.getOriginalColumnGroup().isExpanded();
    props.setExpanded(!currentState);
  };

  const syncExpandButtons = () => {
    setExpandState(
      props.columnGroup.getOriginalColumnGroup().isExpanded()
        ? 'expanded'
        : 'collapsed'
    );
  };

  useEffect(() => {
    props.columnGroup
      .getOriginalColumnGroup()
      .addEventListener('expandedChanged', syncExpandButtons);
    syncExpandButtons();

    return () => {
      props.columnGroup
        .getOriginalColumnGroup()
        .removeEventListener('expandedChanged', syncExpandButtons);
    };
  }, []);

  return (
    <div className="ag-header-group-cell-label">
      <div className="customHeaderLabel">{props.displayName}</div>
      <div
        className={`customExpandButton ${expandState}`}
        onClick={() => expandOrCollapse()}
      >
        <i className="fa fa-arrow-right"></i>
      </div>
    </div>
  );
};

export default CustomGroupHeader;
