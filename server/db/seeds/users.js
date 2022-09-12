/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      auth0_id: 'auth0|123',
      username: 'banana_llama',
    },
    {
      auth0_id: 'auth0|456',
      username: 'grape_gatsby',
    },
  ])
}
