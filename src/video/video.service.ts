// video.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  async create(video: Video): Promise<Video> {
    return this.videoRepository.save(video);
  }

  async findAll(): Promise<Video[]> {
    return this.videoRepository.find();
  }

  async findOne(id: number): Promise<Video> {
    return this.videoRepository.findOne({ where: { id } });
  }

  async update(id: number, updateVideoDto: Partial<Video>): Promise<Video> {
    await this.videoRepository.update(id, updateVideoDto);
    return this.videoRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.videoRepository.delete(id);
  }
}
