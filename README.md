# Hyper Teknoloji Case Project
> Vanilla HMTL/CSS/JS project with Vite and Tailwind.
> You can find the Live Demo [here.](https://case-hyper-technology.vercel.app/).

## Table of Contents
- [Hyper Teknoloji Case Project](#hyper-teknoloji-case-project)
  - [Table of Contents](#table-of-contents)
  - [General Information](#general-information)
  - [Technologies Used](#technologies-used)
  - [API routes](#api-routes)
  - [Features](#features)
  - [Setup](#setup)

## General Information
The products page provides a seamless shopping experience with the following key functionalities:
- Users can browse available products, add items to their cart, review cart contents, and navigate to detailed product pages by selecting individual product cards.
- A category-based filtering system allows users to refine their product search by selecting a category from the available options on the products page.
- Both product and category data are dynamically retrieved from the API, ensuring real-time updates and accurate information.


## Technologies Used
- HTML, JS, TAILWIND, VITE

## API routes
- Products: POST: /products/list?productCategoryID=
- Categories: GET: /categories

## Features
- Dynamic Product Listings – Products are fetched from the API and displayed in real-time. 
- Interactive Product Cards – Clickable product cards provide quick access to detailed product pages.
-  Cart Management – Users can add products to their cart and view cart contents seamlessly.
-  Category-Based Filtering – Users can filter products based on categories for a more refined shopping experience.

## Setup
To run this project locally, follow these steps:
1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```bash
    cd <project-folder>
    ```
3. Install the required dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```
Once the development server is running, you can begin working on the project locally.

