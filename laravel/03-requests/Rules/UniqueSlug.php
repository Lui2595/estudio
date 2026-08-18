<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Str;

/**
 * TEMA: Custom Validation Rules (Laravel 10+)
 * Implementa ValidationRule para reglas reutilizables.
 */
class UniqueSlug implements ValidationRule
{
    public function __construct(
        private string $table,
        private ?int $ignoreId = null,
    ) {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $slug = Str::slug($value);

        $exists = \DB::table($this->table)
            ->where('slug', $slug)
            ->when($this->ignoreId, fn ($q) => $q->where('id', '!=', $this->ignoreId))
            ->exists();

        if ($exists) {
            $fail("El slug '{$slug}' ya está en uso.");
        }
    }
}

// Uso en FormRequest:
// 'title' => ['required', new UniqueSlug('posts', $this->post?->id)],
