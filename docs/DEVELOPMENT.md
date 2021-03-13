# Development

Ramblings from monkeys.


# Cookies, Sessions, JWTs

**We use standard cookies and sessions for authentication and authorization**. This is a Django built-in and super reliable. If the user is logged in, all the GraphQL stuff will work without issue.

There are a lot of good reasons not to use things like JWTs in lieu of cookies/sessions and if you turn off JavaScript and visit larger sites like Facebook, Twitter or Netflix you'll still be able to register, log in, log out, etc.

If you need to access user-related information in GraphQL:

```python
class Query(ObjectType):
    thing = graphene.List(Thing)

    def resolve_thing(self, info):
        if info.context.user.is_staff():
            # staff: true
        else:
            # staff: false
```
