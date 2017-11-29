<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
   class MyDB extends SQLite3 {
      function __construct() {
         $this->open('db/test.sqlite', SQLITE3_OPEN_READWRITE | SQLITE3_OPEN_CREATE);
      }
   }
   $db = new MyDB();
   if(!$db) {
      echo $db->lastErrorMsg();
   } else {
      echo "Opened database successfully\n";
   }

   $sql =<<<EOF
     CREATE TABLE users (
    user_id integer PRIMARY KEY,
    login character varying(60) NOT NULL,
    password character varying(1024) NOT NULL,
    registration_date timestamp without time zone
);
EOF;

   $ret = $db->exec($sql);
   if(!$ret){
      echo $db->lastErrorMsg();
   } else {
      echo "Table created successfully\n";
   }
   $db->close();
?>
