from graphene import Node
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from sherbet.users.models import User


class UserNode(DjangoObjectType):
    class Meta:
        fields = (
            'date_joined',
            'email',
            'first_name',
            'is_active',
            'last_name',
            'username',
        )
        filter_fields = (
            'is_active',
            'username',
        )
        interfaces = (Node, )
        model = User


class Query(object):
    all_users = DjangoFilterConnectionField(UserNode)
    user = Node.Field(UserNode)
