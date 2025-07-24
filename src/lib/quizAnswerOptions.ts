import { Effectiveness } from '@/lib/utils';

export const quizAnswerOptions = [
  {
    label: 'Super Effective',
    multiplier: '×2',
    effectiveness: Effectiveness.SuperEffective,
    colorClass: 'bg-green-200',
    style: {
      background: 'linear-gradient(135deg, rgba(178,255,214,0.7) 0%, rgba(102,232,180,0.6) 100%)',
      backdropFilter: 'blur(8px)',
      borderColor: 'rgba(102,232,180,0.5)',
    },
    textColorClass: 'text-white',
    ringClass: 'focus:ring-2 focus:ring-green-300/40',
    onMouseOverBoxShadow: '0 8px 32px 0 rgba(102,232,180,0.25)',
    onMouseOutBoxShadow: '',
  },
  {
    label: 'Normal',
    multiplier: '×1',
    effectiveness: Effectiveness.Normal,
    colorClass: 'bg-gray-100',
    style: {
      background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(220,220,220,0.5) 100%)',
      backdropFilter: 'blur(8px)',
      borderColor: 'rgba(200,200,200,0.5)',
    },
    textColorClass: 'text-black',
    ringClass: 'focus:ring-2 focus:ring-gray-300/40',
    onMouseOverBoxShadow: '0 8px 32px 0 rgba(180,180,180,0.18)',
    onMouseOutBoxShadow: '',
  },
  {
    label: 'Not Very Effective',
    multiplier: '×0.5',
    effectiveness: Effectiveness.NotVeryEffective,
    colorClass: 'bg-red-200',
    style: {
      background: 'linear-gradient(135deg, rgba(255,183,183,0.7) 0%, rgba(255,127,127,0.6) 100%)',
      backdropFilter: 'blur(8px)',
      borderColor: 'rgba(255,127,127,0.5)',
    },
    textColorClass: 'text-white',
    ringClass: 'focus:ring-2 focus:ring-red-300/40',
    onMouseOverBoxShadow: '0 8px 32px 0 rgba(255,127,127,0.22)',
    onMouseOutBoxShadow: '',
  },
  {
    label: 'No Effect',
    multiplier: '×0',
    effectiveness: Effectiveness.NoEffect,
    colorClass: 'bg-gray-800',
    style: {
      background: 'linear-gradient(135deg, rgba(60,60,60,0.7) 0%, rgba(30,30,30,0.6) 100%)',
      backdropFilter: 'blur(8px)',
      borderColor: 'rgba(60,60,60,0.5)',
    },
    textColorClass: 'text-white',
    ringClass: 'focus:ring-2 focus:ring-gray-700/40',
    onMouseOverBoxShadow: '0 8px 32px 0 rgba(60,60,60,0.22)',
    onMouseOutBoxShadow: '',
  },
]; 