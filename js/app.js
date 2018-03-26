'use strict';

// формат фильтра authorsFilter = { '1':''  }, categoriesFilter = { '2': '' }
var authorsFilter = {   },
    categoriesFilter = {  },

// блок для фильтрации
    filterBlock = React.createClass({
    displayName: 'filterBlock',
    render: function render() {

      var itemsAuthors, itemsCategories;

      //передаём свойство со списком авторов и категорий, чтобы выстроить фильтры

      if (this.props.authors.length != 0)
        itemsAuthors = this.props.authors.map(function (item) {
          return React.createElement( 'div', {},
            React.createElement( 'input', { type: 'checkbox', name: '',  className: '', id: 'author-filter-form__checkbox__' + item[0] } ),
            React.createElement( 'label', {  className: '', htmlFor: 'author-filter-form__checkbox__' + item[0] }, item[1] ),
          );
        });
      if (this.props.categories.length != 0)
        itemsCategories = this.props.categories.map(function (item) {
          return React.createElement( 'div', {},
            React.createElement( 'input', { type: 'checkbox', name: '',  className: '', id: 'categories-filter-form__checkbox__' + item[0] } ),
            React.createElement( 'label', {  className: '', htmlFor: 'categories-filter-form__checkbox__' + item[0] }, item[1]  ),
          )
        });

      return React.createElement( 'div', { className: 'main-page__filter-block__main' },
              React.createElement( 'div', { className: 'main-page__filter-block title' }, 'Фильтр' ),
              React.createElement( 'div', { className: 'main-page__filter-block filter-form' },
                React.createElement( 'div', { className: 'main-page__filter-block filter-form__title' }, 'Выберите автора' ),
                React.createElement( 'form', { className: 'main-page__filter-block filter-form__body js-hiden' },
                  React.createElement( 'div', {},
                    // React.createElement( 'input', { type: 'checkbox', name: '',  className: '', id: 'author-filter-form__checkbox__-1' } ),
                    // React.createElement( 'label', {  className: '', htmlFor: 'author-filter-form__checkbox__-1' }, 'все' ),
                  ),
                  itemsAuthors
                )
              ),
              React.createElement( 'div', { className: 'main-page__filter-block filter-form' },
                React.createElement( 'div', { className: 'main-page__filter-block filter-form__title' }, 'Выберите категорию' ),
                React.createElement( 'form', { className: 'main-page__filter-block filter-form__body js-hiden' },
                  React.createElement( 'div', {},
                    // React.createElement( 'input', { type: 'checkbox', name: '',  className: '', id: 'categories-filter-form__checkbox__-1' } ),
                    // React.createElement( 'label', {  className: '', htmlFor: 'categories-filter-form__checkbox__-1' }, 'все' ),
                  ),
                  itemsCategories
                )
              ),
              React.createElement( 'div', { className: 'main-page__filter-block button' }, 'отфильтрить' )
      )
    }
}),
    quotesBlock = React.createClass({
    displayName: 'QuotesBlock',
    render: function render() {

      var itemsQuotes, _this = this;

      if (this.props.quotes.length != 0)
        itemsQuotes = this.props.quotes.map(function (item) {

          if( authorsFilter[ item['author'] ] != undefined || $.isEmptyObject(authorsFilter) )
            if( categoriesFilter[ item['categories'] ] != undefined || $.isEmptyObject(categoriesFilter) )
              return React.createElement( 'div', { className: 'main-page__quotes-block__quote'},
                      React.createElement( 'div', { className: 'main-page__quotes-block__quote__string'},
                        React.createElement( 'div', { className: 'main-page__quotes-block__quote__string__buttons'},
                          React.createElement( 'span', { className: 'main-page__quotes-block__quote__string__button edit-button' }, 'изменить' ),
                          React.createElement( 'span', { className: 'main-page__quotes-block__quote__string__button exit-button' }, 'удалить' )
                        )
                      ),
                      React.createElement( 'div', { className: 'main-page__quotes-block__quote__string'},
                        React.createElement( 'div', { className: 'main-page__quotes-block__quote__string caption'}, 'Автор:' ),
                        React.createElement( 'div', { className: 'main-page__quotes-block__quote__string value'},  _this.props.authors[ item['author'] ] ? _this.props.authors[ item['author'] ][1] :'' ),
                      ),
                      React.createElement( 'div', { className: 'main-page__quotes-block__quote__string'},
                        React.createElement( 'div', { className: 'main-page__quotes-block__quote__string caption'}, 'Цитата:' ),
                        React.createElement( 'div', { className: 'main-page__quotes-block__quote__string value'}, item['text'] ),
                      ),
                      React.createElement( 'div', { className: 'main-page__quotes-block__quote__string'},
                        React.createElement( 'div', { className: 'main-page__quotes-block__quote__string caption'}, 'Дата:' ),
                        React.createElement( 'div', { className: 'main-page__quotes-block__quote__string value'}, item['date'] ),
                      ),
                      React.createElement( 'div', { className: 'main-page__quotes-block__quote__string'},
                        React.createElement( 'div', { className: 'main-page__quotes-block__quote__string caption'}, 'Категория:' ),
                        React.createElement( 'div', { className: 'main-page__quotes-block__quote__string value'},  _this.props.categories[ item['categories'] ] ? _this.props.categories[ item['categories'] ][1] :''  ),
                      )
                   )
              else
                  return;
        });

        return React.createElement('div', { className: 'main-page__quotes-block__main'},
                itemsQuotes
        )
      }}),
    Wrapper = React.createClass({
    displayName: 'Wrapper',
    setStatFunction: function setStatFunction(e) {

    },
    loadCommentsFromServer: function loadCommentsFromServer() {
      // alert( this.props.url );
      // console.log( this.state.authors );
    },
    componentDidMount: function componentDidMount() {
      // this.loadCommentsFromServer();
    },
    getInitialState: function getInitialState() {

      var url = this.props.url,
          v,
          _this = this;

      jQuery.get( url, function(data) {

        v = data;

      }).done(function() {

        _this.setState({ quotes: v.quotes });
        _this.setState({ authors: v.authors });
        _this.setState({ categories: v.categories });

        _this.loadCommentsFromServer();

      });


      return { quotes: [], authors: [], categories: [] };
    },
    render: function render() {
      return React.createElement(
        'div',
        { className: 'main-page__wrapper' },
        React.createElement( filterBlock, { categories: this.state.categories, authors: this.state.authors } ),
        React.createElement( quotesBlock, { categories: this.state.categories, authors: this.state.authors, quotes: this.state.quotes } ),
      );
    }
});

ReactDOM.render(React.createElement(Wrapper, { url: 'api.php?d2i4ey2=1di6h' }), document.querySelector('.main-page'));
