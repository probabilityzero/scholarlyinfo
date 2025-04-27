export const siteConfig = {
  name: "Scholarly",
  description: "Access millions of research papers and articles. Find, read, and stay updated with the latest scientific literature.",
  url: "https://scholarly.world", // Replace with your actual domain
  ogImage: "https://raw.githubusercontent.com/probabilityzero/cloudstorage/main/brave_5Lt9u1IwyV.png", // Default Open Graph image
  authors: [
    {
      name: "Your Name",
      url: "https://tarique.me",
    },
  ],
  links: {
    github: "https://github.com/yourusername/scholarly",
    twitter: "https://twitter.com/scholarly.world",
  },
  // Social sharing images for different page types
  images: {
    defaultOG: "https://raw.githubusercontent.com/probabilityzero/cloudstorage/main/brave_5Lt9u1IwyV.png", // 1200×630 px for optimal display on high-resolution devices
    paperOG: "/images/paper-og-image.jpg", // Paper-specific sharing image
    searchOG: "/images/search-og-image.jpg", // Search-specific sharing image
    subjectOG: "/images/subject-og-image.jpg", // Subject browser sharing image
    aboutOG: "https://www.vacationstravel.com/wp-content/uploads/2021/06/VT-Feature-1.jpg", // About page sharing image
    supportOG: "/images/support-og-image.jpg", // Support page sharing image
    communityOG: "/images/community-og-image.jpg", // Community page sharing image
    exploreOG: "/images/explore-og-image.jpg", // Explore page sharing image
    logo: {
      small: "/images/logo-small.png", // 48×48 px
      medium: "/images/logo-medium.png", // 96×96 px
      large: "/images/logo-large.png", // 192×192 px
    },
    favicon: {
      ico: "/favicon.ico", // 32×32 px
      svg: "/favicon.svg", // Vector-based favicon
      apple: "/apple-touch-icon.png", // 180×180 px
    }
  },
}