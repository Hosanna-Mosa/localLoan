export interface LoanItem {
  id: string;
  title: string;
  loanAmount: string;
  image: string;
  location: string;
  detail1Label: string;
  detail1Value: string;
  detail2Label: string;
  detail2Value: string;
  detail3Label: string;
  detail3Value: string;
  isFavorite: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Gold',
    icon: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    name: 'Vehicles',
    icon: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=100&h=100&fit=crop',
  },
  {
    id: '3',
    name: 'Property',
    icon: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100&h=100&fit=crop',
  },
  { id: '4', name: 'See More', icon: '' },
];

export const loans: LoanItem[] = [
  {
    id: '1',
    title: 'Kia Seltos GTX Plus... (2019)',
    loanAmount: '2.0 Lakh',
    image:
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=200&h=150&fit=crop',
    location: 'Kakinada',
    detail1Label: 'Market Value',
    detail1Value: '5 Lakh',
    detail2Label: 'Re-payment time',
    detail2Value: '12 Months',
    detail3Label: 'Interest Rate',
    detail3Value: '2%-Month',
    isFavorite: false,
  },
  {
    id: '2',
    title: '15 Grams Gold (22K)',
    loanAmount: '3.6 Lakh',
    image:
      'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=200&h=150&fit=crop',
    location: 'Kakinada',
    detail1Label: 'Market Value',
    detail1Value: '4.5 Lakh',
    detail2Label: 'Re-payment time',
    detail2Value: '12 Months',
    detail3Label: 'Interest Rate',
    detail3Value: '2%-Month',
    isFavorite: false,
  },
  {
    id: '3',
    title: 'Personal Loan (Salary)',
    loanAmount: '4.0 Lakh',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=150&fit=crop',
    location: 'Kakinada',
    detail1Label: 'Income Monthly',
    detail1Value: '50K',
    detail2Label: 'Re-payment time',
    detail2Value: '12 Months',
    detail3Label: 'Interest Rate',
    detail3Value: '2%-Month',
    isFavorite: false,
  },
  {
    id: '4',
    title: 'Individual House (100 SFT)',
    loanAmount: '22.5 Lakh',
    image:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&h=150&fit=crop',
    location: 'Kakinada',
    detail1Label: 'Market Value',
    detail1Value: '54 Lakh',
    detail2Label: 'Re-payment time',
    detail2Value: '30 Months',
    detail3Label: 'Interest Rate',
    detail3Value: '3%-Month',
    isFavorite: false,
  },
  {
    id: '5',
    title: 'Sony TV (2024)',
    loanAmount: '25K',
    image:
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=150&fit=crop',
    location: 'Kakinada',
    detail1Label: 'Market Value',
    detail1Value: '50k',
    detail2Label: 'Re-payment time',
    detail2Value: '30 Months',
    detail3Label: 'Interest Rate',
    detail3Value: '3%-Month',
    isFavorite: false,
  },
  {
    id: '6',
    title: 'Business Loan',
    loanAmount: '40 Lakh',
    image:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200&h=150&fit=crop',
    location: 'Kakinada',
    detail1Label: 'Revenue Monthly',
    detail1Value: '10 Lakh',
    detail2Label: 'Re-payment time',
    detail2Value: '30 Months',
    detail3Label: 'Interest Rate',
    detail3Value: '3%-Month',
    isFavorite: false,
  },
];

export const banners = [
  {
    id: '1',
    image:
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=250&fit=crop',
    title: 'Quick Vehicle Loans',
    subtitle: 'Get approved in 24 hours',
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=600&h=250&fit=crop',
    title: 'Gold Loan at Low Interest',
    subtitle: 'Starting from 1% per month',
  },
];
