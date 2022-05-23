import React from "react";
import Head from "next/head";

export const Layout = () => {
  return (
    <Head>
      <title>Animebook</title>
      <meta
        name="description"
        content="social media for people who enjoy anime"
        lang="en"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
