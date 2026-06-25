SELECT 'CREATE DATABASE pet_care_auth'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'pet_care_auth')\gexec

SELECT 'CREATE DATABASE pet_care_pets'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'pet_care_pets')\gexec

SELECT 'CREATE DATABASE pet_care_vaccine'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'pet_care_vaccine')\gexec

SELECT 'CREATE DATABASE pet_care_appointment'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'pet_care_appointment')\gexec

SELECT 'CREATE DATABASE pet_care_medical_records'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'pet_care_medical_records')\gexec

SELECT 'CREATE DATABASE pet_care_nutrition'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'pet_care_nutrition')\gexec


SELECT 'CREATE DATABASE pet_care_review'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'pet_care_review')\gexec