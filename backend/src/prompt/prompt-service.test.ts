import PromptService from './prompt-service';
import PromptDal from './prompt-dal';
import { AiProvider } from '../utils/ai-provider';

const mockPromptDal = {
  createPrompt: jest.fn(),
  getPromptsByUserId: jest.fn(),
  getAllPrompts: jest.fn(),
  getPromptById: jest.fn()
} as unknown as PromptDal;

const mockAiProvider = {
  generateLesson: jest.fn()
} as unknown as AiProvider;

const promptService = new PromptService(mockPromptDal, mockAiProvider);

describe('PromptService', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should create a prompt and get AI response', async () => {
    (mockAiProvider.generateLesson as jest.Mock).mockResolvedValue('Mock lesson response');
    (mockPromptDal.createPrompt as jest.Mock).mockImplementation(p => Promise.resolve(p));

    const result = await promptService.createPrompt('user1', '1', '1', 'Space', 'Tell me about black holes');

    expect(mockAiProvider.generateLesson).toHaveBeenCalledWith('Space', 'Tell me about black holes');
    expect(result.response).toBe('Mock lesson response');
    expect(result.userId).toBe('user1');
  });

  it('should return history for a user', async () => {
    const prompts = [{ id: '1', userId: 'user1', prompt: 'test', response: 'response', categoryId: '1', subCategoryId: '1', createdAt: new Date() }];
    (mockPromptDal.getPromptsByUserId as jest.Mock).mockResolvedValue(prompts);

    const result = await promptService.getPromptsByUserId('user1');
    expect(result).toEqual(prompts);
  });
});