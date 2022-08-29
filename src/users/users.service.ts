import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id });
  }

  async create(user: User): Promise<User> {
    console.log(user.passwordHash);
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(user.passwordHash, salt);
    user.passwordHash = hash;

    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async update(id: string, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
    });
  }

  async updatePassword(id: string, password: string): Promise<User> {
    const saltRounds = 10;
    const hash = await bcrypt.hashSync(password, saltRounds);
    return await this.userModel.findByIdAndUpdate(
      id,
      { passwordHash: hash },
      {
        new: true,
      },
    );
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async checkPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
