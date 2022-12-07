INSERT INTO department (name)
VALUES
    ("Oxventure"),
    ("Straw Hats"),
    ("Pokemon");

INSERT INTO role (title, salary, department_id)
VALUES
    ("Rogue", 502, 1),
    ("Captain", 3000, 2),
    ("Warlock", 667, 1),
    ("Water", 300, 3),
    ("Fire", 250, 3),
    ("Navigator", 1000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Luffy", "Straw-Hat", 2, null),
    ("Charizard", "003", 5, 5),
    ("Corazon", "de Ballena", 1, null),
    ("Prudence", "Tiefling", 3, null),
    ("Blastoise", "009", 4, null),
    ("Nami", "Straw-Hat", 6, 1);
