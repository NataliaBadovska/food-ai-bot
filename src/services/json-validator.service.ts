import { ZodType } from "zod";

export function validate<T>(
    data: unknown,
    schema: ZodType<T>
): T {
    return schema.parse(data);
}