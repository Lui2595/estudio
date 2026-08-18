{{-- TEMA: SEO en Laravel Blade --}}
{{-- ENTREVISTA: ¿Cómo implementar SEO dinámico en Laravel? --}}

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    {{-- SEO dinámico por página --}}
    <title>{{ $seoTitle ?? config('app.name') }} | {{ config('app.name') }}</title>
    <meta name="description" content="{{ $seoDescription ?? 'Descripción por defecto' }}">
    <link rel="canonical" href="{{ $canonical ?? url()->current() }}">

    @if($noindex ?? false)
        <meta name="robots" content="noindex, nofollow">
    @endif

    {{-- Open Graph --}}
    <meta property="og:title" content="{{ $seoTitle ?? config('app.name') }}">
    <meta property="og:description" content="{{ $seoDescription ?? '' }}">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:image" content="{{ $ogImage ?? asset('images/og-default.jpg') }}">

    {{-- JSON-LD --}}
    @if(isset($schema))
        <script type="application/ld+json">{!! json_encode($schema, JSON_UNESCAPED_UNICODE) !!}</script>
    @endif

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    @yield('content')
</body>
</html>

{{--
Paquetes útiles Laravel:
- artesaos/seotools
- ralphjsmit/laravel-seo
- spatie/laravel-sitemap

En Controller:
return view('blog.show', [
    'post' => $post,
    'seoTitle' => $post->title,
    'seoDescription' => Str::limit(strip_tags($post->excerpt), 160),
    'canonical' => route('blog.show', $post->slug),
    'schema' => [
        '@context' => 'https://schema.org',
        '@type' => 'Article',
        'headline' => $post->title,
        ...
    ],
]);
--}}
