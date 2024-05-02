import { Injectable } from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from '../users/entities/user.entity';
import { Video } from '../video/entities/video.entity';

@Injectable()
export class CommentService {
  private comments: Comment[] = [];

  create(createCommentDto: CreateCommentDto, user: User, video: Video): Comment {
    const newComment: Comment = {
      id: this.comments.length + 1,
      content: createCommentDto.content,
      user, 
      video, 
    };
    this.comments.push(newComment);
    return newComment;
  }
  
  findAll(): Comment[] {
    return this.comments;
  }

  findOne(id: number): Comment {
    return this.comments.find(comment => comment.id === id);
  }

  update(id: number, updateCommentDto: Partial<Comment>): Comment {
    const index = this.comments.findIndex(comment => comment.id === id);
    this.comments[index] = { ...this.comments[index], ...updateCommentDto };
    return this.comments[index];
  }

  remove(id: number): void {
    this.comments = this.comments.filter(comment => comment.id !== id);
  }
}