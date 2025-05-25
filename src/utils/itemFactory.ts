import { Item, FileType, Field } from '../types/item';

const defaultFile: FileType = {
  id: 'default-file-id',
  name: 'default-file.txt',
  size: 0,
  content_path: 'vault/defaults/files/default-file-id/file',
};

const defaultField: Field = {
  id: 'default-field-id',
  label: 'Default Label',
  type: 'text',
  value: 'Default Value',
};

const defaultItem: Item = {
  id: 'default-item-id',
  title: 'Default Item Title',
  tags: ['default', 'item'],
  files: [defaultFile],
  fields: [defaultField],
};

export function createItem(overrides?: Partial<Item>): Item {
  if (!overrides) {
    return { ...defaultItem };
  }

  // Basic merge for top-level properties
  const item: Item = {
    ...defaultItem,
    ...overrides,
  };

  // Ensure arrays are handled: if overrides provide them, use those, otherwise use defaults.
  // For a deeper merge of array elements, a more complex logic would be needed.
  // For now, if 'files' or 'fields' are in overrides, they replace the default arrays.
  // If not, the default arrays are used (already set by ...defaultItem).
  // To allow partial updates to default files/fields (e.g. changing just a label in a default field)
  // would require a more sophisticated merging strategy.

  if (overrides.tags) {
    item.tags = [...overrides.tags];
  } else {
    item.tags = [...defaultItem.tags];
  }
  
  if (overrides.files) {
    item.files = overrides.files.map(file => ({ ...file }));
  } else {
    item.files = defaultItem.files.map(file => ({ ...file }));
  }

  if (overrides.fields) {
    item.fields = overrides.fields.map(field => ({ ...field }));
  } else {
    item.fields = defaultItem.fields.map(field => ({ ...field }));
  }

  return item;
}
