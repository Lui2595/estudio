<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * TEMA: Eloquent Relationships
 * HasOne, HasMany, BelongsTo, BelongsToMany, Morph
 */
class User extends Model
{
    protected $fillable = ['name', 'email', 'password'];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_active'         => 'boolean',
        'settings'          => 'array',
    ];

    protected $hidden = ['password'];

    // HasOne: un usuario tiene un perfil
    public function profile(): HasOne
    {
        return $this->hasOne(Profile::class);
    }

    // HasMany: un usuario tiene muchos posts
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }

    // BelongsToMany: muchos roles
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class)->withTimestamps();
    }

    // MorphMany: comentarios polimórficos
    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    // ─── Scopes ───────────────────────────────────────────────
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByRole($query, string $role)
    {
        return $query->whereHas('roles', fn ($q) => $q->where('name', $role));
    }

    // ─── Accessors (get{Name}Attribute) ─────────────────────
    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }

    // ─── Mutators (set{Name}Attribute) ──────────────────────
    public function setEmailAttribute(string $value): void
    {
        $this->attributes['email'] = strtolower($value);
    }
}
