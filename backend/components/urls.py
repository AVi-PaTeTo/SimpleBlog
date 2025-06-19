from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import PostAPIView, CommentAPIView #UserPostDetailView


router = DefaultRouter()
router.register(r'posts', PostAPIView, basename='Posts')
router.register(r'comments', CommentAPIView, basename='Comments')

urlpatterns = [
    path('', include(router.urls)),
    # path("posts/user_posts/<int:pk>/", UserPostDetailView.as_view(), name="private-post-detail"),  # Include all API routes from the router
]