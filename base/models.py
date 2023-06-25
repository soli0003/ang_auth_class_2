from django.db import models
from django.contrib.auth.models import User
from rest_framework import serializers




# Create your models here.
class Product(models.Model):
    desc = models.CharField(max_length=50,null=True,blank=True)
    price = models.IntegerField()
    image = models.ImageField(upload_to='product_images', null=True, blank=True, default='placeholder.png')
    createdTime=models.DateTimeField(auto_now_add=True)
 
    def __str__(self):
           return f'{self.desc} {self.price} '
    
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
    



# Create your models here.
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    desc = models.CharField(max_length=50,null=True,blank=True)
    price = models.IntegerField()
    quantity = models.IntegerField()
    createdTime=models.DateTimeField(auto_now_add=True)
 
    def __str__(self):
           return f'{self.desc}  '
    
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields =  '__all__'
    def create(self, validated_data):
        # return Order.objects.create(**validated_data)
        user = self.context['user']
        return Order.objects.create(**validated_data,user=user)