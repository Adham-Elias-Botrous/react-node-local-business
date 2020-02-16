const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.emailFeedBack = (req, res) => {
  // console.log(req.body);
  const { name, email, phone, message, uploadedFiles } = req.body;
  const emailData = {
    to: process.env.EMAIL_TO,
    from: email,
    subject: 'FeedBack Form',
    html: `
    <h1>Customer FeedBAck Form </h1>
    <hr />
    <h2> Sender name: ${name}<h2/>
    <h2> Sender email: ${email}<h2/>
    <h2> Sender phone: ${phone}<h2/>
    <h2> Sender message: ${message}<h2/>
    <br />
${uploadedFiles.map(file => {
  return `<img src="${file.secure_url}" alt="${file.original_filename}"  style="width:50%;overflow:hidden;padding:20px;"/>`;
})}
<hr />
<p>https:/feedbackonlilne.com</p>
    `
  };
  sgMail
    .send(emailData)
    .then(sent => {
      // console.log(sent);
      return res.json({ success: true });
    })
    .catch(err => {
      // console.log(err);
      return res.json({ success: false });
    });
};
