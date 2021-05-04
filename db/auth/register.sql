INSERT INTO adventure_user (username,hash,email)
VALUES ($1,$2,$3)

RETURNING *