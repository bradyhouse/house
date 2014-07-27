Ext.define('App.model.Model', {
    extend: 'Ext.data.Model',
    fields: ['question', 'answer']
});

Ext.define('App.store.Store', {
    extend: 'Ext.data.Store',
    requires: ['App.model.Model'],
    model: 'App.model.Model',
    data: [
        { "id": "0", "question": "1+1", "answer": ["1+1=2"]},
        { "id": "1", "question": "1+2", "answer": ["1+2=3"]}
    ]
});

Ext.create('Ext.form.field.ComboBox', {
    width: 500,
    store: new App.store.Store(),
    displayField: 'question',
    valueField: 'id',
    multiSelect: true,
    queryMode: 'local',
    editable: false,
    value: [
        "0"
    ],
    listeners: {
        select: function (combo) {
            console.log('select');
            try {
                var models =this.valueModels;
                Ext.Msg.alert('', models[0].get('answer')[0]);
            } catch(err) {
                Ext.Msg.alert(err);
                return;
            }
        }
    },
    renderTo: Ext.getBody()
});
