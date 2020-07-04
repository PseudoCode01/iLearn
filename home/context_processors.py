from home.models import Courses,Cart,TeacherProfile,MyCourses
# from django.contrib.auth.models import User
def add_variable_to_context(request):
    get_course=Courses.objects.filter(verified="True").values().order_by('category')
    get_courses=list(get_course)
    courses=set()
    sub_cat=set()
    for course in get_courses:
        courses.add(course['category'])
        sub_cat.add((course['sub_category'],course['category']))
    Tprofile=''
    if request.user.is_authenticated :
        if request.user.first_name=="Teacher":
            Tprofile=TeacherProfile.objects.filter(ProfileOf_id=request.user)
        cart=Cart.objects.filter(user_id=request.user)
        get_cartItem=list(cart.values('course_id','timeStamp'))
        get_cartCourses=set()
        for item in get_cartItem:
            get_cartCourses.add((get_course.filter(sno=item['course_id']),item['timeStamp']))
        get_myCourses=MyCourses.objects.filter(user_id=request.user).values('course_id')
        myCourses=set()
        for course in get_myCourses:
            myCourses.add(Courses.objects.filter(verified="True").filter(sno=course['course_id']).values())
        print(myCourses)
        return { 'get_courses':courses,'sub_cat':sub_cat,'get_cartCourses':get_cartCourses,'teacherProfile':Tprofile,'myCourses':myCourses}
    else:
        return { 'get_courses':courses,'sub_cat':sub_cat,'get_cartCourses':'','addedon_cartItem':'','myCourses':''}
    