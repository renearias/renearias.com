import { Injectable } from '@nestjs/common';
import { articles, projects, releases } from 'content';

@Injectable()
export class ContentService {
  getArticles() {
    return articles;
  }

  getProjects() {
    return projects;
  }

  getReleases() {
    return releases;
  }

  getFeatured() {
    return {
      articles: articles.slice(0, 3),
      projects: projects.filter(p => p.featured),
      releases: releases.slice(0, 2),
    };
  }
}
