drop schema if exists branas cascade;
drop table if exists branas.book;
drop table if exists branas.car;

create schema branas;

create table branas.book (
  id serial,
  title text,
  author text
);

create table branas.car (
  id serial,
  br text,
  md text
);