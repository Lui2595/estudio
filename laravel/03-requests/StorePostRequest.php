<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * TEMA: Form Requests
 * Separa validación y autorización del controller.
 */
class StorePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', Post::class);
    }

    public function rules(): array
    {
        return [
            'title'   => ['required', 'string', 'max:255'],
            'body'    => ['required', 'string', 'min:10'],
            'status'  => ['required', Rule::in(['draft', 'published'])],
            'tags'    => ['nullable', 'array'],
            'tags.*'  => ['string', 'max:50'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'El título es obligatorio.',
            'body.min'       => 'El contenido debe tener al menos 10 caracteres.',
        ];
    }
}
