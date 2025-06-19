from django.shortcuts import render
from rest_framework import viewsets, permissions, generics, exceptions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Count
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from .models import Post,Comment
from .serializers import PostSerializer,CommentSerializer

from .pagination import CommentPagination


class PostAPIView(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title']
    ordering_fields = ['created_at', 'comment_count']

    def get_queryset(self):
        return Post.objects.select_related("author").prefetch_related("post_comments__author").filter(is_public=True).annotate(comment_count=Count('post_comments'))
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        
    def get_object(self):
        try:
            post = Post.objects.annotate(comment_count=Count('post_comments')).get(pk=self.kwargs['pk'])
        except Post.DoesNotExist:
            raise exceptions.NotFound("Post not found")

        if post.is_public:
            return post
        if self.request.user.is_authenticated and post.author == self.request.user:
            return post
        raise exceptions.NotFound("Post not found")

    def update(self, request, *args, **kwargs):
        post = self.get_object()
        if post.author != request.user:
            raise exceptions.PermissionDenied("You do not have permission to update this post.")
        return super().update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        post = self.get_object()
        if post.author != request.user:
            raise exceptions.PermissionDenied("You do not have permission to update this post.")
        return super().partial_update(request, *args, **kwargs)
    
    @action(detail=False, methods=["get"])
    def user_posts(self, request):
        """List all private posts of the authenticated user."""
        user = request.user
        queryset = Post.objects.select_related("author").prefetch_related("post_comments__author").filter(author=user).annotate(comment_count=Count('post_comments'))
        queryset = self.filter_queryset(queryset)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# class UserPostDetailView(generics.RetrieveUpdateDestroyAPIView):
#     """Retrieve, update, or delete a private post owned by the authenticated user."""
#     serializer_class = PostSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return Post.objects.select_related("author").prefetch_related("post_comments__author").filter(author=self.request.author).annotate(comment_count=Count('post_comments'))
    
class CommentAPIView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    # pagination_class = [CommentPagination]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)