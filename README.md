# employee-tracker-challenge

## Description

This challenge was designed to take our knowledge of MySQL and use it to create an interactable employee database.

## Installation

This application uses Node.js v.16.18.0

To run the program **for the first time**:
1. Open the command line terminal
2. Install the packages `npm i`
3. Open MySQL `mysql -u root -p`
4. Run the schema.sql file `source db/schema.sql`
    - To include a sample set of data when running the program, run the seeds.sql file `source db/seeds.sql`
5. Quit out of MySQL `quit`
6. Run the server.js file `node server.js`

To run the program **after the first time**:
1. Open the command line terminal
2. Run the server.js file `node server.js`

## Usage

To start the program enter `node server.js`. The user will be presented with a list of options, which they can arrow to and press 'enter' to select. Selecting "View all departments", "View all roles", or "View all employees" will display the relevant table. After viewing the table, pressing up or down on the arrow keys will pull the menu up again. Selecting "Add a department", "Add a role", "Add an employee", or "Update an employee role" will start a sequence of questions to add to or update the relevant table/information. After answering the sequence of the questions, the menu will come up again. To exit the program press 'CTRL' + 'c'.

Here is a video walkthrough of the program: [https://drive.google.com/file/d/1lwk02-8XzAMxu3juzmvDwRLo3aG5gns7/view](https://drive.google.com/file/d/1lwk02-8XzAMxu3juzmvDwRLo3aG5gns7/view)

## Credits

I followed these tutorials on joining multiple tables and self-joining within a table:
- [https://www.w3schools.com/nodejs/nodejs_mysql_insert.asp](https://www.w3schools.com/nodejs/nodejs_mysql_insert.asp)
- [https://javarevisited.blogspot.com/2012/11/how-to-join-three-tables-in-sql-query-mysql-sqlserver.html#axzz7mol1EYjD](https://javarevisited.blogspot.com/2012/11/how-to-join-three-tables-in-sql-query-mysql-sqlserver.html#axzz7mol1EYjD)

I had assistance from askBCS Learning Assistant skaliaperumal on getting a table that uses both joins and self-joins.

## License

None

---



