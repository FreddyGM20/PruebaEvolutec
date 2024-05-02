// video.controller.ts

import { Controller, Post, Body, Param, Get, Put, Delete } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { CreateCommentDto } from '../comment/dto/create-comment.dto';
import { UpdateVideoDto } from './dto/update-video.dto'
import { CommentService } from '../comment/comment.service';
import { Video } from './entities/video.entity';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/users.service';

@Controller('videos')
export class VideoController {
  constructor(
    private readonly videoService: VideoService,
    private readonly commentService: CommentService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() createVideoDto: CreateVideoDto) {
    const userAgg = await this.userService.findOne(parseInt(createVideoDto.user));
    if (!userAgg) {
      throw new Error('User not found');
    }
    const video: Video = {
      id: null,
      title: createVideoDto.title,
      description: createVideoDto.description,
      user: userAgg, 
      comments: [],
    };
    
    return this.videoService.create(video);
  }

  @Post(':videoId/comments')
  async createComment(@Body() createCommentDto: CreateCommentDto, @Param('videoId') videoId: number) {
    const video: Video = await this.videoService.findOne(videoId);
    const user: User = await this.userService.findOne(createCommentDto.userId);
    return this.commentService.create(createCommentDto, user, video);
  }

  @Get()
  async findAll(): Promise<Video[]> {
    return this.videoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Video> {
    return this.videoService.findOne(+id);
  }


  @Put(':id')
  async update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto): Promise<Video> {
    const user = await this.userService.findOne(parseInt(updateVideoDto.user));

    const partialUpdate: Partial<Video> = {
      ...updateVideoDto,
      user: user,
    };

    return this.videoService.update(+id, partialUpdate);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.videoService.remove(+id);
  }
}
