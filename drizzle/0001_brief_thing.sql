CREATE TABLE `meals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`image_id` text,
	`description` text,
	`calories` integer NOT NULL,
	`protein` integer NOT NULL,
	`fat` integer NOT NULL,
	`carbs` integer NOT NULL,
	`coach_comment` text,
	`created_at` integer NOT NULL
);
