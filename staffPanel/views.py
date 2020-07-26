from django.shortcuts import render
from django.shortcuts import render,HttpResponse,redirect
from django.http import JsonResponse
import json
from home.models import Courses
from home.models import Videos,Contact,HomeTutor,Notification
# Create your views here.
def staffPanel(request):
    course=Courses.objects.filter(verified="False")
    sno=course.values('sno')
    un_verified_set=list()
    for item in sno:
        un_verified=Videos.objects.filter(videoOfCourse_id=item['sno'])
        
        if(len(un_verified) != 0) :
            un_verified_set.append(list((course.filter(sno=item['sno']).values(),un_verified.values().first())))
    return render(request,'staff/adminPanel.html',{'un_verified':un_verified_set})
def verification(request):
    data=json.loads(request.body)
    courseId=data['courseId']
    action=data['action']
    user=request.user
    course=Courses.objects.get(sno=courseId)
    if action=="verify":
        course.verified="True"
        course.save()
        return JsonResponse('item was verified ',safe=False)
    elif action=="remove":
        message=data['message']
        user=int(data['user'])
        notify=Notification(user=user,message=message)
        notify.save()
        course.delete()
        return JsonResponse('item was deleted ',safe=False)
    elif action=="Selfremove":
        message=data['message']
        course.delete()
        return JsonResponse('item was deleted ',safe=False)

def userQueries(request):
    queries=Contact.objects.filter(answered='False').order_by('timeStamp')
    return render(request,'staff/userQueries.html',{'queries':queries})

def fetch_query(request):
    data=json.loads(request.body)
    uname=(data['uname'])
    queries=Contact.objects.filter(username=uname).order_by('timeStamp').values()
    return JsonResponse({'fetched_queries':list(queries)})

def markasAns(request):
    data=json.loads(request.body)
    id=int(data['id'])
    query=Contact.objects.get(sno=id)
    query.answered='True'
    query.save()
    return JsonResponse('OK',safe=False)
def hometutors(request):
    ht=HomeTutor.objects.filter(verified=False)
    return render(request,'staff/hometutors.html',{'ht':ht})
def verifyhometutors(request):
    data=json.loads(request.body)
    sno=int(data['sno'])
    action=data['action']
    ht=HomeTutor.objects.get(user_id=sno)
    if action == 'verify':
        ht.verified=True
        ht.save()
        return JsonResponse('verified',safe=False)
    if action == 'reject':
        ht.delete()
        return JsonResponse('removed',safe=False)
