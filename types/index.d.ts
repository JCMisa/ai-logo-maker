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
