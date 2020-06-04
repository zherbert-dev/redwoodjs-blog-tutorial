# Migration `20200603211858-create-contact-and-user`

This migration has been generated at 6/3/2020, 9:18:58 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."User" (
"email" TEXT NOT NULL  ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"name" TEXT   )

CREATE TABLE "quaint"."Contact" (
"createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP ,"email" TEXT NOT NULL  ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"message" TEXT NOT NULL  ,"name" TEXT NOT NULL  )

ALTER TABLE "quaint"."Post" ADD COLUMN "userId" INTEGER   ;

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200603161706-create-posts..20200603211858-create-contact-and-user
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource DS {
   provider = "sqlite"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider      = "prisma-client-js"
@@ -14,5 +14,22 @@
   id        Int      @id @default(autoincrement())
   title     String
   body      String
   createdAt DateTime @default(now())
+  User      User?    @relation(fields: [userId], references: [id])
+  userId    Int?
 }
+
+model User {
+  id    Int     @default(autoincrement()) @id
+  name  String?
+  email String
+  Posts Post[]
+}
+
+model Contact {
+  id        Int      @default(autoincrement()) @id
+  name      String
+  email     String
+  message   String
+  createdAt DateTime @default(now())
+}
```


