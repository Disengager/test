<?php

  $data['authors'] = [  // эмитация таблицы авторы
    0 => ['0', 'Безруков'],
    1 => ['1', 'Хобенский'],
    2 => ['2', 'Пушкин'],
    3 => ['3', 'Достоевский'],
  ];
  $data['categories'] = [ // эмитация таблицы категории
    0 => [ '0', 'Юмор'],
    1 => [ '1', 'Жизнь'],
    2 => [ '2', 'Война'],
    3 => [ '3', 'Зрелость'],
  ];
  $data['quotes'][0] = [ 'author' => $data['authors'][0][0], 'categories' => $data['categories'][0][0], 'text' => 0 . '___text___' . 0, 'date' => 0 . '.03.2018' ];
  $data['quotes'][1] = [ 'author' => $data['authors'][1][0], 'categories' => $data['categories'][1][0], 'text' => 1 . '___text___' . 1, 'date' => 1 . '.03.2018' ];
  $data['quotes'][2] = [ 'author' => $data['authors'][2][0], 'categories' => $data['categories'][2][0], 'text' => 2 . '___text___' . 2, 'date' => 2 . '.03.2018' ];

  switch ( $_GET['d2i4ey2'] ) {
    case '1di6h':
    {

      header( 'Content-Type: application/json' );


      //for($i = 0; $i < Count(  $data['authors']) ; $i++)
      // for($i = 0; $i < 2 ; $i++)
      // {
      //   $data['quotes'][$i] = [ 'author' => $data['authors'][$i][0], 'categories' => $data['categories'][$i][0], 'text' => $i . '___text___' . $i, 'date' => $i . '.03.2018' ]; // построение финального массива с данными
      // }

      echo json_encode( $data );

    }
    break;
    case '12kd8':
    {

    }
    break;
    // удаление
    case 'aef62sd':
    {
      // printf( $data['quotes'][$_GET['id']] );
      if( isset( $data['quotes'][$_GET['id']] ) )
      {
        try {
          //удаляем эллемент
          unset($data['quotes'][$_GET['id']] );
        }
        catch (Exception $e) {
          //если ошибка то возвращаем 0
          echo 0;
        } finally  {
          //если всё хорошое возвращаем 1
          echo 1;
        }
      }
      else
      {
        //если такого эелмента нет то возвращаем 0
        echo 0;
      }
    }
    default:
    {

    }
      break;
  }


?>
