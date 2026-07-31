export function validateAge(value: string): number | null {
  const age = Number(value);

  if (!Number.isInteger(age)) {
    return null;
  }

  if (age < 10 || age > 120) {
    return null;
  }

  return age;
}

export function validateHeight(value: string): number | null {
  const height = Number(value);

  if (!Number.isInteger(height)) {
    return null;
  }

  if (height < 100 || height > 250) {
    return null;
  }

  return height;
}

export function validateWeight(value: string): number | null {
  const weight = Number(value);

  if (Number.isNaN(weight)) {
    return null;
  }

  if (weight < 20 || weight > 400) {
    return null;
  }

  return Number(weight);
}