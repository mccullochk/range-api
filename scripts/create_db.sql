
CREATE DATABASE myra;
CREATE USER app_dv_myra WITH PASSWORD 'PASSWORD_HERE';
GRANT ALL PRIVILEGES ON DATABASE myra TO app_dv_myra;
ALTER DATABASE myra OWNER TO app_dv_myra;
