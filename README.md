# Wellness Retreat

###### You can check deployed frontend project link - [https://wellness-retreat-vivek.netlify.app/](#https://wellness-retreat-vivek.netlify.app/)

##### Guide to Clone and Run this project

#### Steps for Frontend
1. git clone https://github.com/Venerablevivek/wellness-retreat
2. cd wellness_retrat-frontend
3. npm install
4. To run project - npm run dev

#### Steps for Backend
1. git clone https://github.com/Venerablevivek/wellness-retreat
2. cd wellness-retrat-backend
3. npm install
4. Change your PostgreSQL Database credentials
       - HOSTNAME= <your hostname>
       - USERNAME= <username>
       - PASSWORD= <password>
       - DATABASE_NAME= <database name>
       - DB_PORT = 5432

4. To run backend & database - npm run dev

### Database Setup Queries
// Run these queries in postgresql command line to configure Database


// 1. To create a Database
Query -> 

create database wellness_retreat;



// 2. Create a Retreat Table
Query -> 

CREATE TYPE tag_enum AS ENUM ('yoga', 'meditation', 'wellness', 'adventure', 'detox','relaxation','weekend','flexibility');

CREATE TABLE IF NOT EXISTS retreats (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    description VARCHAR(200),
    location VARCHAR(100),
    price NUMERIC,
    duration VARCHAR(50),
    type VARCHAR(50),
    condition VARCHAR(50),
    image VARCHAR(200),
    date DATE,
    tag tag_enum
);


// 3. Insert Data into Retreat Table
 Query=>

INSERT INTO retreats (title, description, location, price, duration, type, condition, image, date, tag)
VALUES
('Forest Meditation Retreat', 'Find peace and tranquility in the forest', 'Coorg', 450.00, '4 days', 'Meditation', 'New', 'https://cdn.midjourney.com/e0dba42d-84bc-45e6-acca-bbaf8f817371/0_1.jpeg', '2024-08-20', 'meditation'),
('Beach Yoga Retreat', 'Rejuvenate with yoga sessions by the beach', 'Goa', 350.00, '3 days', 'Yoga', 'New', 'https://images.pexels.com/photos/802417/pexels-photo-802417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', '2024-09-10', 'yoga');


// 4. Create Booking Table

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INT,
    user_name VARCHAR(100),
    user_email VARCHAR(100),
    user_phone VARCHAR(15),
    retreat_id INT REFERENCES retreats(id),
    retreat_title VARCHAR(100),
    retreat_location VARCHAR(100),
    retreat_price NUMERIC,
    retreat_duration VARCHAR(50),
    payment_details TEXT,
    booking_date DATE,
    UNIQUE (user_id, retreat_id)
);


*Note* => Use the same table and database name to make sure queries written in code runs perfectly.