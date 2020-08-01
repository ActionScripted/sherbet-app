# sherbet.app

## Dependencies

### Upgrading Dependenies

It's never a perfect process and you're going to get your hands a little dirty. Some dependencies might require additional system changes to `Dockerfile` files.

```bash
# Django: start shell, upgrade packages
docker-compose -f docker-compose.yml -f docker-compose.upgrade.yml run django bash

# Parcel: start shell, upgrade packages
docker-compose -f docker-compose.yml -f docker-compose.upgrade.yml run parcel bash

```

## Future

* Use `pipenv` or something comparable.

## License
Copyright © 2020, [Michael Thompson](https://github.com/actionscripted).
