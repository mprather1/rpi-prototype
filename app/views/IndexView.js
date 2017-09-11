const indexView = Backbone.Marionette.View.extend({
  template: require('../templates/index-view-template.html'),
  tagName: 'li',
  events: {
    'click button': 'handleClick'
  },
  handleClick: function (e) {
    let value = $(e.currentTarget).data('value')
    let pin = $(e.currentTarget).data('pin')

    if ($(e.currentTarget).data('value') === 'off') {
      value = ('on')
      $(e.currentTarget).addClass('btn-primary').removeClass('btn-inactive')
    } else {
      value = ('off')
      $(e.currentTarget).addClass('btn-inactive').removeClass('btn-primary')
    }

    $(e.currentTarget).data('value', value)
    $(e.currentTarget).html(value)

    $.ajax({
      data: '',
      type: 'POST',
      url: 'http://192.168.0.101:8001/pin/' + pin + '/' + value,
      error: (err) => {
        console.log(err)
      }
    })
  }
})

export default indexView
