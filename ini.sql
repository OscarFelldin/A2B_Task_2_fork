-- Create the Accounts Table
CREATE TABLE accounts (
    account_id SERIAL PRIMARY KEY,
    account_name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Roles Table
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name TEXT NOT NULL
);

-- Create the Account Privileges Table
CREATE TABLE account_privileges (
    id SERIAL PRIMARY KEY,
    account_id INT NOT NULL REFERENCES accounts(account_id) ON DELETE CASCADE,
    demo INT DEFAULT 0,
    resource_management INT DEFAULT 0,
    analytics_plus INT DEFAULT 0,
    automation INT DEFAULT 0,
    ai_assist INT DEFAULT 0
);

-- Create the Users Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    account_id INT NOT NULL REFERENCES accounts(account_id) ON DELETE CASCADE,
    role_id INT NOT NULL REFERENCES roles(role_id),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    profile_picture BYTEA,
    phone text,
    user_password TEXT
);

-- Create the Account Settings Table
CREATE TABLE account_settings (
    settings_id SERIAL PRIMARY KEY,
    account_id INT NOT NULL REFERENCES accounts(account_id) ON DELETE CASCADE,
    setting_key TEXT NOT NULL,
    setting_value TEXT
);

-- Create the User Settings Table
CREATE TABLE user_settings (
    setting_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    setting_key TEXT NOT NULL,
    setting_value TEXT
);

-- Insert Data into the Accounts Table
INSERT INTO accounts (account_name, created_at)
VALUES 
    ('Alpha Inc.', '2024-01-01 12:00:00'),
    ('Beta LLC', '2024-02-01 13:00:00'),
    ('Gamma Corp.', '2024-03-01 14:00:00');

-- Insert Data into the Roles Table
INSERT INTO roles (role_name)
VALUES 
    ('Admin'),
    ('Editor'),
    ('Viewer');

-- Insert Data into the Account Privileges Table
INSERT INTO account_privileges (account_id, demo, resource_management, analytics_plus, automation, ai_assist)
VALUES 
    (1, 1, 1, 1, 0, 0),
    (2, 0, 1, 0, 0, 1),
    (3, 0, 0, 0, 1, 1);

-- Insert Data into the Users Table
INSERT INTO users (username, account_id, role_id, first_name, last_name, email, phone, user_password)
VALUES 
    ('jdoe', 1, 1, 'John', 'Doe', 'jdoe@example.com', '555-1234','jdoe'),
    ('asmith', 2, 2, 'Alice', 'Smith', 'asmith@example.com', '555-5678','asmith'),
    ('bjones', 1, 3, 'Bob', 'Jones', 'bjones@example.com', '555-8765','bjones');

-- Insert Data into the Account Settings Table
INSERT INTO account_settings (account_id, setting_key, setting_value)
VALUES 
    (1, 'theme', 'dark'),
    (2, 'notifications', 'enabled'),
    (3, 'timezone', 'UTC');

-- Insert Data into the User Settings Table
INSERT INTO user_settings (user_id, setting_key, setting_value)
VALUES 
    (1, 'language', 'en'),
    (2, 'privacy', 'high'),
    (3, 'theme', 'light');
