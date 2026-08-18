"""
TEMA: before_request + errorhandler JSON
"""

from flask import Flask, jsonify


def register_hooks(app: Flask) -> None:
    @app.before_request
    def log_request():
        # request.path / method — logging real aquí
        pass

    @app.errorhandler(404)
    def not_found(_e):
        return jsonify({"error": "not_found"}), 404

    @app.errorhandler(500)
    def server_error(_e):
        return jsonify({"error": "server_error"}), 500
