/* eslint-disable react-refresh/only-export-components */
import HomePage from '@/components/pages/HomePage/HomePage';
import type { Metadata } from 'next';
import { type ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Rest Client App',
  description: 'Rest Client App',
};

export default function Home(): ReactNode {
  return <HomePage />;
}
