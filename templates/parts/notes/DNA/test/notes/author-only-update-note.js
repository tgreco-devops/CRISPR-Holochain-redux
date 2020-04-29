  scenario("author-only-update-note", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const create_note_result = await alice.call("notes", "notes", "create_note", {"base": "testbase", "note_input" : {"title":"Title first note", "content": "Content"}})
    const update_note_result = await bob.call("notes", "notes", "update_note", {"id": create_note_result.Ok.id, "created_at": create_note_result.Ok.createdAt, "address": create_note_result.Ok.address, "note_input" : {"title":"Updated title first note", "content": "Content"}})
    t.deepEqual(JSON.parse(update_note_result.Err.Internal).kind, { ValidationFailed: 'Agent who did not author is trying to update' })
  })