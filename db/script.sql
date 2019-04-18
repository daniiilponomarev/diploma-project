-- Database: DiplomaDB

--DROP TABLE IF EXISTS "DiplomaDB";
--
--CREATE DATABASE "DiplomaDB"
--    WITH
--    OWNER = postgres
--    ENCODING = 'UTF8'
--    LC_COLLATE = 'English_United States.1252'
--    LC_CTYPE = 'English_United States.1252'
--    TABLESPACE = pg_default
--    CONNECTION LIMIT = -1;

-- Table: public."testTable"

DROP TABLE IF EXISTS public."testTable";

CREATE TABLE public."testTable"
(
    id integer NOT NULL,
    name character(80) COLLATE pg_catalog."default",
    CONSTRAINT pk_id_test PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."testTable"
    OWNER to postgres;

INSERT INTO public."testTable" (id, name) VALUES (1, 'a');
INSERT INTO public."testTable" (id, name) VALUES (2, 'b');


-- Table: public."users"

DROP TABLE IF EXISTS public."users";

CREATE TABLE public."users"
(
    id integer NOT NULL,
    name character(80) COLLATE pg_catalog."default",
    password character(80) COLLATE pg_catalog."default",
    CONSTRAINT pk_id_user PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."users"
    OWNER to postgres;

INSERT INTO public."users" (id, name, password) VALUES (1, 'a', 'a');
INSERT INTO public."users" (id, name, password) VALUES (2, 'b', 'b');