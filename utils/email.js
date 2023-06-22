const nodemailer = require('nodemailer'); 


const transport = nodemailer.createTransport({
    host:"smtp.gmail.com",
    post:587,
    secure:false,
    requireTLS:true,
    auth: {
      user: "owaismailcheck@gmail.com",
      pass: "ntkcdoghulpgsbsc",
    },
  });



const sentVerification = async (to) => {

    const html = `
    
    `;

    let mailOption = {
        from:"owaismailcheck@gmail.com",
        to:to,
        subject:"Verification Email",
        html:html
    }

    transport.sendMail(mailOption,function(error,info){
        console.log(info);

    });

}

const sentForgetPasswordEmail = async (email,token) => {

    const html = `
        <h1>Forget Password Email</h1>
        <p>Here Is Your Email ${email}</p>
        <a href="http://localhost:3000/admin/new-password/${token}">Click Here To Create New Password<a/>
    `;

    let mailOption = {
        from:"owaismailcheck@gmail.com",
        to:"iamowaisazam@gmail.com",
        subject:"Verification Email",
        html:html
    }

    transport.sendMail(mailOption,function(error,info){
        console.log(info);

    });

}


module.exports = {
    sentVerification,
    sentForgetPasswordEmail
}