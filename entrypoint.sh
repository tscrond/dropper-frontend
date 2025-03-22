#!/bin/sh
# entrypoint.sh

# Generate the runtime config file (if needed)
echo "window.CONFIG = { BACKEND_ENDPOINT: '$BACKEND_ENDPOINT' };" > /dropper/dist/config.js

# Start the server using 'serve'
serve -s /dropper/dist -l 8000
