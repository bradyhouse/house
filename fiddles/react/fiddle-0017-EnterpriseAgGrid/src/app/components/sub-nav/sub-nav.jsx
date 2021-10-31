import './sub-nav.css';

const SubNav = (props) => {

  if (props.showGrid) {
    return (
      <div style={{width: '100%', padding: '5px'}} >
        <div style={{width: '100%', height: '25px'}}>
          <div style={{float: 'right'}}>
          <input onChange={(event) => props.onQuickFilterChanged(event)}
            type="text"
            id="quickFilterInput"
            placeholder="Type text to filter..."/>
            &nbsp;
            <button disabled={!props.showGrid} onClick={(event) => props.onShowGrid(false)}>Destroy Grid</button>
            &nbsp;
            <button disabled={props.showGrid} onClick={(event) => props.onShowGrid(true)}>Create Grid</button>
          </div>
          <div>
            <b>Employee Skills and Contact Details</b>&nbsp;
            {props.rowCount}
          </div>
        </div>
        <div style={{padding:'4px'}} className="toolbar">
          <span>
            <b>Grid API:</b>
            <button onClick={(event) => props.onSelectAll(event)}>
              &nbsp;Select All&nbsp;
            </button>
            <button onClick={(event) => props.onClearSelection(event)}>
              &nbsp;Clear Selections&nbsp;
            </button>
          </span>
          <span style={{marginLeft: '20px'}}>
          <b>Column API:</b>
            <button onClick={() => props.onShowCountryColumn(false)}>&nbsp;Hide Country Column&nbsp;</button>
            <button onClick={() => props.onShowCountryColumn(true)}>&nbsp;Show Country Column&nbsp;</button>
          </span>
        </div>
        <div style={{clear: 'both'}}></div>
        <div style={{padding: '4px'}}>
          <label>
            <input type="checkbox" onChange={(event) => props.onShowToolPanel(event)} />
            &nbsp;<b>Show Tool Panel</b>&nbsp;
          </label>
          &nbsp;
          <button onClick={() => props.onRefreshData()}>&nbsp;Refresh Data&nbsp;</button>
        </div>
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
