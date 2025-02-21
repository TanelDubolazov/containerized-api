CREATE TABLE inventory (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    quantity_in_stock INT NOT NULL DEFAULT 0,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO inventory (product_name, description, price, quantity_in_stock, category)
VALUES
    ('Product A', 'Description of product A', 19.99, 100, 'Category1'),
    ('Product B', 'Description of product B', 29.99, 50, 'Category2'),
    ('Product C', 'Description of product C', 39.99, 200, 'Category3');

CREATE INDEX idx_inventory_category ON inventory (category);
CREATE INDEX idx_inventory_stock ON inventory (quantity_in_stock);
