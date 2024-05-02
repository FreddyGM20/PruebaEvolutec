import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment/comment.controller';
import { CommentService } from './comment/comment.service';
import { UserService } from './users/users.service';
import { VideoService } from './video/video.service';
import { Comment } from './comment/entities/comment.entity';
import { Video } from './video/entities/video.entity';
import { User } from './users/entities/user.entity';
import { UserController } from './users/users.controller';
import { VideoController } from './video/video.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'apinestjsDB',
      entities: [User, Video, Comment],
      synchronize: true
    }),
    TypeOrmModule.forFeature([Comment]),
    TypeOrmModule.forFeature([Video]),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [CommentController, UserController, VideoController],
  providers: [CommentService, UserService, VideoService],

})
export class AppModule {}