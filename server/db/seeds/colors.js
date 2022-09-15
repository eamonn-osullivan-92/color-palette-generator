/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('palettes').del()
  await knex('palettes').insert([
    {
      name: 'default1',
      colors: JSON.stringify([
        '#CCD5AE',
        '#E9EDC9',
        '#FEFAE0',
        '#FAEDCD',
        '#D4A373',
      ]),
      added_by_user: 'default',
    },
    {
      name: 'default2',
      colors: JSON.stringify([
        '#F08080',
        '#F4978E',
        '#F8AD9D',
        '#FBC4AB',
        '#FFDAB9',
      ]),
      added_by_user: 'default',
    },
    {
      name: 'default3',
      colors: JSON.stringify([
        '#736CED',
        '#9F9FED',
        '#D4C1EC',
        '#F2DFD7',
        '#FEF9FF',
      ]),
      added_by_user: 'default',
    },
    {
      name: 'default4',
      colors: JSON.stringify([
        '#EDEEC9',
        '#DDE7C7',
        '#BFD8BD',
        '#98C9A3',
        '#77BFA3',
      ]),
      added_by_user: 'default',
    },
    {
      name: 'default5',
      colors: JSON.stringify([
        '#F9DC5C',
        '#FAE588',
        '#FBEA9E',
        '#FCEFB4',
        '#FDF8E1',
      ]),
      added_by_user: 'default',
    },
  ])
}
