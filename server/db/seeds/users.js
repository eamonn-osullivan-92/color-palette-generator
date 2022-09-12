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
      palettes: JSON.stringify([
        '#F9DC5C',
        '#FAE588',
        '#FBEA9E',
        '#FCEFB4',
        '#FDF8E1',
      ]),
    },
    {
      auth0_id: 'auth0|456',
      username: 'grape_gatsby',
      palettes: JSON.stringify([
        '#F9DC5C',
        '#FAE588',
        '#FBEA9E',
        '#FCEFB4',
        '#FDF8E1',
      ]),
    },
  ])
}
