Ext.define('Fiddle.Tune', {
  extend: 'Ext.data.Model',

  fields: [
    {
      name: 'tag'
    },
    {
      name: 'title'
    },
    {
      name: 'artist'
    },
    {
      name: 'category'
    },
    {
      name: 'price',
      type: 'float'
    },
    {
      name: 'image'
    },
    {
      name: 'preview'
    },
    {
      name: 'id'
    },
    {
      name: 'currency'
    },
    {
      name: 'link'
    }
  ]
});