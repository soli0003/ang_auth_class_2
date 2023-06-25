from django.contrib import admin
from django.urls import path,include
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView



urlpatterns = [

    path('showProds', views.showProds),
    path('ordrHistory', views.ordrHistory),
    path('products',views.ProductViewSet.as_view()),
    path('products/<pk>',views.ProductViewSet.as_view()),
    path('checkout', views.CartView.as_view()),
    path('login', TokenObtainPairView.as_view()),
    path('register', views.register),
    path('get_all_images', views.getImages),
    path('upload_image',views.APIViews.as_view()),


]

