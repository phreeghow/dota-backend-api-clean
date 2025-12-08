create TABLE player(
    steam_id SERIAL PRIMARY KEY,
    currency INT,
    name VARCHAR(25)
);

-- обновление бд, имя таблицы
UPDATE player
SET 
    stats = (stats - 'rounds_won') || jsonb_build_object('items', stats->'rounds_won')
WHERE 
    stats ? 'rounds_won';