from home.models import Courses

def add_variable_to_context(request):
    get_courses=list(Courses.objects.values())
    courses=set()
    sub_cat=set()
    for course in get_courses:
        courses.add(course['category'])
        sub_cat.add((course['sub_category'],course['category']))
    sorted(courses)
    print(courses)
    return { 'get_courses':courses,'sub_cat':sub_cat}
    