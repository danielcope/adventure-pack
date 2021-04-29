CREATE TABLE adventure_user (
  user_id SERIAL PRIMARY key,
  username varchar(55) UNIQUE NOT NULL,
  hash text,
  email varchar(255)
  email_token text
);

CREATE TABLE character (
  char_id SERIAL PRIMARY key,
  user_id INTEGER REFERENCES adventure_user(user_id),
  name varchar(55),
  race varchar(55),
  char_class varchar(55),
  background varchar(55),
  max_hp int,
  current_hp int,
  proficiency int,
  passive_perception int,
  passive_insight int,
  inspiration int,
  armor_class int,
  initiative int,
  speed int,
  max_hitdice int,
  current_hitdice int
);

CREATE TABLE spell (
  spell_id SERIAL PRIMARY key,
  char_id INTEGER REFERENCES character(char_id),
  spell_name 
);

CREATE TABLE backpack (
  item_id SERIAL PRIMARY key, 
  char_id int REFERENCES character(char_id),
  item_name varchar(55),
  item_desc varchar(255)
);

CREATE TABLE journal (
  entry_id SERIAL PRIMARY key,
  char_id int REFERENCES character(char_id),
  subject varchar(55),
  description varchar(1000),
  date varchar(50)
);

CREATE TABLE npc (
  npc_id SERIAL PRIMARY key,
  char_id int REFERENCES character(char_id),
  name varchar(99),
  description varchar(1000)
);




