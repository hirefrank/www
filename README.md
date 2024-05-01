# Project Title

## Overview
This project is a Dockerized application that uses the Ghost blogging platform with additional configurations for storage and mail services.

## Features
- Configured to use Cloudinary for storage with specific settings for file naming and quality.
- Mail service is set up to use SMTP with Mailgun as the service provider.

## Configuration
The Dockerfile includes commands to set up the Ghost storage to use Cloudinary and configure the mail transport method.

Dockerfile
startLine: 13
endLine: 21

## Deployment
To deploy this application, build the Docker image and run it with the necessary environment variables.

## Entry Point
The entrypoint for the Docker container is defined in `entrypoint.sh`, which is copied to the image and made executable.

Dockerfile
startLine: 24
endLine: 25


## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments
- Ghost for the blogging platform.
- Cloudinary for the storage solution.
- Mailgun for the email service.