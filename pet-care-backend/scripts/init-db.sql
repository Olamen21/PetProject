SELECT 'CREATE DATABASE pet_care_auth'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'pet_care_auth')\gexec

SELECT 'CREATE DATABASE pet_care_pets'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'pet_care_pets')\gexec

SELECT 'CREATE DATABASE pet_care_notifications'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'pet_care_notifications')\gexec

SELECT 'CREATE DATABASE pet_care_vaccine'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'pet_care_vaccine')\gexec

SELECT 'CREATE DATABASE pet_care_appointment'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'pet_care_vaccine')\gexec