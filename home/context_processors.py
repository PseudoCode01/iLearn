from home.models import Courses,Cart

def add_variable_to_context(request):
    get_courses=list(Courses.objects.values().order_by('category'))
    courses=set()
    sub_cat=set()
    for course in get_courses:
        courses.add(course['category'])
        sub_cat.add((course['sub_category'],course['category']))
    get_cartItem=list(Cart.objects.filter(user_id=request.user).values('course_id'))
    get_cartCourses=""
    if len(get_cartItem)>0:
        get_cartItemCousreId=get_cartItem[0]['course_id']
        get_cartCourses=Courses.objects.filter(sno=get_cartItemCousreId).order_by('timeStamp')
    print(get_cartCourses)
    return { 'get_courses':courses,'sub_cat':sub_cat,'get_cartCourses':get_cartCourses,'get_cartItem':get_cartItem }
    