import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_services_icon" AS ENUM('scissors', 'razor', 'crown');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"icon" "enum_services_icon" DEFAULT 'scissors',
  	"highlighted" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "gallery" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"image_id" integer NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"email" varchar,
  	"service" varchar,
  	"preferred_date" varchar,
  	"message" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"services_id" integer,
  	"gallery_id" integer,
  	"submissions_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "settings_opening_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" varchar NOT NULL,
  	"hours" varchar NOT NULL
  );
  
  CREATE TABLE "settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_name" varchar DEFAULT 'Hollywood Férfi Fodrászat' NOT NULL,
  	"phone" varchar DEFAULT '+36 30 978 4624' NOT NULL,
  	"email" varchar,
  	"address" varchar DEFAULT 'Andrássy Gyula u. 3-5 (D lépcsőház), Miskolc' NOT NULL,
  	"facebook" varchar DEFAULT 'https://www.facebook.com/hollywoodfodraszat',
  	"instagram" varchar,
  	"map_embed_url" varchar,
  	"meta_title" varchar DEFAULT 'Hollywood Férfi Fodrászat — Miskolc',
  	"meta_description" varchar DEFAULT 'Klasszikus stílus, profi kezekben. Férfi hajvágás és szakálligazítás Miskolc belvárosában.',
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "hero" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_line1" varchar DEFAULT 'Hollywood' NOT NULL,
  	"title_line2" varchar DEFAULT 'Férfi Fodrászat' NOT NULL,
  	"subtitle" varchar DEFAULT 'Klasszikus stílus, profi kezekben. Hagyományos technikák és precizitás a modern kor úriembereinek.' NOT NULL,
  	"cta_label" varchar DEFAULT 'Időpontfoglalás' NOT NULL,
  	"background_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'A mesterségünk' NOT NULL,
  	"heading_line1" varchar DEFAULT 'Több, mint' NOT NULL,
  	"heading_line2" varchar DEFAULT 'egy hajvágás.' NOT NULL,
  	"heading_highlight" varchar DEFAULT 'Hagyomány.' NOT NULL,
  	"paragraph1" varchar DEFAULT 'A Hollywood Férfi Fodrászatban nem futószalagon gyártjuk a frizurákat. Ide azért jössz, hogy kiszakadj a rohanásból, igyál egy jó kávét, és ránk bízd a megjelenésed.' NOT NULL,
  	"paragraph2" varchar DEFAULT 'Borbélyaink szenvedéllyel és maximális precizitással dolgoznak. A klasszikus ollós vágástól a legmodernebb fade átmenetekig, és a hagyományos pengés borotválásig mindenben a legmagasabb minőséget nyújtjuk Miskolc belvárosában.' NOT NULL,
  	"image_id" integer,
  	"stat1_value" varchar DEFAULT '10+' NOT NULL,
  	"stat1_label" varchar DEFAULT 'Év Tapasztalat' NOT NULL,
  	"stat2_value" varchar DEFAULT '100%' NOT NULL,
  	"stat2_label" varchar DEFAULT 'Férfi Környezet' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_eyebrow" varchar DEFAULT 'Est. Miskolc' NOT NULL,
  	"logo_text" varchar DEFAULT 'HOLLYWOOD' NOT NULL,
  	"nav_services_label" varchar DEFAULT 'Szolgáltatások' NOT NULL,
  	"nav_about_label" varchar DEFAULT 'Rólunk' NOT NULL,
  	"nav_gallery_label" varchar DEFAULT 'Galéria' NOT NULL,
  	"nav_contact_label" varchar DEFAULT 'Kapcsolat' NOT NULL,
  	"nav_cta_label" varchar DEFAULT 'Időpontfoglalás' NOT NULL,
  	"services_heading" varchar DEFAULT 'Szolgáltatások' NOT NULL,
  	"services_highlight_badge" varchar DEFAULT 'Gyakori választás' NOT NULL,
  	"services_price_label" varchar DEFAULT 'Ártól' NOT NULL,
  	"gallery_heading_main" varchar DEFAULT 'Műhely' NOT NULL,
  	"gallery_heading_highlight" varchar DEFAULT 'titkok' NOT NULL,
  	"gallery_subtitle" varchar DEFAULT 'Vágások, hangulatok, és az eszközök amikkel dolgozunk.' NOT NULL,
  	"booking_heading_line1" varchar DEFAULT 'Foglald le' NOT NULL,
  	"booking_heading_line2" varchar DEFAULT 'a' NOT NULL,
  	"booking_heading_highlight" varchar DEFAULT 'széked.' NOT NULL,
  	"booking_description" varchar DEFAULT 'Ne várj a sorodra. Biztosítsd be az időpontod előre. Töltsd ki az adataidat, és a megadott számon felvesszük veled a kapcsolatot a pontosítás végett.' NOT NULL,
  	"booking_call_label" varchar DEFAULT 'Inkább hívnál?' NOT NULL,
  	"booking_success_title" varchar DEFAULT 'Köszönjük!' NOT NULL,
  	"booking_success_message" varchar DEFAULT 'Foglalásodat rögzítettük. Hamarosan visszahívunk a megerősítés miatt.' NOT NULL,
  	"contact_heading" varchar DEFAULT 'Információk' NOT NULL,
  	"contact_city_label" varchar DEFAULT 'Miskolc' NOT NULL,
  	"contact_address_label" varchar DEFAULT 'Címünk' NOT NULL,
  	"contact_phone_label" varchar DEFAULT 'Telefonszám' NOT NULL,
  	"contact_hours_label" varchar DEFAULT 'Nyitvatartás' NOT NULL,
  	"footer_brand_title" varchar DEFAULT 'Hollywood' NOT NULL,
  	"footer_brand_subtitle" varchar DEFAULT 'Férfi Fodrászat • Miskolc' NOT NULL,
  	"footer_copyright" varchar DEFAULT '© 2026 Hollywood Férfi Fodrászat. Minden jog fenntartva.' NOT NULL,
  	"footer_facebook_label" varchar DEFAULT 'Facebook' NOT NULL,
  	"footer_cta_label" varchar DEFAULT 'Időpontfoglalás' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery" ADD CONSTRAINT "gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_submissions_fk" FOREIGN KEY ("submissions_id") REFERENCES "public"."submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_opening_hours" ADD CONSTRAINT "settings_opening_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hero" ADD CONSTRAINT "hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about" ADD CONSTRAINT "about_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "services__order_idx" ON "services" USING btree ("_order");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "gallery__order_idx" ON "gallery" USING btree ("_order");
  CREATE INDEX "gallery_image_idx" ON "gallery" USING btree ("image_id");
  CREATE INDEX "gallery_updated_at_idx" ON "gallery" USING btree ("updated_at");
  CREATE INDEX "gallery_created_at_idx" ON "gallery" USING btree ("created_at");
  CREATE INDEX "submissions_updated_at_idx" ON "submissions" USING btree ("updated_at");
  CREATE INDEX "submissions_created_at_idx" ON "submissions" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_gallery_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_id");
  CREATE INDEX "payload_locked_documents_rels_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("submissions_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "settings_opening_hours_order_idx" ON "settings_opening_hours" USING btree ("_order");
  CREATE INDEX "settings_opening_hours_parent_id_idx" ON "settings_opening_hours" USING btree ("_parent_id");
  CREATE INDEX "settings_meta_image_idx" ON "settings" USING btree ("meta_image_id");
  CREATE INDEX "hero_background_image_idx" ON "hero" USING btree ("background_image_id");
  CREATE INDEX "about_image_idx" ON "about" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "gallery" CASCADE;
  DROP TABLE "submissions" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "settings_opening_hours" CASCADE;
  DROP TABLE "settings" CASCADE;
  DROP TABLE "hero" CASCADE;
  DROP TABLE "about" CASCADE;
  DROP TABLE "site_content" CASCADE;
  DROP TYPE "public"."enum_services_icon";`)
}
