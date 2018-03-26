'use strict';

// функция которая в переданном объекте либо добавляет либо удаляет элемент с определённым индексом
function changeFilter( params ) {

  if( params['val'] )
    params['obj'][params['id']] = '';
  else
    delete( params['obj'][params['id']] );

}

function getInput( params ) {
  if( params['editable'] )
    // если режим редактирования то вместо дива выводим инпут
    return React.createElement( 'input', { type: 'text', className: 'main-page__quotes-block__quote__string value', value: params['text'], onChange: function onChange(){this.handleChange}  } );
  else
    return React.createElement( 'div', { className: 'main-page__quotes-block__quote__string value'}, params['text'] );
}

// формат фильтра authorsFilter = { '1':''  }, categoriesFilter = { '2': '' }
var authorsFilter = { },  categoriesFilter = { },
    addAuthorsFilter = { }, addCategoriesFilter = { },
// блок для фильтрации
    filterBlock = React.createClass({
    displayName: 'filterBlock',
    render: function render() {

      var itemsAuthors, itemsCategories, selFunc = this.props.selectClickFunction, filFunc = this.props.filterFunction;

      //передаём свойство со списком авторов и категорий, чтобы выстроить фильтры

      if (this.props.authors.length != 0)
        itemsAuthors = this.props.authors.map(function (item) {
          return React.createElement( 'div', {},
            React.createElement( 'input', { type: 'checkbox', name: item[0],  className: '', id: 'author-filter-form__checkbox__' + item[0], onClick: function onClick(e) { selFunc( true, e.target.name, e.target.checked  ) } } ),
            React.createElement( 'label', {  className: '', htmlFor: 'author-filter-form__checkbox__' + item[0] }, item[1] ),
          );
        });
      if (this.props.categories.length != 0)
        itemsCategories = this.props.categories.map(function (item) {
          return React.createElement( 'div', {},
            React.createElement( 'input', { type: 'checkbox', name: item[0],  className: '', id: 'categories-filter-form__checkbox__' + item[0], onClick: function onClick(e) { selFunc( false, e.target.name, e.target.checked  ) } } ),
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
              React.createElement( 'br', {} ),
              React.createElement( 'div', { className: 'main-page__filter-block button', onClick: function onClick(e) { filFunc() } }, 'отфильтровать' )
      )
    }
}),
    quotesBlock = React.createClass({
    displayName: 'QuotesBlock',
    render: function render() {

      //переприсваваем контекст, и присваем функцию для редактированичя и удаления для удобства
      var itemsQuotes, _this = this, edFunc = this.props.editableFunction;

      if (this.props.quotes.length != 0)
        itemsQuotes = this.props.quotes.map(function (item, index) {
          //проверяем есть ли фильтры, если есть на что стоят
          //проверка фильтра по авторам
          if( authorsFilter[ item['author'] ] != undefined || $.isEmptyObject(authorsFilter) )
            //проверка фильтра по категориям
            if( categoriesFilter[ item['categories'] ] != undefined || $.isEmptyObject(categoriesFilter) )
              //создаём структуру для цитаты
              //в зависимсости от того режим редактирования это или нет меняем класс, для изменения стиля
              return React.createElement( 'div', { className: item[ 'editable' ]? 'main-page__quotes-block__quote js-quote-edit ' : 'main-page__quotes-block__quote' },
                      React.createElement( 'div', { className: 'main-page__quotes-block__quote__string'},
                        React.createElement( 'div', { className: 'main-page__quotes-block__quote__string__buttons'},
                          // в зависимости от того, режим редактирование это или нет меняем название кнопоки и отправляем в айди индекс цитаты
                          React.createElement( 'span', { id: 'quote__' + index, name: index, className: 'main-page__quotes-block__quote__string__button edit-button', onClick: function onClick(e) { edFunc( e.target.id ) } }, item[ 'editable' ]? 'сохранить' : 'изменить' ),
                          React.createElement( 'span', { className: 'main-page__quotes-block__quote__string__button exit-button' }, 'удалить' )
                        )
                      ),
                      // создаём строку для цитаты
                      React.createElement( 'div', { className: 'main-page__quotes-block__quote__string'},
                        React.createElement( 'div', { className: 'main-page__quotes-block__quote__string caption'}, 'Автор:' ),
                        // отправляем в функцию, которая смотрит какое поле нам выводить в зависимости от того режим редактирования это или нет
                        getInput( {'editable' : item[ 'editable' ], 'text' :  _this.props.authors[ item['author'] ] ? _this.props.authors[ item['author'] ][1] :''  } ),
                      ),
                      // создаём строку для цитаты
                      React.createElement( 'div', { className: 'main-page__quotes-block__quote__string'},
                        React.createElement( 'div', { className: 'main-page__quotes-block__quote__string caption'}, 'Цитата:' ),
                        // отправляем в функцию, которая смотрит какое поле нам выводить в зависимости от того режим редактирования это или нет
                        getInput( {'editable' : item[ 'editable' ], 'text' : item['text']  } )
                      ),
                      // создаём строку для цитаты
                      React.createElement( 'div', { className: 'main-page__quotes-block__quote__string'},
                        React.createElement( 'div', { className: 'main-page__quotes-block__quote__string caption'}, 'Дата:' ),
                        // отправляем в функцию, которая смотрит какое поле нам выводить в зависимости от того режим редактирования это или нет
                        getInput( {'editable' : item[ 'editable' ], 'text' : item['date']  } )
                      ),
                      // создаём строку для цитаты
                      React.createElement( 'div', { className: 'main-page__quotes-block__quote__string'},
                        React.createElement( 'div', { className: 'main-page__quotes-block__quote__string caption'}, 'Категория:' ),
                        // отправляем в функцию, которая смотрит какое поле нам выводить в зависимости от того режим редактирования это или нет
                        getInput( {'editable' : item[ 'editable' ], 'text' : _this.props.categories[ item['categories'] ] ? _this.props.categories[ item['categories'] ][1] :''  } )
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
    selectClickFunction: function selectClickFunction( type, id, val ) { //функция при клике на селект, в зависимости от типа селекта ( категория или авторы )

      //проверяем от какой группы комбобоксов пришло нажатие и в зависимости от этого отдаём нужный объект
      changeFilter( { 'obj' : type ? addAuthorsFilter : addCategoriesFilter, 'val' : val, 'id' : id} );

    },
    filterFunction: function filterFunction() {

      //перебрасываем содержимое предварительных массивов в настоящие фильтрационные массивы, для того, чтобы каждый раз когда мы заменяем свойства, записи не фильтровались, а фильтровались, только при нажатии на фильтировать
      authorsFilter = Object.create( addAuthorsFilter );
      categoriesFilter = Object.create( addCategoriesFilter );
      //инициируем перезагрузку страницы
      this.setState( { run: authorsFilter } );
    },
    editableFunction: function editableFunction( param ) {
      //вычлиняем айдишник цитаты из айди элемента
      var id = param.split('quote__')[1];
      //проверяем цитата находится в режиме редактирования или нет
      this.state.quotes[ id ][ 'editable' ] = this.state.quotes[ id ][ 'editable' ]? false: true;
      //иницируем преезагрукзу страницы
      this.setState( { quotes: this.state.quotes } );

    },
    loadCommentsFromServer: function loadCommentsFromServer() {
      // alert( this.props.url );
      // console.log( this.state.authors );
    },
    componentDidMount: function componentDidMount() {
      // this.loadCommentsFromServer();
    },
    getInitialState: function getInitialState() {

      // присваем юрл и контекст, чтобы не было проблем позже
      var url = this.props.url,
          v,
          _this = this;

      //загружаем из джсона списки
      jQuery.get( url, function(data) {

        v = data;

      }).done(function() {

        //загружаем список цитат, авторов и категорий в проект
        _this.setState({ quotes: v.quotes });
        _this.setState({ authors: v.authors });
        _this.setState({ categories: v.categories });

      });

      // поскольку ответ вернётся до того, как джсон спарсится возвращаем пустые массивы
      return { quotes: [], authors: [], categories: [] };
    },
    render: function render() {
      return React.createElement(
        'div',
        { className: 'main-page__wrapper' },
        React.createElement( filterBlock, { categories: this.state.categories, authors: this.state.authors, selectClickFunction: this.selectClickFunction, filterFunction: this.filterFunction } ),
        React.createElement( quotesBlock, { categories: this.state.categories, authors: this.state.authors, quotes: this.state.quotes, editableFunction: this.editableFunction } ),
      );
    }
});

ReactDOM.render(React.createElement(Wrapper, { url: 'api.php?d2i4ey2=1di6h' }), document.querySelector('.main-page'));
