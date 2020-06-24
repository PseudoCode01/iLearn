from home.models import Courses

def add_variable_to_context(request):
    get_courses=Courses.objects.all()
    get_courses={ 'get-courses':get_courses}
    return get_courses
    