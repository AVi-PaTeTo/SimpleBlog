from .models import Post, Comment
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.paginator import Paginator
from rest_framework.pagination import PageNumberPagination

User = get_user_model()


class CommentSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="author.username")
    post_title = serializers.ReadOnlyField(source='post.title')
    post = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all(), write_only=True)
    class Meta:
        model = Comment
        fields = ['post', 'post_title', 'username', 'content',  'created_at']

# class PaginatedCommentSerializer(serializers.Serializer):
#     comments = CommentSerializer(many=True)
#     count = serializers.IntegerField()
#     next = serializers.CharField(allow_null=True)
#     prev = serializers.CharField(allow_null=True)

#     def get_comments(self, obj):
#         queryset = obj.post

class PostSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="author.username")
    comments = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = ['id', "username", 'title', 'content', 'is_public', 'created_at', 'last_modified', 'comments']

    def get_comments(self, obj):
        request = self.context.get("request")  # Get request object
        if not request:
            return []  # Return empty list if request context is missing

        # Get all comments related to the post
        comments = obj.post_comments.all()

        # Paginate manually
        paginator = Paginator(comments, 4)  # Show 5 comments per page
        page = request.query_params.get("comment_page", 1)  # Get page number from request
        paginated_comments = paginator.get_page(page)

        return CommentSerializer(paginated_comments, many=True).data