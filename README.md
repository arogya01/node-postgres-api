# Simple API Built with Nodejs,Express and PostgresSQL.

we'll be using node-postgres to create a pool of connections. This way we don't have to open a client and close it every time we make a query.

A popular option for production pooling would be to use pgBouncer, a lightweight connection pooler for PostgreSQL.

right now, the config details are in the open, but in an production enviroment, we must most certainly keep it secured. 
and that is not accessible from version control.
