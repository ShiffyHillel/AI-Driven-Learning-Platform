import UserService from './user-service';
import UserDal, { USER_NOT_FOUND_ERROR, USER_ALREADY_EXISTS_ERROR } from './user-dal';

const mockUserDal = {
  createUser: jest.fn(),
  getUserById: jest.fn(),
  getAllUsers: jest.fn()
} as unknown as UserDal;

const userService = new UserService(mockUserDal);

describe('UserService', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should create a user successfully', async () => {
    const user = { id: '1', name: 'Test', phone: '050', createdAt: new Date() };
    (mockUserDal.createUser as jest.Mock).mockResolvedValue(user);

    const result = await userService.createUser(user);
    expect(result).toEqual(user);
  });

  it('should return null when user not found', async () => {
    (mockUserDal.getUserById as jest.Mock).mockRejectedValue(new Error(USER_NOT_FOUND_ERROR));

    const result = await userService.getUserById('non-existent-id');
    expect(result).toBeNull();
  });

  it('should throw error when user already exists', async () => {
    (mockUserDal.createUser as jest.Mock).mockRejectedValue(new Error(USER_ALREADY_EXISTS_ERROR));

    await expect(userService.createUser({ id: '1', name: 'Test', phone: '050', createdAt: new Date() }))
      .rejects.toThrow(USER_ALREADY_EXISTS_ERROR);
  });
});