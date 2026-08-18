# Preguntas y Respuestas — Composer

> Review rápido sin código.

---

**P: ¿Qué es PSR-4?**
R: Estándar de autoloading que mapea namespaces a directorios. `App\User` → `src/User.php`. Composer genera el autoloader en `vendor/autoload.php`.

---

**P: ¿Qué hace `composer install` vs `composer update`?**
R: `install` instala versiones exactas del `composer.lock`. `update` actualiza dependencias según restricciones del `composer.json` y regenera el lock.

---

**P: ¿Debes commitear `composer.lock`?**
R: Sí, siempre en aplicaciones. Garantiza que todos los entornos usen las mismas versiones. En librerías publicadas, no se commitea.

---

**P: ¿Diferencia entre `require` y `require-dev`?**
R: `require`: dependencias de producción. `require-dev`: solo desarrollo (PHPUnit, PHPStan, Pest). No se instalan con `--no-dev` en producción.

---

**P: ¿Qué hace un Service Provider en Laravel?**
R: Punto de registro de servicios en el container. `register()`: bindings. `boot()`: lógica después de que todos los providers estén cargados.

---

**P: ¿Qué significa `^8.2` en versiones Composer?**
R: Compatible con 8.2.x pero menor a 9.0.0 (semver). `~1.5` es más restrictivo: >=1.5.0 <1.6.0.
