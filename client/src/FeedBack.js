import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Layout from './Layout';
import { Helmet } from 'react-helmet';

const FeedBack = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: '',
    phone: '',
    uploadedFiles: [],
    buttonText: 'Submit',
    uploadPhotosButtonText: 'Upload Files'
  });
  const {
    name,
    email,
    message,
    phone,
    uploadedFiles,
    buttonText,
    uploadPhotosButtonText
  } = values;
  const {
    // REACT_APP_API,
    REACT_APP_API_CLOUDINARY_NAME,
    REACT_APP_API_CLOUDINARY_UPLOAD_PRESET
  } = process.env;

  const handelChange = event => {
    setValues({ ...values, [event.target.id]: event.target.value });
  };
  const handelSubmit = event => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Sending...' });
    // console.table({ name, email, phone, message, uploadedFiles });
    axios({
      method: 'POST',
      url: `/api/feedback`,
      // url: `${REACT_APP_API}/feedback`,
      data: { name, email, phone, message, uploadedFiles }
    })
      .then(res => {
        // console.log('feedback sumbit response: ', res);
        if (res.data.success) toast.success('Thanks for your feedback.');
        setValues({
          name: '',
          email: '',
          message: '',
          phone: '',
          uploadedFiles: [],
          buttonText: 'Submitted',
          uploadPhotosButtonText: 'Uploaded'
        });
      })
      .catch(err => {
        // console.log('feedback sumbit ERROR: ', err.response);
        if (err.response.data.err) toast.error('Faild! Try again');
      });
  };
  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: REACT_APP_API_CLOUDINARY_NAME,
        upload_preset: REACT_APP_API_CLOUDINARY_UPLOAD_PRESET,
        tags: ['ebooks']
      },
      function(error, result) {
        setValues({
          ...values,
          uploadedFiles: result,
          uploadPhotosButtonText: `${
            result ? result.length : 0
          } Photos uploaded`
        });
        // console.log(result);
        // console.log(result.info.files);
      }
    );
  };
  const feedBackForm = () => (
    <React.Fragment>
      <div className="form-group ">
        <button
          className="btn btn-outline-secondary btn-block p-5"
          onClick={() => uploadWidget()}>
          {uploadPhotosButtonText}
        </button>
      </div>
      <form onSubmit={handelSubmit}>
        <div className="form-group">
          <label className="text-muted">Description</label>
          <textarea
            type="text"
            className="form-control"
            required
            value={message}
            id="message"
            onChange={handelChange}></textarea>
        </div>
        <div className="form-group">
          <label className="text-muted">Your Name</label>
          <input
            type="text"
            className="form-control"
            required
            value={name}
            id="name"
            onChange={handelChange}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Your E-mail</label>
          <input
            type="email"
            className="form-control"
            required
            value={email}
            id="email"
            onChange={handelChange}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Your Phone</label>
          <input
            type="number"
            className="form-control"
            required
            value={phone}
            id="phone"
            onChange={handelChange}
          />
        </div>
        <button className="btn btn-outline-primary btn-block">
          {buttonText}
        </button>
      </form>
    </React.Fragment>
  );
  return (
    <Layout>
      <Helmet>
        <title>Business. FeedBack</title>
        <meta name="description" content="form to send feedack" />
      </Helmet>
      <ToastContainer />
      <div className="contanier text-center">
        <h1 className="p-5">FeddBack Form</h1>
      </div>
      <div className="container col-md-8 offset-col-md-2">{feedBackForm()}</div>
    </Layout>
  );
};

export default FeedBack;
