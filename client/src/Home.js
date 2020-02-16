import React from 'react';
import Layout from './Layout';
import { Helmet } from 'react-helmet';

const Home = () => (
  <Layout>
    <Helmet>
      <title>Business. Home Page</title>
      <meta name="description" content="General info about the Business" />
    </Helmet>
    <div className="contanier text-center">
      <h1 className="p-5">Home</h1>
      <hr />
      <p className="lead">Dear visitor , welcome in our website.</p>
    </div>
  </Layout>
);

export default Home;
