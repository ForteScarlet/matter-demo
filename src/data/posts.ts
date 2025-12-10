import type { BlogPost } from '../types/blog';

export const posts: BlogPost[] = [
  {
    id: '1',
    title: 'Welcome to My Minimalist Blog',
    content: `# Welcome to My Minimalist Blog

This is a **modern**, **elegant** blog system built with Vue 3 and TypeScript.

## Features

- 📝 Markdown support
- 🏷️ Tag system
- 📂 Category organization
- 🔍 Search functionality
- 🎨 Multiple themes (Day, Night, Punk Girl)

### Getting Started

Writing in markdown is easy and powerful. You can:

1. Create lists
2. Add code blocks
3. Include links and images

\`\`\`javascript
const hello = () => {
  console.log('Hello, World!');
};
\`\`\`

Enjoy exploring the blog!`,
    excerpt: 'Welcome to a modern, elegant blog system with markdown support and multiple themes.',
    author: 'Admin',
    date: '2024-01-15',
    tags: ['welcome', 'introduction', 'markdown'],
    category: 'General',
    featured: true,
    coverImage: ''
  },
  {
    id: '2',
    title: 'The Art of Minimalist Design',
    content: `# The Art of Minimalist Design

Minimalism is not about having less. It's about making room for more of what matters.

## Key Principles

- **Simplicity**: Remove the unnecessary
- **Focus**: Highlight what's important
- **Balance**: Create harmony through space
- **Typography**: Let the content breathe

> "Simplicity is the ultimate sophistication." - Leonardo da Vinci

Minimalist design creates a calm, focused experience that allows content to shine.`,
    excerpt: 'Exploring the principles and philosophy behind minimalist design.',
    author: 'Admin',
    date: '2024-01-20',
    tags: ['design', 'minimalism', 'ui'],
    category: 'Design',
    featured: true
  },
  {
    id: '3',
    title: 'Modern Web Development Practices',
    content: `# Modern Web Development Practices

The web development landscape is constantly evolving. Here are some modern practices to follow.

## Best Practices

### 1. Component-Based Architecture
Breaking down UI into reusable components makes code more maintainable.

### 2. Type Safety
Using TypeScript helps catch errors early and improves developer experience.

### 3. Performance Optimization
- Lazy loading
- Code splitting
- Tree shaking

### 4. Accessibility
Always keep accessibility in mind when building web applications.

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}
\`\`\`

Stay curious and keep learning!`,
    excerpt: 'A guide to modern web development practices and principles.',
    author: 'Admin',
    date: '2024-01-25',
    tags: ['web-dev', 'typescript', 'best-practices'],
    category: 'Development',
    featured: false
  },
  {
    id: '4',
    title: 'Theme Customization Guide',
    content: `# Theme Customization Guide

This blog supports three beautiful themes: Day, Night, and Punk Girl.

## Available Themes

### Day Theme
Clean, bright, and professional. Perfect for daytime reading.

### Night Theme
Dark, elegant, and easy on the eyes. Ideal for late-night browsing.

### Punk Girl Theme
Bold, vibrant, and full of personality. For those who dare to be different.

## Switching Themes

Simply use the theme switcher in the navigation bar to instantly change the look and feel of the blog.

Your preference is saved automatically!`,
    excerpt: 'Learn about the available themes and how to customize your reading experience.',
    author: 'Admin',
    date: '2024-02-01',
    tags: ['themes', 'customization', 'ui'],
    category: 'Guide',
    featured: true
  },
  {
    id: '5',
    title: 'Markdown Syntax Quick Reference',
    content: `# Markdown Syntax Quick Reference

A comprehensive guide to markdown syntax for writing blog posts.

## Headers
Use # for headers (# H1, ## H2, ### H3, etc.)

## Emphasis
- *italic* or _italic_
- **bold** or __bold__
- ***bold italic***

## Lists

Unordered:
- Item 1
- Item 2
  - Nested item

Ordered:
1. First
2. Second
3. Third

## Links and Images
[Link text](url)
![Alt text](image-url)

## Code

Inline: \`code\`

Block:
\`\`\`language
code block
\`\`\`

## Blockquotes
> This is a quote

Happy writing!`,
    excerpt: 'A quick reference guide for markdown syntax and formatting.',
    author: 'Admin',
    date: '2024-02-05',
    tags: ['markdown', 'guide', 'reference'],
    category: 'Guide',
    featured: false
  }
];