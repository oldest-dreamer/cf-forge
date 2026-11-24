/** Strings for the visual polish pass: eyebrow badges, auth perks, tag cards. */
export const UI = {
  eyebrow: { en: 'Free · English + বাংলা · C++ in your browser', bn: 'বিনামূল্যে · English + বাংলা · ব্রাউজারেই C++' },
  auth: {
    badgeIn: { en: 'Welcome back', bn: 'আবার স্বাগতম' },
    badgeUp: { en: 'Free forever', bn: 'সম্পূর্ণ বিনামূল্যে' },
    perks: [
      { en: 'Every problem explained, step by step', bn: 'প্রতিটি প্রবলেম ধাপে ধাপে ব্যাখ্যা করা' },
      { en: '2–4 verified C++ solutions each', bn: 'প্রতিটিতে ২–৪টি যাচাই করা C++ সমাধান' },
      { en: 'Run code right in the page', bn: 'পেজেই কোড চালান' },
    ],
    strength: [
      { en: 'Too short', bn: 'খুব ছোট' },
      { en: 'Okay', bn: 'চলনসই' },
      { en: 'Good', bn: 'ভালো' },
      { en: 'Strong', bn: 'শক্তিশালী' },
    ],
    welcome: { en: 'Welcome in', bn: 'স্বাগতম' },
  },
  tags: {
    problems: { en: 'problems', bn: 'প্রবলেম' },
    open: { en: 'Open guide', bn: 'গাইড খুলুন' },
  },
  home: {
    pillarIcons: ['book', 'code', 'bot'],
  },
} as const;
