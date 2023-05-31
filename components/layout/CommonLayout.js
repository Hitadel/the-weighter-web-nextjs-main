import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";

const CommonLayout = ({ children }) => {
  return (
    <div className={"font-[customFont]"}>
      <Head>
        <title>The Weighter</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/logo.ico' />
      </Head>
      <Header />
      <div className='flex flex-col min-h-screen items-center justify-center text-[#373A3C] bg-[#efefef] dark:text-[#DDDDDD] dark:bg-black'>{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
