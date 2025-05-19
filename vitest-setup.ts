import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);
(global as any).__DEV__ = true;
(global as any).__COMMITHASH__ = "abcd1234";