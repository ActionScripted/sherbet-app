"""
ASGI config for sherbet project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/howto/deployment/asgi/
"""

import os
import sys
from pathlib import Path

from django.core.asgi import get_asgi_application

# Add project folder ('./sherbet') to path
path_root = Path(__file__).parent.resolve(strict=True).parent.parent
sys.path.append(str(path_root / 'sherbet'))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.production')

application = get_asgi_application()
