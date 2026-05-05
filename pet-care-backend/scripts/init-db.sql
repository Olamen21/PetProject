SELECT 'CREATE DATABASE pet_care_auth'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'pet_care_auth')\gexec

SELECT 'CREATE DATABASE pet_care_pets'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'pet_care_pets')\gexec