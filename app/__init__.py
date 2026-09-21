import os
import uuid

from flask import Flask, request, g
from dotenv import load_dotenv
from app.database.db import get_connection
from datetime import datetime, timedelta

load_dotenv()


def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

    @app.before_request
    def track_visitor():
        if request.endpoint == "static":
            return

        visitor_token = request.cookies.get("visitor_token")

        if not visitor_token:
            visitor_token = uuid.uuid4().hex

        g.visitor_token = visitor_token

        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT VISITOR_ID, LAST_VISIT, VISIT_COUNT
            FROM website_visitors
            WHERE VISITOR_TOKEN = %s
            LIMIT 1
            """,
            (visitor_token,)
        )

        visitor = cursor.fetchone()

        if visitor:
            last_visit = visitor["LAST_VISIT"]

            if last_visit is None or datetime.now() - last_visit > timedelta(minutes=30):
                cursor.execute(
                    """
                    UPDATE website_visitors
                    SET LAST_VISIT = CURRENT_TIMESTAMP,
                        VISIT_COUNT = VISIT_COUNT + 1
                    WHERE VISITOR_ID = %s
                    """,
                    (visitor["VISITOR_ID"],)
                )
        else:
            cursor.execute(
                """
                INSERT INTO website_visitors
                (VISITOR_TOKEN, FIRST_VISIT, LAST_VISIT, VISIT_COUNT)
                VALUES (%s, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1)
                """,
                (visitor_token,)
            )

        connection.commit()

        cursor.close()
        connection.close()

    @app.after_request
    def set_visitor_cookie(response):
        visitor_token = getattr(g, "visitor_token", None)

        if visitor_token and not request.cookies.get("visitor_token"):
            response.set_cookie(
                "visitor_token",
                visitor_token,
                max_age=60 * 60 * 24 * 365,
                httponly=True,
                samesite="Lax"
            )

        return response

    from app.routes.home import home_bp
    # from app.routes.auth import auth_bp

    app.register_blueprint(home_bp)
    # app.register_blueprint(auth_bp)

    return app
