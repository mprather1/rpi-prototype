import Marionette from 'marionette'
import IndexView from './views/IndexView'

const Controller = Marionette.Object.extend({
  initialize: function (options) {
    this.app = options.app
  },

  index: function () {
    console.log('index')
    this.app.view.showChildView('main', new IndexView())
  }
})

export default Controller
