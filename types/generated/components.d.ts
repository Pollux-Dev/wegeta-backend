import type { Schema, Attribute } from '@strapi/strapi';

export interface FormCheckBoxItem extends Schema.Component {
  collectionName: 'components_form_check_box_items';
  info: {
    displayName: 'Field-Item';
    description: '';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
  };
}

export interface FormCheckbox extends Schema.Component {
  collectionName: 'components_form_checkboxes';
  info: {
    displayName: 'checkbox';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    checkBoxItems: Attribute.Component<'form.check-box-item', true>;
    label: Attribute.String;
    placeholder: Attribute.String;
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
    name: Attribute.String & Attribute.Required;
    file: Attribute.Media;
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
    label: Attribute.String & Attribute.Required;
    name: Attribute.String & Attribute.Required;
    placeholder: Attribute.String;
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
    label: Attribute.String & Attribute.Required;
    variants: Attribute.Enumeration<['outlined', 'standard']>;
    type: Attribute.Enumeration<['email', 'text', 'password', 'number']> &
      Attribute.Required;
    placeholder: Attribute.String;
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
      'form.select': FormSelect;
      'form.textfield': FormTextfield;
      'sections.hero': SectionsHero;
      'shared.seo': SharedSeo;
    }
  }
}
