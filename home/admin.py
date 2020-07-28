# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Contact,Courses,Videos,TeacherProfile,MyCourses,WatchedVideos,HomeTutor,HomeTutorDemo,ReviewCourse,Notification,TestVideo
# Register your models here.
admin.site.register(Contact),
admin.site.register(Courses),
admin.site.register(Videos),
admin.site.register(TeacherProfile),
admin.site.register(MyCourses),
admin.site.register(WatchedVideos),
admin.site.register(HomeTutor),
admin.site.register(HomeTutorDemo),
admin.site.register(ReviewCourse),
admin.site.register(Notification),
admin.site.register(TestVideo),

