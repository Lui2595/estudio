# Routing — Flask

**P: ¿Cómo defines método HTTP?**  
R: `methods=["GET", "POST"]` en `@app.route` / `@bp.route`, o shortcuts `@app.get` / `@app.post`.

**P: ¿Path converters?**  
R: `<int:id>`, `<string:slug>`, `<path:subpath>`. Tipan y validan el segmento de URL.

**P: ¿Blueprint url_prefix?**  
R: `register_blueprint(api_bp, url_prefix="/api")` → rutas quedan bajo `/api/...`.
