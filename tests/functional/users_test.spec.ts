import { test } from '@japa/runner'

// Testing the /user, to get all users details
test('display all users', async ({ client }) => {
  const response = await client.get('/user')

  response.assertStatus(200)
  response.assertBodyContains([
    {
      id: 1,
      email: 'odo@mail.com',
      full_name: 'Odo',
      created_at: '2023-12-21T17:36:52.000+01:00',
      updated_at: '2023-12-21T17:36:52.000+01:00',
    },
  ])
})
