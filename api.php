<?php

  header( 'Content-Type: application/json' );

  $author = [  // эмитация таблицы авторы
    ['1', 'Безруков']
  ];
  $categories = [ // эмитация таблицы категории
    [ '1', 'Юмор']
  ];

  for($i = 0; $i < Count($author) ; $i++)
  {
    $data[$i] = [ 'author' => $author[$i], 'categories' => $categories[$i], 'text' => $i . '___text___' . $i, 'date' => $i . '.03.2018' ]; // построение финального массива с данными
  }

  echo json_encode( $data );

?>
