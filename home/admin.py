# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Contact,Courses
# Register your models here.
admin.site.register(Contact),
admin.site.register(Courses)

