## ImageBliss

ImageBliss is web application for convert any image files to jpeg pdf webp avif format support single and muiltiple files. powered by [nexjs](https://nextjs.org/) [mantine](https://mantine.dev/) and [sharp](https://sharp.pixelplumbing.com/) for image processing

demo page visit : [ImageBliss](https://imagebliss.surge.sh/)

## Getting Started

To run this project in your local machine

```bash
# clone this repository
git clone https://github.com/fransbell/imagebliss.git
cd imagebliss
#install dependencies
npm install
#run in development mode
npm run dev
# or
npm run start
```

## Improvement

Technically it is functional ,Therefore, there might be some thing that can be improving...

- Responsive Desing
- Support image resizing
- Refactor / Reconstruct project structure
- Revisit code `#adjust reconstuct some behavior eg. on upload require first image to load before content is displaying `

## Deployment

Demo page is using free hosting from surge.sh for static front end and deta.sh for image processing backend api.
The demo is using fastify hosting at deta.sh due to software limitation of deta.sh ,It cannot host full nextjs application.

In this repository did not contain image processing api demo that host at deta.sh but comes with built in nextjs api and it should work properly with 
``` 
npm run start 
# or
next start 
```
