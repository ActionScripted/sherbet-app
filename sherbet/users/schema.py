from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
import graphene

from sherbet.users.models import User


class UserNode(DjangoObjectType):
    is_authenticated = graphene.Boolean()

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
        interfaces = (graphene.Node, )
        model = User

    def resolve_extra_field(self, info):
        return info.context.user.is_authenticated


class Query(graphene.ObjectType):
    user = graphene.Field(UserNode)
    users = DjangoFilterConnectionField(UserNode)

    def resolve_user(cls, info):
        if info.context.user.is_authenticated:
            return User.objects.get(pk=info.context.user.id)
        return User.objects.none()
