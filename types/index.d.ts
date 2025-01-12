declare type LogoDesignType = {
  title: string;
  image: string;
  prompt: string;
};

declare type LogoColorType = {
  name: string;
  colors: string[];
};

declare type FormDataType = {
  title: string;
  desc: string;
  palette: string;
  design: {
    image: string;
    prompt: string;
    title: string;
  };
  idea: string;
};

declare type UserType = {
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  credits: number;
  isPremium: boolean;
  paymentIntentId: string;
};

declare type LogoType = {
  id: number;
  desc: string;
  image: string;
  owner: string;
  title: string;
};
