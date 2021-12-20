# My Virtual Museum
Website for displaying virtual museum in AR.

![Website](https://img.shields.io/website?url=https%3A%2F%2Fwww.myvirtualmuseum.org)
[![Deployment](https://github.com/benknight135/my-virtual-museum/actions/workflows/deploy.yml/badge.svg)](https://github.com/benknight135/my-virtual-museum/actions/workflows/deploy.yml)

Use the QR code below to both launch the website url and as the marker for the AR models.

<img src="data/images/qr-whale.png" alt="drawing" width="250"/>

## Marker Generation
The inner marker holds the custom pattern used by the AR system. This is generated using this [online tool](https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html). The custom logo used is provided in this repository [here](images/marker_whale.png).  
The outer marker is a QR code that contains the website url and so can be used to launch the website. This is generated from this [online tool](qrcode-monkey.com). The inner marker should be uploaded as a logo to be placed in the center of the QR code.

## Development
See [development strategy](.github/DEVELOPMENT_STRATEGY.md) for more details on the development process for this repository. 

## Deployment
See [release strategy](.github/RELEASE_STRATEGY.md) for details on how releases / deployments are handelling in this repository.

Deployed website is available [here](https://www.myvirtualmuseum.org)
