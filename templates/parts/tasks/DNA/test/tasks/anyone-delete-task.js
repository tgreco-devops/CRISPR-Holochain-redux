scenario("anyone-delete-task", async (s, t) => {
  const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
  const create_task_result = await alice.call("tasks", "tasks", "create_task", {"base": "testbase", "task_input" : {"title":"Title first task", "done":false}})
  await s.consistency()
  const list_tasks_result = await alice.call("tasks", "tasks", "list_tasks", {"base": "testbase"})
  t.deepEqual(list_tasks_result.Ok.length, 1)
  await bob.call("tasks", "tasks", "delete_task", {"base": "testbase", "id": create_task_result.Ok.id, "created_at": create_task_result.Ok.createdAt, "address": create_task_result.Ok.address })
  await s.consistency()
  const list_tasks_result_2 = await alice.call("tasks", "tasks", "list_tasks", {"base": "testbase"})
  t.deepEqual(list_tasks_result_2.Ok.length, 0)
})