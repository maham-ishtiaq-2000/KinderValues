export const storyHonesty2SlidesArrayData = [
    {
        id: '1',
        imageSource: require('../../../../../assets/MoralValues/Honesty/TheWalletAdventure/finalSlide1.webp'),
        description: 'Alex, with cool glasses and a backpack, heads to a school under a rainbow. Flowers are blooming by a welcome sign. It is a happy, colorful day!',
        color: '#6db1c4'
    },
    {
        id: '2',
        imageSource: require('../../../../../assets/MoralValues/Honesty/TheWalletAdventure/finalSlide2.webp'),
        description: 'While playing, Alex saw a wallet on the ground that someone had dropped. He picked it up.',
        color: '#87ceeb'
    },
    {
        id: '3',
        imageSource: require('../../../../../assets/MoralValues/Honesty/TheWalletAdventure/finalSlide3.webp'),
        description: 'Alex wondered: keep the wallet or give it to the teacher to return to its owner?',
        color: '#637e4d'
    },
    {
        id: 'question',
        imageSource: require('../../../../../assets/MoralValues/Honesty/TheWalletAdventure/childWondering.webp'),
        description: 'Can you imagine what the right choice for Alex might be at this moment?',
        color: '#7da995'
    },
    {
        id: 'options',
        color: '#5b9bd5',
        name: "maham",
        optionAImageSource: require('../../../../../assets/MoralValues/Honesty/TheWalletAdventure/rightOption.webp'),
        optionBImageSource: require('../../../../../assets/MoralValues/Honesty/TheWalletAdventure/wrongOption.webp'),
        description: "Now it's your turn! Pick what you want Alex to do next.",
        correctOptionDescription: 'Alex gives wallet to the teacher so that she can hand it to correct owner.',
        wrongOptionDescription: 'Alex quickly hides the wallet in the cupboard so he can keep it with himself.',
        correct: 'A'
    }
];
const endScreen = [
  {
    id : 'endScreen',
    imageSource : require('../../../../../assets/MoralValues/Honesty/TheWalletAdventure/theEndScreen.webp'),
    color : '#87ceeb'
  }
]
export const rightOptionHonesty2ArrayData = [
  {
      id : '4',
      imageSource : require('../../../../../assets/MoralValues/Honesty/TheWalletAdventure/correctOption1.webp'),
      description : "When Alex gave the wallet to the teacher, she praised him in front of everyone for being honest, setting a positive example for everyone.",
      color : '#AE388B'
  },
  ...endScreen
];
export const wrongOptionHonesty2ArrayData = [
  {
      id : '6',
      imageSource : require('../../../../../assets/MoralValues/Honesty/TheWalletAdventure/falseOption1.webp'),
      description : "When Alex keeps the wallet, he starts to worry about the person who lost it, thinking they must be upset.",
      color : '#35A367'
  },
  {
      id : '8',
      imageSource : require('../../../../../assets/MoralValues/Honesty/TheWalletAdventure/falseOption0.webp'),
      description : "So next day, Alex gives wallet to his teacher so that she can hand it to wallet's owner.",
      color : '#35A367'
  },
  ...rightOptionHonesty2ArrayData,

];