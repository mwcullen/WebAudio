# -*- coding: utf-8 -*-

# Python Libraries
from __future__ import unicode_literals
# Third-Party Libraries
from django.shortcuts import render
# Custom Libraries
# N/A


# Create your views here.
def index(request):
    context = {
        # lol do nuffin'
    }
    return render(request,
                  "recording_test/index.html",
                  context)
