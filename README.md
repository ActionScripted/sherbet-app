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

```bash
# Setup
make

# Run development (CTRL + C to quit)
make start
```

Available development paths/ports:

* _<sherbet-host>_:**8000** - Django
* _<sherbet-host>_:**8001** - Webpack Development Server
* _<sherbet-host>_:**8025** - Mailhog UI

## Dependencies

### Adding or Updating Dependenies

It's never a perfect process and you're going to get your hands a little dirty. To help make things easier, we have an upgrade command that'll run your stack as root with your entire local file system mounted. You can then make changes as root to all files and save these changes as needed.

When you exit the container(s), the upgrade will run a non-upgrade build so your images will revert to their safe and optimized versions. Make sure you save anything before exiting!

```bash
# Django: up
make upgrade

# Parcel: start shell, upgrade packages
# TODO: "make upgrade" but for Parcel
```

## Future

* Use `pipenv` or something comparable.

## License

Copyright © 2020, [Michael Thompson](https://github.com/actionscripted).
