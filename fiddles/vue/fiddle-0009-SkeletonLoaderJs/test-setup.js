    import { vi } from 'vitest';
    global.URL.createObjectURL = vi.fn(() => 'mocked-object-url');
