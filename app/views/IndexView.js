const indexView = Backbone.Marionette.View.extend({
  template: require('../templates/index-view-template.html'),
  tagName: 'li',
  events: {
    'click button': 'handleClick'
  },
  handleClick: function (e) {
    let value = []

    if ($(e.currentTarget).data('value') === 'off') {
      value.push('on', 'red')
      $(e.currentTarget).addClass('btn-primary').removeClass('btn-inactive')
    } else {
      value.push('off', 'white')
      $(e.currentTarget).addClass('btn-inactive').removeClass('btn-primary')
    }

    $(e.currentTarget).data('value', value[0])
    $(e.currentTarget).html(value[0])

    $.ajax({
      data: '',
      type: 'POST',
      url: 'http://192.168.0.101:8001/pin/23/' + value[0],
      error: (err) => {
        console.log(err)
      }
    })
  }
})

export default indexView
