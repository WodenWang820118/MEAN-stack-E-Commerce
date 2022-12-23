import { UserDto } from './dto/create-user.dto';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';

const user1: User = new UserDto(
  'John Doe',
  'test123@gmail.com',
  'testPassword',
  'testStreet',
  'testApartment',
  'testCity',
  'testZip',
  'testCountry',
  'testPhone',
  false,
);

const user1WithNewPassword: User = new UserDto(
  'John Doe',
  'test123@gmail.com',
  'newTestPassword',
  'testStreet',
  'testApartment',
  'testCity',
  'testZip',
  'testCountry',
  'testPhone',
  false,
);

const user2: User = new UserDto(
  'Jane Doe',
  'test456@gmail.com',
  'testPassword',
  'testStreet',
  'testApartment',
  'testCity',
  'testZip',
  'testCountry',
  'testPhone',
  false,
);

const userDocArray: User[] = [user1, user2];

describe('UsersService', () => {
  let service: UsersService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndRemove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of users', async () => {
    jest.spyOn(userModel, 'find').mockResolvedValueOnce(userDocArray);
    expect(await service.findAll()).toEqual(userDocArray);
  });

  it('should return a user by email', async () => {
    jest.spyOn(userModel, 'findOne').mockResolvedValueOnce({
      ...user1,
      _id: '1',
    });
    expect(await service.findByEmail(user1.email)).toEqual({
      ...user1,
      _id: '1',
    });
  });

  it('should create a user', async () => {
    jest.spyOn(service, 'create').mockResolvedValueOnce({
      ...user1,
      _id: '1',
    });

    expect(await service.create(user1)).toEqual({
      ...user1,
      _id: '1',
    });
  });

  it('should update a user', async () => {
    jest.spyOn(userModel, 'findByIdAndUpdate').mockResolvedValueOnce({
      ...user2,
      _id: '1',
    });

    expect(await service.update('1', user1)).toEqual({
      ...user2,
      _id: '1',
    });
  });

  it('should delete a user', async () => {
    jest.spyOn(userModel, 'findByIdAndRemove').mockResolvedValueOnce({
      ...user1,
      _id: '1',
    });

    expect(await service.delete('1')).toEqual({
      ...user1,
      _id: '1',
    });
  });

  it('should return a user by id', async () => {
    jest.spyOn(userModel, 'findOne').mockResolvedValueOnce({
      ...user1,
      _id: '1',
    });

    expect(await service.findOne('1')).toEqual({
      ...user1,
      _id: '1',
    });
  });

  it('should update a user password', async () => {
    jest.spyOn(userModel, 'findOne').mockResolvedValueOnce({
      ...user1,
      _id: '1',
    });

    jest.spyOn(userModel, 'findByIdAndUpdate').mockResolvedValueOnce({
      ...user1WithNewPassword,
      _id: '1',
    });

    expect(await service.updatePassword('1', 'newTestPassword')).toEqual({
      ...user1WithNewPassword,
      _id: '1',
    });
  });

  it('should log in', async () => {
    jest.spyOn(service, 'login').mockResolvedValueOnce({
      email: user1.email,
      token: 'testToken',
    });
    // login success
    expect(await service.login(user1.email, user1.passwordHash)).toEqual({
      email: user1.email,
      token: 'testToken',
    });
  });
});
