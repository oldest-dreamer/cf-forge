import type { L } from './types';

/** Interface strings. Content strings live with their data. */
export const S = {
  brand: { en: 'CF Forge', bn: 'CF Forge' },
  nav: {
    home: { en: 'Home', bn: 'হোম' },
    contests: { en: 'Contest types', bn: 'কনটেস্টের ধরন' },
    tags: { en: 'Tags', bn: 'ট্যাগ' },
    problems: { en: 'Problems', bn: 'প্রবলেম' },
    learn: { en: 'Learn C++', bn: 'C++ শিখুন' },
    profile: { en: 'My profile', bn: 'আমার প্রোফাইল' },
  },
  langToggle: { en: 'Switch to Bangla', bn: 'ইংরেজিতে দেখুন' },
  menu: { en: 'Menu', bn: 'মেনু' },
  close: { en: 'Close', bn: 'বন্ধ করুন' },

  home: {
    title: {
      en: 'Heat every rating band until it holds.',
      bn: 'প্রতিটি রেটিং ধাপ পোক্ত না হওয়া পর্যন্ত গড়ে তুলুন।',
    },
    lede: {
      en: 'CF Forge turns Codeforces into a training plan: what each contest type asks, how every tag shows up, and explained C++ solutions you can run right in the browser.',
      bn: 'CF Forge কোডফোর্সেসকে একটি ট্রেনিং প্ল্যানে বদলে দেয়: প্রতিটি কনটেস্ট কী চায়, প্রতিটি ট্যাগ কীভাবে আসে, আর ব্রাউজারেই চালানো যায় এমন ব্যাখ্যাসহ C++ সমাধান।',
    },
    ctaTags: { en: 'Browse the 36 tags', bn: '৩৬টি ট্যাগ দেখুন' },
    ctaContests: { en: 'Read the contest guide', bn: 'কনটেস্ট গাইড পড়ুন' },
    ladderCaption: {
      en: 'The Codeforces rank ladder. Each band is a set of patterns you can learn.',
      bn: 'কোডফোর্সেসের র‍্যাংক সিঁড়ি। প্রতিটি ধাপ কিছু প্যাটার্নের সমষ্টি, যা শেখা যায়।',
    },
    pillarsTitle: { en: 'What you train with', bn: 'যা দিয়ে অনুশীলন করবেন' },
    pillars: [
      {
        title: { en: 'Contest types, decoded', bn: 'কনটেস্টের ধরন, সহজ করে' },
        body: {
          en: 'Div. 4 to Div. 1, Educational and Global rounds: scoring, penalties, and the kind of problem that sits in each slot.',
          bn: 'Div. 4 থেকে Div. 1, এডুকেশনাল ও গ্লোবাল রাউন্ড: স্কোরিং, পেনাল্টি, আর কোন পজিশনে কেমন প্রবলেম থাকে।',
        },
        to: '/contests',
      },
      {
        title: { en: '36 tags, one page each', bn: '৩৬টি ট্যাগ, প্রতিটির আলাদা পাতা' },
        body: {
          en: 'How to recognise a tag from the statement, two featured problems with five solutions, and a long list to grind.',
          bn: 'স্টেটমেন্ট দেখে ট্যাগ চেনার উপায়, পাঁচটি সমাধানসহ দুটি বাছাই করা প্রবলেম, আর অনুশীলনের লম্বা তালিকা।',
        },
        to: '/tags',
      },
      {
        title: { en: 'Problems explained in 11 parts', bn: '১১ ভাগে ব্যাখ্যা করা প্রবলেম' },
        body: {
          en: 'From the key observation to a dry run, common mistakes and your own test cases. Every solution is real C++.',
          bn: 'মূল পর্যবেক্ষণ থেকে ড্রাই রান, সাধারণ ভুল আর নিজের টেস্ট কেস পর্যন্ত। প্রতিটি সমাধান আসল C++।',
        },
        to: '/problems',
      },
    ],
    roadmapTitle: { en: 'Being forged next', bn: 'এরপর যা আসছে' },
    roadmap: [
      { en: 'Sign in with email or Google', bn: 'ইমেইল বা গুগল দিয়ে লগইন' },
      { en: 'Your live Codeforces profile and verdicts', bn: 'আপনার লাইভ কোডফোর্সেস প্রোফাইল ও ভার্ডিক্ট' },
      { en: 'Run C++ in the browser', bn: 'ব্রাউজারেই C++ চালানো' },
      { en: 'C++ from zero and the STL toolkit', bn: 'শূন্য থেকে C++ আর STL টুলকিট' },
      { en: 'An AI tutor on every page', bn: 'প্রতিটি পাতায় AI টিউটর' },
      { en: 'About 1,000 explained problems', bn: 'প্রায় ১,০০০ ব্যাখ্যাসহ প্রবলেম' },
    ],
  },

  contests: {
    title: { en: 'Contest types', bn: 'কনটেস্টের ধরন' },
    lede: {
      en: 'Every Codeforces round follows one of two scoring systems. Knowing which one you are in changes how you should play.',
      bn: 'কোডফোর্সেসের প্রতিটি রাউন্ড দুটি স্কোরিং পদ্ধতির একটি মেনে চলে। কোনটিতে আছেন জানলে খেলার কৌশলও বদলায়।',
    },
    ratedFor: { en: 'Rated for', bn: 'রেটেড' },
    scoring: { en: 'Scoring', bn: 'স্কোরিং' },
    shape: { en: 'Usual shape', bn: 'সাধারণ গঠন' },
    hacks: { en: 'Hacks', bn: 'হ্যাক' },
    slots: { en: 'What sits in each slot', bn: 'কোন পজিশনে কী থাকে' },
    strategy: { en: 'How to play it', bn: 'কীভাবে খেলবেন' },
    typicalNote: {
      en: 'Ratings per slot are typical ranges, not rules. Every round is different.',
      bn: 'প্রতিটি পজিশনের রেটিং সাধারণ পরিসর মাত্র, নিয়ম নয়। প্রতিটি রাউন্ড আলাদা।',
    },
    systemsTitle: { en: 'The two scoring systems', bn: 'দুটি স্কোরিং পদ্ধতি' },
  },

  tags: {
    title: { en: 'Tags', bn: 'ট্যাগ' },
    lede: {
      en: 'The 36 problem tags Codeforces uses. Learn to spot each one from the statement before you look at the tag list.',
      bn: 'কোডফোর্সেসের ৩৬টি প্রবলেম ট্যাগ। ট্যাগ তালিকা দেখার আগেই স্টেটমেন্ট পড়ে প্রতিটি চিনতে শিখুন।',
    },
    search: { en: 'Find a tag', bn: 'ট্যাগ খুঁজুন' },
    all: { en: 'All', bn: 'সব' },
    noMatch: { en: 'No tag matches that. Try a shorter word.', bn: 'এমন কোনো ট্যাগ নেই। ছোট শব্দ দিয়ে চেষ্টা করুন।' },
    signals: { en: 'How to spot it', bn: 'কীভাবে চিনবেন' },
    problemsHere: { en: 'Problems with this tag', bn: 'এই ট্যাগের প্রবলেম' },
    emptyProblems: {
      en: 'Problems for this tag arrive in the upcoming problem waves.',
      bn: 'এই ট্যাগের প্রবলেম আসছে পরের প্রবলেম ধাপগুলোতে।',
    },
    openOnCf: { en: 'Open this tag on Codeforces', bn: 'কোডফোর্সেসে এই ট্যাগ খুলুন' },
    back: { en: 'All tags', bn: 'সব ট্যাগ' },
    groups: {
      core: { en: 'Core', bn: 'মৌলিক' },
      math: { en: 'Math', bn: 'গণিত' },
      graphs: { en: 'Graphs and trees', bn: 'গ্রাফ ও ট্রি' },
      strings: { en: 'Strings', bn: 'স্ট্রিং' },
      advanced: { en: 'Advanced', bn: 'উচ্চতর' },
    },
  },

  problems: {
    title: { en: 'Problems', bn: 'প্রবলেম' },
    lede: {
      en: 'Every problem here is explained in 11 parts. This first set is the start of a pool of about 1,000.',
      bn: 'এখানকার প্রতিটি প্রবলেম ১১ ভাগে ব্যাখ্যা করা। এই প্রথম সেটটি প্রায় ১,০০০ প্রবলেমের শুরু।',
    },
    featured: { en: 'Featured', bn: 'বাছাই করা' },
    rating: { en: 'Rating', bn: 'রেটিং' },
    solutions: { en: 'solutions', bn: 'টি সমাধান' },
    sortRating: { en: 'Easiest first', bn: 'সহজগুলো আগে' },
  },

  problem: {
    parts: {
      overview: { en: 'Overview', bn: 'সংক্ষেপে' },
      statement: { en: 'The problem in plain words', bn: 'সহজ ভাষায় প্রবলেম' },
      samples: { en: 'Samples, explained', bn: 'স্যাম্পল, ব্যাখ্যাসহ' },
      observation: { en: 'Key observation', bn: 'মূল পর্যবেক্ষণ' },
      approach: { en: 'Approach', bn: 'পদ্ধতি' },
      walkthrough: { en: 'Dry run', bn: 'ড্রাই রান' },
      complexity: { en: 'Complexity', bn: 'কমপ্লেক্সিটি' },
      solutions: { en: 'Solutions', bn: 'সমাধান' },
      tests: { en: 'Test cases', bn: 'টেস্ট কেস' },
      pitfalls: { en: 'Common mistakes', bn: 'সাধারণ ভুল' },
      related: { en: 'Related and toolkit', bn: 'সম্পর্কিত ও টুলকিট' },
    },
    input: { en: 'Input', bn: 'ইনপুট' },
    output: { en: 'Output', bn: 'আউটপুট' },
    constraints: { en: 'Limits', bn: 'সীমা' },
    time: { en: 'Time', bn: 'সময়' },
    memory: { en: 'Memory', bn: 'মেমোরি' },
    space: { en: 'Space', bn: 'স্পেস' },
    sampleN: { en: 'Sample', bn: 'স্যাম্পল' },
    fromSample: { en: 'From the statement', bn: 'স্টেটমেন্ট থেকে' },
    ownTest: { en: 'Edge case', bn: 'এজ কেস' },
    copy: { en: 'Copy', bn: 'কপি' },
    copied: { en: 'Copied', bn: 'কপি হয়েছে' },
    openOnCf: { en: 'Open on Codeforces', bn: 'কোডফোর্সেসে খুলুন' },
    runSoon: {
      en: 'Run in the browser arrives in the next phase. Your real verdict is just below.',
      bn: 'ব্রাউজারে Run আসছে পরের ধাপে। আপনার আসল ভার্ডিক্ট ঠিক নিচে।',
    },
    contents: { en: 'On this page', bn: 'এই পাতায়' },
    kinds: {
      method: { en: 'Method', bn: 'পদ্ধতি' },
      brute: { en: 'Brute force', bn: 'ব্রুট ফোর্স' },
      better: { en: 'Better', bn: 'আরও ভালো' },
      optimal: { en: 'Optimal', bn: 'অপটিমাল' },
      stl: { en: 'STL version', bn: 'STL সংস্করণ' },
      alt: { en: 'Alternative style', bn: 'ভিন্ন ধরন' },
    },
    toolkit: { en: 'C++ toolkit used here', bn: 'এখানে ব্যবহৃত C++ টুলকিট' },
    related: { en: 'Try next', bn: 'এরপর চেষ্টা করুন' },
    notFound: { en: 'That problem is not in CF Forge yet.', bn: 'এই প্রবলেমটি এখনও CF Forge-এ নেই।' },
  },

  learn: {
    title: { en: 'Learn C++', bn: 'C++ শিখুন' },
    lede: {
      en: 'A course that starts at your first cout and ends at the STL you need for Div. 2. It is being written now.',
      bn: 'প্রথম cout থেকে শুরু করে Div. 2-এর জন্য দরকারি STL পর্যন্ত একটি কোর্স। এখন লেখা চলছে।',
    },
  },

  auth: {
    signInTitle: { en: 'Sign in to CF Forge', bn: 'CF Forge-এ লগইন করুন' },
    signUpTitle: { en: 'Create your CF Forge account', bn: 'CF Forge অ্যাকাউন্ট তৈরি করুন' },
    signInTab: { en: 'Sign in', bn: 'লগইন' },
    signUpTab: { en: 'Create account', bn: 'অ্যাকাউন্ট তৈরি' },
    google: { en: 'Continue with Google', bn: 'Google দিয়ে চালিয়ে যান' },
    or: { en: 'or use your email', bn: 'অথবা ইমেইল দিয়ে' },
    name: { en: 'Your name', bn: 'আপনার নাম' },
    email: { en: 'Email', bn: 'ইমেইল' },
    password: { en: 'Password', bn: 'পাসওয়ার্ড' },
    passwordHint: { en: 'At least 8 characters.', bn: 'কমপক্ষে ৮ অক্ষর।' },
    show: { en: 'Show password', bn: 'পাসওয়ার্ড দেখুন' },
    hide: { en: 'Hide password', bn: 'পাসওয়ার্ড লুকান' },
    signInCta: { en: 'Sign in', bn: 'লগইন করুন' },
    signUpCta: { en: 'Create account', bn: 'অ্যাকাউন্ট তৈরি করুন' },
    working: { en: 'Checking…', bn: 'যাচাই চলছে…' },
    redirecting: { en: 'Opening Google…', bn: 'Google খোলা হচ্ছে…' },
    noAccount: { en: 'New here?', bn: 'নতুন?' },
    haveAccount: { en: 'Already have an account?', bn: 'আগে থেকেই অ্যাকাউন্ট আছে?' },
    pitch: {
      en: 'Contest types decoded, 36 tags, and problems explained in 11 parts with real C++. Sign in to start training.',
      bn: 'কনটেস্টের ধরন, ৩৬টি ট্যাগ, আর আসল C++-সহ ১১ ভাগে ব্যাখ্যা করা প্রবলেম। অনুশীলন শুরু করতে লগইন করুন।',
    },
    errors: {
      nameRequired: { en: 'Enter your name.', bn: 'আপনার নাম লিখুন।' },
      emailInvalid: { en: 'Enter a valid email address.', bn: 'সঠিক ইমেইল ঠিকানা লিখুন।' },
      passwordShort: { en: 'Use at least 8 characters.', bn: 'কমপক্ষে ৮ অক্ষর ব্যবহার করুন।' },
      wrongCredentials: { en: 'That email and password do not match. Check both and try again.', bn: 'ইমেইল আর পাসওয়ার্ড মিলছে না। দুটোই দেখে আবার চেষ্টা করুন।' },
      emailTaken: { en: 'An account with this email already exists. Sign in instead.', bn: 'এই ইমেইলে আগেই অ্যাকাউন্ট আছে। লগইন করুন।' },
      network: { en: 'Could not reach the sign-in server. Check your connection and try again.', bn: 'লগইন সার্ভারে পৌঁছানো যায়নি। ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।' },
      google: { en: 'Google sign-in did not finish. Try again.', bn: 'Google লগইন শেষ হয়নি। আবার চেষ্টা করুন।' },
      generic: { en: 'Sign-in failed. Try again in a moment.', bn: 'লগইন হয়নি। একটু পরে আবার চেষ্টা করুন।' },
    },
  },

  user: {
    profile: { en: 'My profile', bn: 'আমার প্রোফাইল' },
    signOut: { en: 'Sign out', bn: 'লগআউট' },
    signingOut: { en: 'Signing out…', bn: 'লগআউট হচ্ছে…' },
  },

  profile: {
    title: { en: 'My profile', bn: 'আমার প্রোফাইল' },
    lede: {
      en: 'Your live Codeforces stats and your account settings. Add your handle once and every page knows what you have solved.',
      bn: 'আপনার লাইভ কোডফোর্সেস পরিসংখ্যান আর অ্যাকাউন্ট সেটিংস। একবার হ্যান্ডেল যোগ করলেই প্রতিটি পাতা জানবে আপনি কী সমাধান করেছেন।',
    },
    name: { en: 'Display name', bn: 'প্রদর্শিত নাম' },
    email: { en: 'Email', bn: 'ইমেইল' },
    handle: { en: 'Codeforces handle', bn: 'কোডফোর্সেস হ্যান্ডেল' },
    handlePlaceholder: { en: 'Your Codeforces handle', bn: 'আপনার কোডফোর্সেস হ্যান্ডেল' },
    handleHint: {
      en: 'Optional. 3 to 24 letters, digits, _ . or -',
      bn: 'ঐচ্ছিক। ৩ থেকে ২৪টি অক্ষর, সংখ্যা, _ . বা -',
    },
    handleInvalid: {
      en: 'A handle uses 3 to 24 letters, digits, _ . or -',
      bn: 'হ্যান্ডেলে ৩ থেকে ২৪টি অক্ষর, সংখ্যা, _ . বা - থাকে।',
    },
    language: { en: 'Site language', bn: 'সাইটের ভাষা' },
    save: { en: 'Save profile', bn: 'প্রোফাইল সেভ করুন' },
    saving: { en: 'Saving…', bn: 'সেভ হচ্ছে…' },
    saved: { en: 'Profile saved', bn: 'প্রোফাইল সেভ হয়েছে' },
    loadError: {
      en: 'Your saved settings could not be loaded. The profile server is not connected yet.',
      bn: 'সেভ করা সেটিংস লোড করা যায়নি। প্রোফাইল সার্ভার এখনও যুক্ত হয়নি।',
    },
    saveError: { en: 'Could not save. Try again in a moment.', bn: 'সেভ করা যায়নি। একটু পরে আবার চেষ্টা করুন।' },
    joined: { en: 'Joined', bn: 'যোগ দিয়েছেন' },
  },

  notFound: {
    title: { en: 'This page is not on the anvil.', bn: 'এই পাতাটি এখানে নেই।' },
    body: { en: 'Check the address, or head back home.', bn: 'ঠিকানাটি দেখে নিন, অথবা হোমে ফিরে যান।' },
    home: { en: 'Go home', bn: 'হোমে যান' },
  },

  footer: {
    note: {
      en: 'CF Forge is an independent training site. It is not affiliated with Codeforces. Problem statements belong to their authors; read the full statement on Codeforces.',
      bn: 'CF Forge একটি স্বাধীন ট্রেনিং সাইট, কোডফোর্সেসের সঙ্গে যুক্ত নয়। প্রবলেম স্টেটমেন্টের স্বত্ব লেখকদের; পূর্ণ স্টেটমেন্ট কোডফোর্সেসে পড়ুন।',
    },
  },
} satisfies Record<string, unknown>;

export type { L };
