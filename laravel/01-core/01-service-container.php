<?php

/**
 * TEMA: Service Container
 * ENTREVISTA: ¿Qué ocurre cuando haces app(UserRepository::class)?
 *
 * El Service Container (contenedor de dependencias) de Laravel es responsable de
 * la resolución e inyección automática de clases, lo que permite desacoplar y
 * gestionar las dependencias de tu aplicación de forma flexible.
 *
 * Ejemplo típico:
 *    $repo = app(UserRepositoryInterface::class);
 *
 * ¿Qué sucede internamente paso a paso?
 *
 * 1. **Búsqueda de binding:**  
 *    El contenedor verifica si UserRepositoryInterface::class está asociado
 *    (binding) a una implementación concreta (por ejemplo, EloquentUserRepository) en su
 *    registro de bindings.
 *    - Si existe un binding, usará esa clase/fábrica como la implementación real.
 *    - Si es un singleton, verifica si ya existe la instancia. Si no, la crea y la guarda para la próxima vez.
 *    - Ejemplo de registro:
 *        $this->app->bind(UserRepositoryInterface::class, EloquentUserRepository::class);
 *        $this->app->singleton(CacheManager::class);
 *
 * 2. **Resolución de clases:**  
 *    Si no encuentra un binding explícito, intenta crear una instancia usando Reflection.
 *    - Analiza el constructor de la clase objetivo.
 *
 * 3. **Resolución recursiva de dependencias:**  
 *    Para cada parámetro del constructor, repite el proceso:
 *    - Si hay un binding para ese parámetro/tipo, lo resuelve.
 *    - Si no, lo intenta auto-resolver también por Reflection.
 *    - Esto puede avanzar en cascada recursivamente (resuelve dependencias de las dependencias, etc.).
 *
 * 4. **Instanciación:**  
 *    Una vez resueltos todos los parámetros del constructor, instancia la clase usando esos objetos.
 *    - new EloquentUserRepository($resolvedDeps);
 *    - El tipo de instancia (singleton o nueva cada vez) depende de cómo se haya registrado el binding.
 *
 * 5. **Retorno de la instancia:**  
 *    Te entrega la instancia completamente armada con todas sus dependencias resueltas. Si es singleton, siempre devuelve la misma.
 *
 * **Puntos clave extra:**
 * - `app()`, `resolve()` y `$this->app->make()` son atajos equivalentes; llaman al método `Container::make()`.
 * - Puedes pasar parámetros manualmente en la resolución:
 *       app()->make(UserService::class, ['userId' => 1]);
 *   Esto resuelve las dependencias automáticamente y usa tu parámetro donde corresponda.
 * - El proceso de Reflection permite que, incluso sin registrarlo previamente, el container intente construir cualquier clase con constructor tipado.
 *
 * **Resumen visual interno (flujo):**
 *    1. Container::make(UserRepositoryInterface::class)
 *    2. ¿Binding en $bindings? → Sí: usa la implementación. No: intenta auto-resolver.
 *    3. Usa ReflectionClass para analizar el constructor.
 *    4. Para cada parámetro, repite el proceso (resolución recursiva).
 *    5. Construye la clase con sus dependencias.
 *    6. Devuelve la instancia.
 */
