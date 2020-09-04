# sherbet.app

Features:

* Assets
  * Home and personal
    * Home assets are things like a furnace or a water heater
    * Personal assetss are things like a table saw or video game
  * Lend/borrow status with optional contact linking
* Contacts
* Services
  * Contact-linked list of services and service providers with notes/info.
* Sell Your House
  * Collect asset and service information in a packet for new buyers.
* Insurance Information
  * Collect assets and other information for your insurance providers.

Integrations:

* Calendar and Reminders
* Recipes


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
* sherbet.test:**8001** - Webpack Development Server
* sherbet.test:**8025** - Mailhog UI
* sherbet.test:**8055** - Celery Flower (see `compose/locale.env`)

## Dependencies

### Adding or Updating Django/Python Dependenies

It's never a perfect process and you're going to get your hands a little dirty. To help make things easier, we have an upgrade command that'll run your stack as root with your entire local file system mounted. You can then make changes as root to all files and save these changes as needed.

When you exit the container(s), the upgrade will run a non-upgrade build so your images will revert to their safe and optimized versions. Make sure you save anything before exiting!

```bash
# Run Django services in upgrade mode
make upgrade

# (Docker) Interactively upgrade packages
pipupgrade

# (Docker) Save changes to shared volume
pip freeze > sherbet/freeze.txt
exit

# Copy changes, delete freeze, add/edit requirements
pbcopy < requirements/freeze.txt && rm requirements/freeze.txt
$EDITOR requirements/base.txt # Paste, move, etc.
```

## Future

* Use `pipenv` or something comparable.

## License

Copyright © 2020, [Michael Thompson](https://github.com/actionscripted).
