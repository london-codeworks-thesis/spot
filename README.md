<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- [![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/london-codeworks-thesis/spot">
    <img src="public/Logo.svg" alt="Logo" height="80">
  </a>

<h3 align="center">Spot</h3>

  <p align="center">
    Find and rate the tastiest spots in town.<br \> Discover hidden gems, and share with your friends!
    <br />
    <br />
    <a href="https://github.com/london-codeworks-thesis/spot"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/london-codeworks-thesis/spot/issues/new?labels=bug&template=bug_report.md">Report Bug</a>
    ·
    <a href="https://github.com/london-codeworks-thesis/spot/issues/new?labels=enhancement&template=feature_request.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#designed-with">Designed With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![Spot Screen Shot][product-screenshot]

Spot is a social media application which allows users to discover and share their favourite restaurants with their friends. Spot shows a map of the restaurants recommended by your friends and allows you to share your own recommendations in the form of reviews.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

[![TypeScript][TypeScript]][TypeScript-url] [![Next.js][Next.js]][Next-url] [![React][React.js]][React-url] [![Mapbox][Mapbox]][Mapbox-url] [![PostgreSQL][PostgreSQL]][PostgreSQL-url] [![Git][Git]][Git-url] [![GitHub][GitHub]][GitHub-url] [![Shadcn][Shadcn]][Shadcn-url] [![CircleCi][CircleCi]][CircleCi-url] [![ESLint][ESLint]][ESLint-url] [![Prettier][Prettier]][Prettier-url]

### Designed With

**Figma:** Feel free to view the figma files for this project [here](https://www.figma.com/design/m8pTG5nYDp0V9nJmY8AjkU/Spot-Wireframe?node-id=1-71&t=TTQYTVPIq7a0L4eM-10)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

- npm - ([Link](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm))

  ```sh
  npm install npm@latest -g
  ```

- Obtain API Keys for

  - [Google Places API](https://developers.google.com/maps/documentation/places/web-service/cloud-setup)
  - [Mapbox](https://www.mapbox.com/)
  - Any of the OAuth Services you wish to test:
    - [Google](https://developers.google.com/identity/protocols/oauth2)
    - [Facebook](https://developers.facebook.com/apps/)
    - [Apple](https://developer.apple.com/sign-in-with-apple/get-started/)

- Create a [postgres database](https://www.postgresql.org/docs/current/sql-createdatabase.html)

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/london-codeworks-thesis/spot.git
   ```

2. Create your own .env file and insert API Keys, and database connection URI:

   ```sh
   cp .env.local.template .env.local
   ```

3. Install NPM packages

   ```sh
   npm install
   ```

4. Create database tables

   ```sh
   npm run migrate:dev
   ```

5. Seed database

   ```sh
   npm run db:seed
   ```

6. Start the app

   ```sh
   npm run dev
   ```

7. Access the app at
   `http://localhost:3000`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
<!-- ## Usage -->
<!-- Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources. -->
<!-- _For more examples, please refer to the [Documentation](https://example.com)_ -->
<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- ROADMAP -->
<!-- ## Roadmap -->
<!-- - [ ] Feature 1 -->
<!-- - [ ] Feature 2 -->
<!-- - [ ] Feature 3 -->
  <!-- - [ ] Nested Feature -->
<!-- See the [open issues](https://github.com/london-codeworks-thesis/spot/issues) for a full list of proposed features (and known issues). -->
<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Toby Dixon Smith - tobydixonsmith@gmail.com
Jason Wong - jasonwong_3@hotmail.com
Sam Polge - sampolge1@gmail.com
Sunny Anter - sunny@veskim.com

Project Link: [https://github.com/london-codeworks-thesis/spot](https://github.com/london-codeworks-thesis/spot)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Github Readme Template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/london-codeworks-thesis/spot.svg?style=for-the-badge
[contributors-url]: https://github.com/london-codeworks-thesis/spot/graphs/contributors
[issues-shield]: https://img.shields.io/github/issues/london-codeworks-thesis/spot.svg?style=for-the-badge
[issues-url]: https://github.com/london-codeworks-thesis/spot/issues
[license-shield]: https://img.shields.io/github/license/london-codeworks-thesis/spot.svg?style=for-the-badge
[license-url]: https://github.com/london-codeworks-thesis/spot/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
[linkedin-url]: https://linkedin.com/in/toby-dixon-smith/
[product-screenshot]: public/Spot_Images_1.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[ESLint]: https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white
[ESLint-url]: https://eslint.org/
[Prettier]: https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E
[Prettier-url]: https://prettier.io/
[Mapbox-url]: https://mui.com/
[Mapbox]: https://img.shields.io/badge/mapbox-black?style=for-the-badge&logo=Mapbox&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[TypeScript]: https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=for-the-badge
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[PostgreSQL-url]: https://www.postgresql.org/
[PostgreSQL]: https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white
[Git-url]: https://git-scm.com/
[Git]: https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white
[GitHub-url]: https://github.com/
[GitHub]: https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white
[Shadcn-url]: https://ui.shadcn.com/
[Shadcn]: https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff&style=for-the-badge
[CircleCi-url]: https://ui.shadcn.com/
[CircleCi]: https://img.shields.io/badge/circleci-343434?logo=circleci&logoColor=fff&style=for-the-badge
