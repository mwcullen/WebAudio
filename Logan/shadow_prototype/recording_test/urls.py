"""Django App Specific URL Conf File."""

# Third-Party Libraries
from django.conf.urls import url
# Custom Libraries
from . import views

app_name = "recording_test"

urlpatterns = [
    # ex: /polls/5/vote/
    # url(r"^(?P<question_id>[0-9]+)/vote/$", views.vote, name="vote"),
    url(r"^$", views.index),
]
