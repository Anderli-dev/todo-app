from django.shortcuts import render
from django.template.response import TemplateResponse


def home(request, *args, **kwargs):
    return render(request, 'index.html')
