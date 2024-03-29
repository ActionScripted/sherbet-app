"""
WSGI config for sherbet project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/howto/deployment/wsgi/
"""

import os
import sys
from pathlib import Path

from django.core.wsgi import get_wsgi_application

# Add project folder ('./sherbet') to path
path_root = Path(__file__).parent.resolve(strict=True).parent.parent
sys.path.append(str(path_root / 'sherbet'))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.production')

application = get_wsgi_application()
