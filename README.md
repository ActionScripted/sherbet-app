# sherbet.app

## Devlopment

```bash
# Run
make development

# Build/Rebuild
make build
```

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
