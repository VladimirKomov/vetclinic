/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('events', (table) => {
        table.increments('id').primary(); // Unique identifier
        table.integer('animal_id').unsigned().
        references('id').inTable('animals').
        onDelete('CASCADE'); // Connection with animals
        table.string('type').notNullable(); // Type of event
        table.text('description').nullable(); // Description of event
        table.date('event_date').notNullable(); // Date of event
        table.timestamps(true, true); // created_at, updated_at
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTableIfExists('events');
}

