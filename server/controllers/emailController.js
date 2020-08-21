require ("dotenv").config();
let cron = require('node-cron')

module.exports = {
    email: async (req, res, next) =>{
        var nodemailer = require('nodemailer');
        const db = req.app.get("db");
        //const {userEmail} = req.body;
        let userEmail = 'grantmtabor@gmail.com'
        const {EMAIL, PASSWORD} = process.env
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587, 
            service: 'gmail',
            secure: false,
            auth: {
                user: EMAIL,
                pass: PASSWORD
            }
        });

        var mailOptions = {
            from: EMAIL,
            to: userEmail,
            subject: 'tasktesting',
            text: 'trying to get mailing working'
        };
        cron.schedule('* * * * *', () =>{
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    
                }
            });
        })
        
    },
    dailyEmail: async (req, res, next) =>{
        
        console.log("email")
        //const db = app.get("db")
        var nodemailer = require('nodemailer');
        let userEmail = 'grantmtabor@gmail.com';
        const {EMAIL, PASSWORD} = process.env
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587, 
            service: 'gmail',
            secure: false,
            auth: {
                user: EMAIL,
                pass: PASSWORD
            }
        });
        
        /*
        var mailOptions = {
            from: EMAIL,
            to: userEmail,
            subject: 'tasktesting',
            text: 'trying to get mailing working'
        };
        cron.schedule('* * * * *', () =>{ 
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    
                }
            });
        }) */
        //const incompleteTasks = await db.parents.get_incomplete_tasks();
        //console.log(incompleteTasks)
        
    }
}