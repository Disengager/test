<?php

  switch ( $_GET['d2i4ey2'] ) {
    case '1di6h':
    {

      header( 'Content-Type: application/json' );

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

      //for($i = 0; $i < Count(  $data['authors']) ; $i++)
      for($i = 0; $i < 2 ; $i++)
      {
        $data['quotes'][$i] = [ 'author' => $data['authors'][$i][0], 'categories' => $data['categories'][$i][0], 'text' => $i . '___text___' . $i, 'date' => $i . '.03.2018' ]; // построение финального массива с данными
      }

      echo json_encode( $data );

    }
    break;
    case '12kd8':
    {

    }
    default:
    {

    }
      break;
  }


?>
