import { prefixPluginTranslations } from '@strapi/helper-plugin';

import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import getTrad from "./utils/getTrad";

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {
    /*app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: name,
      },
      Component: async () => {
        const component = await import(/!* webpackChunkName: "[request]" *!/ './pages/App');

        return component;
      },
      permissions: [
        // Uncomment to set the permissions of the plugin here
        // {
        //   action: '', // the action name should be plugin::plugin-name.actionType
        //   subject: null,
        // },
      ],
    });*/

    app.customFields.register({
      name: 'page-link',
      pluginId: pluginId,
      type: 'string',
      icon: PluginIcon,
      intlLabel: {
        id: getTrad('generated-page-link.label'),
        defaultMessage: 'Page Link',
      },
      intlDescription: {
        id: getTrad('generated-page-link.description'),
        defaultMessage: 'this is a generated page link',
      },
      components: {
        Input: async () =>
          import(
            /* webpackChunkName: "generated-page-link-component" */ './components/PageLinkButton'
            ),
      },
      options: {
        advanced: [
          {
            sectionTitle: {
              id: 'global.settings',
              defaultMessage: 'Settings',
            },
            items: [
              {
                name: 'required',
                type: 'checkbox',
                intlLabel: {
                  id: getTrad('page-link.options.advanced.requiredField'),
                  defaultMessage: 'Required field',
                },
                description: {
                  id: getTrad('page-link.options.advanced.requiredField.description'),
                  defaultMessage: "You won't be able to create an entry if this field is empty",
                },
              },
            ],
          },
        ],
      },
    });


    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    app.registerPlugin(plugin);
  },

  bootstrap(app: any) {},

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
