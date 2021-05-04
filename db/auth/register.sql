INSERT INTO parent (username,hash,email)
VALUES ($1,$2,$3)

RETURNING *