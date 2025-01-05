import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: integer('id').primaryKey(),
	age: integer('age')
});

export const deployment = sqliteTable('deployment', {
	id: integer('id').primaryKey(),
	name: text('name'), // myapp
	repository: text('repository'),
	source: text('source'), // sub.example.com
	destination: text('destination'), // 192.168.178.99:8080
	type: text('type').default('compose'),
})

export const setting = sqliteTable('setting', {
	name: text('name').primaryKey(),
	value: text('value'),
	default: text('default'),
	env: text('env')
})
