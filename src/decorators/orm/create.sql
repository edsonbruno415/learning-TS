drop schema IF EXISTS branas;
drop table IF EXISTS branas.book;

create schema branas;

create table branas.book (
  id serial,
  title text,
  author text
);