import { describe, it, expect } from 'vitest';
import { authressLoginClient, starterKitIsConfiguredCorrectly } from '../src/authressClient';

describe('Library Setup Validation', async () => {
  it('Example Test', () => {
    expect(starterKitIsConfiguredCorrectly).to.eql(false);
    expect(authressLoginClient).to.eql(null);
  });
});