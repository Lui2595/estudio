# Templates — patrón (estudio)

<!-- base.html -->
<!--
<!DOCTYPE html>
<html>
<body>
  {% block content %}{% endblock %}
</body>
</html>
-->

<!-- projects/list.html -->
<!--
{% extends "base.html" %}
{% block content %}
  <h1>Projects</h1>
  {% for p in projects %}
    <p>{{ p.title }}</p>
  {% empty %}
    <p>No projects</p>
  {% endfor %}
{% endblock %}
-->

Nota: esto ilustra el patrón MVT+ (Model-View-Template ampliado), donde pueden sumarse capas como servicios, context processors, etc. En retos tipo EPAM con React, lo central es la API JSON; este ejemplo es sólo para comprender plenamente la arquitectura MVT tradicional y sus posibles extensiones (MVT+).
