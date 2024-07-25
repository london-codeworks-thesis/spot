import { vi, Mock } from 'vitest';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth';
import { getSession } from '@/hooks/getSession';

vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}));

describe('getSession', () => {
  it('should call getServerSession with the correct authConfig', async () => {
    const mockSession = { user: { name: 'Test User' } };
    (getServerSession as Mock).mockResolvedValueOnce(mockSession);

    const session = await getSession();

    expect(getServerSession).toHaveBeenCalledWith(authConfig);
    expect(session).toEqual(mockSession);
  });

  it('should handle errors correctly', async () => {
    (getServerSession as Mock).mockRejectedValueOnce(
      new Error('Failed to get session'),
    );

    await expect(getSession()).rejects.toThrow('Failed to get session');
  });
});
