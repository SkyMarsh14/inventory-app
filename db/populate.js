#! /usr/bin/env node

const { Client } = require("pg");
const { argv } = require("node:process");

const DEVICE = `CREATE TABLE IF NOT EXISTS devices (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255),
    brandId INTEGER,
    categoryId INTEGER,
    FOREIGN KEY (brandId) REFERENCES brands(id),
    FOREIGN KEY (categoryId) REFERENCES categories(id)
    )`;

const CATEGORY = `CREATE TABLE IF NOT EXISTS categories(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    categoryName VARCHAR (255) UNIQUE
)`;
const CATEGORY_VALUES = `
    INSERT INTO categories (categoryName)
    VALUES
    ('laptop'),
    ('smartphone')
`;
const DEVICE_VALUES = `
    INSERT INTO devices (name,brandId,categoryId)
    VALUES
    ('M4 Macbook Air',1,1),
    ('iPhone 16 Pro',1,2),
    ('XPS 14',3,1),
    ('Galaxy S25',2,2),
    ('Galaxy Book5 Pro',2 ,1)
    `;

const SUPPLIER = `CREATE TABLE IF NOT EXISTS suppliers (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    supplierName VARCHAR (255)
);

INSERT INTO suppliers (supplierName)
VALUES 
    ('Amazon'),
    ('Best Buy'),
    ('Maker Direct');`;

const BRAND = `CREATE TABLE IF NOT EXISTS brands (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    brandName VARCHAR (255)
);
INSERT INTO brands (brandName)
VALUES 
    ('Apple'),
    ('Samsung'),
    ('Dell');
`;

const DEVICE_SUPPLIER = `CREATE TABLE IF NOT EXISTS device_suppliers (
    deviceId INT,
    supplierId INT,
    PRIMARY KEY (deviceId, supplierId),
    FOREIGN KEY (deviceId) REFERENCES devices(id),
    FOREIGN KEY (supplierId) REFERENCES suppliers(id)
)`;

async function main() {
  console.log("Seeding...");
  const client = new Client({
    connectionString: argv[2],
  });
  try {
    await client.connect();
    await client.query(CATEGORY);
    await client.query(CATEGORY_VALUES);
    await client.query(BRAND);
    await client.query(DEVICE);
    await client.query(SUPPLIER);
    await client.query(DEVICE_SUPPLIER);
    await client.query(DEVICE_VALUES);
    console.log("Seeding completed!");
  } catch (err) {
    console.error("Error during seeding:", err);
  } finally {
    await client.end();
  }
}

main();
