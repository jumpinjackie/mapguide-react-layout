--
-- PostgreSQL demo_gis database create 
--

sudo -u postgres psql -c "CREATE DATABASE demo_gis;"

sudo -u postgres psql -d demo_gis -c "

CREATE TABLE users (
    user_id integer PRIMARY KEY,
    login character varying(60) NOT NULL,
    password character varying(1024) NOT NULL,
    registration_date timestamp without time zone
);

GRANT ALL ON users TO PUBLIC;

CREATE TABLE roles (
    role_id integer PRIMARY KEY,
    name character varying(255),
    description character varying(255)
);

GRANT ALL ON roles TO PUBLIC;

CREATE TABLE user_role (
    user_id integer,
    role_id integer,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (role_id) REFERENCES roles (role_id)
);

GRANT ALL ON user_role TO PUBLIC;

CREATE TABLE permission (
    permission_id integer PRIMARY KEY,
    name character varying(255),
    description character varying(255)
);

GRANT ALL ON permission TO PUBLIC;

CREATE TABLE permission_role (
    permission_id integer,
    role_id integer,
    PRIMARY KEY (permission_id, role_id),
    FOREIGN KEY (permission_id) REFERENCES permission (permission_id),
    FOREIGN KEY (role_id) REFERENCES roles (role_id)
);

GRANT ALL ON permission_role TO PUBLIC;

CREATE TABLE object (
    object_id integer PRIMARY KEY,
    permission_id integer,
    name character varying(255),
    description character varying(255),
    FOREIGN KEY (permission_id) REFERENCES permission (permission_id)
);

GRANT ALL ON object TO PUBLIC;

CREATE TABLE layer (
    layer_id integer PRIMARY KEY,
    object_id integer,
    name character varying(255),
    description character varying(255),
    UNIQUE(object_id),
    FOREIGN KEY (object_id) REFERENCES object (object_id)
);

GRANT ALL ON layer TO PUBLIC;

CREATE TABLE function (
    function_id integer PRIMARY KEY,
    object_id integer,
    name character varying(255),
    description character varying(255),
    UNIQUE(object_id),
    FOREIGN KEY (object_id) REFERENCES object (object_id)
);

GRANT ALL ON function TO PUBLIC;

CREATE TABLE cart_type (
    cart_type_id integer PRIMARY KEY,
    name character varying(255),
    short_name character varying(255), 
    description character varying(255),
    creation_date timestamp without time zone
);

GRANT ALL ON cart_type TO PUBLIC;

CREATE TABLE cart (
    cart_id integer PRIMARY KEY,
    cart_type_id integer,
    name character varying(255),
    short_name character varying(255), 
    description character varying(255),
    creation_date timestamp without time zone,
    author character varying(255),
    FOREIGN KEY (cart_type_id) REFERENCES cart_type (cart_type_id)
);

GRANT ALL ON cart TO PUBLIC;

CREATE TABLE layer_cart_type (
    layer_id integer,
    cart_type_id integer,
    PRIMARY KEY (layer_id, cart_type_id),
    FOREIGN KEY (layer_id) REFERENCES layer (layer_id),
    FOREIGN KEY (cart_type_id) REFERENCES cart_type (cart_type_id)
);

GRANT ALL ON layer_cart_type TO PUBLIC;

CREATE TABLE feature (
    feature_id integer PRIMARY KEY,
    name character varying(255),
    creation_date timestamp without time zone
);

GRANT ALL ON feature TO PUBLIC;

CREATE TABLE feature_cart_type (
    feature_id integer,
    cart_type_id integer,
    PRIMARY KEY (feature_id, cart_type_id),
    FOREIGN KEY (feature_id) REFERENCES feature (feature_id),
    FOREIGN KEY (cart_type_id) REFERENCES cart_type (cart_type_id)
);

GRANT ALL ON feature_cart_type TO PUBLIC;

CREATE TABLE feature_value (
    feature_id integer,
    cart_id integer,
    PRIMARY KEY (feature_id, cart_id),
    FOREIGN KEY (feature_id) REFERENCES feature (feature_id),
    FOREIGN KEY (cart_id) REFERENCES cart (cart_id)
);

GRANT ALL ON feature_value TO PUBLIC;

CREATE TABLE geodata (
    geodata_id integer PRIMARY KEY,
    cart_id integer,
    FOREIGN KEY (cart_id) REFERENCES cart (cart_id)
);

GRANT ALL ON geodata TO PUBLIC;

INSERT INTO roles (role_id, name, description)
	VALUES (1, 'superuser', '');

INSERT INTO users (user_id, login, password)
	VALUES (1, 'admin', 'cooladmin');

INSERT INTO user_role (user_id, role_id)
	VALUES (1, 1);
"