import React from 'react';
import Layout from './Layout';
import { Helmet } from 'react-helmet';

const About = () => (
  <Layout>
    <Helmet>
      <title>Business. About</title>
      <meta name="description" content="all the info about the business" />
    </Helmet>
    <div className="contanier text-center">
      <h1 className="p-5">About</h1>
      <hr />
      <p className="lead">
        Dear visitor , Here you can fins all the information you need about our
        company.
      </p>
    </div>
  </Layout>
);

export default About;
