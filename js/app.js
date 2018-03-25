'use strict';

var Wrapper = React.createClass({
  displayName: 'Wrapper',

  loadCommentsFromServer: function loadCommentsFromServer() {

  },
  componentDidMount: function componentDidMount() {
    this.loadCommentsFromServer();
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'main-page__wrapper' }
    );
  }
});

alert( 1+1 );
ReactDOM.render(React.createElement(Wrapper, { url: 'api.php' }), document.querySelector('.main-page'));
