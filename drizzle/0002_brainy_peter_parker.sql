PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_meals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`image_id` text,
	`description` text,
	`calories` integer NOT NULL,
	`protein` integer NOT NULL,
	`fat` integer NOT NULL,
	`carbs` integer NOT NULL,
	`coach_comment` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_meals`("id", "user_id", "image_id", "description", "calories", "protein", "fat", "carbs", "coach_comment", "created_at") SELECT "id", "user_id", "image_id", "description", "calories", "protein", "fat", "carbs", "coach_comment", "created_at" FROM `meals`;--> statement-breakpoint
DROP TABLE `meals`;--> statement-breakpoint
ALTER TABLE `__new_meals` RENAME TO `meals`;--> statement-breakpoint
PRAGMA foreign_keys=ON;