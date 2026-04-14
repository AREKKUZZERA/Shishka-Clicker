begin;

alter table public.player_saves
  add column if not exists player_username text;

commit;
