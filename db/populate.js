#! /usr/bin/env node

const { Client } = require("pg");
const { argv } = require("node:process");

const CATEGORY = `CREATE TABLE IF NOT EXISTS categories(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    categoryName VARCHAR (255) UNIQUE
)`;

const CATEGORY_VALUES = `
    INSERT INTO categories (categoryName)
    VALUES
    ('laptop'),
    ('smartphone'),
    ('tablet'),
    ('smartwatch'),
    ('headphones'),
    ('monitor'),
    ('desktop'),
    ('camera')
    ON CONFLICT (categoryName) DO NOTHING
`;

const BRAND = `CREATE TABLE IF NOT EXISTS brands (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    brandName VARCHAR (255) UNIQUE
);

INSERT INTO brands (brandName)
VALUES 
    ('Apple'),
    ('Samsung'),
    ('Dell'),
    ('Sony'),
    ('Microsoft'),
    ('Google'),
    ('HP'),
    ('Lenovo'),
    ('Asus'),
    ('LG')
    ON CONFLICT (brandName) DO NOTHING
`;

const DEVICE = `CREATE TABLE IF NOT EXISTS devices (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255),
    brandId INTEGER,
    categoryId INTEGER,
    FOREIGN KEY (brandId) REFERENCES brands(id),
    FOREIGN KEY (categoryId) REFERENCES categories(id)
)`;

const DEVICE_VALUES = `
    INSERT INTO devices (name, brandId, categoryId)
    VALUES
    -- Existing values
    ('M4 Macbook Air', (SELECT id FROM brands WHERE brandName = 'Apple'), (SELECT id FROM categories WHERE categoryName = 'laptop')),
    ('iPhone 16 Pro', (SELECT id FROM brands WHERE brandName = 'Apple'), (SELECT id FROM categories WHERE categoryName = 'smartphone')),
    ('XPS 14', (SELECT id FROM brands WHERE brandName = 'Dell'), (SELECT id FROM categories WHERE categoryName = 'laptop')),
    ('Galaxy S25', (SELECT id FROM brands WHERE brandName = 'Samsung'), (SELECT id FROM categories WHERE categoryName = 'smartphone')),
    ('Galaxy Book5 Pro', (SELECT id FROM brands WHERE brandName = 'Samsung'), (SELECT id FROM categories WHERE categoryName = 'laptop')),
    
    -- New values - laptops
    ('Spectre x360', (SELECT id FROM brands WHERE brandName = 'HP'), (SELECT id FROM categories WHERE categoryName = 'laptop')),
    ('ThinkPad X1 Carbon', (SELECT id FROM brands WHERE brandName = 'Lenovo'), (SELECT id FROM categories WHERE categoryName = 'laptop')),
    ('ROG Zephyrus G14', (SELECT id FROM brands WHERE brandName = 'Asus'), (SELECT id FROM categories WHERE categoryName = 'laptop')),
    ('Gram 17', (SELECT id FROM brands WHERE brandName = 'LG'), (SELECT id FROM categories WHERE categoryName = 'laptop')),
    ('Surface Laptop 6', (SELECT id FROM brands WHERE brandName = 'Microsoft'), (SELECT id FROM categories WHERE categoryName = 'laptop')),
    
    -- Smartphones
    ('Pixel 9', (SELECT id FROM brands WHERE brandName = 'Google'), (SELECT id FROM categories WHERE categoryName = 'smartphone')),
    ('Xperia 1 VI', (SELECT id FROM brands WHERE brandName = 'Sony'), (SELECT id FROM categories WHERE categoryName = 'smartphone')),
    ('Surface Duo 3', (SELECT id FROM brands WHERE brandName = 'Microsoft'), (SELECT id FROM categories WHERE categoryName = 'smartphone')),
    ('Galaxy Z Fold5', (SELECT id FROM brands WHERE brandName = 'Samsung'), (SELECT id FROM categories WHERE categoryName = 'smartphone')),
    
    -- Tablets
    ('iPad Pro', (SELECT id FROM brands WHERE brandName = 'Apple'), (SELECT id FROM categories WHERE categoryName = 'tablet')),
    ('Galaxy Tab S10', (SELECT id FROM brands WHERE brandName = 'Samsung'), (SELECT id FROM categories WHERE categoryName = 'tablet')),
    ('Surface Pro 10', (SELECT id FROM brands WHERE brandName = 'Microsoft'), (SELECT id FROM categories WHERE categoryName = 'tablet')),
    ('Pixel Tablet 2', (SELECT id FROM brands WHERE brandName = 'Google'), (SELECT id FROM categories WHERE categoryName = 'tablet')),
    
    -- Smartwatches
    ('Apple Watch Series 10', (SELECT id FROM brands WHERE brandName = 'Apple'), (SELECT id FROM categories WHERE categoryName = 'smartwatch')),
    ('Galaxy Watch 8', (SELECT id FROM brands WHERE brandName = 'Samsung'), (SELECT id FROM categories WHERE categoryName = 'smartwatch')),
    ('Pixel Watch 3', (SELECT id FROM brands WHERE brandName = 'Google'), (SELECT id FROM categories WHERE categoryName = 'smartwatch')),
    
    -- Headphones
    ('AirPods Pro 3', (SELECT id FROM brands WHERE brandName = 'Apple'), (SELECT id FROM categories WHERE categoryName = 'headphones')),
    ('Galaxy Buds 3 Pro', (SELECT id FROM brands WHERE brandName = 'Samsung'), (SELECT id FROM categories WHERE categoryName = 'headphones')),
    ('WH-1000XM6', (SELECT id FROM brands WHERE brandName = 'Sony'), (SELECT id FROM categories WHERE categoryName = 'headphones')),
    
    -- Monitors
    ('UltraFine 5K', (SELECT id FROM brands WHERE brandName = 'LG'), (SELECT id FROM categories WHERE categoryName = 'monitor')),
    ('Odyssey G9', (SELECT id FROM brands WHERE brandName = 'Samsung'), (SELECT id FROM categories WHERE categoryName = 'monitor')),
    ('ProArt PA32UCG', (SELECT id FROM brands WHERE brandName = 'Asus'), (SELECT id FROM categories WHERE categoryName = 'monitor')),
    
    -- Desktop computers
    ('Mac Studio', (SELECT id FROM brands WHERE brandName = 'Apple'), (SELECT id FROM categories WHERE categoryName = 'desktop')),
    ('Alienware Aurora', (SELECT id FROM brands WHERE brandName = 'Dell'), (SELECT id FROM categories WHERE categoryName = 'desktop')),
    ('Surface Studio 3', (SELECT id FROM brands WHERE brandName = 'Microsoft'), (SELECT id FROM categories WHERE categoryName = 'desktop')),
    
    -- Cameras
    ('Alpha A7 IV', (SELECT id FROM brands WHERE brandName = 'Sony'), (SELECT id FROM categories WHERE categoryName = 'camera')),
    ('ZV-E10', (SELECT id FROM brands WHERE brandName = 'Sony'), (SELECT id FROM categories WHERE categoryName = 'camera'))
`;

const SUPPLIER = `CREATE TABLE IF NOT EXISTS suppliers (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    supplierName VARCHAR (255) UNIQUE
);

INSERT INTO suppliers (supplierName)
VALUES 
    ('Amazon'),
    ('Best Buy'),
    ('Maker Direct'),
    ('NewEgg'),
    ('B&H Photo'),
    ('Walmart'),
    ('Target'),
    ('Costco'),
    ('Micro Center'),
    ('Adorama')
    ON CONFLICT (supplierName) DO NOTHING
`;

const DEVICE_SUPPLIER = `CREATE TABLE IF NOT EXISTS device_suppliers (
    deviceId INT,
    supplierId INT,
    PRIMARY KEY (deviceId, supplierId),
    FOREIGN KEY (deviceId) REFERENCES devices(id),
    FOREIGN KEY (supplierId) REFERENCES suppliers(id)
)`;

const DEVICE_SUPPLIER_VALUES = `
    -- Insert some sample relationships between devices and suppliers
    -- This will create entries for some device-supplier combinations
    INSERT INTO device_suppliers (deviceId, supplierId)
    SELECT d.id, s.id
    FROM devices d
    CROSS JOIN suppliers s
    WHERE (d.id + s.id) % 3 = 0  -- Just a simple formula to select some combinations
    ON CONFLICT (deviceId, supplierId) DO NOTHING
`;

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
    await client.query(DEVICE_SUPPLIER_VALUES);
    console.log("Seeding completed!");
  } catch (err) {
    console.error("Error during seeding:", err);
  } finally {
    await client.end();
  }
}

main();
