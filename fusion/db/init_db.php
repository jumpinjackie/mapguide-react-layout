<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

class MyDB extends SQLite3
{
    function __construct()
    {
        $this->open('demo.sqlite', SQLITE3_OPEN_READWRITE | SQLITE3_OPEN_CREATE);
    }
}

$db = new MyDB();
if (!$db) {
    echo $db->lastErrorMsg();
} else {
    echo "Opened database successfully\n";
}

$sql = <<<EOF
    CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    login TEXT,
    password TEXT,
    registration_date INTEGER
);

CREATE TABLE roles (
    role_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT
);

CREATE TABLE user_role (
    user_id INTEGER,
    role_id INTEGER,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (role_id) REFERENCES roles (role_id)
);

CREATE TABLE permission (
    permission_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT
);

CREATE TABLE permission_role (
    permission_id INTEGER,
    role_id INTEGER,
    PRIMARY KEY (permission_id, role_id),
    FOREIGN KEY (permission_id) REFERENCES permission (permission_id),
    FOREIGN KEY (role_id) REFERENCES roles (role_id)
);

CREATE TABLE object (
    object_id INTEGER PRIMARY KEY AUTOINCREMENT,
    permission_id INTEGER,
    name TEXT,
    description TEXT,
    FOREIGN KEY (permission_id) REFERENCES permission (permission_id)
);

CREATE TABLE layer (
    layer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    object_id INTEGER,
    name TEXT,
    description TEXT,
    UNIQUE(object_id),
    FOREIGN KEY (object_id) REFERENCES object (object_id)
);

CREATE TABLE function (
    function_id INTEGER PRIMARY KEY AUTOINCREMENT,
    object_id INTEGER,
    name TEXT,
    description TEXT,
    UNIQUE(object_id),
    FOREIGN KEY (object_id) REFERENCES object (object_id)
);

CREATE TABLE geodata (
    geodata_id INTEGER PRIMARY KEY AUTOINCREMENT
);

INSERT INTO roles (role_id, name, description)
	VALUES (1, 'superuser', '');

INSERT INTO users (user_id, login, password)
	VALUES (1, 'admin', 'cooladmin');

INSERT INTO user_role (user_id, role_id)
	VALUES (1, 1);
EOF;

$ret = $db->exec($sql);
if (!$ret) {
    echo $db->lastErrorMsg();
} else {
    echo "Table created successfully\n";
}
$db->close();
?>