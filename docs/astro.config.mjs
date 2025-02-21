import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc'

export default defineConfig({
	site: 'https://zloishavrin.github.io/gigachat-node',
	base: '/gigachat-node',
	output: 'static',
	integrations: [
		starlight({
			title: 'GigaChatJS',
			locales: {
				root: {
					label: "Русский",
					lang: "ru"
				}
			},
			customCss: [
				"./src/custom.css",
			],
			social: {
				github: 'https://github.com/zloishavrin/gigachat-node',
			},
			plugins: [
        starlightTypeDoc({
          entryPoints: [
						'../src/index.ts', 
						"../src/interfaces/*.ts",
					],
          tsconfig: '../tsconfig.json',
					locale: "ru"
        }),
      ],
			sidebar: [
				{
					label: 'Начать работу',
					items: [
						{ label: 'Начать работу', slug: 'guides/readme' },
					],
				},
				{
					label: 'Примеры использоваения',
					items: [
						{ label: 'Телеграм-бот', slug: 'examples/tgbot'},
						{ label: 'REST', slug: 'examples/rest' }
					]
				},
				typeDocSidebarGroup,
			],
		}),
	],
});
