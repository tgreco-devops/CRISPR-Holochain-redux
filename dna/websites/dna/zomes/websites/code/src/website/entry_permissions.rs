use hdk::holochain_core_types::chain_header::ChainHeader;
use crate::website::{
    WebsiteEntry,
    validation
};


// Anyone allowed to create
pub fn validate_permissions_entry_create(entry: WebsiteEntry, validation_data: hdk::ValidationData) -> Result<(), String> {
    validation::validate_entry_create(entry, validation_data)
}

// Anyone allowed to update
pub fn validate_permissions_entry_modify(new_entry: WebsiteEntry, old_entry: WebsiteEntry, old_entry_header: ChainHeader, validation_data: hdk::ValidationData) -> Result<(), String> {
    validation::validate_entry_modify(new_entry, old_entry, old_entry_header, validation_data)
}

// No-one allowed to delete
pub fn validate_permissions_entry_delete(_old_entry: WebsiteEntry, _old_entry_header: ChainHeader, _validation_data: hdk::ValidationData) -> Result<(), String> {
  Err("No-one allowed to delete".to_string())
}
