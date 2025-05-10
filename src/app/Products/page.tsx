import ProductCard from "@/components/ProductCard";
import { Box } from "@mui/material";

const Products = () => {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(3, 1fr)"
      justifyContent="center"
      justifyItems="center"
      mx={2}
      my={5}
      gap={2}
    >
      {blogs.map((blog) => (
        <Box
          key={blog.title}
          width="100%" // Take full width of grid cell
          maxWidth={300} // Optional: max width of each card
          height={350}
        >
          <ProductCard blog={blog} />
        </Box>
      ))}
    </Box>
  );
};
export default Products;
const blogs = [
  {
    slug: "my-first-blog",
    title: "My First Blog",
    description: "This is a description for my first blog post.",
  },
  {
    slug: "learn-javascript",
    title: "Learn JavaScript",
    description: "A guide to learning JavaScript step by step.",
  },
  {
    slug: "css-tricks",
    title: "CSS Tricks",
    description: "Master CSS with these handy tricks and tips.",
  },
  {
    slug: "nodejs-basics",
    title: "Node.js Basics",
    description: "An introduction to Node.js and backend development.",
  },
  {
    slug: "react-hooks",
    title: "Understanding React Hooks",
    description: "A comprehensive guide to using hooks in React.",
  },
  {
    slug: "mongodb-guide",
    title: "MongoDB Guide",
    description: "Learn how to manage data with MongoDB.",
  },
  {
    slug: "async-await-javascript",
    title: "Async/Await in JavaScript",
    description: "A guide to handling asynchronous operations in JavaScript.",
  },
  {
    slug: "express-routing",
    title: "Express Routing",
    description: "Learn how to set up routes in an Express.js app.",
  },
  {
    slug: "tailwind-vs-bootstrap",
    title: "Tailwind vs Bootstrap",
    description: "Comparing two popular CSS frameworks.",
  },
  {
    slug: "web-performance-optimization",
    title: "Web Performance Optimization",
    description:
      "Best practices for optimizing the performance of your web app.",
  },
];
