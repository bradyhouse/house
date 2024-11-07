var meta = {
        fiddleHeader: 'CSV Report / Exporter',
        fiddleSubHeader: 'Fiddle exploring how to bind/unbind CSV files to a grid. When the user clicks the ' +
        'grid\'s save tool button, the contents of the grid is converted back to CSV and used to create a ' +
        'physical download link. <br />',
        urls: {
            a: 'report-a.csv',
            b: 'report-b.csv',
            github: 'https://github.com/bradyhouse/house/tree/master/fiddles/extjs6/fiddle-0033-CSVExporter'
        },
        consoleTag: 'H O U S E ~ f i d d l e s'
    },
    fiddleStore = null,
    fiddleChainedStore = null,
    reportManager = null;


