---
title: Building SSR Angular Apps That Actually Scale
slug: building-ssr-angular-apps-that-scale
date: 2024-12-01
tags: [Engineering, Angular, Performance]
readingTime: 8
excerpt: Lessons from taking an Angular SSR app to 100k monthly visitors.
---

# Building SSR Angular Apps That Actually Scale

Server-Side Rendering (SSR) with Angular has matured significantly over the past few years...

## Why SSR Matters

SSR improves initial page load times, SEO, and perceived performance...

## Key Lessons

1. **Hydration is critical** - Make sure client-side hydration works correctly
2. **Cache strategically** - Use proper HTTP caching headers
3. **Avoid browser-only APIs** - Check for isPlatformBrowser before using window/document
4. **Transfer state** - Use TransferState to avoid double-fetching data

## Conclusion

With the right patterns, Angular SSR can scale to hundreds of thousands of visitors per month.
