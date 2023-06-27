import type { Schema, Attribute } from '@strapi/strapi';

export interface FormCheckBoxItem extends Schema.Component {
  collectionName: 'components_form_check_box_items';
  info: {
    displayName: 'Field-Item';
    description: '';
  };
  attributes: {
    label: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 20;
      }>;
  };
}

export interface FormCheckbox extends Schema.Component {
  collectionName: 'components_form_checkboxes';
  info: {
    displayName: 'Checkbox';
    description: '';
  };
  attributes: {
    checkBoxItems: Attribute.Component<'form.check-box-item', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 2;
      }>;
    placeholder: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 20;
      }>;
    name: Attribute.Component<'shared.label-20-max-char'> & Attribute.Required;
    label: Attribute.Component<'shared.label-20-max-char'> & Attribute.Required;
  };
}

export interface FormFileUploader extends Schema.Component {
  collectionName: 'components_form_file_uploaders';
  info: {
    displayName: 'File Uploader';
    icon: 'file';
    description: '';
  };
  attributes: {
    fileType: Attribute.Enumeration<['image', 'pdf/word', 'video']> &
      Attribute.Required;
    name: Attribute.Component<'shared.label'> & Attribute.Required;
    label: Attribute.Component<'shared.label-20-max-char'> & Attribute.Required;
  };
}

export interface FormRadiobox extends Schema.Component {
  collectionName: 'components_form_radioboxes';
  info: {
    displayName: 'Radiobox';
    icon: 'command';
    description: '';
  };
  attributes: {
    items: Attribute.Component<'form.check-box-item', true> &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 2;
      }>;
    name: Attribute.Component<'shared.label-20-max-char'> & Attribute.Required;
    label: Attribute.Component<'form.check-box-item'> & Attribute.Required;
  };
}

export interface FormSelect extends Schema.Component {
  collectionName: 'components_form_selects';
  info: {
    displayName: 'Select';
    icon: 'filter';
    description: '';
  };
  attributes: {
    label: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 15;
      }>;
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 10;
      }>;
    placeholder: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 15;
      }>;
    SelectItems: Attribute.Component<'form.check-box-item', true>;
  };
}

export interface FormTextfield extends Schema.Component {
  collectionName: 'components_form_textfields';
  info: {
    displayName: 'TextField';
    description: '';
    icon: 'layer';
  };
  attributes: {
    label: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 15;
      }>;
    variants: Attribute.Enumeration<['outlined', 'standard']>;
    type: Attribute.Enumeration<['email', 'text', 'password', 'number']> &
      Attribute.Required;
    placeholder: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 15;
      }>;
  };
}

export interface SectionsHero extends Schema.Component {
  collectionName: 'components_decoration_heroes';
  info: {
    name: 'Hero';
    icon: 'address-card';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
  };
}

export interface SharedLabel20MaxChar extends Schema.Component {
  collectionName: 'components_shared_label_20_max_char_s';
  info: {
    displayName: 'Label(20 max-char)';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    text: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 20;
      }>;
  };
}

export interface SharedLabel extends Schema.Component {
  collectionName: 'components_shared_labels';
  info: {
    displayName: 'Label (15 max-char)';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    text: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 15;
      }>;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    name: 'Seo';
    icon: 'allergies';
  };
  attributes: {
    metaTitle: Attribute.String & Attribute.Required;
    metaDescription: Attribute.Text & Attribute.Required;
    shareImage: Attribute.Media;
  };
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface Components {
      'form.check-box-item': FormCheckBoxItem;
      'form.checkbox': FormCheckbox;
      'form.file-uploader': FormFileUploader;
      'form.radiobox': FormRadiobox;
      'form.select': FormSelect;
      'form.textfield': FormTextfield;
      'sections.hero': SectionsHero;
      'shared.label-20-max-char': SharedLabel20MaxChar;
      'shared.label': SharedLabel;
      'shared.seo': SharedSeo;
    }
  }
}
