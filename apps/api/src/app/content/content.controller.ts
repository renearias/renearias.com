import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContentService } from './content.service';

@ApiTags('content')
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('articles')
  getArticles() {
    return this.contentService.getArticles();
  }

  @Get('projects')
  getProjects() {
    return this.contentService.getProjects();
  }

  @Get('releases')
  getReleases() {
    return this.contentService.getReleases();
  }

  @Get('featured')
  getFeatured() {
    return this.contentService.getFeatured();
  }
}
