import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { User } from './interfaces/user.interface';
import { UserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

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

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockReturnValue(
              new Promise<User[]>((resolve) => {
                resolve([
                  { ...user1, _id: '1' },
                  { ...user2, _id: '2' },
                ]);
              }),
            ),
            findOne: jest.fn().mockReturnValue(
              new Promise<User>((resolve) => {
                resolve({ ...user1, _id: '1' });
              }),
            ),
            create: jest.fn().mockReturnValue(
              new Promise<User>((resolve) => {
                resolve({ ...user1, _id: '1' });
              }),
            ),
            update: jest.fn().mockReturnValue(
              new Promise<User>((resolve) => {
                resolve({ ...user2, _id: '1' });
              }),
            ),
            updatePassword: jest.fn().mockReturnValue(
              new Promise<User>((resolve) => {
                resolve({ ...user1WithNewPassword, _id: '1' });
              }),
            ),
            delete: jest.fn().mockReturnValue(
              new Promise<User>((resolve) => {
                resolve({ ...user1, _id: '1' });
              }),
            ),
            findByEmail: jest.fn().mockReturnValue(
              new Promise<User>((resolve) => {
                resolve({ ...user1, _id: '1' });
              }),
            ),
            login: jest.fn().mockReturnValue(
              new Promise<{ email: string; token: string }>((resolve) => {
                resolve({ email: 'test123@gmail.com', token: 'testToken' });
              }),
            ),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of users', async () => {
    const users = await controller.findAll();
    expect(users).toEqual([
      {
        ...user1,
        _id: '1',
      },
      {
        ...user2,
        _id: '2',
      },
    ]);
  });

  it('should return a user with id', async () => {
    const user = await controller.findOne('1');
    expect(user).toEqual({
      ...user1,
      _id: '1',
    });
  });

  it('should create a new user with id', async () => {
    const user = await controller.create(user1);
    expect(user).toEqual({
      ...user1,
      _id: '1',
    });
  });

  it('should update user data', async () => {
    const user = await controller.update('1', user1);
    expect(user).toEqual({
      ...user2,
      _id: '1',
    });
  });

  it('should update user password', async () => {
    const user = await controller.updatePassword('1', 'newTestPassword');
    expect(user).toEqual({
      ...user1WithNewPassword,
      _id: '1',
    });
  });

  it('should delete a user', async () => {
    const user = await controller.delete('1');
    expect(user).toEqual({
      ...user1,
      _id: '1',
    });
  });

  it('should return a user with email', async () => {
    const user = await controller.findByEmail('test123@gmail.com');
    expect(user).toEqual({
      ...user1,
      _id: '1',
    });
  });

  it('should login a user', async () => {
    const user = await controller.login(user1);
    expect(user).toEqual({
      email: 'test123@gmail.com',
      token: 'testToken',
    });
  });
});
