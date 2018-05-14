from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseNotFound, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from .models import MyModel, Profile, Post, Blog, Rating
from .utils import check_domain, check_title, check_blog_url, check_rating_validity, update_scores
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
import json
from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.shortcuts import get_object_or_404
#from django.utils import simplejson


from urllib.parse import urlparse
#from IPython import embed



def myModelList(request):
    if request.method == 'GET':
        return JsonResponse(list(MyModel.objects.all().values()), safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])


def signup(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        email = req_data['email']
        password = req_data['password']
        User.objects.create_user(username=username, email=email, password=password)
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['POST'])


def signin(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse(status=200)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['POST'])


def signout(request):
    if request.method == 'GET':
        logout(request)
        return HttpResponse(status=200)
    else:
        return HttpResponseNotAllowed(['GET'])

#def send_rating(request):
#    js_data = Post.objects.all()
#    return render(request, 'blog/post_list.html', {})


# Get or Update current user (only when user is logged in)
def current_user(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            user_and_profile = {
                'username': model_to_dict(request.user)['username'],
                'score': model_to_dict(Profile.objects.get(user=request.user))['score'],
                'domain_list': model_to_dict(Profile.objects.get(user=request.user))['domain_list']
            }
            return JsonResponse(user_and_profile, safe=False)
        else:
            return HttpResponse(status=401)
    elif request.method == 'PUT':
        req_data = json.loads(request.body.decode())
        domain_list = req_data['domain_list']
        if request.user.is_authenticated:
            profile = Profile.objects.get(user=request.user)
            profile.domain_list = domain_list
            profile.save()
            return HttpResponse(status=200)
        else:
            return HttpResponse(status=401)
    else:
<<<<<<< HEAD
        return HttpResponseNotAllowed(['GET'])
=======
        return HttpResponseNotAllowed(['GET', 'PUT'])
>>>>>>> 410bc1d815ce83ebd4f2fef0ef51566ec66d7829


# Get the list of my ratings (only when user is logged in)
def my_ratings(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            return JsonResponse(
                list(Rating.objects.filter(user=request.user).order_by('-time_stamp').values()), safe=False)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET'])


# Get 3 latest posts
def latest_posts(request):
    if request.method == 'GET':
        return JsonResponse(list(Rating.objects.order_by('id').reverse()[:3].values()), safe=False)


# Get top post list
def top_posts(request):
    if request.method == 'GET':
        return JsonResponse(list(Post.objects.order_by('total_score').reverse().values()), safe=False)



# Get top post list consists of posts in selected category
def recommend_posts(request, category_id):
    if request.method == 'GET':
        #return JsonResponse(list(Post.objects.order_by('total_score').values()), safe=False)
        return JsonResponse(list(Post.objects.filter(category = category_id).values()), safe=False)


@csrf_exempt
def create_rating(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        valid, component = check_rating_validity(req_data)
        if not valid:
            return HttpResponse(status=400)  # FIXME passing error
        adfreescore = float(req_data['adfreescore'])
        contentscore = float(req_data['contentscore'])
        comment = req_data['comment']
        url = req_data['url']
        domain = check_domain(url)
        title = check_title(url)
        blog_url = check_blog_url(url)
        blog, created = Blog.objects.get_or_create(domain=domain, title=title, url=blog_url)
        post, created = Post.objects.get_or_create(blog=blog, title="DEFAULT TITLE", url=url, category="DEFAULT CATEGORY")  # FIXME get title and category
        user = User.objects.get(username=request.user.username)
        rating = Rating(user=user, post=post, adfree_score=adfreescore, content_score=contentscore, comment=comment)
        rating.save()
        update_scores(rating)
        return HttpResponse(status=200)
    else:
        return HttpResponseNotAllowed(['POST'])

def get_scores(request, url):
    if request.method == 'GET':
        domain = check_domain(url)
        title = check_title(url)
        blog_url = check_blog_url(url)
        blog = get_object_or_404(Blog, domain=domain, title=title, url=blog_url)
        post = get_object_or_404(Post, blog=blog, url=url)
        ratings = Rating.objects.filter(post=post)
        if len(ratings) == 0:
            return HttpResponse(status=404)
        numrating = len(ratings)
        adfree_score = round(sum(rating.adfree_score for rating in ratings) / numrating, 2)
        content_score = round(sum(rating.content_score for rating in ratings) / numrating, 2)

        scores = {
            'adfreescore': adfree_score,
            'contentscore': content_score,
            'numadfreerating': numrating,
            'numcontentrating': numrating
        }
        return JsonResponse(scores, status=200)
    else:
        return HttpResponseNotAllowed(['GET'])

@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])
