import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Video } from '../../video/entities/video.entity';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsNotEmpty()
  readonly video: Video; // 

  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;
}