from rest_framework.pagination import PageNumberPagination

class CommentPagination(PageNumberPagination):
    page_size = 4  # Number of comments per page
    page_size_query_param = "page_size"  # Allow clients to set the page size
    max_page_size = 50  # Prevent excessive requests