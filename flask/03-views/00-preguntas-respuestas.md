# Views — Flask

**P: ¿View = controller?**  
R: Sí en la práctica: recibe request, delega, responde. Mantenerla delgada.

**P: ¿Qué retornar en API?**  
R: Tuple `(dict|Response, status)` o `jsonify`. 201 create, 204 delete sin body.

**P: ¿Fat view?**  
R: Mover reglas a service/functions; la view solo orquesta HTTP.
