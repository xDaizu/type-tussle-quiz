import { Effectiveness } from '@/shared/services/utils';

export const quizAnswerOptions = [
  {
    label: 'Super Effective',
    multiplier: '×2',
    effectiveness: Effectiveness.SuperEffective,
    gradientClass: 'bg-green-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-60 border border-gray-100',
    textColorClass: 'text-teal-700',
    ringClass: 'focus:ring-2 focus:ring-green-300/40',
    onMouseOverBoxShadow: '0 8px 32px 0 rgba(102,232,180,0.25)',
    onMouseOutBoxShadow: '',
  },
  {
    label: 'Normal',
    multiplier: '×1',
    effectiveness: Effectiveness.Normal,
    gradientClass: 'bg-zinc-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-60 border border-gray-100',
    textColorClass: 'text-zinc-700',
    ringClass: 'focus:ring-2 focus:ring-gray-300/40',
    onMouseOverBoxShadow: '0 8px 32px 0 rgba(180,180,180,0.18)',
    onMouseOutBoxShadow: '',
  },
  {
    label: 'Not Very Effective',
    multiplier: '×0.5',
    effectiveness: Effectiveness.NotVeryEffective,
    gradientClass: 'bg-rose-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-60 border border-gray-100',
    textColorClass: 'text-rose-100',
    ringClass: 'focus:ring-2 focus:ring-red-300/40',
    onMouseOverBoxShadow: '0 8px 32px 0 rgba(255,127,127,0.22)',
    onMouseOutBoxShadow: '',
  },
  {
    label: 'No Effect',
    multiplier: '×0',
    effectiveness: Effectiveness.NoEffect,
    gradientClass: 'bg-zinc-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-60 border border-gray-100',
    textColorClass: 'text-zinc-100',
    ringClass: 'focus:ring-2 focus:ring-gray-700/40',
    onMouseOverBoxShadow: '0 8px 32px 0 rgba(60,60,60,0.22)',
    onMouseOutBoxShadow: '',
  },
]; 