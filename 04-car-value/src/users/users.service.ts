import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  //   repo: Repository<User>;

  //   constructor(repo: Repository<User>) {
  //     this.repo = repo;
  //   }

  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password }); // create is used to create an instance of the entity, hook executes with this.
    return this.repo.save(user); // save is used for actual persistence
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id }); // to find a single entity by its properties.
  }

  find(email: string) {
    return this.repo.find({ where: { email } }); // to find multiple entities i.e. [] by their properties.
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return this.repo.remove(user);
  }
}
