CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`telegram_id` integer NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text,
	`username` text,
	`language_code` text,
	`age` integer NOT NULL,
	`gender` text NOT NULL,
	`height` integer NOT NULL,
	`weight` integer NOT NULL,
	`activity_level` text NOT NULL,
	`goal` text NOT NULL,
	`daily_calories` integer NOT NULL,
	`daily_protein` integer NOT NULL,
	`daily_fat` integer NOT NULL,
	`daily_carbs` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_telegram_id_unique` ON `users` (`telegram_id`);