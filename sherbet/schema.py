from graphene_django.debug import DjangoDebug
import graphene

import sherbet.users.schema


class Query(
    sherbet.users.schema.Query,
    graphene.ObjectType,
):
    debug = graphene.Field(DjangoDebug, name="_debug")


schema = graphene.Schema(
    query=Query,
)
