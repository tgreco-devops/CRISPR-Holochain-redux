/* eslint no-template-curly-in-string: "off" */

export const zomes = [
  {
    id: 'QmZome1hash',
    name: 'Notes',
    anchorTypes: [
      {
        id: 'Qmlist_notesHash1',
        type: 'list_notes',
        text: '',
        tag: '',
        context: 'id:permanent',
        entryTypes: [
          {
            id: 'QmNoteEntryTypeHash1',
            name: 'Note',
            fields: [
              {
                id: 'Qm1333',
                fieldName: 'title',
                fieldType: 'String',
                uiView: '<h3>${note.title}</h3>',
                uiEdit: '<div class="form-row"><mwc-textfield outlined label="Title" id="title" .value=${note.title} @change=${  e => { note.title = e.target.value }}></mwc-textfield></div>'
              },
              {
                id: 'Qm2',
                fieldName: 'content',
                fieldType: 'String',
                uiView: '<div class="note-content">${note.content}</div>',
                uiEdit: '<div class="form-row"><mwc-textarea outlined label="Content" id="content" .value=${note.content} @change=${ e => { note.content = e.target.value }}></mwc-textarea></div>'
              }
            ],
            metaFields: [
              {
                id: 'Qm11',
                fieldName: 'id',
                fieldType: 'Address',
                uiView: ''
              },
              {
                id: 'Qm12',
                fieldName: 'created_at',
                fieldType: 'Iso8601',
                uiView: '<p class="subtitle">Created At::$note.created_at</p>'
              },
              {
                id: 'Qm11',
                fieldName: 'address',
                fieldType: 'Address',
                uiView: ''
              },
              {
                id: 'Qm12',
                fieldName: 'updated_at',
                fieldType: 'Iso8601',
                uiView: '<p class="subtitle">Updated At::$note.updated_at</p>'
              }
            ],
            functions: [
              {
                name: 'create',
                code:
`  pub fn create(note_entry: NoteEntry) -> ZomeApiResult<Note> {
    let note_anchor = notes_anchor()?;
    let entry = Entry::App(NOTE_ENTRY_NAME.into(), note_entry.clone().into());
    let entry_address = hdk::commit_entry(&entry)?;
    let note = Note::new(entry_address.clone(), note_entry)?;
    hdk::link_entries(&note_anchor, &entry_address, NOTE_ENTRY_LINK_TYPE, &note.created_at.to_string())?;
    Ok(note)
  }`,
                explanation: `
                # Docs go here 
                Mermaid sequence diagrams and cool stuff'
              `,
                permissionsCode:
  `  pub fn validate_permissions_entry_create(entry: NoteEntry, validation_data: hdk::ValidationData) -> Result<(), String> {
      validation::validate_entry_create(entry, validation_data)
  }`,
                permissionsExplanation: `
                # Docs go here 
                Mermaid sequence diagrams and cool stuff'
              `
              },
              {
                name: 'read',
                code:
  ` pub fn read(id: Address, created_at: Iso8601) -> ZomeApiResult<Note> {
    let note_entry: NoteEntry = hdk::utils::get_as_type(id.clone())?;
    let address = Entry::App(NOTE_ENTRY_NAME.into(), note_entry.clone().into()).address();
    Note::existing(id.clone(), created_at, address, note_entry)
 }`,
                explanation: 'Docs go here',
                permissionsCode: '',
                permissionsExplanation: `
                # Because entries are published to the DHT entries can be read via other methods so no point having permissions'
              `
              },
              {
                name: 'update',
                code:
  ` pub fn update(id: Address, created_at: Iso8601, address: Address, note_input: NoteEntry) -> ZomeApiResult<Note> {
    let updated_entry_address = hdk::update_entry(Entry::App(NOTE_ENTRY_NAME.into(), note_input.clone().into()), &address.clone())?;
    Note::existing(id.clone(), created_at, updated_entry_address, note_input)
 }`,
                explanation: 'Docs go here',
                permissionsCode:
  ` pub fn validate_permissions_entry_modify(new_entry: NoteEntry, old_entry: NoteEntry, old_entry_header: ChainHeader, validation_data: hdk::ValidationData) -> Result<(), String> {
    if let (Some(o), Some(p)) = (old_entry_header.provenances().get(0), validation_data.package.chain_header.provenances().get(0)) {
        if o.source() != p.source() {
          Err("Agent who did not author is trying to delete".to_string())
        }
    }
    else {
      Err("No provenance on this validation_data".to_string())
    }
    validation::validate_entry_modify(new_entry, old_entry, old_entry_header, validation_data)
 }`,
                permissionsExplanation: `
                # Docs go here 
                Mermaid sequence diagrams and cool stuff'
              `
              },
              {
                name: 'delete',
                code:
  ` pub fn delete(id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
    hdk::remove_link(&notes_anchor()?, &id, NOTE_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::remove_entry(&address)
 }`,
                explanation: 'Docs go here',
                permissionsCode:
  ` pub fn validate_permissions_entry_delete(old_entry: NoteEntry, old_entry_header: ChainHeader, validation_data: hdk::ValidationData) -> Result<(), String> {
    validation::validate_entry_delete(old_entry, old_entry_header, validation_data)
 }`,
                permissionsExplanation: ''
              },
              {
                name: 'list',
                code:
  ` pub fn list() -> ZomeApiResult<Vec<Note>> {
    hdk::get_links(&notes_anchor()?, LinkMatch::Exactly(NOTE_ENTRY_LINK_TYPE), LinkMatch::Any)?.links()
    .iter()
    .map(|link| get_note(link.address.clone(), Iso8601::try_from(link.tag.clone()).unwrap()))
    .collect()
 }`,
                explanation: 'Docs go here',
                permissionsCode: '',
                permissionsExplanation: ''
              }
            ],
            examples: [
              {
                id: 'QmUDVBPMnRrYq6VKZ9d1BA21gEbQCCua2NQCTd9jDwec3n',
                createdAt: '2020-04-10T11:23:05.928825+00:00',
                address: 'QmUDVBPMnRrYq6VKZ9d1BA21gEbQCCua2NQCTd9jDwec3n',
                updatedAt: '2020-04-10T11:23:05.928825+00:00',
                title: 'Title fourth note',
                content: 'Content fourth note'
              },
              {
                id: 'Qmc8abkphjkUoNv1TNktUh5sS6tQfhB1ugXQ7Xoct7Da4F',
                createdAt: '2020-04-10T11:23:05.770654+00:00',
                address: 'Qmc8abkphjkUoNv1TNktUh5sS6tQfhB1ugXQ7Xoct7Da4F',
                updatedAt: '2020-04-10T11:23:05.770654+00:00',
                title: 'Title third note',
                content: 'Content third note'
              },
              {
                id: 'QmTWD3JiAXnTH2oTrgEz82ESxAypC7ShDenLHhnqXbDZYp',
                createdAt: '2020-04-10T11:23:05.614081+00:00',
                address: 'QmTWD3JiAXnTH2oTrgEz82ESxAypC7ShDenLHhnqXbDZYp',
                updatedAt: '2020-04-10T11:23:05.614081+00:00',
                title: 'Title second note',
                content: 'Content second note'
              },
              {
                id: 'QmUKXcXBcXzt82atskYQxN7tykt7mpUX5knqzfFKn3RLZn',
                createdAt: '2020-04-10T11:23:05.457226+00:00',
                address: 'QmUKXcXBcXzt82atskYQxN7tykt7mpUX5knqzfFKn3RLZn',
                updatedAt: '2020-04-10T11:23:05.457226+00:00',
                title: 'Title first note',
                content: 'Content first note'
              }
            ]
          }
        ],
        anchors: []
      }
    ],
    entryTypes: [],
    profileSpecs: []
  },
  {
    id: 'QmZome2hash',
    name: 'Notes2',
    anchorTypes: [
      {
        id: 'Qmlist_notesHash2',
        type: 'list_notes',
        text: '',
        entryTypes: [],
        anchors: [
          {
            id: 'Qmlist_notesdraftHash',
            type: 'list_notes',
            text: 'master',
            links: [
              {
                entityId: 'QmNoteEntryTypeHash2',
                type: 'note_link',
                tag: '',
                context: 'id:permanent'
              }
            ]
          },
          {
            id: 'Qmlist_notespublishedHash',
            type: 'list_notes',
            text: 'develop',
            links: [
              {
                entityId: 'QmNoteEntryTypeHash2',
                type: 'note_link',
                tag: '',
                context: 'id:permanent'
              }
            ]
          }
        ]
      }
    ],
    entryTypes: [
      {
        id: 'QmNoteEntryTypeHash2',
        name: 'Note',
        Skin: '<html>',
        fields: [
          {
            id: 'Qm1333',
            fieldName: 'title',
            fieldType: 'String',
            uiView: '<h3>${note.title}</h3>',
            uiEdit: '<div class="form-row"><mwc-textfield outlined label="Title" id="title" .value=${note.title} @change=${  e => { note.title = e.target.value }}></mwc-textfield></div>'
          },
          {
            id: 'Qm2',
            fieldName: 'content',
            fieldType: 'String',
            uiView: '<div class="note-content">${note.content}</div>',
            uiEdit: '<div class="form-row"><mwc-textarea outlined label="Content" id="content" .value=${note.content} @change=${ e => { note.content = e.target.value }}></mwc-textarea></div>'
          },
          {
            id: 'Qm2',
            fieldName: 'project',
            fieldType: 'String',
            uiView: '<div class="note-content">${note.content}</div>',
            uiEdit: '<div class="form-row"><mwc-textarea outlined label="Content" id="content" .value=${note.content} @change=${ e => { note.content = e.target.value }}></mwc-textarea></div>'
          }
        ],
        metaFields: [
          {
            id: 'Qm11',
            fieldName: 'id',
            fieldType: 'Address',
            uiView: ''
          },
          {
            id: 'Qm12',
            fieldName: 'created_at',
            fieldType: 'Iso8601',
            uiView: '<p class="subtitle">Created At::$note.created_at</p>'

          },
          {
            id: 'Qm11',
            fieldName: 'address',
            fieldType: 'Address',
            uiView: ''
          },
          {
            id: 'Qm12',
            fieldName: 'updated_at',
            fieldType: 'Iso8601',
            uiView: '<p class="subtitle">Updated At::$note.updated_at</p>'
          }
        ],
        functions: [{
          name: 'create',
          code: `
  pub fn create(note_entry: NoteEntry) -> ZomeApiResult<Note> {
    let note_anchor = notes_anchor()?;
    let entry = Entry::App(NOTE_ENTRY_NAME.into(), note_entry.clone().into());
    let entry_address = hdk::commit_entry(&entry)?;
    let note = Note::new(entry_address.clone(), note_entry)?;
    hdk::link_entries(&note_anchor, &entry_address, NOTE_ENTRY_LINK_TYPE, &note.created_at.to_string())?;
    Ok(note)
  }`,
          explanation: 'Docs go here'
        },
        {
          name: 'read',
          code: `
pub fn read_note(id: Address, created_at: Iso8601) -> ZomeApiResult<Note> {
let note_entry: NoteEntry = hdk::utils::get_as_type(id.clone())?;
let address = Entry::App(NOTE_ENTRY_NAME.into(), note_entry.clone().into()).address();
Note::existing(id.clone(), created_at, address, note_entry)
}`,
          explanation: 'Docs go here'
        },
        {
          name: 'update',
          code: `
          pub fn update_note(id: Address, created_at: Iso8601, address: Address, note_input: NoteEntry) -> ZomeApiResult<Note> {
            let updated_entry_address = hdk::update_entry(Entry::App(NOTE_ENTRY_NAME.into(), note_input.clone().into()), &address.clone())?;
            Note::existing(id.clone(), created_at, updated_entry_address, note_input)
        }`,
          explanation: 'Docs go here'
        },
        {
          name: 'delete',
          code: `
          pub fn delete_note(id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
            hdk::remove_link(&notes_anchor()?, &id, NOTE_ENTRY_LINK_TYPE, &created_at.to_string())?;
            hdk::remove_entry(&address)
        }`,
          explanation: 'Docs go here'
        },
        {
          name: 'list',
          code: `
          pub fn list_notes() -> ZomeApiResult<Vec<Note>> {
            hdk::get_links(&notes_anchor()?, LinkMatch::Exactly(NOTE_ENTRY_LINK_TYPE), LinkMatch::Any)?.links()
            .iter()
            .map(|link| get_note(link.address.clone(), Iso8601::try_from(link.tag.clone()).unwrap()))
            .collect()
        }`,
          explanation: 'Docs go here'
        }],
        examples: [
          {
            id: 'QmUDVBPMnRrYq6VKZ9d1BA21gEbQCCua2NQCTd9jDwec3n',
            createdAt: '2020-04-10T11:23:05.928825+00:00',
            address: 'QmUDVBPMnRrYq6VKZ9d1BA21gEbQCCua2NQCTd9jDwec3n',
            updatedAt: '2020-04-10T11:23:05.928825+00:00',
            title: 'Title fourth note',
            content: 'Content fourth note'
          },
          {
            id: 'Qmc8abkphjkUoNv1TNktUh5sS6tQfhB1ugXQ7Xoct7Da4F',
            createdAt: '2020-04-10T11:23:05.770654+00:00',
            address: 'Qmc8abkphjkUoNv1TNktUh5sS6tQfhB1ugXQ7Xoct7Da4F',
            updatedAt: '2020-04-10T11:23:05.770654+00:00',
            title: 'Title third note',
            content: 'Content third note'
          },
          {
            id: 'QmTWD3JiAXnTH2oTrgEz82ESxAypC7ShDenLHhnqXbDZYp',
            createdAt: '2020-04-10T11:23:05.614081+00:00',
            address: 'QmTWD3JiAXnTH2oTrgEz82ESxAypC7ShDenLHhnqXbDZYp',
            updatedAt: '2020-04-10T11:23:05.614081+00:00',
            title: 'Title second note',
            content: 'Content second note'
          },
          {
            id: 'QmUKXcXBcXzt82atskYQxN7tykt7mpUX5knqzfFKn3RLZn',
            createdAt: '2020-04-10T11:23:05.457226+00:00',
            address: 'QmUKXcXBcXzt82atskYQxN7tykt7mpUX5knqzfFKn3RLZn',
            updatedAt: '2020-04-10T11:23:05.457226+00:00',
            title: 'Title first note',
            content: 'Content first note'
          }
        ]
      }
    ],
    profileSpecs: []
  },
  {
    id: 'QmZome3hash',
    name: 'Notes3',
    anchorTypes: [
      {
        id: 'Qmlist_notesHash3',
        type: 'list_notes',
        text: '',
        tag: '',
        context: 'id:permanent',
        entryTypes: [
          {
            id: 'QmNoteEntryTypeHash3',
            name: 'Note',
            fields: [
              {
                id: 'Qm1333',
                fieldName: 'title',
                fieldType: 'String',
                uiView: '<h3>${note.title}</h3>',
                uiEdit: '<div class="form-row"><mwc-textfield outlined label="Title" id="title" .value=${note.title} @change=${  e => { note.title = e.target.value }}></mwc-textfield></div>'
              },
              {
                id: 'Qm2',
                fieldName: 'content',
                fieldType: 'String',
                uiView: '<div class="note-content">${note.content}</div>',
                uiEdit: '<div class="form-row"><mwc-textarea outlined label="Content" id="content" .value=${note.content} @change=${ e => { note.content = e.target.value }}></mwc-textarea></div>'
              },
              {
                id: 'Qm2',
                fieldName: 'project',
                fieldType: 'String',
                uiView: '<div class="note-content">${note.content}</div>',
                uiEdit: '<div class="form-row"><mwc-textarea outlined label="Content" id="content" .value=${note.content} @change=${ e => { note.content = e.target.value }}></mwc-textarea></div>'
              },
              {
                id: 'Qm2',
                fieldName: 'owner',
                fieldType: 'String',
                uiView: '<div class="note-content">${note.owner}</div>',
                uiEdit: '<div class="form-row"><mwc-textarea outlined label="Owner" id="content" .value=${note.content} @change=${ e => { note.content = e.target.value }}></mwc-textarea></div>'
              },
              {
                id: 'Qm2',
                fieldName: 'status',
                fieldType: 'String',
                uiView: '<div class="note-content">${note.owner}</div>',
                uiEdit: '<div class="form-row"><mwc-textarea outlined label="Owner" id="content" .value=${note.content} @change=${ e => { note.content = e.target.value }}></mwc-textarea></div>'
              }
            ],
            metaFields: [
              {
                id: 'Qm11',
                fieldName: 'id',
                fieldType: 'Address',
                uiView: ''
              },
              {
                id: 'Qm12',
                fieldName: 'created_at',
                fieldType: 'Iso8601',
                uiView: '<p class="subtitle">Created At::$note.created_at</p>'

              },
              {
                id: 'Qm11',
                fieldName: 'address',
                fieldType: 'Address',
                uiView: ''
              },
              {
                id: 'Qm12',
                fieldName: 'updated_at',
                fieldType: 'Iso8601',
                uiView: '<p class="subtitle">Updated At::$note.updated_at</p>'
              }
            ],
            functions: [{
              name: 'create',
              code: `
pub fn create(note_entry: NoteEntry) -> ZomeApiResult<Note> {
  let note_anchor = notes_anchor()?;
  let entry = Entry::App(NOTE_ENTRY_NAME.into(), note_entry.clone().into());
  let entry_address = hdk::commit_entry(&entry)?;
  let note = Note::new(entry_address.clone(), note_entry)?;
  hdk::link_entries(&note_anchor, &entry_address, NOTE_ENTRY_LINK_TYPE, &note.created_at.to_string())?;
  Ok(note)
}`,
              explanation: 'Docs go here'
            },
            {
              name: 'read',
              code: `
pub fn read_note(id: Address, created_at: Iso8601) -> ZomeApiResult<Note> {
  let note_entry: NoteEntry = hdk::utils::get_as_type(id.clone())?;
  let address = Entry::App(NOTE_ENTRY_NAME.into(), note_entry.clone().into()).address();
  Note::existing(id.clone(), created_at, address, note_entry)
}`,
              explanation: 'Docs go here'
            },
            {
              name: 'update',
              code: `
              pub fn update_note(id: Address, created_at: Iso8601, address: Address, note_input: NoteEntry) -> ZomeApiResult<Note> {
                let updated_entry_address = hdk::update_entry(Entry::App(NOTE_ENTRY_NAME.into(), note_input.clone().into()), &address.clone())?;
                Note::existing(id.clone(), created_at, updated_entry_address, note_input)
            }`,
              explanation: 'Docs go here'
            },
            {
              name: 'delete',
              code: `
              pub fn delete_note(id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
                hdk::remove_link(&notes_anchor()?, &id, NOTE_ENTRY_LINK_TYPE, &created_at.to_string())?;
                hdk::remove_entry(&address)
            }`,
              explanation: 'Docs go here'
            },
            {
              name: 'list',
              code: `
              pub fn list_notes() -> ZomeApiResult<Vec<Note>> {
                hdk::get_links(&notes_anchor()?, LinkMatch::Exactly(NOTE_ENTRY_LINK_TYPE), LinkMatch::Any)?.links()
                .iter()
                .map(|link| get_note(link.address.clone(), Iso8601::try_from(link.tag.clone()).unwrap()))
                .collect()
            }`,
              explanation: 'Docs go here'
            }],
            examples: [
              {
                id: 'QmUDVBPMnRrYq6VKZ9d1BA21gEbQCCua2NQCTd9jDwec3n',
                createdAt: '2020-04-10T11:23:05.928825+00:00',
                address: 'QmUDVBPMnRrYq6VKZ9d1BA21gEbQCCua2NQCTd9jDwec3n',
                updatedAt: '2020-04-10T11:23:05.928825+00:00',
                title: 'Title fourth note',
                content: 'Content fourth note'
              },
              {
                id: 'Qmc8abkphjkUoNv1TNktUh5sS6tQfhB1ugXQ7Xoct7Da4F',
                createdAt: '2020-04-10T11:23:05.770654+00:00',
                address: 'Qmc8abkphjkUoNv1TNktUh5sS6tQfhB1ugXQ7Xoct7Da4F',
                updatedAt: '2020-04-10T11:23:05.770654+00:00',
                title: 'Title third note',
                content: 'Content third note'
              },
              {
                id: 'QmTWD3JiAXnTH2oTrgEz82ESxAypC7ShDenLHhnqXbDZYp',
                createdAt: '2020-04-10T11:23:05.614081+00:00',
                address: 'QmTWD3JiAXnTH2oTrgEz82ESxAypC7ShDenLHhnqXbDZYp',
                updatedAt: '2020-04-10T11:23:05.614081+00:00',
                title: 'Title second note',
                content: 'Content second note'
              },
              {
                id: 'QmUKXcXBcXzt82atskYQxN7tykt7mpUX5knqzfFKn3RLZn',
                createdAt: '2020-04-10T11:23:05.457226+00:00',
                address: 'QmUKXcXBcXzt82atskYQxN7tykt7mpUX5knqzfFKn3RLZn',
                updatedAt: '2020-04-10T11:23:05.457226+00:00',
                title: 'Title first note',
                content: 'Content first note'
              }
            ]
          }
        ],
        anchors: []
      },
      {
        id: 'Qmlist_agentsHash3',
        type: 'list_agents_notes',
        text: '',
        entryTypes: [],
        anchors: [],
        agentIdLinks: [
          {
            entityId: 'QmNoteEntryTypeHash3',
            target: 'id:',
            type: 'agent_note_link',
            tag: 'created_at:initial_note_entry_timestamp',
            context: 'id:permanent'
          }
        ]
      }
    ],
    entryTypes: [],
    profileSpecs: []
  }
]
