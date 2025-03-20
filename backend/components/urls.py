from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import PostAPIView, CommentAPIView, PrivatePostDetailView


router = DefaultRouter()
router.register(r'posts', PostAPIView, basename='Posts')
router.register(r'comments', CommentAPIView, basename='Comments')

urlpatterns = [
    path('', include(router.urls)),
    path("posts/private_posts/<int:pk>/", PrivatePostDetailView.as_view(), name="private-post-detail"),  # Include all API routes from the router
]