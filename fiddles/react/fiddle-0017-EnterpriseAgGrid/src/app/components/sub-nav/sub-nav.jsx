import './sub-nav.css';

const SubNav = (props) => {

  if (props.showGrid) {
    return (
      <div style={{width: '100%', padding: '5px'}} >
        <div style={{width: '100%', height: '20px'}}>
          <div style={{float: 'right'}}>
          <input onChange={(event) => props.onQuickFilterChanged(event)}
            type="text"
            id="quickFilterInput"
            placeholder="Type text to filter..."/>
            <button disabled={!props.showGrid} onClick={(event) => props.onShowGrid(false)}>Destroy Grid</button>
            <button disabled={props.showGrid} onClick={(event) => props.onShowGrid(true)}>Create Grid</button>
          </div>
          <div>
            <b>Employee Skills and Contact Details</b>&nbsp;
            {props.rowCount}
          </div>
        </div>
        <div style={{padding:'4px'}} className="toolbar">
          <span>
            Grid API:
            <button onClick={(event) => props.onSelectAll(event)}>
              Select All
            </button>
            <button onClick={(event) => props.onClearSelection(event)}>
              Clear Selections
            </button>
          </span>
        </div>
        <div style={{clear: 'both'}}></div>
      </div>
    )
  } else {
    return (
      <div style={{width: '100%', padding: '5px'}} >
        <div style={{width: '100%', height: '60px'}}>
          <div style={{float: 'right'}}>
            <button disabled={!props.showGrid} onClick={(event) => props.onShowGrid(false)}>Destroy Grid</button>
            <button disabled={props.showGrid} onClick={(event) => props.onShowGrid(true)}>Create Grid</button>
          </div>
        </div>
        <div style={{clear: 'both'}}></div>
      </div>
    );
  }



};

export default SubNav;
