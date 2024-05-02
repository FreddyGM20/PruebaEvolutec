import { Controller, Post, Body, Param, Get, Put, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { VideoService } from '../video/video.service';
import { UserService } from '../users/users.service'; 
import { User } from '../users/entities/user.entity';
import { Comment } from './entities/comment.entity';
import { Video } from '../video/entities/video.entity';


@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly videoService: VideoService,
    private readonly userService: UserService,
  ) {}

  @Post(':videoId')
  async create(@Body() createCommentDto: CreateCommentDto, @Param('videoId') videoId: number) {
    const video: Video = await this.videoService.findOne(videoId);
    const user: User = await this.userService.findOne(createCommentDto.userId);
    return this.commentService.create(createCommentDto, user, video);
  }

  @Get()
  async findAll(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Comment> {
    return this.commentService.findOne(+id);
  }


  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto): Promise<Comment> {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.commentService.remove(+id);
  }

}