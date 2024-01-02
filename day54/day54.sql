------------- Table rooms --------------
CREATE TABLE "rooms" (
  "id" varchar(20) PRIMARY KEY NOT NULL,
  "category" varchar(20) NOT NULL,
  "max" int,
  "price" numeric(8,3),
  "desc" varchar(1000)
);

INSERT INTO "rooms" ("id", "category", "max", "price", "desc") 
VALUES ('P0001', 'Loai 1', 20, 60.00, 'Description'),
       ('P0002', 'Loai 1', 25, 80.00, 'Description'),
       ('P0003', 'Loai 2', 15, 50.00, 'Description'),
       ('P0004', 'Loai 3', 20, 50.00, 'Description');

-------------- Table customers ----------------
CREATE TABLE "customers" (
  "id" varchar(20) PRIMARY KEY NOT NULL,
  "name" varchar(50) NOT NULL,
  "address" varchar(1000),
  "phone" varchar(15)
);

INSERT INTO "customers" ("id", "name", "address", "phone") 
VALUES 	('KH0001', 'Nguyen Van A', 'Dong Da', '5551234'),
		('KH0002', 'Nguyen Van B', 'Thanh Xuan', '3331234'),
		('KH0003', 'Phan Van A', 'Cau Giay', '7771234'),
		('KH0004', 'Phan Van B', 'Ha Dong', '2221234');

---------------- Table book_rooms -----------------
CREATE TABLE "book_rooms" (
  "id" varchar(20) PRIMARY KEY NOT NULL,
  "id_room" varchar(20) NOT NULL,
  "id_customer" varchar(20) NOT NULL,
  "order_date" date,
  "started_at" time,
  "ended_at" time,
  "deposits" numeric(8,3),
  "note" varchar(1000),
  "status" varchar(20)
);

INSERT INTO "book_rooms" ("id", "id_room", "id_customer", "order_date", "started_at", "ended_at", "deposits", "note", "status") 
VALUES ('DP0001', 'P0001', 'KH0002', '2023-01-01', '12:00:00', '15:00:00', 50.00, 'Booking Note 1', 'confirmed'),
       ('DP0002', 'P0001', 'KH0003', '2023-02-01', '14:00:00', '17:00:00', 75.00, 'Booking Note 2', 'cancel'),
       ('DP0003', 'P0002', 'KH0002', '2023-04-01', '18:00:00', '23:00:00', 95.00, 'Booking Note 3', 'confirmed'),
       ('DP0004', 'P0003', 'KH0001', '2023-04-01', '20:00:00', '22:00:00', 75.00, 'Booking Note 4', 'confirmed'),
	   ('DP0005', 'P0002', 'KH0001', '2023-09-01', '15:00:00', '18:00:00', 50.00, 'Booking Note 5', 'confirmed'),
	   ('DP0006', 'P0002', 'KH0003', '2023-09-05', '19:00:00', '23:00:00', 70.00, 'Booking Note 6', 'confirmed');

-------------- Table services --------------
CREATE TABLE "services" (
  "id" varchar(20) PRIMARY KEY NOT NULL,
  "name" varchar(100) NOT NULL,
  "bill_unit" varchar(50),
  "price" numeric(8,3)
);

INSERT INTO "services" ("id", "name", "bill_unit", "price") 
VALUES ('DV0001', 'Beer', 'lon', 20.00),
       ('DV0002', 'Fruits', 'dia', 55.00),
       ('DV0003', 'Cake', 'cai', 99.00);

------------ Service details -------------
CREATE TABLE "service_detail" (
  "id_room" varchar(20) NOT NULL,
  "id_service" varchar(20) NOT NULL,
  "quantity" integer,
  PRIMARY KEY ("id_room", "id_service")
);

INSERT INTO "service_detail" ("id_room", "id_service", "quantity") 
VALUES ('DP0001', 'DV0001', 20),
       ('DP0001', 'DV0003', 3),
       ('DP0001', 'DV0002', 10),
       ('DP0002', 'DV0002', 10),
       ('DP0003', 'DV0003', 2);


ALTER TABLE "book_rooms" ADD FOREIGN KEY ("id_room") REFERENCES "rooms" ("id");

ALTER TABLE "book_rooms" ADD FOREIGN KEY ("id_customer") REFERENCES "customers" ("id");

ALTER TABLE "service_detail" ADD FOREIGN KEY ("id_room") REFERENCES "book_rooms" ("id");

ALTER TABLE "service_detail" ADD FOREIGN KEY ("id_service") REFERENCES "services" ("id");

------------- query ---------------
-- câu 1
SELECT
    "book_rooms"."id" AS MaDatPhong,
    "book_rooms"."id_room" AS MaPhong,
    "rooms"."category" AS LoaiPhong,
    "rooms"."price" AS GiaPhong,
    "customers"."name" AS TenKH,
    "book_rooms"."order_date" AS NgayDat,
    "rooms"."price" * EXTRACT(HOUR FROM ("book_rooms"."ended_at" - "book_rooms"."started_at")) AS TongTienHat,
    COALESCE(SUM("services"."price" * "service_detail"."quantity"), 0) AS TongTienSuDungDichVu,
    "rooms"."price" * EXTRACT(HOUR FROM ("book_rooms"."ended_at" - "book_rooms"."started_at")) +
    COALESCE(SUM("services"."price" * "service_detail"."quantity"), 0) AS TongTienThanhToan
FROM
    "book_rooms"
JOIN "rooms" ON "book_rooms"."id_room" = "rooms"."id"
JOIN "customers" ON "book_rooms"."id_customer" = "customers"."id"
LEFT JOIN "service_detail" ON "book_rooms"."id" = "service_detail"."id_room"
LEFT JOIN "services" ON "service_detail"."id_service" = "services"."id"
GROUP BY
    "book_rooms"."id",
    "rooms"."category",
    "rooms"."price",
    "customers"."name",
    "book_rooms"."order_date",
    "book_rooms"."started_at",
    "book_rooms"."ended_at";

-- câu 2
SELECT
    "customers"."id" AS MaKH,
    "customers"."name" AS TenKH,
    "customers"."address" AS DiaChi,
    "customers"."phone" AS SoDT
FROM
    "customers"
WHERE
    "customers"."address" = 'Thanh Xuan';
	
-- câu 3
SELECT
    "rooms"."id" AS MaPhong,
    "rooms"."category" AS LoaiPhong,
    "rooms"."max" AS SoKhachToiDa,
    "rooms"."price" AS GiaPhong,
    COUNT("book_rooms"."id") AS SoLanDat
FROM
    "rooms"
JOIN "book_rooms" ON "rooms"."id" = "book_rooms"."id_room"
WHERE
    "book_rooms"."status" = 'confirmed'
GROUP BY
    "rooms"."id",
    "rooms"."category",
    "rooms"."max",
    "rooms"."price"
HAVING
    COUNT("book_rooms"."id") > 2;



