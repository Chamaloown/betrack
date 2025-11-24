CREATE TABLE "bets" (
  "id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  "date" varchar NOT NULL,
  "bookmaker" varchar NOT NULL,
  "sport" varchar NOT NULL,
  "type" varchar NOT NULL,
  "bet" bigint NOT NULL,
  "cote" numeric NOT NULL,
  "is_win" boolean NOT NULL,
  "money" bigint NOT NULL,
  "created_at" timestamptz NULL,
  "updated_at" timestamptz NULL,
  "deleted_at" timestamptz NULL
);