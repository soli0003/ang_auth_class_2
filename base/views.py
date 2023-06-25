from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .models import Product,ProductSerializer, Order, OrderSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.decorators import api_view,APIView,permission_classes
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import viewsets
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser



@api_view(['GET'])
def getImages(request):
    res=[] #create an empty list
    for img in Product.objects.all(): #run on every row in the table...
        res.append({"title":img.title,
                "description":img.description,
                "completed":False,
               "image":str( img.image)
                }) #append row by to row to res list
    return Response(res) #return array as json response


# upload image method (with serialize)
class APIViews(APIView):
    parser_class=(MultiPartParser,FormParser)
    def post(self,request,*args,**kwargs):
        api_serializer=ProductSerializer(data=request.data)
       
        if api_serializer.is_valid():
            api_serializer.save()
            return Response(api_serializer.data,status=status.HTTP_201_CREATED)
        else:
            print('error',api_serializer.errors)
            return Response(api_serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def ordrHistory(request):
    permission_classes = [IsAuthenticated]
    user = request.user
    my_model = user.order_set.all()
    serializer = OrderSerializer(my_model, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def showProds(self):
        my_model = Product.objects.all()
        serializer = ProductSerializer(my_model, many=True)
        return Response(serializer.data)

# @api_view(['GET','post'])
# def orders(request):
#     all_orders=OrderSerializer(Order.objects.all(),many=True).data
#     return Response ( all_orders)

@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    email = request.data.get('email')
    
    # Check if the username already exists
    if User.objects.filter(username=username).exists():
        return Response({"message": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Create a new user
    user = User.objects.create_user(username, password, first_name, last_name, email)
    return Response({"message": "Registration successful"})



# Create your views here.
class CartView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        cart_items = request.data
        print(cart_items)
        serializer = OrderSerializer(data=request.data,  context={'user': request.user},many=True)
        if serializer.is_valid():
            cart_items = serializer.save()
        #     # Process the cart items as needed
        #     # ...
            return Response("Cart items received and processed successfully.")
        else:
            return Response(serializer.errors, status=400)
    


class ProductViewSet(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        my_model = Product.objects.all()
        serializer = ProductSerializer(my_model, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
    def put(self, request, pk):
        my_model = Product.objects.get(pk=pk)
        serializer = ProductSerializer(my_model, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
    def delete(self, request, pk):
        my_model = Product.objects.get(pk=pk)
        my_model.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)