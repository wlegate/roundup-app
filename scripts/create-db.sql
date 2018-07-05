ALTER TABLE "Account" DROP CONSTRAINT IF EXISTS "Account_fk0";

ALTER TABLE "Account" DROP CONSTRAINT IF EXISTS "Account_fk1";

ALTER TABLE "Account" DROP CONSTRAINT IF EXISTS "Account_fk2";

ALTER TABLE "Session" DROP CONSTRAINT IF EXISTS "Session_fk0";

ALTER TABLE "Transaction" DROP CONSTRAINT IF EXISTS "Transaction_fk0";

ALTER TABLE "Transaction" DROP CONSTRAINT IF EXISTS "Transaction_fk1";

ALTER TABLE "Transaction" DROP CONSTRAINT IF EXISTS "Transaction_fk2";

ALTER TABLE "Transaction" DROP CONSTRAINT IF EXISTS "Transaction_fk3";

ALTER TABLE "Charge" DROP CONSTRAINT IF EXISTS "Charge_fk0";

DROP TABLE IF EXISTS "User";

DROP TABLE IF EXISTS "Account";

DROP TABLE IF EXISTS "Item";

DROP TABLE IF EXISTS "Session";

DROP TABLE IF EXISTS "Transaction";

DROP TABLE IF EXISTS "Charge";

DROP TABLE IF EXISTS "ISO Currency Code";

CREATE TABLE "User"
(
"_id" serial NOT NULL,
"email" varchar NOT NULL UNIQUE,
"password" varchar NOT NULL,
"created_at" timestamp NOT NULL DEFAULT NOW(),
CONSTRAINT User_pk PRIMARY KEY
("_id")
)
WITH
(
OIDS=FALSE
);



CREATE TABLE "Account"
(
"_id" serial NOT NULL,
"user_id" serial NOT NULL,
"plaid_item_id" varchar NOT NULL,
"plaid_account_id" varchar NOT NULL,
"iso_currency_code" varchar NOT NULL,
"name" varchar NOT NULL,
"official_name" varchar NOT NULL,
"type" varchar NOT NULL,
"subtype" varchar NOT NULL,
"plaid_access_token" varchar NOT NULL,
"stripe_bank_account_token" varchar NOT NULL,
CONSTRAINT Account_pk PRIMARY KEY ("_id")
)
WITH (
OIDS=FALSE
);


CREATE TABLE "Session"
(
"_id" serial NOT NULL,
"user_id" serial NOT NULL,
"session" varchar NOT NULL UNIQUE,
"created_at" timestamp NOT NULL DEFAULT NOW(),
CONSTRAINT Session_pk PRIMARY KEY
("_id")
)
WITH
(
OIDS=FALSE
);



CREATE TABLE "Transaction"
(
"_id" serial NOT NULL,
"iso_currency_code" serial NOT NULL,
"account_id" serial NOT NULL,
"user_id" serial NOT NULL,
"amount" money NOT NULL,
"categories" varchar NOT NULL,
"date" timestamp NOT NULL DEFAULT NOW(),
"location" json NOT NULL,
"name" varchar NOT NULL,
"is_pending" BOOLEAN NOT NULL,
"charge_id" serial NOT NULL,
"type" varchar NOT NULL,
"plaid_pending_transaction_id" varchar NOT NULL,
"plaid_transaction_id" varchar NOT NULL,
CONSTRAINT Transaction_pk PRIMARY KEY
("_id")
)
WITH
(
OIDS=FALSE
);



CREATE TABLE "Charge"
(
"_id" serial NOT NULL,
"amount" money NOT NULL,
"status" varchar NOT NULL,
"iso_currency_code" varchar NOT NULL,
CONSTRAINT Charge_pk PRIMARY KEY ("_id")
)
WITH (
OIDS=FALSE
);



CREATE TABLE "ISO Currency Code" (
"alpha_code" varchar NOT NULL UNIQUE,
"numeric_code" integer NOT NULL UNIQUE,
"currency" varchar NOT NULL UNIQUE,
CONSTRAINT ISO Currency Code_pk PRIMARY KEY
("alpha_code")
)
WITH
(
OIDS=FALSE
);




ALTER TABLE "Account" ADD CONSTRAINT "Account_fk0" FOREIGN KEY ("user_id") REFERENCES "User"("_id");
ALTER TABLE "Account" ADD CONSTRAINT "Account_fk1" FOREIGN KEY ("plaid_item_id") REFERENCES "User"("_id");
ALTER TABLE "Account" ADD CONSTRAINT "Account_fk2" FOREIGN KEY ("iso_currency_code") REFERENCES "ISO Currency Code"("alpha_code");

ALTER TABLE "Session" ADD CONSTRAINT "Session_fk0" FOREIGN KEY ("user_id") REFERENCES "User"("_id");

ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_fk0" FOREIGN KEY ("iso_currency_code") REFERENCES "ISO Currency Code"("alpha_code");
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_fk1" FOREIGN KEY ("account_id") REFERENCES "Account"("_id");
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_fk2" FOREIGN KEY ("user_id") REFERENCES "User"("_id");
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_fk3" FOREIGN KEY ("charge_id") REFERENCES "Charge"("_id");

ALTER TABLE "Charge" ADD CONSTRAINT "Charge_fk0" FOREIGN KEY ("iso_currency_code") REFERENCES "ISO Currency Code"("alpha_code");

