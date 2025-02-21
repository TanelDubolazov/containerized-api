CREATE TABLE billing (
    billing_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    billing_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_date TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending',
    payment_method VARCHAR(50),
    transaction_id VARCHAR(255),
    CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);

INSERT INTO billing (customer_id, amount, due_date, payment_method)
VALUES
    (1, 100.00, '2024-12-01', 'Credit Card'),
    (2, 250.00, '2024-12-15', 'PayPal');

CREATE INDEX idx_billing_customer ON billing (customer_id);
CREATE INDEX idx_billing_status ON billing (status);
