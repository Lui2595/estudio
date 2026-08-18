/**
 * TEMA: Clases en TypeScript
 * Modificadores: public, private, protected, readonly.
 * implements vs extends.
 */

interface Printable {
  print(): string;
}

abstract class Shape {
  constructor(protected readonly color: string) {}

  abstract area(): number;

  describe(): string {
    return `Forma ${this.color} con área ${this.area()}`;
  }
}

class Circle extends Shape implements Printable {
  constructor(color: string, private radius: number) {
    super(color);
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }

  print(): string {
    return this.describe();
  }
}

// Parameter properties (atajo en constructor)
class User {
  constructor(
    public readonly id: number,
    private email: string,
    protected role: string = 'user',
  ) {}

  getEmail(): string {
    return this.email;
  }
}

export { Circle, User, Shape };
export type { Printable };
