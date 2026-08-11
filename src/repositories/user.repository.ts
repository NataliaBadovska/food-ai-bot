import { eq } from "drizzle-orm";

import { db } from "../db/client.js";
import { users } from "../db/schema.js";

export class UserRepository {
  async findByTelegramId(telegramId: number) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.telegramId, telegramId));

    return user ?? null;
  }

  async exists(telegramId: number): Promise<boolean> {
    return (await this.findByTelegramId(telegramId)) !== null;
  }

  async create(data: typeof users.$inferInsert) {
    await db.insert(users).values(data);
  }

  async update(
    telegramId: number,
    data: Partial<typeof users.$inferInsert>
  ) {
    await db
      .update(users)
      .set({
        ...data,
        updatedAt: Date.now(),
      })
      .where(eq(users.telegramId, telegramId));
  }

  async delete(telegramId: number) {
    await db
      .delete(users)
      .where(eq(users.telegramId, telegramId));
  }

  async updateHealthNotes(
  telegramId: number,
  healthNotes: string | null
) {
  await db
    .update(users)
    .set({
      healthNotes,
      updatedAt: Date.now(),
    })
    .where(eq(users.telegramId, telegramId));
}

async getHealthNotes(telegramId: number) {
  const [user] = await db
    .select({
      healthNotes: users.healthNotes,
    })
    .from(users)
    .where(eq(users.telegramId, telegramId));

  return user?.healthNotes ?? null;
}
}

export const userRepository = new UserRepository();