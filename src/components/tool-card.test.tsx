import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ToolCard } from '@/components/tool-card';

describe('ToolCard', () => {
  it('renders external link with safe attributes', () => {
    render(
      <ToolCard
        tool={{
          id: 'tool',
          name: 'Tool Name',
          description: 'Short description',
          url: 'https://example.com',
          tags: ['a', 'b'],
          categoryId: 'cat',
          order: 1,
        }}
      />,
    );

    const link = screen.getByLabelText('Open Tool Name official site');

    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
