# sherbet.app

**The lightweight, family-friendly ERP**. For details, check out [SCOPE.md](docs/SCOPE.md)

## Development

Setup an `/etc/hosts` rule for:

```bash
127.0.0.1 sherbet.test
```

Setup project and start development (Docker):

```bash
# Setup
make

# Run all migrations
make migrate

# Run Django in development (CTRL + C to quit)
make start
```

Available development paths/ports:

* sherbet.test:**8000** - Django
* sherbet.test:**8000/graphql** - GraphQL IDE
* sherbet.test:**8001** - Webpack Development Server
* sherbet.test:**8025** - Mailhog UI
* sherbet.test:**8055** - Celery Flower 

Some paths/ports may require secrets from `compose/locale.env`

## Dependencies

### Adding or Updating Dependenies

It's never a perfect process and you're going to get your hands a little dirty. To help make things easier, we have an upgrade command that'll run your stack as root with your entire local file system mounted. You can then make changes as root to all files and save these changes as needed.

When you exit the container(s), the upgrade will run a non-upgrade build so your images will revert to their safe and optimized versions. Make sure you save anything before exiting!

**Django (Python, PIP)**:

```bash
# Run Django services in upgrade mode
make upgrade-django

# (Docker) Interactively upgrade packages
pipupgrade

# (Docker) Save changes to shared volume; exit
pip freeze > sherbet/freeze.txt
exit

# Copy changes, delete freeze, add/edit requirements
pbcopy < requirements/freeze.txt && rm requirements/freeze.txt
$EDITOR requirements/base.txt # Paste, move, etc.
```

**Frontend (Webpack, NPM)**

```bash
# Run frontend services in upgrade mode
make upgrade-frontend

# (Docker) Interactively upgrade packages
node_modules/.bin/ncu

# (Docker) Save changes to shared volume; exit
cp package*.json frontend/
exit

# Move changes to replace existing
mv frontend/package*.json ./
```

## Future

* Use `pipenv` or something comparable.

## "I Hate This, It's Now How I'd Do It"

I get it, 100%. If this is at least close, I'd strongly suggest copying and removing, versus trying to rebuild from zero. It's not hard, it's just a lot of time to burn.

If you wanna tell me about why it sucks or even contribute that'd be awesome but again I get it if not.

## License

Copyright © 2020, [Michael Thompson](https://github.com/actionscripted).
