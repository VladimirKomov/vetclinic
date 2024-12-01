/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('animals', (table) => {
        table.increments('id').primary(); // Unique identifier
        table.string('name').notNullable(); // name of animal
        table.string('species').notNullable(); // species
        table.date('birth_date').nullable(); // Date of birth
        table.timestamps(true, true); // created_at, updated_at
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTableIfExists('animals');
}
