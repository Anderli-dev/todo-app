from django.shortcuts import render
from django.template.response import TemplateResponse


def home(request):

    some_variable_name = TemplateResponse(request, 'index.html', {})

    return some_variable_name
